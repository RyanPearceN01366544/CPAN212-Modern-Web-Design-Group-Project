import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => { 
    res.send("Howdy!");
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
    res.status(404).send("Page not found");
});