"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GroupFormProps {

  name: string;

  onNameChange: (value: string) => void;

}

export default function GroupForm({

  name,

  onNameChange,

}: GroupFormProps) {

  return (

    <div className="space-y-4 py-4">

      <div>

        <Label htmlFor="group-name">

          Group Name

        </Label>

        <Input
          id="group-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter Group Name"
        />

      </div>

    </div>

  );

}