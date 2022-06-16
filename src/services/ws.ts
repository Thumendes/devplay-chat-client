import { useEffect } from "react";
import io from "socket.io-client";

type Callback = (...args: any[]) => void | Promise<void>;

function Ws() {
  const socket = io(import.meta.env.VITE_API_URL);
  const events = new Map();

  socket.onAny((eventName, ...args) => {
    console.log("[WebSocket] Recebi um evento", eventName, args);
    if (!events.has(eventName)) return;
    const callback = events.get(eventName);
    callback(...args);
  });

  function on(event: string, callback: Callback) {
    if (events.has(event)) throw new Error("Já existe listener para esse evento!");
    events.set(event, callback);

    return () => {
      off(event);
    };
  }

  function off(event: string) {
    events.delete(event);
  }

  function send(event: string, ...args: any[]) {
    socket.emit(event, ...args);
  }

  return { on, off, send };
}

export const ws = Ws();
