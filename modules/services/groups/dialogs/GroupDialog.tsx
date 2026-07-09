"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

interface GroupDialogProps {

  open: boolean;

  title: string;

  initialName?: string;

  onClose: () => void;

  onSave: (name: string) => Promise<void>;

}

export default function GroupDialog({

  open,

  title,

  initialName = "",

  onClose,

  onSave,

}: GroupDialogProps) {

  const [name, setName] = useState("");

  useEffect(() => {

    setName(initialName);

  }, [initialName]);

  const handleSave = async () => {

    if (!name.trim()) return;

    await onSave(name.trim());

    onClose();

  };

  return (

    <Dialog
      open={open}
      onOpenChange={onClose}
    >

      <DialogContent className="sm:max-w-md">

        <DialogHeader>

          <DialogTitle>

            {title}

          </DialogTitle>

          <DialogDescription>

            Enter Group Details

          </DialogDescription>

        </DialogHeader>

        <div className="space-y-4 py-4">

          <div>

            <Label>

              Group Name

            </Label>

            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter Group Name"
            />

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
          >
            Save
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}