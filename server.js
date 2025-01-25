//Import necessari
import express from "express";
import dotenv from "dotenv";
import moviesRouter from "./routers/movies.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";

//Configurazione dotenv per la lettura delle variabili d'ambiente
dotenv.config();

//Inizializzazione server
const app = express();

//Configurazione server
app.use(express.json());

//Configurazione rotte
//Rotta di default
app.get("/", (req, res) => {
    res.send("Benvenuto nel server di WebApp Express!");
});

//Rotta per la gestione dei file statici
app.use("/public", express.static("public"));

//Rotta per la gestione dei film
app.use("/movies", moviesRouter);

//Gestione rotte inesistenti
app.use(notFound);

//Gestione errori
app.use(errorHandler);

//Avvio del server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server avviato su http://localhost:${process.env.PORT || 3000}`);
});