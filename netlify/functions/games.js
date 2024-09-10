const axios = require("axios");

exports.handler = async (event) => {
    const { search } = event.queryStringParameters;
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
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "No games found" }),
            };
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

        return {
            statusCode: 200,
            body: JSON.stringify(combinedData),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error fetching data from RAWG API",
            }),
        };
    }
};
