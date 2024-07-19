<template>
    <vue-easy-lightbox
        class="lightbox-overlay"
        :visible="lightboxVisible"
        :imgs="game?.screenshots?.map((screenshot) => screenshot.image) || []"
        :index="lightboxIndex"
        @hide="lightboxVisible = false"
    />
    <div class="container" :style="backgroundStyle">
        <div class="search-box">
            <input
                type="text"
                v-model="gameInput"
                placeholder="Enter your game"
                @keyup.enter="searchGame"
            />
            <button
                class="fa-solid fa-magnifying-glass"
                @click="searchGame"
            ></button>
        </div>
        <transition name="fade">
            <div v-if="game" class="game-box">
                <div class="info-game">
                    <div class="game-first">
                        <div class="title-box">
                            <span class="date-tag">{{ game.released }}</span>
                            <span
                                v-for="(
                                    platform, index
                                ) in uniquePlatformFamilies"
                                :key="index"
                                class="platform-icon"
                            >
                                <i
                                    title="Xbox"
                                    v-if="platform === 'Xbox'"
                                    class="fab fa-xbox"
                                ></i>
                                <i
                                    title="PC"
                                    v-if="platform === 'PC'"
                                    class="fab fa-windows"
                                ></i>
                                <i
                                    title="Playstation"
                                    v-if="platform === 'PlayStation'"
                                    class="fab fa-playstation"
                                ></i>
                            </span>
                            <h2 class="title">{{ game.name }}</h2>
                        </div>
                        <div class="under-title">
                            <div class="developer-box">
                                <div>
                                    <h2>Developer</h2>
                                    <p v-for="developer in game.developers">
                                        {{ developer.name }}
                                    </p>
                                </div>
                                <div>
                                    <h2>Genre</h2>
                                    <p v-for="genre in game.genres">
                                        {{ genre.name }}
                                    </p>
                                </div>
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
                        <div class="store-box">
                            <h2>Where To Buy</h2>
                            <div class="store-button">
                                <div
                                    v-for="store in filteredStores"
                                    :key="store.id"
                                >
                                    <a :href="store.url" target="_blank">
                                        {{ store.name }}
                                        <i
                                            v-if="store.name === 'Xbox Store'"
                                            class="fab fa-xbox"
                                        ></i>
                                        <i
                                            v-if="store.name === 'Steam'"
                                            class="fab fa-steam"
                                        ></i>
                                        <i
                                            v-if="
                                                store.name ===
                                                'PlayStation Store'
                                            "
                                            class="fab fa-playstation"
                                        ></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="game-second">
                        <div class="media-box">
                            <div
                                class="trailer"
                                v-if="game.trailers && game.trailers.length"
                            >
                                <video
                                    :src="game.trailers[0].data.max"
                                    controls
                                ></video>
                            </div>
                            <transition name="fade">
                                <div
                                    class="screenshots"
                                    v-show="game.screenshots.length"
                                >
                                    <img
                                        v-for="(
                                            screenshot, index
                                        ) in game.screenshots.slice(0, 4)"
                                        :key="index"
                                        v-lazy="screenshot.image"
                                        alt="Screenshot"
                                        class="screenshot"
                                        @click="showLightbox(index)"
                                    />
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div v-if="noGame" class="no-game">
            <p>No game found. Please try a different search.</p>
        </div>
        <div v-if="isLoading" class="loading-spinner"></div>
    </div>
</template>

<style></style>

<script>
import axios from "axios";
import VueEasyLightbox from "vue-easy-lightbox";

export default {
    components: {
        VueEasyLightbox,
    },
    data() {
        return {
            gameInput: "",
            game: null,
            platforms: [],
            stores: [],
            noGame: false,
            lightboxVisible: false,
            lightboxIndex: 0,
            isLoading: false,
        };
    },
    computed: {
        backgroundStyle() {
            return this.game && this.game.background_image
                ? {
                      backgroundImage: `url(${this.game.background_image})`,
                      height: "90vh",
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
        filteredStores() {
            if (!this.game || !this.game.combinedStores) {
                return [];
            }
            return this.game.combinedStores.filter((store) =>
                this.validShop(store.name)
            );
        },
    },
    methods: {
        validShop(store) {
            return (
                store == "Steam" ||
                store == "PlayStation Store" ||
                store == "Xbox Store"
            );
        },
        async searchGame() {
            this.isLoading = true;
            try {
                if (
                    this.game &&
                    this.game.name.toLowerCase() ===
                        this.gameInput.toLowerCase()
                ) {
                    return;
                }

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
                    this.platforms = [];
                    this.noGame = false;
                    response.data.platforms.forEach((element) => {
                        this.platforms.push(element.platform.name);
                    });

                    const stores = response.data.stores;
                    const stores_link = response.data.stores_link;
                    const combinedStores = stores_link.map((link) => {
                        const storeInfo = stores.find(
                            (store) => store.id === link.id
                        );
                        return {
                            id: storeInfo.store.id,
                            name: storeInfo.store.name,
                            domain: storeInfo.store.domain,
                            url: link.url,
                            games_count: storeInfo.store.games_count,
                            image_background: storeInfo.store.image_background,
                            slug: storeInfo.store.slug,
                        };
                    });

                    this.game = {
                        ...response.data,
                        combinedStores,
                    };

                    this.$nextTick(() => {
                        // Adding visible class to trigger animations
                        document
                            .querySelector(".game-box")
                            ?.classList.add("visible");
                        document
                            .querySelector(".screenshots")
                            ?.classList.add("visible");
                    });

                    console.log(this.game);
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
            } finally {
                this.isLoading = false;
            }
        },
        showLightbox(index) {
            this.lightboxIndex = index;
            this.lightboxVisible = true;
        },
    },
};
</script>
