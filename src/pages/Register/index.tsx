import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PasswordInput from "../../components/ui/PasswordInput";
import { useRegisterLogic } from "./logic";

function RegisterPage() {
  const { form, register, isLoading } = useRegisterLogic();

  return (
    <Stack spacing={8}>
      <Box>
        <Heading mb={2}>Cadastre-se</Heading>
        <Text>Faça sua conta agora e entre no chat para conversar com amigos</Text>
      </Box>

      <form onSubmit={register}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!form.errors.name}>
            <FormLabel>Nome</FormLabel>
            <Input value={form.data.name} onChange={form.handleChange("name")} type="text" placeholder="Nome" />
          </FormControl>

          <FormControl isInvalid={!!form.errors.email}>
            <FormLabel>E-mail</FormLabel>
            <Input value={form.data.email} onChange={form.handleChange("email")} type="email" placeholder="E-mail" />
          </FormControl>

          <HStack>
            <FormControl isInvalid={!!form.errors.password}>
              <FormLabel>Senha</FormLabel>
              <PasswordInput value={form.data.password} onChange={form.handleChange("password")} placeholder="Senha" />
            </FormControl>

            <FormControl isInvalid={!!form.errors.confirmPassword}>
              <FormLabel>Confirmar senha</FormLabel>
              <PasswordInput
                value={form.data.confirmPassword}
                onChange={form.handleChange("confirmPassword")}
                placeholder="Confirmar senha"
              />
            </FormControl>
          </HStack>

          <Button isLoading={isLoading} type="submit">
            Criar conta e entrar
          </Button>
        </Stack>
      </form>

      <Center>
        <Link as={RouterLink} to="/login">
          Já tenho uma conta
        </Link>
      </Center>
    </Stack>
  );
}

export default RegisterPage;
