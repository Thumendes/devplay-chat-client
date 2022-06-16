import { Box, Button, Center, FormControl, FormLabel, Heading, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PasswordInput from "../../components/ui/PasswordInput";
import { useResetPasswordLogic } from "./logic";

function ResetPasswordPage() {
  const { form, handleSubmit, isLoading } = useResetPasswordLogic();

  return (
    <Stack spacing={8}>
      <Box>
        <Heading mb={2}>Crie sua nova senha</Heading>
        <Text>Preencha os campos abaixo para que possa atualizar sua senha</Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <HStack>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <PasswordInput onChange={form.handleChange("password")} value={form.data.password} placeholder="Senha" />
            </FormControl>

            <FormControl>
              <FormLabel>Confirmar senha</FormLabel>
              <PasswordInput
                onChange={form.handleChange("confirmPassword")}
                value={form.data.confirmPassword}
                placeholder="Confirmar senha"
              />
            </FormControl>
          </HStack>

          <Button type="submit" isLoading={isLoading}>
            Atualizar senha
          </Button>
        </Stack>
      </form>

      <Center>
        <Link as={RouterLink} to="/login">
          Fazer login
        </Link>
      </Center>
    </Stack>
  );
}

export default ResetPasswordPage;
