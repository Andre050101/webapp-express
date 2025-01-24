import express from "express";
import dotenv from "dotenv";
import { db } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto nel server di WebApp Express!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server avviato su http://localhost:${process.env.PORT || 3000}`);
});