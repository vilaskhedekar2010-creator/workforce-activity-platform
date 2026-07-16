"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface UnsavedChangesDialogProps {

  open: boolean;

  onSave: () => void | Promise<void>;

  onDiscard: () => void;

  onCancel: () => void;

  loading?: boolean;

}

export default function UnsavedChangesDialog({

  open,

  onSave,

  onDiscard,

  onCancel,

  loading = false,

}: UnsavedChangesDialogProps) {

  return (

    <Dialog
      open={open}
      onOpenChange={(value) => {

        if (!value) {

          onCancel();

        }

      }}
    >

      <DialogContent
        showCloseButton={false}
        className="max-w-md"
      >

        <DialogHeader>

          <DialogTitle>

            Unsaved Changes

          </DialogTitle>

          <DialogDescription>

            You have unsaved changes.

            <br />

            What would you like to do?

          </DialogDescription>

        </DialogHeader>

        <DialogFooter className="pt-4">

          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onDiscard}
          >
            Discard
          </Button>

          <Button
            onClick={onSave}
            disabled={loading}
          >
            Save
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}