"use client";

import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface MobileSidebarProps {
  children: React.ReactElement;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex  bg-[#eaeaea]">
      {isOpen ? (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className=" absolute z-20 bg-black/50 w-full h-full cursor-pointer"
          ></div>
          <div
            className={`transition absolute z-30 bg-[#2e2e2e]  flex-col grow gap-y-5 overflow-y-auto w-full max-w-xs  translate  duration-1000  h-full ${
              isOpen ? " translate-x-0" : " -translate-x-full"
            } ${isOpen ? " opacity-100" : "opacity-0"}`}
          >
            {children}
          </div>
        </>
      ) : (
        <div
          className="p-1"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <GiHamburgerMenu
            size={32}
            color="black"
            className=" cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
