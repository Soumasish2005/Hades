# ⚔️ Hades – AI-Powered Cybersecurity Agent

> *"He doesn’t guard the gates of hell—he scans the ports of your infrastructure."*

**Hades** is a modular, AI-powered cybersecurity agent that combines an interactive CLI, a FastAPI backend, and a web-based AI Developer Kit (ADK) to assist red teamers, bug bounty hunters, and security engineers with context-aware pentesting, reconnaissance, vulnerability assessment, and AI-driven exploit workflows.

---

## 🧠 Key Components

### 🖥️ Hades CLI

* Interactive terminal with a Metasploit-style prompt.
* FastAPI client with context-aware AI prompt generation.
* Graceful error handling, modular command manager, and conversation context management.

### 🌐 FastAPI Server

* Handles AI generation requests.
* Integrates with LLMs (OpenAI, Ollama, Claude, etc.).
* Manages prompt context and response shaping.

### 💻 Web ADK (AI Developer Kit)

* Web dashboard for controlling and visualizing agent behavior.
* Real-time interaction with the AI engine.
* Useful for debugging, demos, or teaching pentest concepts interactively.

---

## 📁 Project Structure

```
Hades/
├── cli/                     # Go-based CLI tool
│   └── cmd/hades/main.go
├── server/                  # FastAPI backend
│   ├── main.py
│   └── api/
│       └── routes.py
├── web/                     # (Optional) Web ADK frontend
│   └── (ReactJs)
├── shared/                  # Shared configs, enums, models
├── .env                     # Environment configs
└── README.md                # You are here
```

---

## 🚀 Getting Started

### Prerequisites

* Go 1.21+ (for CLI)
* Python 3.10+ (for FastAPI server)
* Docker (optional, for isolated environments)

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/NexorTech/hades.git
cd hades
```

### CLI Setup (Go)

```bash
cd cli
go mod tidy
go build -o hades cmd/hades/main.go
```

### FastAPI Server Setup

```bash
cd server
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8080
```

---

## 🌐 API Specification

### Endpoint: `/api/v1/generate`

* **Method**: `POST`
* **Request**:

```json
{
  "prompt": "Find vulnerabilities in this service.",
  "context": "Previously scanned open ports: 22, 80, 443"
}
```

* **Response**:

```json
{
  "text": "Based on the ports found, attempt a brute-force SSH scan on port 22...",
  "context": "Updated internal context"
}
```

---

## 🧩 Configuration

Edit `.env` file or export these variables:

| Variable             | Description         | Default            |
| -------------------- | ------------------- | ------------------ |
| `HADES_SERVER_URL`   | FastAPI server host | `http://localhost` |
| `HADES_SERVER_PORT`  | FastAPI server port | `8080`             |
| `HADES_API_ENDPOINT` | Endpoint path       | `/api/v1/generate` |
| `HADES_DEBUG`        | Debug logging       | `false`            |

---

## 🛠️ CLI Commands

| Command    | Description               |
| ---------- | ------------------------- |
| `generate` | Start AI prompt mode      |
| `status`   | Check server health       |
| `config`   | Show current config       |
| `clear`    | Clear terminal or context |
| `exit`     | Exit CLI                  |

---

## 📦 Deployment

You can run all services together using Docker Compose (coming soon).
Preview setup:

```bash
docker-compose up --build
```

---

## 📚 Roadmap

* [x] CLI with AI generator
* [x] FastAPI backend server
* [ ] Web ADK integration
* [ ] Nmap, Subfinder, Nuclei module bridges
* [ ] Offline LLM inference via Ollama
* [ ] Post-exploitation AI suggestion engine

---

## 🧠 Philosophy

**Hades** is more than a tool — it’s a framework for human-AI synergy in ethical hacking. You type, it reasons. You aim, it executes. You guide, it adapts.

---

## ⚖️ License

MIT License. See `LICENSE` file for details.

---

## 👥 Contributing

Pull requests are welcome! Please:

1. Fork the repo
2. Create a branch (`git checkout -b feat/your-feature`)
3. Commit and push
4. Submit a PR

---

## 📫 Contact

* GitHub: [@MohakGupta2004](https://github.com/MohakGupta2004)
* Email: [mohakgupta500@gmail.com](mailto:mohakgupta500@gmail.com)
---

