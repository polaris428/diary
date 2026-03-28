import { createPinia, setActivePinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  if (nuxtApp.$pinia) {
    return;
  }

  const pinia = createPinia();

  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);

  if (nuxtApp.payload?.pinia) {
    pinia.state.value = nuxtApp.payload.pinia;
  }

  return {
    provide: {
      pinia
    }
  };
});
