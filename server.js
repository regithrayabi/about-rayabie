// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// 1. Arahkan Express untuk membaca file statis (CSS, Gambar) dari folder 'public'
app.use(express.static(path.join(__dirname, "public"), { index: false }));

// 2. Basic Route: Menangani permintaan ke halaman utama
app.get("/", (req, res) => {
  // Arahkan res.sendFile ke dalam folder 'public'
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 3. Data Simulasi
const skillsData = [
  { id: 1, name: "JavaScript & Node.js", icon: "fab fa-js-square" },
  { id: 2, name: "Express.js & DB", icon: "fas fa-server" },
  { id: 3, name: "Frontend Layout", icon: "fab fa-html5" },
];

// 4. API Routes
app.get("/api/skills", (req, res) => {
  res.json(skillsData);
});

app.get("/api/skills/:id", (req, res) => {
  const skillId = parseInt(req.params.id);
  const skill = skillsData.find((s) => s.id === skillId);

  if (!skill) {
    res.status(404).json({ message: "Skill tidak ditemukan" });
  } else {
    res.json(skill);
  }
});

// 5. 404 Middleware
app.use((req, res, next) => {
  res.status(404).send("Halaman atau endpoint tidak ditemukan!");
});

// 6. Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Terjadi error:", err.message);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server berjalan. Silakan buka http://localhost:${PORT}`);
});
