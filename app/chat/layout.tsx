import Link from "next/link";

import { getCurrentMatches } from "../actions/getCurrentMatches";
import { getCurrentUser } from "../actions/getCurrentUser";
import { MobileSidebar } from "../components/chat/MobileSidebar";
import { SidebarUser } from "../components/chat/SidebarUser";

export const metadata = {
  title: "AudioTIn",
  description: "find your voice",
};

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const matches = await getCurrentMatches();

  const body = (
    <>
      <h2
        className="font-semibold text-lg uppercase w-full text-center
        p-4"
      >
        Stchat messages
      </h2>

      <ul className=" overflow-y-auto overflow-x-none">
        {matches.map((match) => {
          return (
            <SidebarUser
              key={match.id}
              currentUser={currentUser}
              match={match}
            />
          );
        })}
      </ul>
    </>
  );

  return (
    <div className="relative flex w-full h-full text-[#f7ebda] ">
      <div className="md:flex bg-[#2e2e2e] hidden  flex-col grow gap-y-5 overflow-y-auto w-full max-w-xs h-full">
        {body}
      </div>
      <MobileSidebar>{body}</MobileSidebar>
      <div className=" h-full w-full ">{children}</div>
    </div>
  );
}
