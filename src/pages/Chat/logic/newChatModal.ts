import { useToast } from "@chakra-ui/react";
import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth";
import { useForm } from "../../../hooks/useForm";
import { api } from "../../../services/api";
import { useChat } from "./context";

export function useNewChatModalLogic() {
  const initialValues = { code: "", name: "" };

  const { user } = useAuth();
  const toast = useToast();
  const form = useForm(initialValues);
  const { newChatOpen, newChatToggle, getUserMenu } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addUserToRoom = useCallback(
    async (code: string) => {
      if (!user) return;

      console.log(user);

      setIsLoading(true);
      const { data } = await api.post(`/users/${user.id}/join/${code}`).catch((error) => {
        return { data: error.response.data };
      });
      setIsLoading(false);

      if (data.error) {
        toast({
          title: data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        return;
      }

      toast({
        title: "Entrou na sala!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    [user]
  );

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    const { name } = form.data;
    form.clearError();

    if (!name) {
      form.setError("name", "Nome do canal é obrigatório");
      toast({
        title: "Atenção",
        description: "Por favor, informe um nome para o canal.",
        status: "error",
      });
      return;
    }

    setIsLoading(true);
    const { data: response } = await api.post("/rooms", { name }).catch((error) => {
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

    if (response.room) {
      await addUserToRoom(response.room.code);
    }
    await getUserMenu();

    navigate(`/${response.room.code}`);
    newChatToggle();
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    const { code } = form.data;
    form.clearError();

    if (!code) {
      form.setError("code", "Código do canal é obrigatório");
      toast({
        title: "Atenção",
        description: "Por favor, informe um código para o canal.",
        status: "error",
      });
      return;
    }

    await addUserToRoom(code);
    await getUserMenu();

    navigate(`/${code}`);
    newChatToggle();
  }

  return { handleCreateRoom, handleJoinRoom, newChatOpen, newChatToggle, form, isLoading };
}
