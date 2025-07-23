# HealthCheck API - Node.js with Docker & Kubernetes

A REST API built with Node.js, containerized with Docker, and deployed on Kubernetes. This project demonstrates modern DevOps practices including containerization, orchestration, and API development.

## 🚀 Features

- **RESTful API** with Express.js
- **User Management** - Full CRUD operations
- **File Upload** - Image upload with validation using Multer
- **Health Checks** - Kubernetes-ready health endpoints
- **Docker Containerization** - Multi-stage builds and optimization
- **Kubernetes Deployment** - Production-ready manifests
- **Error Handling** - Comprehensive error responses
- **Input Validation** - File type and size validation

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **File Handling:** Multer
- **Containerization:** Docker
- **Orchestration:** Kubernetes (minikube)
- **Version Control:** Git, GitHub
- **Testing:** Postman

## 📋 Prerequisites

- Node.js (v14 or higher)
- Docker
- Kubernetes (minikube)
- Git

## 🏗️ Project Structure

\`\`\`
HealthCheck API/
├── server.js              # Main application file
├── package.json           # Node.js dependencies
├── Dockerfile            # Docker container configuration
├── .dockerignore         # Docker ignore rules
├── deployment.yaml       # Kubernetes deployment manifest
├── service.yaml          # Kubernetes service manifest
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
\`\`\`

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone git@github.com:Grace-Awuma/dockerk8s-Labs.git
cd dockerk8s-Labs
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Run Locally

\`\`\`bash
npm start
# API will be available at http://localhost:3000
\`\`\`

## 🐳 Docker Usage

### Build Docker Image

\`\`\`bash
docker build -t healthcheck-api:latest .
\`\`\`

### Run Docker Container

\`\`\`bash
docker run -p 3000:3000 healthcheck-api:latest
\`\`\`

### Push to Docker Hub

\`\`\`bash
docker tag healthcheck-api:latest your-username/healthcheck-api:v1.0
docker push your-username/healthcheck-api:v1.0
\`\`\`

## ☸️ Kubernetes Deployment

### 1. Start Minikube

\`\`\`bash
minikube start
\`\`\`

### 2. Deploy to Kubernetes

\`\`\`bash
# Apply deployment
kubectl apply -f deployment.yaml

# Apply service
kubectl apply -f service.yaml
\`\`\`

### 3. Access the Application

\`\`\`bash
# Get service URL
minikube service node-api-service --url

# Or use port forwarding
kubectl port-forward service/node-api-service 3000:80
\`\`\`

### 4. Monitor Deployment

\`\`\`bash
# Check pods
kubectl get pods

# Check deployment status
kubectl rollout status deployment/node-api-deployment

# View logs
kubectl logs -f deployment/node-api-deployment
\`\`\`

## 📡 API Endpoints

### Base URL
- **Local:** `http://localhost:3000`
- **Kubernetes:** `http://127.0.0.1:<minikube-port>`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message and API documentation |
| GET | `/health` | Health check endpoint |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| POST | `/api/upload` | Upload image file |

### Example Requests

#### Create User
\`\`\`bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
\`\`\`

#### Upload Image
\`\`\`bash
curl -X POST http://localhost:3000/api/upload \
  -F "image=@/path/to/your/image.jpg"
\`\`\`

#### Health Check
\`\`\`bash
curl http://localhost:3000/health
\`\`\`

## 🧪 Testing with Postman

1. **Import Collection:** Use the provided Postman collection
2. **Set Base URL:** Update the environment variable to your service URL
3. **Test Endpoints:** Run through all CRUD operations
4. **File Upload:** Test image upload with different file types

### Test Scenarios
- ✅ Create, read, update, delete users
- ✅ Upload valid image files (JPEG, PNG, GIF)
- ✅ Test file size limits (5MB max)
- ✅ Test invalid file types
- ✅ Health check functionality

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)

### File Upload Limits
- **Max file size:** 5MB
- **Allowed types:** JPEG, PNG, GIF
- **Upload directory:** `/uploads`

### Kubernetes Health Checks
- **Liveness probe:** `GET /health` (every 10s)
- **Readiness probe:** `GET /health` (every 5s)
- **Initial delay:** 5 seconds

## 🐛 Troubleshooting

### Common Issues

#### 1. CrashLoopBackOff in Kubernetes
\`\`\`bash
# Check pod logs
kubectl logs <pod-name>

# Common causes:
# - Missing dependencies in package.json
# - App not binding to 0.0.0.0
# - Health check endpoint not responding
\`\`\`

#### 2. Docker Build Fails
\`\`\`bash
# Check .dockerignore excludes:
# - node_modules/
# - Large binary files
# - Development files
\`\`\`

#### 3. Service Not Accessible
\`\`\`bash
# Check service status
kubectl get service node-api-service

# Restart minikube service tunnel
minikube service node-api-service --url
\`\`\`

## 📚 What We Accomplished

### Development Journey
1. **Built REST API** - Created comprehensive Node.js API with Express
2. **Added File Upload** - Implemented image upload with validation
3. **Containerized Application** - Created optimized Docker image
4. **Kubernetes Deployment** - Set up production-ready K8s manifests
5. **Fixed Deployment Issues** - Resolved network binding and dependency problems
6. **Comprehensive Testing** - Tested all endpoints with Postman
7. **Version Control** - Properly managed code with Git and GitHub

### Key Learning Points
- **Container Networking** - Understanding 0.0.0.0 vs localhost binding
- **Kubernetes Health Checks** - Implementing proper liveness/readiness probes
- **Dependency Management** - Ensuring all packages are in package.json
- **File Handling** - Secure file upload with validation
- **DevOps Pipeline** - From development to deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Grace Awuma**
- GitHub: [@Grace-Awuma](https://github.com/Grace-Awuma)
- Repository: [dockerk8s-Labs](https://github.com/Grace-Awuma/dockerk8s-Labs)

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- Docker for containerization technology
- Kubernetes community for orchestration tools
- Node.js community for the runtime environment

---

**Built with ❤️ using Node.js, Docker, and Kubernetes**
