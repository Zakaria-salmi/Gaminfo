import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueLazyload from "vue-lazyload";

const app = createApp(App);

app.use(VueLazyload, {
    // Options here
    preLoad: 1.3,
    error: "path/to/error.png",
    loading: "path/to/loading.gif",
    attempt: 1,
});

app.mount("#app");
