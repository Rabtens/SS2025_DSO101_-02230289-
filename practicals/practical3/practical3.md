# Docker Image Publishing with GitHub Actions

This repository demonstrates how to automatically build and publish Docker images to both Docker Hub and GitHub Packages using GitHub Actions.

## Features

- Automatic Docker image building and publishing
- Multi-registry support (Docker Hub and GitHub Packages)
- Triggered on new releases or manually
- Includes supply chain security with build attestation
- Proper image tagging based on semantic versioning

## Prerequisites

- GitHub account
- Docker Hub account
- Repository on Docker Hub (must be created before running workflow)

## Setup Instructions

### 1. Docker Hub Setup

1. Create a repository on Docker Hub:
   - Go to Docker Hub
   - Sign in with your account
   - Click "Create Repository"
   - Enter repository name and set visibility
   - Click "Create"

### 2. GitHub Repository Setup

1. Configure GitHub repository secrets:
   - Go to your repository's Settings > Secrets and variables > Actions
   - Add two secrets:
     - `DOCKER_USERNAME`: Your Docker Hub username
     - `DOCKER_PASSWORD`: Your Docker Hub password or access token (recommended)

### 3. Workflow Configuration

This repository includes a GitHub Actions workflow file (`.github/workflows/docker-publish.yml`) that handles the building and publishing of Docker images.

The workflow:
- Triggers on new releases or manual dispatch
- Builds the Docker image from the Dockerfile
- Tags the image appropriately
- Pushes the image to both Docker Hub and GitHub Packages
- Generates attestation for supply chain security

## Using the Workflow

### Triggering Builds

There are two ways to trigger the workflow:

1. **Create a GitHub Release**:
   - Go to the Releases section of your repository
   - Click "Create a new release"
   - Set a tag (e.g., `v1.0.0`)
   - Publish the release

2. **Manual Trigger**:
   - Go to the Actions tab of your repository
   - Select the "Publish Docker image" workflow
   - Click "Run workflow"

### Verifying Published Images

#### Docker Hub
1. Go to Docker Hub
2. Navigate to your repository
3. Check that your image is published with the expected tags

#### GitHub Packages
1. Go to your GitHub repository
2. Click on "Packages" in the sidebar or navigation
3. Find your package and verify the tags

## Using the Docker Image

### Pull from Docker Hub

```bash
docker pull your-dockerhub-username/your-repository-name:tag
```

### Pull from GitHub Packages

```bash
docker pull ghcr.io/your-github-username/your-repository-name:tag
```

### Run the Container

```bash
docker run -p local-port:container-port your-dockerhub-username/your-repository-name:tag
```

## Customization

### Dockerfile

Modify the `Dockerfile` to suit your application needs. The current setup is for a basic application, but you should adjust it for your specific requirements.

### Workflow

You can customize the GitHub Actions workflow by editing `.github/workflows/docker-publish.yml`:
- Change the trigger events
- Modify build arguments
- Add additional steps like testing or scanning
- Configure multi-platform builds

## Troubleshooting

### Common Issues

1. **Authentication Failures**:
   - Verify your Docker Hub credentials are correct
   - Ensure your Docker Hub token has appropriate permissions

2. **Build Failures**:
   - Check your Dockerfile for errors
   - Make sure all dependencies are available

3. **Push Failures**:
   - Confirm your Docker Hub repository exists before pushing
   - Verify GitHub workflow has correct permissions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.