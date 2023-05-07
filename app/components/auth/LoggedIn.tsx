"use client";

import { useRouter } from "next/navigation";

import { Button } from "../Button";
import { Heading } from "../Heading";

interface LoggedInProps {}

export const LoggedIn: React.FC<LoggedInProps> = ({}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 items-center w-full pb-8 pt-4">
      <Heading center title={"you already logged in 😠"} subtitle={"🤥🤫🫢🫣"} />
      <p></p>
      <Button
        outline
        label="Return to main page"
        onClick={() => router.replace("/")}
      />
    </div>
  );
};
