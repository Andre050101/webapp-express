export const errorHandler = (err, req, res, next) => {
    console.error("Errore del server:", err);
    res.status(err.status || 500).json({ error: err.message || "Errore interno del server" });
};