import { Box, Button, Heading, HStack, PinInput, PinInputField, Stack, Text, VStack } from "@chakra-ui/react";
import { useConfirmRegisterLogic } from "./logic";

interface ConfirmRegisterPageProps {}

const ConfirmRegisterPage = ({}: ConfirmRegisterPageProps) => {
  const { handleSubmit, form, isLoading } = useConfirmRegisterLogic();

  return (
    <Stack spacing={8}>
      <Box>
        <Heading mb={2}>Confirme seu cadastro!</Heading>
        <Text>Verifique na caixa de entrada do seu e-mail o código enviado. Copie e cole aqui!</Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <VStack spacing={10}>
          <HStack>
            <PinInput isInvalid={!!form.errors.code} onChange={form.handleChange("code")}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          <Button isLoading={isLoading} type="submit">
            Criar conta e entrar
          </Button>
        </VStack>
      </form>
    </Stack>
  );
};

export default ConfirmRegisterPage;
