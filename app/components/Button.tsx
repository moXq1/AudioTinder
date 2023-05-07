"use client";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  width?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  outline,
  small,
  width = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 
      rounded-lg box-border
      disabled:cursor-not-allowed  transition  ${
        outline ? "bg-white" : " bg-rose-500"
      } 
      ${outline ? " hover:bg-rose-500" : "hover:opacity-80"}
      ${outline ? "border-black" : " border-rose-500"} 
      ${outline ? "text-black" : " text-white"} 
      ${small ? "py-1" : " py-3"} 
      ${small ? "px-2" : " px-4"} 
      ${small ? "text-sm" : " text-md"} 
      ${small ? "font-light" : " font-semibold"} 
      ${small ? "border-[1px]" : " border-2"} 
      ${width} 
     `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3"></Icon>}
      {label}
    </button>
  );
};
