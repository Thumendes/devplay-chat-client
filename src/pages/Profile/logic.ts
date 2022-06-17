import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useForm } from "../../hooks/useForm";
import { api } from "../../services/api";

export function useProfileLogic() {
  const passwordFormInitialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const userInitialValues = {
    name: "",
    email: "",
  };

  const { user, getUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const passwordForm = useForm(passwordFormInitialValues);
  const userForm = useForm(userInitialValues);

  const handleAvatarSelected = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!user) return;

      const file = event.target.files?.[0];

      if (file) {
        const formData = new FormData();
        formData.append("avatar", file);

        try {
          const { data } = await api.put(`/users/${user.id}/avatar`, formData);

          toast({
            title: "Avatar atualizado com sucesso!",
            description: "Sua nova imagem de perfil foi atualizada com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          await getUser();
        } catch (error) {
          toast({
            title: "Erro ao atualizar avatar",
            description: "Não foi possível atualizar seu avatar, tente novamente mais tarde!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }

      event.target.value = "";
    },
    [user]
  );

  const handlePasswordUpdated = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      console.log("AH");
      event.preventDefault();
      if (!user) return;

      passwordForm.clearError();

      if (!passwordForm.data.oldPassword) return passwordForm.setError("oldPassword", "Senha atual é obrigatória");
      if (!passwordForm.data.newPassword) return passwordForm.setError("newPassword", "Nova senha é obrigatória");
      if (!passwordForm.data.confirmPassword)
        return passwordForm.setError("confirmPassword", "Confirmar nova senha é obrigatória");

      if (passwordForm.data.newPassword !== passwordForm.data.confirmPassword) {
        toast({
          title: "Atenção!",
          description: "Senhas não conferem",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return passwordForm.setError("confirmPassword", "Senhas não conferem");
      }
      const payload = {
        oldPassword: passwordForm.data.oldPassword,
        newPassword: passwordForm.data.newPassword,
      };

      const { data: response } = await api.put(`/users/${user.id}/password`, payload).catch((error) => {
        return { data: error.response && error.response.data };
      });

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
        title: "Senha atualizada com sucesso!",
        description: "Sua senha foi atualizada com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    [user, passwordForm]
  );

  const handleUserUpdated = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!user) return;

      if (!userForm.data.name)
        return toast({
          title: "Nome é obrigatório",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

      if (!userForm.data.email)
        return toast({
          title: "Email é obrigatório",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

      if (userForm.data.name === user.name && userForm.data.email === user.email) return;

      const { data } = await api.put(`/users/${user.id}`, { name: userForm.data.name }).catch((error) => {
        return { data: error.response && error.response.data };
      });

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
        title: "Perfil atualizado com sucesso!",
        description: "Suas informações de perfil foram atualizadas com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      await getUser();
    },
    [user, userForm]
  );

  useEffect(() => {
    if (!user) return;

    userForm.setValue("name", user.name);
    userForm.setValue("email", user.email);
  }, [user]);

  return { fileInputRef, handleAvatarSelected, user, passwordForm, userForm, handlePasswordUpdated, handleUserUpdated };
}
