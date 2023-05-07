import { getCurrentMatches } from "../actions/getCurrentMatches";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getMessages } from "../actions/getMessages";
import { getPeople } from "../actions/getPeople";

import { ChatClient } from "./ChatClient";

export default async function ChatPage() {
  const currentUser = await getCurrentUser();
  const matches = await getCurrentMatches();

  return <div className=" text-slate-950">Chat</div>;
}
