const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8000;

app.use(express.json());

app.post("/api/v1/generateCommand", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(`[+] Received prompt: "${prompt}"`);

    if (!prompt) {
      return res.status(400).json({
        error: "No prompt provided",
        commands: []
      });
    }

    let commands = [];
    const lowerPrompt = prompt.toLowerCase();

    // Prompt pattern matching
    if (lowerPrompt.includes("list") && lowerPrompt.includes("file")) {
      commands = ["ls -la", "pwd"];
    } else if (lowerPrompt.includes("system") || lowerPrompt.includes("info")) {
      commands = ["uname -a", "whoami", "hostname"];
    } else if (lowerPrompt.includes("network") || lowerPrompt.includes("scan")) {
      commands = ["nmap -A google.com"];
    } else if (lowerPrompt.includes("process") || lowerPrompt.includes("running")) {
      commands = ["ps aux"];
    } else if (lowerPrompt.includes("disk") || lowerPrompt.includes("space")) {
      commands = ["df -h"];
    } else {
      commands = [`echo "Processing: ${prompt}"`, "pwd"];
    }

    console.log(`[+] Generated commands: ${JSON.stringify(commands)}`);

    // Send back response immediately
    res.json({ commands });

    // Forward commands to Go server
    try {
      const response = await axios.post("http://localhost:3000/execute", {
        commands: commands
      });

      console.log("[+] Response from Go server:");
      console.dir(response.data, { depth: null });
    } catch (forwardErr) {
      console.error("[!] Failed to forward commands:", forwardErr.toString());
    }

  } catch (error) {
    console.error("[!] Error processing prompt:", error);
    res.status(500).json({
      error: "Failed to generate commands",
      commands: []
    });
  }
});

app.listen(PORT, () => {
  console.log(`Hades HTTP server listening on http://localhost:${PORT}`);
});

