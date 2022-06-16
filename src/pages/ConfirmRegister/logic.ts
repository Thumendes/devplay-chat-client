import { useToast } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useForm } from "../../hooks/useForm";
import { api } from "../../services/api";

export function useConfirmRegisterLogic() {
  const initialValues = { code: "" };

  const navigate = useNavigate();
  const toast = useToast();

  const [searchParams] = useSearchParams();
  const form = useForm(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const { setData } = useAuth();

  async function confirmCode(code: string) {
    const email = searchParams.get("email");

    const payload = { email, code };

    setIsLoading(true);
    const { data: response } = await api.post("/users/confirm-register", payload).catch((error) => {
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

    if (response.user) {
      setData(response.user, response.token);
      navigate("/");
    }

    toast({
      title: "Cadastro confirmado!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!form.data.code) return form.setError("code", "Código é obrigatório");
    form.clearError();

    await confirmCode(form.data.code);
  }

  useEffect(() => {
    const email = searchParams.get("email");
    const code = searchParams.get("code");

    if (!email) {
      navigate("/login");
      return;
    }

    if (code) confirmCode(code);
  }, [searchParams]);

  return { form, handleSubmit, isLoading };
}
