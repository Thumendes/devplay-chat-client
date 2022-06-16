import { useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { Storage } from "../utils/storage";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  signIn(user: SignInPayload): Promise<boolean>;
  signOut(): Promise<void>;
  setData(user: User, token: string): Promise<void>;
  getUser(): Promise<User | void>;
  isLoading: boolean;
}

interface AuthContextProps {
  children: React.ReactNode;
}

interface SignInPayload {
  email: string;
  password: string;
}

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  async function signIn(user: SignInPayload) {
    setIsLoading(true);
    const { data: response } = await api
      .post("/users/login", { email: user.email, password: user.password })
      .catch((error) => {
        return { data: error.response ? error.response.data : {} };
      });
    setIsLoading(false);

    if (response.token) {
      setData(response.user, response.token);

      toast({
        title: "Login realizado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      return true;
    }

    if (response.error) {
      toast({
        title: response.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    return false;
  }

  async function setData(user: User, token: string) {
    setUser(user);
    Storage.set("token", token);
  }

  async function signOut() {
    setUser(null);
    Storage.remove("token");
  }

  async function getUser() {
    const token = Storage.get("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data: response } = await api.get("/users/me").catch((error) => {
      return { data: error.response ? error.response.data : {} };
    });
    setIsLoading(false);

    if (!response || response.error) {
      signOut();
      return;
    }

    if (response.user) {
      setUser(response.user);
    }

    return response.user;
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        signIn,
        signOut,
        setData,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
