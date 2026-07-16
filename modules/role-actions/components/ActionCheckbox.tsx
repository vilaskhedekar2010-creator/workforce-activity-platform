"use client";

interface ActionCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (
    actionId: string,
    checked: boolean
  ) => void;
}

export default function ActionCheckbox({
  id,
  label,
  checked,
  onChange,
}: ActionCheckboxProps) {
  return (
    <label className="flex items-center gap-2">

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(
            id,
            e.target.checked
          )
        }
      />

      <span>{label}</span>

    </label>
  );
}