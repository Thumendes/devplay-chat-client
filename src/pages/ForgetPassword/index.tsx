import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useForgetPasswordLogic } from "./logic";

function ForgetPasswordPage() {
  const { handleSubmit, form, isLoading } = useForgetPasswordLogic();

  return (
    <Stack spacing={8}>
      <Box>
        <Heading mb={2}>Esqueci minha senha</Heading>
        <Text>Preencha seu e-mail. Caso o e-mail esteja cadastrado será enviado um código de confirmação</Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input onChange={form.handleChange("email")} value={form.data.email} type="email" placeholder="E-mail" />
          </FormControl>

          <Button type="submit" isLoading={isLoading}>
            Enviar código
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

export default ForgetPasswordPage;
