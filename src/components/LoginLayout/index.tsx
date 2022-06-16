import {
  Box,
  Center,
  Container,
  Grid,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

interface LoginLayoutProps {}

const LoginLayout = ({}: LoginLayoutProps) => {
  const bgCard = useColorModeValue("gray.100", "gray.700");

  return (
    <Container>
      <Grid
        h="100vh"
        templateRows={["140px 1fr 80px", "200px 1fr 100px"]}
        alignItems="center"
      >
        <Center>
          <Image w={150} src="/logo.png" />
        </Center>

        <Box
          w="full"
          bg={bgCard}
          p={8}
          py={10}
          borderRadius="lg"
          alignSelf="start"
        >
          <Outlet />
        </Box>

        <Box p={6} textAlign="center">
          <Text>@thumendess - DevPlay</Text>
        </Box>
      </Grid>
    </Container>
  );
};

export default LoginLayout;
