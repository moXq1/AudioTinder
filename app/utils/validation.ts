"use client";

import { useState } from "react";

type Valid = {
  message: string;
  valid: boolean;
};

export function useValidation() {
  const [passwordIsValid, setPasswordIsValid] = useState<Valid>({} as Valid);
  const [nameIsValid, setNameIsValid] = useState<Valid>({} as Valid);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState<Valid>(
    {} as Valid
  );
  const [emailIsValid, setEmailIsValid] = useState<Valid>({} as Valid);
  const [audioIsValid, setAudioIsValid] = useState<Valid>({} as Valid);
  const [formIsValid, setFormIsValid] = useState(false);

  function handleFormValidation(type: "login" | "signup") {
    if (type === "login") {
      setFormIsValid(emailIsValid?.valid && passwordIsValid?.valid);
    } else {
      setFormIsValid(
        emailIsValid?.valid &&
          nameIsValid?.valid &&
          passwordIsValid?.valid &&
          confirmPasswordIsValid?.valid &&
          audioIsValid?.valid
      );
    }
  }

  function handlePasswordValidation(password: string) {
    setPasswordIsValid(passwordValidation(password));
  }

  function handleEmailValidation(email: string) {
    setEmailIsValid(emailValidation(email));
  }
  function handleNameValidation(name: string) {
    setNameIsValid(nameValidation(name));
  }

  function handleConfirmPasswordValidation(
    password: string,
    confirmPassword: string
  ) {
    setConfirmPasswordIsValid(
      confirmPasswordValidation(password, confirmPassword)
    );
  }

  function handleAudioValidation(audio: any) {
    setAudioIsValid(audioValidation(audio));
  }

  return {
    passwordIsValid,
    emailIsValid,
    nameIsValid,
    formIsValid,
    audioIsValid,
    confirmPasswordIsValid,
    handlePasswordValidation,
    handleEmailValidation,
    handleNameValidation,
    handleFormValidation,
    handleConfirmPasswordValidation,
    handleAudioValidation,
  };
}

function emailValidation(email: string) {
  return /^[A-Z0-9_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ? { message: "", valid: true }
    : { message: "Invalid email", valid: false };
}
function nameValidation(name: string) {
  return name.length >= 3
    ? { message: "", valid: true }
    : { message: "Invalid email", valid: false };
}

function passwordValidation(password: string) {
  return password.length >= 8
    ? { message: "", valid: true }
    : { message: "Invalid password", valid: false };
}

function confirmPasswordValidation(password: string, confirmPassword: string) {
  return password === confirmPassword
    ? { message: "", valid: true }
    : { message: "Invalid password", valid: false };
}

function audioValidation(audio: any) {
  return audio
    ? { message: "", valid: true }
    : { message: "Record Audio", valid: false };
}
