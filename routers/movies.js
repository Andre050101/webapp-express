//Import necessari
import express from "express";
import { fetchAllMovies, fetchMovieById } from "../controllers/moviesController.js";

//Configurazione router
const router = express.Router();

//Configurazione rotte
//Rotta index
router.get("/", fetchAllMovies);

//Rotta show
router.get("/:id", fetchMovieById);


//Esportazione router
export default router;