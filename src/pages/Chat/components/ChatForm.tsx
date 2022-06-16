import { Flex, IconButton, Input } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useChat } from "../logic/context";

const ChatForm = ({}) => {
  const { sendMessage } = useChat();
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={2} h="full" align="center" justify="center">
        <Input onChange={handleChange} value={message} ringColor="primary.500" placeholder="Enviar mensagem" />
        <IconButton disabled={!message} type="submit" aria-label="Send message" icon={<FiSend />} />
      </Flex>
    </form>
  );
};

export default ChatForm;
