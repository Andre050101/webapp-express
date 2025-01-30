//Import necessari
import { getAllMovies, getMovieById, getReviewsByMovieId } from "../models/movieModel.js";
import fs from "fs";

//Funzione per ottenere tutti i film
export const fetchAllMovies = async (req, res) => {
    try{
        const movies = await getAllMovies();
        const movieWithImages = movies.map((movie) => {
            const imageFileName = `${movie.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.jpg`;
            const imagePath = `public/${imageFileName}`;
            const defaultImagePath = `public/default.jpg`;
            const imageUrl = fs.existsSync(imagePath) 
                ? `${req.protocol}://${req.get("host")}/${imagePath}`
                : `${req.protocol}://${req.get("host")}/${defaultImagePath}`;
            return { ...movie, image: imageUrl };
        });
        res.json(movieWithImages);
    }
    catch(err){
        console.error("Errore durante il recupero dei film:", err);
        res.status(500).json({ error: "Errore durante il recupero dei film" });
    }
};

// Funzione per ottenere un film specifico
export const fetchMovieById = async (req, res) => {
    try {
        const movie = await getMovieById(req.params.id);
        if (!movie) return res.status(404).json({ error: "Film non trovato" });

        const imageFileName = `${movie.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.jpg`;
        const imagePath = `public/${imageFileName}`;
        const defaultImagePath = `public/default.jpg`;
        movie.image = fs.existsSync(imagePath)
            ? `${req.protocol}://${req.get("host")}/public/${imageFileName}`
            : `${req.protocol}://${req.get("host")}/${defaultImagePath}`;

        const reviews = await getReviewsByMovieId(req.params.id);
        movie.reviews = reviews;

        res.json(movie);
    } catch (err) {
        console.error("Errore durante il recupero del film:", err);
        res.status(500).json({ error: "Errore durante il recupero del film" });
    }
};