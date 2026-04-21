import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2026-03-29",
  devtools: { enabled: true },
  modules: ["@tresjs/nuxt", "@pinia/nuxt"],
  imports: {
    dirs: ["stores"],
    presets: [
      {
        from: "pinia",
        imports: ["defineStore", "storeToRefs"]
      }
    ]
  },
  css: ["~/assets/styles/main.css"],
  app: {
    head: {
      title: "Diary",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        {
          name: "description",
          content: "Nuxt-based private diary application"
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      appName: "Diary"
    }
  }
});
