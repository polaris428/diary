export const useAuthStore = defineStore("auth", () => {
  const user = useState("auth-user", () => null as null | { email: string; name: string });

  const isLoggedIn = computed(() => Boolean(user.value));

  const signInWithGoogle = async () => {
    user.value = {
      email: "demo@local.dev",
      name: "Local Demo User"
    };

    useToast().show("로컬 데모 계정으로 로그인했습니다.", "success");
    await navigateTo("/home");
  };

  const initSession = async () => {
    return;
  };

  const signOut = async () => {
    user.value = null;
    await navigateTo("/");
  };

  return {
    user,
    isLoggedIn,
    signInWithGoogle,
    initSession,
    signOut
  };
});
