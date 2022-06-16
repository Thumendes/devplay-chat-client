import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { api } from "../../services/api";

export function useForgetPasswordLogic() {
  const form = useForm({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const origin = window.location.origin;
    const payload = { ...form.data, origin };

    if (!payload.email) return form.setError("email", "Email é obrigatório");

    form.clearError();

    setIsLoading(true);
    const { data: response } = await api.post("/users/forget-password", payload).catch((error) => {
      return { data: error.response.data };
    });
    setIsLoading(false);

    if (response.error) {
      toast({
        title: response.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    toast({
      title: "Email enviado com sucesso!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    navigate("/login");
  }

  return { form, handleSubmit, isLoading };
}
