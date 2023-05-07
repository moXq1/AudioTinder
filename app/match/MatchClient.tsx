"use client";

import { useEffect, useState } from "react";

import { getCurrentUser } from "../actions/getCurrentUser";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { UserCard } from "../components/UserCard";
import { SafeUser } from "../types";

interface MatchClientProps {
  currentUser: SafeUser | null;
  people: SafeUser[] | [];
}

export const MatchClient: React.FC<MatchClientProps> = ({
  currentUser,
  people,
}) => {
  const [nextCard, setNextCard] = useState<number>(0);

  const handleNextCard = () => {
    setNextCard((prev) => prev + 1);
  };

  useEffect(() => {});

  return (
    <Container>
      <div className=" box-border md:w-[400px] mx-auto border-[2px] rounded-lg px-4 md:px-6 py-4 translate duration-300 ">
        <div className="w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto ">
          <Heading title={"Match"} subtitle={"Hear new people"} center />

          {people.length === 0 ||
            (nextCard >= people.length && (
              <p className=" text-3xl mx-auto text-center">
                No more people available
              </p>
            ))}

          {people.length > 0 && people[nextCard] && (
            <UserCard
              handleNextCard={handleNextCard}
              key={people[nextCard].id}
              currentUser={currentUser}
              user={people[nextCard]}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

// className={`  h-full ${
//   showModal ? "translate-y-0" : "translate-y-full"
// } ${showModal ? " opacity-100" : "opacity-0"}`}
