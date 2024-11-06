const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

// Cargar los datos del archivo JSON
const loadData = () => {
    try {
        const data = fs.readFileSync("anime.json");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al cargar datos:", error);
        return {};
    }
};

// Guardar los datos en el archivo JSON
const saveData = (data) => {
    try {
        fs.writeFileSync("anime.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error al guardar datos:", error);
    }
};

// Ruta para obtener todos los animes
app.get("/animes", (req, res) => {
    const animes = loadData();
    res.json(animes);
});

// Ruta para obtener un anime por ID
app.get("/animes/:id", (req, res) => {
    const animes = loadData();
    const anime = animes[req.params.id];
    if (anime) {
        res.json(anime);
    } else {
        res.status(404).json({ message: "Anime no encontrado" });
    }
});

// Ruta para buscar un anime por nombre
app.get("/animes/nombre/:nombre", (req, res) => {
    const animes = loadData();
    const foundAnimes = Object.values(animes).filter(anime => anime.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (foundAnimes.length > 0) {
        res.json(foundAnimes);
    } else {
        res.status(404).json({ message: "Anime no encontrado" });
    }
});

// Ruta para agregar un nuevo anime
app.post("/animes", (req, res) => {
    const animes = loadData();
    const newId = (Object.keys(animes).length + 1).toString(); // Usa el formato de ID actual
    animes[newId] = req.body;
    saveData(animes);
    res.status(201).json({ message: "Anime agregado", anime: animes[newId] });
});

// Ruta para actualizar un anime existente
app.put("/animes/:id", (req, res) => {
    const animes = loadData();
    const anime = animes[req.params.id];
    if (anime) {
        animes[req.params.id] = req.body;
        saveData(animes);
        res.json({ message: "Anime actualizado", anime: animes[req.params.id] });
    } else {
        res.status(404).json({ message: "Anime no encontrado" });
    }
});

// Ruta para eliminar un anime
app.delete("/animes/:id", (req, res) => {
    const animes = loadData();
    if (animes[req.params.id]) {
        delete animes[req.params.id];
        saveData(animes);
        res.json({ message: "Anime eliminado" });
    } else {
        res.status(404).json({ message: "Anime no encontrado" });
    }
});



app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


module.exports = app;
