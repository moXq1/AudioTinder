"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { SafeUser } from "../types";

import { Container } from "./Container";

interface NavProps {
  currentUser?: SafeUser | null;
}

export const Nav: React.FC<NavProps> = ({ currentUser }) => {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link href="/">
              <div className=" p-3  text-2xl text-sky-200 font-bold bg-gradient-to-br from-pink-500 to-lime-500 flex items-center justify-center">
                St
              </div>
            </Link>
            <div className="flex gap-4">
              {currentUser ? (
                <>
                  <div className="flex gap-4">
                    <Link
                      className="font-semibold hover:text-rose-500 transition"
                      href="/chat"
                    >
                      Chat
                    </Link>

                    <Link
                      className="font-semibold hover:text-rose-500 transition"
                      href="/match"
                    >
                      Match
                    </Link>
                  </div>

                  <button
                    className="font-semibold hover:text-rose-500 transition"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth">Sign In</Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};
