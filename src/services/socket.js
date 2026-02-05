import { io } from "socket.io-client";
import { SOCKET_URL } from "./env";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;
