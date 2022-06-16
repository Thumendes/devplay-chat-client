import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { useChat } from "../logic/context";
import Message from "./Message";

const Messages = () => {
  const { newChatToggle, room, messages } = useChat();

  return (
    <Flex gap={2} h="100%" direction="column">
      {room ? (
        <>
          {messages.map((message) => (
            <Message key={message.id} item={message} />
          ))}
        </>
      ) : (
        <Center h="100%">
          <Stack>
            <Text>Entre em alguma sala para começar</Text>

            <Button onClick={newChatToggle}>Criar ou entrar em uma sala</Button>
          </Stack>
        </Center>
      )}
    </Flex>
  );
};

export default Messages;
