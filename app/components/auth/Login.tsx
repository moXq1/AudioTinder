"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useValidation } from "@/app/utils/validation";

import { Button } from "../Button";
import { Input } from "../Input";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  const {
    emailIsValid,
    handleEmailValidation,
    handlePasswordValidation,
    passwordIsValid,
    formIsValid,
    handleFormValidation,
  } = useValidation();

  useEffect(() => {
    handleFormValidation("login");
  }, [passwordIsValid, emailIsValid, handleFormValidation]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setisLoading(true);
    signIn("credentials", {
      email,
      password,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success("Logged in");
          router.replace("/");
        }
        if (callback?.error || !callback) {
          toast.error(callback?.error || "Invalid Data");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <form
      className="flex flex-col gap-3 items-center w-full pb-8 pt-4"
      onSubmit={handleSubmit}
    >
      <Input
        id="email"
        error={emailIsValid?.message}
        label={"Email"}
        options={{ type: "email", value: email, disabled: isLoading }}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => {
          handleEmailValidation(e.target.value);
        }}
      ></Input>
      <Input
        id="password"
        error={passwordIsValid?.message}
        label={"Password"}
        options={{ type: "password", value: password, disabled: isLoading }}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={(e) => {
          handlePasswordValidation(e.target.value);
        }}
      ></Input>
      <Button
        disabled={!formIsValid}
        outline
        label={"Login"}
        onClick={() => {}}
        width=" w-2/3"
      />
      <p>
        Dont have account?{" "}
        <Link className="text-blue-700 font-bold" href="/auth?mode=signup">
          {" "}
          sign up
        </Link>
      </p>
    </form>
  );
};
