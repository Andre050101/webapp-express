import express from "express";
import dotenv from "dotenv";
import moviesRouter from "./routers/movies.js";


dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto nel server di WebApp Express!");
});

app.use("/public", express.static("public"));

app.use("/movies", moviesRouter);



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server avviato su http://localhost:${process.env.PORT || 3000}`);
});