import { Heading, Container, Center } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Container>
        <Center h="100vh">
          <Heading>Carregando</Heading>
        </Center>
      </Container>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
