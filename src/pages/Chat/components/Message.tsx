import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { getHoursFromDate } from "../../../utils/general";
import { Message as MessageType, WithOwn } from "../logic/context";

interface MessageProps {
  item: WithOwn<MessageType>;
}

const Message = ({ item }: MessageProps) => {
  const bgOwn = useColorModeValue("white", "gray.600");
  const bgNotOwn = useColorModeValue("secondary.300", "secondary.400");
  const lightColor = useColorModeValue("gray.500", "gray.300");

  return (
    <Flex justify={item.own ? "end" : "start"} direction={item.own ? "row-reverse" : "row"} gap={2} align="center">
      <Avatar src={item.user.avatar} size="sm" shadow="lg" />

      <Box>
        <Flex direction={item.own ? "row-reverse" : "row"} justify="space-between">
          <Text fontWeight="bold">{item.user.name}</Text>
          <Text fontSize="sm" color={lightColor}>
            {getHoursFromDate(item.createdAt)}
          </Text>
        </Flex>

        <Box py={2} px={4} borderRadius="lg" minW={[200, 300]} bg={item.own ? bgNotOwn : bgOwn} shadow="md">
          <Text>{item.content}</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Message;
