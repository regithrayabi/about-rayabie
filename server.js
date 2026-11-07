// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk membaca JSON
app.use(express.json());

// 1. Arahkan Express untuk membaca file statis (CSS, Gambar) dari folder 'public'
app.use(express.static(path.join(__dirname, "public"), { index: false }));

// 2. Basic Route: Menangani permintaan ke halaman utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 3. Data Simulasi (Skills dengan deskripsi profesional)
let skillsData = [
  {
    id: 1,
    name: "JavaScript & Node.js",
    icon: "fab fa-js-square",
    desc: "Pengembangan backend modular, REST API, native standard libraries, dan manajemen paket npm.",
  },
  {
    id: 2,
    name: "Express.js & DB",
    icon: "fas fa-server",
    desc: "Routing server statis & dinamis, arsitektur socket networking, serta pengolahan database MySQL.",
  },
  {
    id: 3,
    name: "Frontend Layout",
    icon: "fab fa-html5",
    desc: "Penguasaan responsive layout dengan Flexbox, CSS Grid, serta penataan hierarki visual.",
  },
];

// 4. API Routes (GET, POST, dll.)
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
  console.log(`Server berjalan pada port ${PORT}`);
});
