/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";

const useLogin = () => {
  const { setUser } = useAuth();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async (data: any) => {
      const response = await loginUser(data.email, data.password);
      return response;
    },
    onSuccess: async (data) => {
      setUser(data.user);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  return { login, isLoggingIn };
};

export default useLogin;
