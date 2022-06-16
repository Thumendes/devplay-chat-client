import { useToast } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { api } from "../../services/api";

export function useRegisterLogic() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: "",
  };

  const navigate = useNavigate();
  const toast = useToast();
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

  async function register(event: FormEvent) {
    event.preventDefault();

    if (!form.data.name) return setErrorAndAlert("name", "Nome é obrigatório");
    if (!form.data.email) return setErrorAndAlert("email", "Email é obrigatório");
    if (!form.data.password) return setErrorAndAlert("password", "Senha é obrigatória");
    if (!form.data.confirmPassword) return setErrorAndAlert("confirmPassword", "Confirmação de senha é obrigatória");
    if (form.data.password !== form.data.confirmPassword)
      return setErrorAndAlert("confirmPassword", "Senhas não conferem");

    const origin = window.location.origin;
    const payload = { ...form.data, origin };

    form.clearError();
    setIsLoading(true);
    const { data: response } = await api.post("/users/register", payload).catch((error) => {
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
      title: "Registro com sucesso!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    navigate(`/confirm-register?email=${form.data.email}`);
  }

  return { register, form, isLoading };
}
