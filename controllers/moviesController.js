//Import necessari
import { db } from "../config/db.js";

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
                const defaultImage = `${movie.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "")}.jpg`;

                return {
                    ...movie,
                    image: movie.image
                        ? `${req.protocol}://${req.get("host")}/public/${movie.image}`
                        : `${req.protocol}://${req.get("host")}/public/${defaultImage}`,
                };
            });
            res.json(movies);
        }
    });
};

//Funzione per ottenere un film specifico
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
        };
        const movie = results[0];
        const defaultImage = `${movie.title
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")}.jpg`;
        movie.image = movie.image
            ? `${req.protocol}://${req.get("host")}/public/${movie.image}`
            : `${req.protocol}://${req.get("host")}/public/${defaultImage}`;
        
            res.json(movie);
    });
};