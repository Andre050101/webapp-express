//Import necessari
import { db } from "../config/db.js";
import fs from "fs";

//Funzione per ottenere tutti i film
export const getAllMovies = (req, res) => {
    const query = "SELECT * FROM movies";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Errore durante il recupero dei film:", err);
            res.status(500).json({ error: "Errore durante il recupero dei film" });
        }
        else {
            const movies = results.map((movie) => {
                const imageFileName = `${movie.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.jpg`;
                const imagePath = `public/${imageFileName}`;
                const defaultImagePath = `public/default.jpg`;
                const imageUrl = fs.existsSync(imagePath)
                    ? `${req.protocol}://${req.get("host")}/${imagePath}`
                    : `${req.protocol}://${req.get("host")}/${defaultImagePath}`;

                return {
                    ...movie,
                    image: imageUrl,
                };
            });
            res.json(movies);
        }
    });
};

// Funzione per ottenere un film specifico
export const getMovieById = (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM movies WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Errore durante il recupero del film:", err);
            res.status(500).json({ error: "Errore durante il recupero del film" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Film non trovato" });
        }

        const movie = results[0];

        // Generiamo il nome del file immagine corrispondente al titolo del film
        const imageFileName = `${movie.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.jpg`;

        // Verifica se il file esiste nella cartella public
        const imagePath = `public/${imageFileName}`;
        const defaultImagePath = `public/default.jpg`;

        // Controlliamo se l'immagine esiste nella cartella 'public'
        movie.image = fs.existsSync(imagePath)
            ? `${req.protocol}://${req.get("host")}/public/${imageFileName}`
            : `${req.protocol}://${req.get("host")}/public/default.jpg`;

        res.json(movie);
    });
};