# Hades CLI Makefile

.PHONY: build clean run test help

# Binary name
BINARY_NAME=hades

# Build directory
BUILD_DIR=build

# Source directory
CMD_DIR=cmd/hades

# Default target
all: build

# Build the application
build:
	@echo "Building Hades CLI..."
	@mkdir -p $(BUILD_DIR)
	go build -o $(BUILD_DIR)/$(BINARY_NAME) $(CMD_DIR)/main.go
	@echo "Build complete: $(BUILD_DIR)/$(BINARY_NAME)"

# Run the application
run: build
	@echo "Running Hades CLI..."
	./$(BUILD_DIR)/$(BINARY_NAME)

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf $(BUILD_DIR)
	@go clean
	@echo "Clean complete"

# Install dependencies
deps:
	@echo "Installing dependencies..."
	go mod tidy
	@echo "Dependencies installed"

# Run tests
test:
	@echo "Running tests..."
	go test ./...
	@echo "Tests complete"

# Run tests with coverage
test-coverage:
	@echo "Running tests with coverage..."
	go test -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html
	@echo "Coverage report generated: coverage.html"

# Format code
fmt:
	@echo "Formatting code..."
	go fmt ./...
	@echo "Code formatting complete"

# Lint code
lint:
	@echo "Linting code..."
	golangci-lint run
	@echo "Linting complete"

# Install development tools
dev-tools:
	@echo "Installing development tools..."
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	@echo "Development tools installed"

# Show help
help:
	@echo "Available targets:"
	@echo "  build       - Build the application"
	@echo "  run         - Build and run the application"
	@echo "  clean       - Clean build artifacts"
	@echo "  deps        - Install dependencies"
	@echo "  test        - Run tests"
	@echo "  test-coverage - Run tests with coverage report"
	@echo "  fmt         - Format code"
	@echo "  lint        - Lint code"
	@echo "  dev-tools   - Install development tools"
	@echo "  help        - Show this help message"

# Development target (build, test, lint)
dev: deps fmt lint test build
	@echo "Development build complete" 