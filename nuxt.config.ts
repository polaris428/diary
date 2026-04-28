import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2026-03-29",
  devtools: { enabled: true },
  modules: ["@tresjs/nuxt", "@pinia/nuxt", "@nuxtjs/supabase"],
  supabase: {
    redirect: false, // 커스텀 콜백 처리를 위해 자동 리다이렉트는 끕니다.
  },
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
