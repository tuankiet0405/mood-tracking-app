import React from "react";

const SectionBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="px-200 py-250 bg-neutral-0 rounded-16">{children}</div>
  );
};
export default SectionBackground;
