import React from "react";
import { Stack } from "../../../components/stack";
type props = {
  title: string;
  icon: string;
  index: number;
  isSelected: boolean;
  onSelect: (index: number, title: string) => void;
};
const SelectMood: React.FC<props> = ({
  title,
  icon,
  index,
  onSelect,
  isSelected,
}) => {
  return (
    <Stack
      direction="row"
      className={
        `${isSelected ? " border-blue-600" : " border-blue-200"}  ` +
        "box-border items-center px-250 py-150 border-2 rounded-10 bg-neutral-0"
      }
      gap="150"
      onClick={() => onSelect(index, title)}
    >
      <div
        className={
          `${isSelected ? "border-5 border-blue-600" : "border-2 border-blue-200"}  ` +
          "w-250 h-250  rounded-full shrink-0"
        }
      ></div>
      <p className="w-full text-preset-5 text-neutral-900">{title}</p>
      <img src={icon} className="w-475 h-475" alt={`icon of ${title}`} />
    </Stack>
  );
};

export default SelectMood;
