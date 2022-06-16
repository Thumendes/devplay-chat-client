import { useDisclosure, useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, User } from "../../../contexts/auth";
import { api } from "../../../services/api";
import { ws } from "../../../services/ws";

export interface Room {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  user: User;
  content: string;
  id: number;
  userId: number;
  roomId: number;
  createdAt: string;
}

export type WithOwn<T> = T & { own: boolean };

interface ChatContextType {
  newChatToggle(): void;
  joinRoom(code: string): void;
  leaveRoom(): void;
  sendMessage(message: string): Promise<void> | undefined;
  newChatOpen: boolean;
  room: Room | null;
  messages: WithOwn<Message>[];
  rooms: Room[];
  isLoading: boolean;
  getUserMenu(): Promise<Room[]>;
}

interface ChatContextProps {
  children: React.ReactNode;
}

const ChatContext = createContext({} as ChatContextType);

export const useChat = () => useContext(ChatContext);

const ChatLog = (...args: any[]) => console.log("[Chat]", ...args);

const ChatContextProvider = ({ children }: ChatContextProps) => {
  const newChatDisclosure = useDisclosure();
  const params = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<WithOwn<Message>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  function parseMessage(message: Message[], user: User): WithOwn<Message>[];
  function parseMessage(message: Message, user: User): WithOwn<Message>;
  function parseMessage(message: Message | Message[], user: User): WithOwn<Message>[] | WithOwn<Message> {
    if (Array.isArray(message)) {
      return message.map((message) => parseMessage(message, user));
    }

    const parsedMessage: WithOwn<Message> = { ...message, own: message.userId === user.id };
    return parsedMessage;
  }

  const getRoomMessages = useCallback(
    async (roomCode: string) => {
      if (!user) return;

      setIsLoading(true);
      const { data } = await api.get(`/rooms/${roomCode}/messages`);
      setIsLoading(false);

      const chatMessages = parseMessage(data, user);
      setMessages(chatMessages);

      return data;
    },
    [user]
  );

  const getUserMenu = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    const { data } = await api.get(`/users/${user.id}/rooms`);
    setIsLoading(false);

    setRooms(data);

    return data;
  }, [user]);

  const joinRoom = useCallback(
    (room: string) => {
      ChatLog("joinRoom", room);
      return new Promise<void>((resolve) => {
        ws.send("join-room", { user, room }, (response: { error?: string; room?: Room }) => {
          if (response.error) {
            console.error(response.error);
            navigate("/");
          }

          if (response.room) {
            setRoom(response.room);
          }

          resolve();
        });
      });
    },
    [user]
  );

  const leaveRoom = useCallback(() => {
    if (!room) return;

    return new Promise<void>((resolve) => {
      ws.send("leave-room", { user, room: room.code }, (response: { error?: string }) => {
        if (response.error) {
          console.error(response.error);
        }

        setRoom(null);
        resolve();
      });
    });
  }, [user, room]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!room || !user) return;

      return new Promise<void>((resolve) => {
        ws.send("send-message", { user: user.id, room: room.code, message }, (response: { message: Message }) => {
          if (response.message) {
            const parsedMessage = parseMessage(response.message, user);
            setMessages((messages) => [...messages, parsedMessage]);
          }

          resolve();
        });
      });
    },
    [user, room]
  );

  const onReceiveMessage = useCallback(
    (data: Message) => {
      ChatLog("Receive Message", data);
      if (!room || !user) return;

      if (data.roomId !== room.id) return;

      const parsedMessage = parseMessage(data, user);

      setMessages((messages) => [...messages, parsedMessage]);
    },
    [user, room]
  );

  const onUserJoined = useCallback(
    (data: User) => {
      if (!room || !user) return;

      ChatLog("User Joined", data);
    },
    [user, room]
  );

  // Roda quando mudar de rota
  useEffect(() => {
    // Se ao mudar de rota, tiver o código de uma sala
    if (params.id) {
      // Se o usuário já está nessa sala
      if (room && room.code === params.id) return;

      // Se o usuário não está, então entra
      joinRoom(params.id);
    }
  }, [params, room]);

  // Roda a sala ou o usuário mudar
  useEffect(() => {
    if (!user || !room) return;

    ws.on("user-joined", onUserJoined);
    ws.on("receive-message", onReceiveMessage);

    ChatLog("Get messages from", room);
    getRoomMessages(room.code);

    return () => {
      ws.off("user-joined");
      ws.off("receive-message");
    };
  }, [user, room]);

  // Roda uma única vez
  useEffect(() => {
    getUserMenu();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        newChatOpen: newChatDisclosure.isOpen,
        newChatToggle: newChatDisclosure.onToggle,
        getUserMenu,
        joinRoom,
        room,
        messages,
        leaveRoom,
        isLoading,
        sendMessage,
        rooms,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
