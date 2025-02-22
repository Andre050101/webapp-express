//import necessari
import mysql from "mysql2";
import dotenv from "dotenv";

//configurazione dotenv per la lettura delle variabili d'ambiente
dotenv.config();

//connessione al database
export const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "db_movie",
});

//messaggio di connessione
db.connect((err) => {
    if (err) {
        console.error("Errore durante la connessione al database", err);
    } else {
        console.log("Connesso al database con id:", db.threadId);
    }
});