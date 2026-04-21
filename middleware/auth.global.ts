export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const isPublicRoute = ["/", "/auth/callback", "/gallery", "/gallery-test"].includes(to.path);

  if (!authStore.isLoggedIn && !isPublicRoute) {
    return navigateTo("/");
  }

  if (authStore.isLoggedIn && to.path === "/") {
    return navigateTo("/home");
  }
});
