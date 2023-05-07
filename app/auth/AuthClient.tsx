"use client";
import { useSearchParams } from "next/navigation";

import { getCurrentUser } from "../actions/getCurrentUser";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { LoggedIn } from "../components/auth/LoggedIn";
import { Login } from "../components/auth/Login";
import { Signup } from "../components/auth/Signup";
import { SafeUser } from "../types";

interface AuthClientProps {
  currentUser: SafeUser | null;
}

export const AuthClient: React.FC<AuthClientProps> = ({ currentUser }) => {
  const searchParams = useSearchParams();
  let search = searchParams!.get("mode");
  if (!search) {
    search = "login";
  }

  return (
    <>
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {!currentUser && (
          <>
            {" "}
            <Heading
              center
              title={search === "login" ? "Login into account" : ""}
              subtitle={search === "login" ? "Welcome back" : ""}
            />{" "}
            {search === "login" ? <Login /> : <Signup />}
          </>
        )}

        {currentUser && <LoggedIn />}
      </div>
    </>
  );
};
