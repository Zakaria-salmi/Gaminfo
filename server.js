import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/api/games", async (req, res) => {
    const { search, page_size } = req.query;
    const apiKey = process.env.API_KEY;

    try {
        const response = await axios.get("https://api.rawg.io/api/games", {
            params: {
                key: apiKey,
                search,
                page_size,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching data from RAWG API" });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
