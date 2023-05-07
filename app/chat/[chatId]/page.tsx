import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getMessages } from "@/app/actions/getMessages";

import { ChatClient } from "../ChatClient";

interface IParams {
  chatId?: string;
}

export default async function ChatIdPage({ params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (params.chatId) {
    const messages = await getMessages(params.chatId!);

    return (
      <>
        <ChatClient
          currentUser={currentUser}
          savedMessages={messages}
          matchId={params.chatId}
        />
      </>
    );
  }

  return <></>;
}
