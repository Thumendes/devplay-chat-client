import { Box, Button, Center, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useChat } from "../logic/context";
import Message from "./Message";

const Messages = () => {
  const { newChatToggle, room, messages, messagesEndRef, isLoadingMessages } = useChat();

  return (
    <Box h="100%">
      {isLoadingMessages ? (
        <Stack>
          {Array.from({ length: 15 }, (_, index) => (
            <Flex
              justify={Math.random() > 0.5 ? "end" : "start"}
              direction={Math.random() > 0.5 ? "row-reverse" : "row"}
              gap={2}
              align="center"
            >
              <Skeleton rounded="lg" key={index} height={46} w="50%" />
            </Flex>
          ))}
        </Stack>
      ) : room ? (
        <Stack spacing={3}>
          {messages.map((message) => (
            <Message key={message.id} item={message} />
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      ) : (
        <Center h="100%">
          <Stack>
            <Text>Entre em alguma sala para começar</Text>

            <Button onClick={newChatToggle}>Criar ou entrar em uma sala</Button>
          </Stack>
        </Center>
      )}
    </Box>
  );
};

export default Messages;
