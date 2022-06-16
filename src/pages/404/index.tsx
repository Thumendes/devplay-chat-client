import { Center, Container, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface NotFoundPageProps {}

const NotFoundPage = ({}: NotFoundPageProps) => {
  return (
    <Container>
      <Center flexDirection="column" gap={4} h="100vh">
        <Heading>Página não encontrada</Heading>
        <Link as={RouterLink} to="/">
          Voltar para o início
        </Link>
      </Center>
    </Container>
  );
};

export default NotFoundPage;
