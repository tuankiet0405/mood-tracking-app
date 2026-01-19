import React from "react";
import { Stack } from "../../../components/stack";
type props = {
  title: string;
  icon: string;
};
const SelectMood: React.FC<props> = ({ title, icon }) => {
  return (
    <Stack
      direction="row"
      className="box-border items-center px-250 py-150 border-2 border-blue-200 rounded-10 bg-neutral-0"
      gap="150"
    >
      <div className="w-250 h-250 border-2 border-blue-200 rounded-full shrink-0"></div>
      <p className="w-full text-preset-5 text-neutral-900">{title}</p>
      <img src={icon} className="w-475 h-475" alt={`icon of ${title}`} />
    </Stack>
  );
};

export default SelectMood;
