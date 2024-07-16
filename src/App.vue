<template>
    <div class="container">
        <div class="search-box">
            <input
                type="text"
                v-model="gameInput"
                placeholder="Entrez votre jeu"
            />
            <button class="bx bx-search" @click="searchGame"></button>
        </div>
        <div class="game-box">
            <div class="info-game">
                <div class="game" v-if="game">
                    <img :src="game.background_image" :alt="game.name" />
                    <h2>{{ game.name }}</h2>
                    <p>Release Date: {{ game.released }}</p>
                    <p>Rating: {{ game.rating }}</p>
                    <p>Metacritic Score: {{ game.metacritic }}</p>
                    <p>
                        Genres:
                        <span
                            v-for="(genre, index) in game.genres"
                            :key="index"
                        >
                            {{ genre.name
                            }}<span v-if="index < game.genres.length - 1"
                                >,
                            </span>
                        </span>
                    </p>
                    <p>
                        Platforms:
                        <span
                            v-for="(platform, index) in game.platforms"
                            :key="index"
                        >
                            {{ platform.platform.name
                            }}<span v-if="index < game.platforms.length - 1"
                                >,
                            </span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

<script>
import axios from "axios";

export default {
    data() {
        return {
            gameInput: "",
            game: null,
        };
    },
    methods: {
        async searchGame() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/games",
                    {
                        params: {
                            search: this.gameInput,
                            page_size: 1,
                        },
                    }
                );
                if (response.data.results.length > 0) {
                    console.log(response.data.results[0]);
                    this.game = response.data.results[0];
                } else {
                    this.game = null;
                    alert("No games found");
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while fetching the game data");
            }
        },
    },
};
</script>
