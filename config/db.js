import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "db_movie",
});

db.connect((err) => {
    if (err) {
        console.error("Errore durante la connessione al database", err);
    } else {
        console.log("Connesso al database con id:", db.threadId);
    }
});