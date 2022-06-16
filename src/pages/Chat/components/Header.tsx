import { Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import { FiHash, FiMenu, FiPlus } from "react-icons/fi";
import { useChat } from "../logic/context";

interface ChatHeaderProps {
  toggleDrawer: () => void;
  toggleActive: boolean;
}

const ChatHeader = ({ toggleDrawer, toggleActive }: ChatHeaderProps) => {
  const { newChatToggle, room } = useChat();

  return (
    <Flex h="full" justify="space-between" align="center">
      <Flex align="center" gap={2}>
        <FiHash />

        <Heading size="md">{room ? room.name : "Chat App"}</Heading>
      </Flex>

      <HStack>
        <IconButton onClick={newChatToggle} aria-label="Nova conversa" icon={<FiPlus />} />

        {toggleActive && <IconButton icon={<FiMenu />} aria-label="Toggle drawer" onClick={toggleDrawer} />}
      </HStack>
    </Flex>
  );
};

export default ChatHeader;
