import clsx from "clsx";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  gap?:
    | "0" // 0px
    | "025" // 2px
    | "050"
    | "075"
    | "100"
    | "150"
    | "200"
    | "250"
    | "300"
    | "400"
    | "500"
    | "600"
    | "800"
    | "1000";
}

export const Stack: React.FC<StackProps> = ({
  direction = "col",
  gap = "025",
  children,
  className,
  ...props
}) => {
  const gaps = {
    0: "gap-0",
    "025": "gap-025",
    "050": "gap-050",
    "075": "gap-075",
    "100": "gap-100",
    "150": "gap-150",
    "200": "gap-200",
    "250": "gap-250",
    "300": "gap-300",
    "400": "gap-400",
    "500": "gap-500",
    "600": "gap-600",
    "800": "gap-800",
    "1000": "gap-1000",
  };
  return (
    <div
      className={clsx(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        `${gaps[gap]}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
