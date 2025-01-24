import express from "express";
import { getAllMovies, getMovieById } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

export default router;