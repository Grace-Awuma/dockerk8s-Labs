const express = require("express")
const multer = require("multer") // Import multer
const path = require("path") // Import path module
const fs = require("fs") // Import fs module

const app = express()
const PORT = process.env.PORT || 3000

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir) // Files will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname) // Unique filename
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    // Basic image type validation
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF are allowed."), false)
    }
  },
})

// Middleware to parse JSON
app.use(express.json())

// Sample data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
]

// Routes
// GET - Welcome message
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to My Docker API!",
    version: "2.0.0", // Updated version
    endpoints: {
      "GET /": "This welcome message",
      "GET /api/users": "Get all users",
      "GET /api/users/:id": "Get user by ID",
      "POST /api/users": "Create new user",
      "PUT /api/users/:id": "Update user by ID",
      "DELETE /api/users/:id": "Delete user by ID",
      "POST /api/upload": "Upload an image file (max 5MB, JPEG/PNG/GIF)", // New endpoint
      "GET /health": "Health check",
    },
  })
})

// POST - Upload file endpoint
app.post(
  "/api/upload",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded or invalid file type." })
    }

    // Basic "health check" for the image: check if it's an allowed type and size
    res.status(200).json({
      success: true,
      message: "Image uploaded and health checked successfully!",
      file: {
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path, // Note: path is inside the container
      },
    })
  },
  (error, req, res, next) => {
    // Multer error handling
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: error.message })
    } else if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }
    next()
  },
)

// GET - Get all users
app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users,
  })
})

// GET - Get user by ID
app.get("/api/users/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const user = users.find((u) => u.id === id)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  res.json({
    success: true,
    data: user,
  })
})

// POST - Create new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required",
    })
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  }

  users.push(newUser)

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  })
})

// PUT - Update user
app.put("/api/users/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  const { name, email } = req.body

  if (name) users[userIndex].name = name
  if (email) users[userIndex].email = email

  res.json({
    success: true,
    message: "User updated successfully",
    data: users[userIndex],
  })
})

// DELETE - Delete user
app.delete("/api/users/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  const deletedUser = users.splice(userIndex, 1)[0]

  res.json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  })
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📖 API Documentation available at http://localhost:${PORT}`)
})
