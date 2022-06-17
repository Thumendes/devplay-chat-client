import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PasswordInput from "../../components/ui/PasswordInput";
import { useLoginLogic } from "./logic";

function LoginPage() {
  const { form, handleSubmit, isLoading } = useLoginLogic();

  return (
    <Stack spacing={8}>
      <Box>
        <Heading mb={2}>Fazer Login</Heading>
        <Text>Preencha os campos abaixo para entrar no Chat</Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input onChange={form.handleChange("email")} value={form.data.email} type="email" placeholder="E-mail" />
          </FormControl>

          <FormControl>
            <FormLabel>Senha</FormLabel>
            <PasswordInput onChange={form.handleChange("password")} value={form.data.password} placeholder="Senha" />
          </FormControl>

          <Flex justify="end">
            <Link as={RouterLink} to="/forget-password">
              Esqueci minha senha
            </Link>
          </Flex>

          <Button isLoading={isLoading} type="submit">
            Fazer Login
          </Button>
        </Stack>
      </form>

      <Center>
        <Link as={RouterLink} to="/register">
          Ainda não possuo uma conta
        </Link>
      </Center>
    </Stack>
  );
}

export default LoginPage;
