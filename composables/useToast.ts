type ToastType = "success" | "error";

type ToastPayload = {
  message: string;
  type: ToastType;
};

export const useToast = () => {
  const toast = useState<ToastPayload | null>("app-toast", () => null);

  const show = (message: string, type: ToastType = "success") => {
    toast.value = { message, type };

    setTimeout(() => {
      if (toast.value?.message === message) {
        toast.value = null;
      }
    }, 3000);
  };

  return {
    toast,
    show
  };
};
