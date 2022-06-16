import {
  Avatar,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  Button,
  useColorMode,
  Skeleton,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp, FiMoon, FiPlay, FiPlus, FiSun } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { NAVBAR_HEIGHT } from "../../data/constants";
import PrivateRoute from "../Private";

const AppLayout = () => {
  const { signOut, user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <PrivateRoute>
      <Container maxW="container.xl">
        <Flex height={NAVBAR_HEIGHT} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Image w={120} src="/logo.png" />
          </Flex>
          <Flex gap={2}>
            <IconButton
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            />

            {user ? (
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton as={Button} rightIcon={isOpen ? <FiChevronUp /> : <FiChevronDown />}>
                      Menu
                    </MenuButton>

                    <MenuList>
                      <Flex px={4} gap={2} alignItems="center">
                        <Avatar src={user.avatar} size="sm" />
                        <Text>{user.name}</Text>
                      </Flex>
                      <MenuDivider />
                      <MenuItem as={Link} to="/profile">
                        Editar Perfil
                      </MenuItem>
                      <MenuItem onClick={signOut}>Sair</MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            ) : (
              <Skeleton />
            )}
          </Flex>
        </Flex>

        {/* Content */}
        <Outlet />
      </Container>
    </PrivateRoute>
  );
};

export default AppLayout;
