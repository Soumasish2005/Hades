# Hades CLI Makefile

.PHONY: build clean run test test-unit test-integration test-all help

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

# Run all tests
test: test-unit test-integration
	@echo "All tests completed"

# Run unit tests only
test-unit:
	@echo "Running unit tests..."
	go test -v ./internal/...
	@echo "Unit tests complete"

# Run integration tests only
test-integration:
	@echo "Running integration tests..."
	go test -v ./tests/...
	@echo "Integration tests complete"

# Run tests with coverage
test-coverage:
	@echo "Running tests with coverage..."
	go test -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html
	@echo "Coverage report generated: coverage.html"

# Run tests with race detection
test-race:
	@echo "Running tests with race detection..."
	go test -race ./...
	@echo "Race detection tests complete"

# Run specific test file
test-file:
	@echo "Usage: make test-file FILE=path/to/test.go"
	@if [ -z "$(FILE)" ]; then echo "Please specify FILE parameter"; exit 1; fi
	go test -v $(FILE)

# Run tests with verbose output
test-verbose:
	@echo "Running tests with verbose output..."
	go test -v ./...
	@echo "Verbose tests complete"

# Run tests with short mode
test-short:
	@echo "Running tests in short mode..."
	go test -short ./...
	@echo "Short tests complete"

# Run benchmarks
test-bench:
	@echo "Running benchmarks..."
	go test -bench=. -benchmem ./...
	@echo "Benchmarks complete"

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
	@echo "  build         - Build the application"
	@echo "  run           - Build and run the application"
	@echo "  clean         - Clean build artifacts"
	@echo "  deps          - Install dependencies"
	@echo "  test          - Run all tests (unit + integration)"
	@echo "  test-unit     - Run unit tests only"
	@echo "  test-integration - Run integration tests only"
	@echo "  test-coverage - Run tests with coverage report"
	@echo "  test-race     - Run tests with race detection"
	@echo "  test-file     - Run specific test file (FILE=path/to/test.go)"
	@echo "  test-verbose  - Run tests with verbose output"
	@echo "  test-short    - Run tests in short mode"
	@echo "  test-bench    - Run benchmarks"
	@echo "  fmt           - Format code"
	@echo "  lint          - Lint code"
	@echo "  dev-tools     - Install development tools"
	@echo "  help          - Show this help message"

# Development target (build, test, lint)
dev: deps fmt lint test build
	@echo "Development build complete"

# CI/CD target (test, build)
ci: test build
	@echo "CI/CD pipeline completed" 