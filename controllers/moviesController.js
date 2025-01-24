import { db } from "../config/db.js";

export const getAllMovies = (req, res) => {
    const query = "SELECT * FROM movies";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Errore durante il recupero dei film:", err);
            res.status(500).json({ error: "Errore durante il recupero dei film" });
        }
        else{
            res.json(results);
        }
    });
};