import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { NAVBAR_HEIGHT } from "../../data/constants";
import ChatForm from "./components/ChatForm";
import ChatHeader from "./components/Header";
import Messages from "./components/Messages";
import NewChatModal from "./components/NewChatModal";
import UsersMenu from "./components/UsersMenu";
import ChatContextProvider from "./logic/context";

function ChatPage() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const bg = useColorModeValue("gray.50", "gray.700");
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <ChatContextProvider>
      <Grid
        templateColumns={isMobile ? "1fr" : "240px 1fr"}
        templateRows="50px 1fr 60px"
        h={`calc(100vh - ${NAVBAR_HEIGHT})`}
        gap={2}
        pb={2}
      >
        <NewChatModal />

        {isMobile ? (
          <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <UsersMenu />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        ) : (
          <GridItem overflowY="auto" p={2} bg={bg} borderRadius="lg" rowSpan={3}>
            <UsersMenu />
          </GridItem>
        )}

        <GridItem p={2} bg={bg} borderRadius="lg">
          <ChatHeader toggleActive={isMobile} toggleDrawer={onToggle} />
        </GridItem>

        <GridItem overflowY="auto" p={2} bg={bg} borderRadius="lg">
          <Messages />
        </GridItem>

        <GridItem p={2} bg={bg} borderRadius="lg">
          <ChatForm />
        </GridItem>
      </Grid>
    </ChatContextProvider>
  );
}

export default ChatPage;
