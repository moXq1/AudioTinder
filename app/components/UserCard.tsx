"use client";

import { SafeUser } from "../types";

import { HeartButton } from "./HeartButton";

interface UserCardProps {
  handleNextCard: () => void;
  user: SafeUser;
  currentUser: SafeUser | null;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  currentUser,
  handleNextCard,
}) => {
  return (
    <div className=" items-center  flex flex-col  w-full">
      <div className="my-4">
        <audio className="" src={`audio/${user.audioUrl}`} controls></audio>
      </div>

      <div className="w-full flex flex-row items-center justify-evenly md:gap-6 gap-3">
        <HeartButton
          handleNextCard={handleNextCard}
          mode="dislike"
          currentUser={currentUser}
          likeId={user.id}
        />{" "}
        <HeartButton
          handleNextCard={handleNextCard}
          mode="like"
          currentUser={currentUser}
          likeId={user.id}
        />
      </div>
    </div>
  );
};
