# Hades CLI

A powerful AI-powered CLI interface designed to work with FastAPI servers for context-aware AI generation.

## Features

- 🎨 Beautiful ASCII art banner with colored output
- 🖥️ Interactive shell interface (`hades>` prompt)
- 🔄 Modular architecture for easy scaling
- 🤖 AI generation with context preservation
- 🎯 Metasploit-style interface design
- 🛡️ Graceful shutdown handling
- ⚙️ Configurable via environment variables
- 🔌 Designed to work with FastAPI servers

## Architecture

The application follows a modular design pattern:

```
cmd/hades/main.go          # Application entry point
internal/
├── cli/                   # Main CLI interface
│   └── cli.go
├── commands/              # Command handling
│   ├── manager.go         # Command manager
│   ├── api_client.go      # FastAPI client
│   └── generator.go       # AI generation logic
├── config/                # Configuration management
│   └── config.go
└── ui/                    # User interface
    └── ui.go
```

## Installation

1. Make sure you have Go 1.24.4 or later installed
2. Clone this repository
3. Install dependencies:
   ```bash
   go mod tidy
   ```
4. Build the application:
   ```bash
   go build -o hades cmd/hades/main.go
   ```

## Configuration

The CLI can be configured using environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `HADES_SERVER_URL` | `http://localhost` | FastAPI server URL |
| `HADES_SERVER_PORT` | `8080` | FastAPI server port |
| `HADES_API_ENDPOINT` | `/api/v1/generate` | API endpoint path |
| `HADES_TIMEOUT` | `30` | Request timeout in seconds |
| `HADES_DEBUG` | `false` | Enable debug mode |

## Usage

Run the CLI:
```bash
./hades
```

### Available Commands

- `help` - Show available commands
- `generate` - Enter interactive AI generation mode
- `clear` - Clear the terminal screen
- `status` - Show server status
- `config` - Show current configuration
- `exit` or `quit` - Exit the CLI

### AI Generation Mode

When you type `generate`, you'll enter an interactive mode where you can:
- Enter prompts for AI generation
- Get responses from your FastAPI server
- Manage conversation context
- Type `back` to return to the main shell

#### Generator Commands:
- `back` - Return to main shell
- `clear` - Clear conversation context
- `context` - Show current context
- `help` - Show generator help

## FastAPI Server Integration

The CLI expects a FastAPI server running with the following endpoint:

### API Endpoint

- **URL**: `http://localhost:8080/api/v1/generate`
- **Method**: POST
- **Content-Type**: application/json

#### Request Format:
```json
{
  "prompt": "Your prompt here",
  "context": "Previous context (optional)"
}
```

#### Response Format:
```json
{
  "text": "Generated response",
  "context": "Updated context (optional)"
}
```

### Example FastAPI Server

Here's a basic example of the FastAPI server you'll need:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class GenerateRequest(BaseModel):
    prompt: str
    context: Optional[str] = None

class GenerateResponse(BaseModel):
    text: str
    context: Optional[str] = None

@app.post("/api/v1/generate")
async def generate(request: GenerateRequest):
    # Your Google ADK integration here
    # This is where you'd call your AI model
    
    response_text = f"Generated response for: {request.prompt}"
    new_context = f"{request.context or ''} {request.prompt}".strip()
    
    return GenerateResponse(
        text=response_text,
        context=new_context
    )

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

## Development

### Adding New Commands

To add new commands, modify the `Execute` method in `internal/commands/manager.go`:

```go
func (m *Manager) Execute(command string, args []string) error {
    switch command {
    case "yourcommand":
        return m.handleYourCommand(args)
    // ... existing cases
    }
}
```

Then implement the handler method:

```go
func (m *Manager) handleYourCommand(args []string) error {
    // Your command implementation
    return nil
}
```

### Project Structure

```
cli/
├── cmd/
│   └── hades/
│       └── main.go           # Application entry point
├── internal/
│   ├── cli/
│   │   └── cli.go           # Main CLI interface
│   ├── commands/
│   │   ├── manager.go       # Command manager
│   │   ├── api_client.go    # FastAPI client
│   │   └── generator.go     # AI generation logic
│   ├── config/
│   │   └── config.go        # Configuration management
│   └── ui/
│       └── ui.go            # User interface
├── go.mod                   # Go module file
└── README.md               # This file
```

## License

This project is part of the Hades framework by NexorTech.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues and questions, please open an issue on the GitHub repository. 