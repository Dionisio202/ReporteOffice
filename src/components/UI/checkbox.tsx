import React from "react";
type CheckboxProps = {
  checked: boolean;
  onCheckedChange: () => void;
};

export function Checkbox({ checked, onCheckedChange }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onCheckedChange}
      className="w-4 h-4 cursor-pointer"
    />
  );
}
