import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  Link,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/ui/PasswordInput";
import { useProfileLogic } from "./logic";

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  const { fileInputRef, handleAvatarSelected, user, userForm, passwordForm, handlePasswordUpdated, handleUserUpdated } =
    useProfileLogic();
  const navigate = useNavigate();
  const cardBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Stack>
      <Link onClick={() => navigate(-1)}>
        <HStack>
          <FiArrowLeft />
          <Text>Voltar</Text>
        </HStack>
      </Link>

      <Heading>Perfil</Heading>

      <Box rounded="lg" bg={cardBg}>
        {user ? (
          <Tabs>
            <TabList>
              <Tab>Editar perfil</Tab>
              <Tab>Alterar senha</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={[4, 10]}>
                <form onSubmit={handleUserUpdated}>
                  <Stack spacing={6}>
                    <HStack spacing={4}>
                      <Avatar src={user.avatar} />
                      <Stack align="start">
                        <Heading size="md">{user.name}</Heading>

                        <Button variant="link" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                          Alterar foto do perfil
                        </Button>
                      </Stack>
                    </HStack>

                    <Input hidden type="file" name="avatar" ref={fileInputRef} onChange={handleAvatarSelected} />

                    <FormControl>
                      <FormLabel>Nome</FormLabel>
                      <Input value={userForm.data.name} onChange={userForm.handleChange("name")} placeholder="Nome" />
                    </FormControl>

                    <FormControl isDisabled>
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        value={userForm.data.email}
                        onChange={userForm.handleChange("email")}
                        placeholder="E-mail"
                      />
                    </FormControl>

                    <Flex>
                      <Button type="submit">Salvar</Button>
                    </Flex>
                  </Stack>
                </form>
              </TabPanel>

              <TabPanel p={[4, 10]}>
                <form onSubmit={handlePasswordUpdated}>
                  <Stack spacing={6}>
                    <HStack spacing={4}>
                      <Avatar src={user.avatar} />
                      <Heading size="md">{user.name}</Heading>
                    </HStack>

                    <FormControl isInvalid={!!passwordForm.errors.oldPassword}>
                      <FormLabel>Senha antiga</FormLabel>
                      <PasswordInput
                        value={passwordForm.data.oldPassword}
                        onChange={passwordForm.handleChange("oldPassword")}
                        placeholder="Senha antiga"
                      />
                    </FormControl>

                    <FormControl isInvalid={!!passwordForm.errors.newPassword}>
                      <FormLabel>Nova senha</FormLabel>
                      <PasswordInput
                        value={passwordForm.data.newPassword}
                        onChange={passwordForm.handleChange("newPassword")}
                        placeholder="Nova senha"
                      />
                    </FormControl>

                    <FormControl isInvalid={!!passwordForm.errors.confirmPassword}>
                      <FormLabel>Confirmar nova senha</FormLabel>
                      <PasswordInput
                        value={passwordForm.data.confirmPassword}
                        onChange={passwordForm.handleChange("confirmPassword")}
                        placeholder="Confirmar nova senha"
                      />
                    </FormControl>

                    <Flex direction={["column", "row"]} textAlign="center" gap={4} justify="space-between">
                      <Button type="submit">Alterar senha</Button>
                      <Link as={RouterLink} to="/forget-password">
                        Esqueceu sua senha?
                      </Link>
                    </Flex>
                  </Stack>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Skeleton />
        )}
      </Box>
    </Stack>
  );
};

export default ProfilePage;
