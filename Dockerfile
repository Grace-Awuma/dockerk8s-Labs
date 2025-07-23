FROM ubuntu:22.04

# Install Node.js and create app user
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    useradd -m -s /bin/bash appuser && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add application files
COPY package*.json /myapp/
WORKDIR /myapp
RUN npm install --only=production
COPY . /myapp

# Create uploads directory and set permissions
RUN mkdir -p /myapp/uploads && \
    chown -R appuser:appuser /myapp

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD node /myapp/healthcheck.js || exit 1

# Entry point
ENTRYPOINT ["node", "/myapp/server.js"]
