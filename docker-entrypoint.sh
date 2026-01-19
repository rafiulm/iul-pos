#!/bin/sh

# Runtime environment variable injection for Vite apps
# This script replaces placeholder values in the built JS files with actual env values

# Directory containing the built files
ROOT_DIR=/usr/share/nginx/html

# Replace environment variables in JS files at runtime
# This allows changing env vars without rebuilding the Docker image

if [ -n "$VITE_BACKEND_URL" ]; then
    find $ROOT_DIR -type f -name "*.js" -exec sed -i "s|__VITE_BACKEND_URL__|${VITE_BACKEND_URL}|g" {} \;
fi

if [ -n "$VITE_FRONTEND_URL" ]; then
    find $ROOT_DIR -type f -name "*.js" -exec sed -i "s|__VITE_FRONTEND_URL__|${VITE_FRONTEND_URL}|g" {} \;
fi

# Execute the CMD
exec "$@"
