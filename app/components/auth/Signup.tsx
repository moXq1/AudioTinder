"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useRecorder } from "@/app/hooks/useRecorder";
import { useValidation } from "@/app/utils/validation";

import { Audio } from "../Audio";
import { Button } from "../Button";
import { Input } from "../Input";

interface SignupProps {}

export const Signup: React.FC<SignupProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { audioBlob, audioUrl, record, stop } = useRecorder();
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  const {
    emailIsValid,
    nameIsValid,
    handleEmailValidation,
    handleNameValidation,
    handlePasswordValidation,
    passwordIsValid,
    audioIsValid,
    formIsValid,
    handleFormValidation,
    confirmPasswordIsValid,
    handleConfirmPasswordValidation,
    handleAudioValidation,
  } = useValidation();

  useEffect(() => {
    handleFormValidation("signup");
  }, [
    passwordIsValid,
    nameIsValid,
    emailIsValid,
    confirmPasswordIsValid,
    audioIsValid,
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setisLoading(true);

    const formData = new FormData();
    if (audioBlob) {
      formData.append("audioFile", audioBlob, "audio.wav");

      let audioPath;
      const audioData = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      audioPath = audioData.data;

      try {
        const res = await axios.post("/api/signup", {
          data: { email, name, password, audio: audioPath },
        });

        const data = await res.data;
        console.log(data);
        if (data.error) {
          throw new Error(data.error);
        } else {
          toast.success("Account created 🤓");
          signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/",
          });
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      console.log(audioBlob);
      toast.error("Audio succ");
    }
  };

  return (
    <form
      className="flex flex-col gap-3 items-center w-full pb-8 pt-4"
      onSubmit={handleSubmit}
    >
      <Input
        id="email"
        label={"Email"}
        error={emailIsValid?.message}
        options={{ type: "email", value: email, disabled: isLoading }}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => {
          handleEmailValidation(e.target.value);
        }}
      ></Input>
      <Input
        id="name"
        label={"Name"}
        error={nameIsValid?.message}
        options={{ type: "text", value: name, disabled: isLoading }}
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) => {
          handleNameValidation(e.target.value);
        }}
      ></Input>
      <Input
        id="password"
        label={"Password"}
        options={{ type: "password", disabled: isLoading, value: password }}
        error={passwordIsValid?.message}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={(e) => {
          handlePasswordValidation(e.target.value);
        }}
      ></Input>

      <Input
        id="confirmPassword"
        label={"Confirm Password"}
        error={confirmPasswordIsValid?.message}
        options={{
          type: "password",
          disabled: isLoading,
          value: confirmPassword,
        }}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={(e) => {
          handleConfirmPasswordValidation(password, e.target.value);
        }}
      ></Input>

      <Audio
        audioUrl={audioUrl}
        record={record}
        audioValidation={(audioUrl: string | null) =>
          handleAudioValidation(audioUrl)
        }
        stop={() => {
          stop();
        }}
      ></Audio>

      <Button
        disabled={!formIsValid}
        outline
        label={"Signup"}
        onClick={() => {}}
        width=" w-2/3"
      />
      <p>
        Already have account?
        <Link className="text-blue-700 font-bold" href="/auth">
          {" "}
          login
        </Link>
      </p>
    </form>
  );
};
