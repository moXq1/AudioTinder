import { SafeMessage, SafeUser } from "@/app/types";

type SMessage = {
  content: string;
  sender_id: string;
};

interface MessageProps {
  messages: SafeMessage[] | SMessage[];
  currentUser: SafeUser | null;
}

export const Message: React.FC<MessageProps> = ({ messages, currentUser }) => {
  function oneStyle(
    arr: SafeMessage[] | SMessage[],
    i: number,
    id: string,
    side: "right" | "left"
  ) {
    if (arr[i - 1] && arr[i + 1]) {
      if (
        arr[i - 1].sender_id === id &&
        arr[i].sender_id === id &&
        arr[i + 1].sender_id === id
      ) {
        ///middle rounded
        return " rounded-lg";
      }
    }

    if (!arr[i - 1] || arr[i - 1].sender_id !== id) {
      ///rounded top

      return side === "right" ? "rounded-tl-lg" : "rounded-tr-lg";
    }
    if (!arr[i + 1] || arr[i + 1].sender_id !== id) {
      ///rounded top
      return side === "right" ? "rounded-bl-lg" : "rounded-br-lg";
    }
  }

  function body(msg: SafeMessage | SMessage) {
    if ((msg as SafeMessage).created_at !== undefined) {
      const date = new Date((msg as SafeMessage).created_at);
      return `${date.getHours()}:${date.getMinutes()}`;
    } else {
      return "";
    }
  }

  return (
    <>
      {messages.map((msg, i) => {
        return (
          <div
            className={`w-1/2 relative px-4 py-2 mb-4 font-semibold
        ${
          msg.sender_id === currentUser?.id
            ? oneStyle(messages, i, msg.sender_id, "right")
            : oneStyle(messages, i, msg.sender_id, "left")
        }
${
  msg.sender_id === currentUser?.id
    ? " bg-sky-500 text-white ml-auto"
    : " bg-white text-[#333] mr-auto"
}
        
        `}
            key={crypto.randomUUID()}
          >
            {msg.content}
            <span className="absolute  bottom-1 right-1 text-xs opacity-70">
              {body(msg)}
            </span>
          </div>
        );
      })}
    </>
  );
};
