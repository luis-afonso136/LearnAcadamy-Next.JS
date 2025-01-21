"use client";

import React from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <DialogContent
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-5xl p-6 z-50"
      >
        <div className="flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
