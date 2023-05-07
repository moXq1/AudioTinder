import { User, Message } from "@prisma/client";

export type SafeUser = Omit<User, "created_at" | "updated_at"> & {
  created_at: string;
  updated_at: string;
};

export type SafeMessage = Omit<Message, "created_at" | "updated_at"> & {
  created_at: string;
  updated_at: string;
};

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
