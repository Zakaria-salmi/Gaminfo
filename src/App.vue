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
                    <img src="" alt="" />
                    <p class="name">Elden Ring</p>
                    <p class="description">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Nobis quasi repellendus maiores exercitationem
                        odio tenetur! Laudantium sint architecto unde quasi
                        soluta aliquam nam ipsa, eum eaque repellat nisi,
                        voluptates quibusdam.
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
