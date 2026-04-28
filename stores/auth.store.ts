export const useAuthStore = defineStore("auth", () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const isLoggedIn = computed(() => Boolean(user.value));

  const signInWithGoogle = async () => {
    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    await navigateTo("/");
  };

  return {
    user,
    isLoggedIn,
    signInWithGoogle,
    signOut,
  };
});
