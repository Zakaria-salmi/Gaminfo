<template>
    <div class="container" :style="backgroundStyle">
        <div class="search-box">
            <input
                type="text"
                v-model="gameInput"
                placeholder="Entrez votre jeu"
            />
            <button
                class="fa-solid fa-magnifying-glass"
                @click="searchGame"
            ></button>
        </div>
        <div v-if="game" class="game-box">
            <div class="info-game">
                <div class="game-first">
                    <div class="title-box">
                        <span class="date-tag">{{ game.released }}</span>
                        <span
                            v-for="(platform, index) in uniquePlatformFamilies"
                            :key="index"
                            class="platform-icon"
                        >
                            <i
                                v-if="platform === 'Xbox'"
                                class="fab fa-xbox"
                            ></i>
                            <i
                                v-if="platform === 'PC'"
                                class="fab fa-windows"
                            ></i>
                            <i
                                v-if="platform === 'PlayStation'"
                                class="fab fa-playstation"
                            ></i>
                        </span>
                        <h2 class="title">{{ game.name }}</h2>
                    </div>
                    <div class="under-title">
                        <div class="develeper-box"></div>
                        <div class="rating-box">
                            <div>
                                <h2>Rating</h2>
                                <p>{{ game.rating }}/5</p>
                            </div>
                            <div>
                                <h2>Metascore</h2>
                                <p
                                    v-if="game.metacritic"
                                    :class="[metascoreClass, 'metascore']"
                                >
                                    {{ game.metacritic }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="description-box">
                        <h2>Description</h2>
                        <div
                            class="description"
                            v-html="game.description"
                        ></div>
                    </div>
                </div>
                <div class="game-second"></div>
            </div>
        </div>
        <div v-if="noGame" class="no-game">
            <p>No game found. Please try a different search.</p>
        </div>
    </div>
</template>

<style>
.container {
    width: 50vw;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 20px;
    background-position: center;
    background-size: cover;
}

.search-box {
    position: relative;
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
}

.search-box input {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    border: 2px solid rgba(255, 255, 255, 0.2);
    outline: none;
    border-radius: 10px;
    font-size: 22px;
    color: white;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0 48px 0 42px;
}

.search-box input::placeholder {
    color: white;
    text-transform: capitalize;
}

.search-box button {
    position: absolute;
    right: 0;
    width: 40px;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 28px;
    color: white;
    padding: 0 40px 0 5px;
    cursor: pointer;
}

.search-box i {
    position: relative;
    left: 10px;
    font-size: 28px;
}

.game-box {
    text-align: center;
    margin: 40px 0;
}

.game-box img {
    width: 60%;
}

.game-box .name {
    position: relative;
    font-size: 64px;
    line-height: 1;
    font-weight: 700;
}

.game-box .description {
    font-size: 22px;
    font-weight: 500;
}

.game-first {
    width: 65%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    padding: 10px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
}

.game-second {
    width: 35%;
}

.no-game {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
}

.title-box {
    margin-left: 1em;
    text-align: left;
}

.title {
    font-size: 3em;
}

.date-tag {
    font-size: 12px;
    line-height: normal;
    font-weight: 600;
    padding: 2px 7.5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #000;
    border-radius: 4px;
    background-color: #fff;
}

.platform-icon {
    margin-left: 7px;
}

.metascore {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 2px;
    font-weight: 700;
    text-align: center;
    border-radius: 4px;
    border: 1px solid;
}

.metascore-green {
    color: #6dc849;
    border-color: rgba(109, 200, 73, 0.4);
}

.metascore-orange {
    color: #fdca52;
    border-color: rgba(253, 202, 82, 0.4);
}

.metascore-red {
    color: #fc4b37;
    border-color: rgba(252, 75, 55, 0.4);
}

.rating-box {
    display: flex;
    gap: 30px;
    justify-content: flex-end;
    padding: 20px;
}

.description-box {
    text-align: left;
}

.description-box h2 {
    margin-bottom: 5px;
}

.description p {
    font-size: 1rem;
    text-align: justify;
}
</style>

<script>
import axios from "axios";

export default {
    data() {
        return {
            gameInput: "",
            game: null,
            platforms: [],
            noGame: false,
        };
    },
    computed: {
        backgroundStyle() {
            return this.game && this.game.background_image
                ? {
                      backgroundImage: `url(${this.game.background_image})`,
                      height: "80vh",
                      width: "80vw",
                  }
                : {
                      width: "50vw",
                      height: "auto",
                  };
        },
        uniquePlatformFamilies() {
            const families = new Set();
            this.platforms.forEach((platform) => {
                if (platform.startsWith("Xbox")) {
                    families.add("Xbox");
                } else if (platform.startsWith("PC")) {
                    families.add("PC");
                } else if (platform.startsWith("PlayStation")) {
                    families.add("PlayStation");
                }
            });
            return Array.from(families);
        },
        metascoreClass() {
            if (this.game && this.game.metacritic) {
                const score = parseInt(this.game.metacritic);
                if (score >= 0 && score <= 50) {
                    return "metascore-red";
                } else if (score > 50 && score <= 74) {
                    return "metascore-orange";
                } else if (score > 74) {
                    return "metascore-green";
                }
            }
            return "";
        },
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
                if (response.data) {
                    console.log(response.data);
                    this.platforms = [];
                    this.noGame = false;
                    response.data.platforms.forEach((element) => {
                        this.platforms.push(element.platform.name);
                    });
                    this.game = response.data;
                } else {
                    this.game = null;
                    this.platforms = [];
                    this.noGame = true;
                }
            } catch (error) {
                console.error(error);
                this.game = null;
                this.platforms = [];
                this.noGame = true;
            }
        },
    },
};
</script>
