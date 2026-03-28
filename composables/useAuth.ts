export const useAuth = () => {
  const authStore = useAuthStore();

  return {
    user: storeToRefs(authStore).user,
    isLoggedIn: storeToRefs(authStore).isLoggedIn,
    signInWithGoogle: authStore.signInWithGoogle,
    signOut: authStore.signOut
  };
};
