import express from "express";
import { getAllMovies } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/", getAllMovies);

export default router;