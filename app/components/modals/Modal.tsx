"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { Button } from "../Button";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  actionLabel,
  isOpen,
  handleClose,
  handleSubmit,
  body,
  disabled,
  footer,
  secondaryAction,
  secondaryActionLabel,
  title,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const close = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => handleClose(), 300);
  }, [disabled, handleClose]);

  const submit = useCallback(() => {
    if (disabled) {
      return;
    }
    handleSubmit();
  }, [disabled, handleSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className=" fixed inset-0 z-50 w-full bg-slate-900/80 flex justify-center items-center  ">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto outline-none overflow-hidden  ">
          <div
            className={`translate duration-300  h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? " opacity-100" : "opacity-0"}`}
          >
            <div className="h-full lg:h-auto md:h-auto border-0 flex flex-col bg-white translate rounded-lg shadow-lg md:justify-start md:items-start overflow-x-hidden overflow-y-auto">
              <header className="w-full flex flex-row p-6 justify-between border-b-[1px]">
                <h2 className="text-3xl">{title || "Title"}</h2>
                <button onClick={close}>
                  <IoMdClose></IoMdClose>
                </button>
              </header>
              <div className="flex-auto p-6">{body}</div>
              <footer className="w-full p-6 flex flex-col gap-2">
                <div className="flex flex-row justify-center items-center gap-2 w-full">
                  {" "}
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button outline label={actionLabel} onClick={submit} />
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
