import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/api/games", async (req, res) => {
    const { search } = req.query;
    const apiKey = process.env.API_KEY;

    try {
        const searchResponse = await axios.get(
            "https://api.rawg.io/api/games",
            {
                params: {
                    key: apiKey,
                    search,
                },
            }
        );

        if (searchResponse.data.results.length === 0) {
            return res.status(404).json({ message: "No games found" });
        }

        const gameId = searchResponse.data.results[0].id;

        const gameDetailsResponse = await axios.get(
            `https://api.rawg.io/api/games/${gameId}`,
            {
                params: {
                    key: apiKey,
                },
            }
        );

        const gameStoreResponse = await axios.get(
            `https://api.rawg.io/api/games/${gameId}/stores`,
            {
                params: {
                    key: apiKey,
                },
            }
        );

        const gameTrailerResponse = await axios.get(
            `https://api.rawg.io/api/games/${gameId}/movies`,
            {
                params: {
                    key: apiKey,
                },
            }
        );

        const gameScreensResponse = await axios.get(
            `https://api.rawg.io/api/games/${gameId}/screenshots`,
            {
                params: {
                    key: apiKey,
                },
            }
        );

        const combinedData = {
            ...gameDetailsResponse.data,
            stores_link: gameStoreResponse.data.results,
            trailers: gameTrailerResponse.data.results,
            screenshots: gameScreensResponse.data.results,
        };

        res.json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching data from RAWG API" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
