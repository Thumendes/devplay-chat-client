import {
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiHash, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useChat } from "../logic/context";

const UsersMenu = () => {
  const { room: currentRoom, rooms } = useChat();
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap={4}>
      <Flex>
        <form>
          <InputGroup>
            <Input placeholder="Pesquisar" />

            <InputRightElement>
              <IconButton variant="ghost" size="sm" aria-label="Search users" icon={<FiSearch />} />
            </InputRightElement>
          </InputGroup>
        </form>
      </Flex>

      <Divider />

      <List spacing={2}>
        {rooms.length ? (
          rooms.map((room, i) => {
            const isCurrentRoom = currentRoom ? currentRoom.code === room.code : false;

            return (
              <ListItem
                key={i}
                bg={isCurrentRoom ? "secondary.500" : "secondary.400"}
                color="white"
                _hover={{ bg: "secondary.500" }}
                p={2}
                borderRadius="lg"
                onClick={() => navigate(`/${room.code}`)}
              >
                <Stack spacing={0}>
                  <Text fontWeight={isCurrentRoom ? "bold" : "normal"} fontSize={18}>
                    {room.name}
                  </Text>
                  <HStack spacing={1}>
                    <FiHash />
                    <Text fontSize={14}>{room.code}</Text>
                  </HStack>
                </Stack>
              </ListItem>
            );
          })
        ) : (
          <Text textAlign="center">Não há nenhuma sala!</Text>
        )}
      </List>
    </Flex>
  );
};

export default UsersMenu;
