import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useForm } from "../../hooks/useForm";

export function useLoginLogic() {
  const initialValues = { email: "", password: "" };

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const form = useForm(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);
    const signed = await signIn(form.data);
    setIsLoading(false);

    if (signed) {
      navigate("/");
      return;
    }
  }

  return { form, handleSubmit, isLoading };
}
