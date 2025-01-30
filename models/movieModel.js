import { db } from "../config/db.js";

export const getAllMovies = async () => {
    const query = "SELECT * FROM movies";
    const [results] = await db.promise().query(query);
    return results;
};

export const getMovieById = async (id) => {
    const query = "SELECT * FROM movies WHERE id = ?";
    const [results] = await db.promise().query(query, [id]);
    return results[0];
}

export const getReviewsByMovieId = async (movieId) => {
    const query = "SELECT * FROM reviews WHERE movie_id = ?";
    const [results] = await db.promise().query(query, [movieId]);
    return results;
};