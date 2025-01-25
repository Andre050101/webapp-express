//Import necessari
import express from "express";
import { getAllMovies, getMovieById } from "../controllers/moviesController.js";

//Configurazione router
const router = express.Router();

//Configurazione rotte
//Rotta index
router.get("/", getAllMovies);

//Rotta show
router.get("/:id", getMovieById);


//Esportazione router
export default router;