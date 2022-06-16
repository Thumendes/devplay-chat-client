import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { api } from "../../services/api";

export function useResetPasswordLogic() {
  const initialValues = { password: "", confirmPassword: "" };

  const toast = useToast();
  const navigate = useNavigate();
  const form = useForm(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  function setErrorAndAlert(key: keyof typeof initialValues, message: string) {
    form.setError(key, message);

    toast({
      title: "Atenção!",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = { ...form.data };
    if (payload.confirmPassword !== payload.password) return setErrorAndAlert("confirmPassword", "Senhas não conferem");

    setIsLoading(true);
    const { data: response } = await api.post("/users/reset-password", payload).catch((error) => {
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
      title: "Senha alterada com sucesso!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    navigate("/login");
  }

  return { form, handleSubmit, isLoading };
}
