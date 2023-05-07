"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useRef, useState } from "react";
import { AiOutlinePause } from "react-icons/ai";
import { FiTriangle } from "react-icons/fi";

import { MatchWithUsers } from "@/app/chat/ChatClient";
import { SafeUser } from "@/app/types";

interface SidebarUserProps {
  currentUser: SafeUser | null;
  match: MatchWithUsers;
}

export const SidebarUser: React.FC<SidebarUserProps> = ({
  currentUser,
  match,
}) => {
  const segment = useSelectedLayoutSegment();

  return (
    <li className="w-full ">
      <Link
        href={`chat/${match.id}`}
        className={`flex flex-row font-semibold items-center justify-start gap-4 p-4   cursor-pointer ${
          segment ? "bg-[#00aeef] text-white" : "bg-neutral-500"
        }`}
      >
        <AudioPlayer
          url={
            currentUser?.id === match.userAId
              ? match.userB.audioUrl
              : match.userA.audioUrl
          }
        />

        <span>
          {currentUser?.id === match.userAId
            ? match.userB.name
            : match.userA.name}
        </span>
      </Link>
    </li>
  );
};

function AudioPlayer({ url }: { url: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayStopPlayer = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    e.nativeEvent.stopImmediatePropagation();
    if (audioRef.current) {
      audioRef.current.volume = 1;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <div
        className="relative w-12 h-12 text-[#2e2e2e] rounded-full bg-[#f7ebda] flex items-center justify-center "
        onClick={handlePlayStopPlayer}
      >
        {isPlaying ? (
          <AiOutlinePause size={25} />
        ) : (
          <FiTriangle size={25} className=" rotate-90" />
        )}
      </div>
      <audio
        onEnded={() => {
          setIsPlaying(false);
          audioRef.current!.currentTime = 0;
        }}
        className=" hidden"
        ref={audioRef}
        src={`/audio/${url}`}
        controls
      ></audio>
    </>
  );
}
