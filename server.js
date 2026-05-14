const express = require("express");
const app = express();
const cursosRoutes = require("./routes/cursos.routes");

// Middleware para leer JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.json({ mensaje: "API de TecnoAula Formación funcionando correctamente" });
});

// Rutas de cursos
app.use("/api/cursos", cursosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
