import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

// Charge les variables d'environnement depuis .env
dotenv.config();

export default defineConfig({
    plugins: [vue()],
    define: {
        "process.env": process.env,
    },
});
