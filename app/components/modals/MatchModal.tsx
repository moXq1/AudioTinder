"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useMatchModal } from "@/app/hooks/useMatchModal";

import { Modal } from "./Modal";

interface MatchModalProps {}

export const MatchModal: React.FC<MatchModalProps> = ({}) => {
  const body = <p>body</p>;

  const { isOpen, onClose, id } = useMatchModal();
  const [mId, setMId] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMId(isOpen);
  }, [isOpen]);

  return (
    <Modal
      handleClose={onClose}
      body={body}
      title="You successfuly matched"
      secondaryAction={onClose}
      secondaryActionLabel="Keep matching"
      isOpen={isOpen}
      actionLabel={"Start chatting"}
      handleSubmit={() => {
        router.push(`/chat/${mId}`);
      }}
    />
  );
};
