import axios from "axios";
import Link from "next/link";

import { getCurrentUser } from "./actions/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser();

  // console.log(res);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user && (
        <div className="flex gap-4 font-semibold text-lg">
          <Link href={"/match"}>
            <div className=" bg-[#013D6A] text-[#f7ebda]  px-6 py-4 rounded-lg hover:bg-opacity-70 transition">
              Find a match
            </div>
          </Link>
          <Link href={"/chat"}>
            <div className=" bg-lime-500 px-6 py-4 rounded-lg hover:bg-opacity-70 transition">
              Start Chatting
            </div>
          </Link>
        </div>
      )}
    </main>
  );
}
