"use client";
import React, { ChangeEvent, FocusEvent } from "react";

type InputType = "text" | "password" | "email";

interface InputProps {
  label?: string;
  styles?: string;
  error?: string;
  id: string;
  options: {
    type: InputType;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    autocomplete?: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  options,
  onChange,
  onBlur,
  styles,
  error,
  id,
}) => {
  return (
    <div className={`${styles} relative w-full flex flex-col `}>
      {/* {label && <label htmlFor="">{label}</label>} */}
      {/* {error && <span className=" text-red-700">{error}</span>} */}
      <input
        id={id}
        placeholder=" "
        className={`
        peer w-full  p-4 pt-6 font-semibold bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${error ? "border-rose-500" : "border-neutral-300"}
        ${error ? "focus:border-rose-500" : "focus:border-black"}
        `}
        {...options}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label
        htmlFor={id}
        className={`
      absolute text-md duration-150 transform -translate-y-3
      top-5 left-4 origin-[0]  peer-placeholder-shown:scale-100
       peer-placeholder-shown:translate-y-0
       peer-focus:scale-75
       peer-focus:-translate-y-4
       ${error ? "text-rose-500" : "text-zinc-300"}
      `}
      >
        {label}
      </label>
    </div>
  );
};
