# Project-specific settings
PROJECT_NAME := n8n-nodes-unifi-sitemanager
NODE_PATH := nodes/UniFiSiteManager/UniFiSiteManager.node.js
CREDENTIAL_PATH := credentials/UniFiSiteManagerApi.credentials.js

# n8n environment variables
export N8N_CUSTOM_EXTENSIONS := $(PWD)/dist/
export N8N_EDITOR_BASE_URL := http://localhost:5678
export N8N_HOST := 0.0.0.0
export N8N_PORT := 5678
export N8N_PROTOCOL := http
export N8N_LOG_LEVEL := info
export N8N_DEV_RELOAD := true
export N8N_SECURE_COOKIE := false

# Default target
all: build

# Build only
build:
	@echo "Building $(PROJECT_NAME)..."
	npm run build
	@if [ -f dist/$(NODE_PATH) ] && [ -f dist/$(CREDENTIAL_PATH) ]; then \
		touch dist/$(NODE_PATH); \
		touch dist/$(CREDENTIAL_PATH); \
		echo "✅ Build completed - UniFi Site Manager node ready for n8n"; \
		echo "   📦 Node: dist/$(NODE_PATH)"; \
		echo "   🔑 Credentials: dist/$(CREDENTIAL_PATH)"; \
	else \
		echo "❌ Warning: Built files not found"; \
		echo "   Expected: dist/$(NODE_PATH)"; \
		echo "   Expected: dist/$(CREDENTIAL_PATH)"; \
	fi

# Build and start n8n
dev: build
	@echo "🚀 Starting n8n with $(PROJECT_NAME)..."
	@echo "   📡 UniFi Site Manager node will be available"
	@echo "   🌐 n8n Editor: $(N8N_EDITOR_BASE_URL)"
	n8n start


# Show current environment
env:
	@echo "🌍 n8n Environment Variables for $(PROJECT_NAME):"
	@echo "   N8N_CUSTOM_EXTENSIONS = $(N8N_CUSTOM_EXTENSIONS)"
	@echo "   N8N_EDITOR_BASE_URL = $(N8N_EDITOR_BASE_URL)"
	@echo "   N8N_HOST = $(N8N_HOST)"
	@echo "   N8N_PORT = $(N8N_PORT)"
	@echo "   N8N_DEV_RELOAD = $(N8N_DEV_RELOAD)"
	@echo "   N8N_LOG_LEVEL = $(N8N_LOG_LEVEL)"

# Show project status
status:
	@echo "📊 $(PROJECT_NAME) Status:"
	@echo "   📁 Project Path: $(PWD)"
	@echo "   🎯 Node File: $(NODE_PATH)"
	@echo "   🔑 Credential File: $(CREDENTIAL_PATH)"
	@if [ -f dist/$(NODE_PATH) ]; then \
		echo "   ✅ Node built: $(shell stat -f%Sm -t '%Y-%m-%d %H:%M:%S' dist/$(NODE_PATH) 2>/dev/null || stat -c '%y' dist/$(NODE_PATH) 2>/dev/null | cut -d' ' -f1-2)"; \
	else \
		echo "   ❌ Node not built"; \
	fi
	@if [ -f dist/$(CREDENTIAL_PATH) ]; then \
		echo "   ✅ Credentials built: $(shell stat -f%Sm -t '%Y-%m-%d %H:%M:%S' dist/$(CREDENTIAL_PATH) 2>/dev/null || stat -c '%y' dist/$(CREDENTIAL_PATH) 2>/dev/null | cut -d' ' -f1-2)"; \
	else \
		echo "   ❌ Credentials not built"; \
	fi

# Clean build files
clean:
	@echo "🧹 Cleaning build files..."
	rm -rf dist/
	@echo "✅ Clean completed"


# Help
help:
	@echo "🔧 $(PROJECT_NAME) - UniFi Site Manager n8n Node Development"
	@echo ""
	@echo "📋 Available Commands:"
	@echo "   make build     - Build the UniFi Site Manager node only"
	@echo "   make dev       - Build and start n8n once"
	@echo "   make env       - Show n8n environment variables"
	@echo "   make status    - Show project and build status"
	@echo "   make clean     - Remove dist/ build files"
	@echo "   make help      - Show this help"
	@echo ""
	@echo "🚀 Quick Start:"
	@echo "   make build     # Build the node"
	@echo "   make dev       # Build and run n8n"

.PHONY: all build dev env status clean help