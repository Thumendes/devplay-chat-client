import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { useNewChatModalLogic } from "../logic/newChatModal";

interface NewChatModalProps {}

const NewChatModal = ({}: NewChatModalProps) => {
  const { handleCreateRoom, handleJoinRoom, newChatOpen, newChatToggle, form, isLoadingCreate, isLoadingJoin } =
    useNewChatModalLogic();

  const textSoftColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Modal isCentered isOpen={newChatOpen} onClose={newChatToggle}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Criar ou entrar em uma sala</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={10}>
            <form onSubmit={handleCreateRoom}>
              <Text color={textSoftColor}>Crie uma nova sala e adicione amigos com o código para trocar uma ideia</Text>

              <FormControl isInvalid={!!form.errors.name}>
                <FormLabel>Nome da sala</FormLabel>
                <HStack>
                  <Input onChange={form.handleChange("name")} placeholder="Nome da sala" value={form.data.name} />
                  <IconButton isLoading={isLoadingCreate} type="submit" aria-label="" icon={<FiArrowRight />} />
                </HStack>
              </FormControl>
            </form>

            {/* <Divider /> */}

            <form onSubmit={handleJoinRoom}>
              <Text color={textSoftColor}>Se quer entrar em uma sala já existente, copie e cole o código aqui</Text>

              <FormControl isInvalid={!!form.errors.code}>
                <FormLabel>Número da sala</FormLabel>
                <HStack>
                  <Input
                    onChange={form.handleChange("code")}
                    placeholder="Número para entrar na sala"
                    value={form.data.code}
                  />
                  <IconButton isLoading={isLoadingJoin} type="submit" aria-label="" icon={<FiArrowRight />} />
                </HStack>
              </FormControl>
            </form>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={newChatToggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewChatModal;
