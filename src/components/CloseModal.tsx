"use client";

import React from "react";
import { Button } from "./ui/Button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const CloseModal = () => {
  const router = useRouter();
  return (
    <Button
      variant="subtle"
      className="w-6 h-6 p-0 rounded-md"
      aria-label="close modal"
    >
      <X className="w-4 h-4" onClick={() => router.back()} />
    </Button>
  );
};

export default CloseModal;
