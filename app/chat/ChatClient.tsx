"use client";

import { Match } from "@prisma/client";
import axios from "axios";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { io, Socket } from "socket.io-client";

import { Input } from "../components/Input";
import { Message } from "../components/chat/Message";
import { SafeMessage, SafeUser } from "../types";

export type MatchWithUsers = Match & { userA: SafeUser } & {
  userB: SafeUser;
};

interface ChatClientProps {
  currentUser: SafeUser | null;
  savedMessages: SafeMessage[];
  matchId?: string;
}

let socket: Socket;

export const ChatClient: React.FC<ChatClientProps> = ({
  currentUser,
  savedMessages,
  matchId,
}) => {
  const [message, setMessage] = useState("");

  const [allMessages, setAllMessages] = useState<any | []>([]);

  const scrollDownRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (matchId) {
      socketInit();

      if (scrollDownRef.current) {
        scrollDownRef.current.scrollTo(0, scrollDownRef.current.scrollHeight);
      }

      return () => {
        socket.disconnect();
      };
    }
  }, [matchId, allMessages]);

  if (!matchId) {
    return (
      <>
        <p>Choose Chat</p>
      </>
    );
  }

  async function socketInit() {
    await fetch("/api/socket");

    socket = io();

    socket.emit("create", matchId);

    socket.on("receive-message", (data) => {
      console.log(data);
      setAllMessages((pre: any) => [...pre, data]);
    });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") {
      return;
    }

    socket.emit("send-message", {
      sender_id: currentUser?.id,
      content: message,
    });

    axios
      .post("/api/message", {
        message: {
          content: message,
          match_id: matchId,
          sender_id: currentUser?.id,
        },
      })
      .then((res) => {
        console.log(res);
        setMessage("");
      })
      .catch((e) => {
        toast.error("Failed To save Message");
      });
  };

  // if (!search) {
  //   search = "login";
  // }

  return (
    <div className=" bg-[#eaeaea] flex flex-col h-full box-border">
      <div
        ref={scrollDownRef}
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-1 overflow-y-auto overflow-x-none py-2 px-4"
      >
        {savedMessages.length === 0 && allMessages.length === 0 && (
          <p>Currently This chat is empty</p>
        )}

        {savedMessages.length > 0 && (
          <Message messages={savedMessages} currentUser={currentUser} />
        )}
        {allMessages.length > 0 && (
          <Message messages={allMessages} currentUser={currentUser} />
        )}
      </div>
      <form onSubmit={handleSubmit} className="text-black">
        <Input
          id={"message"}
          options={{
            type: "text",
            value: message,
            autocomplete: "off",
            placeholder: "",
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
