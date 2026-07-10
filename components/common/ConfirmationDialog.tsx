"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {

  open: boolean;

  title: string;

  description: string;

  confirmText?: string;

  cancelText?: string;

  onConfirm: () => void;

  onCancel: () => void;

}

export default function ConfirmationDialog({

  open,

  title,

  description,

  confirmText = "Confirm",

  cancelText = "Cancel",

  onConfirm,

  onCancel,

}: ConfirmationDialogProps) {

  return (

    <AlertDialog
      open={open}
      onOpenChange={(value) => {

        if (!value) {

          onCancel();

        }

      }}
    >

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>

            {title}

          </AlertDialogTitle>

          <AlertDialogDescription>

            {description}

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel
            onClick={onCancel}
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>

  );

}