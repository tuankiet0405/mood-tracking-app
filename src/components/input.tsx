import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null | boolean;
}

export const Input: React.FC<InputProps> = ({ className, error, ...props }) => {
  const base =
    "py-3 px-4 text-preset-6 font-normal text-neutral-600 rounded-10 box-border w-full";
  const interactive = clsx(
    base,
    "border border-1 border-neutral-300",
    "hover:border-neutral-600",
    "focus:border-neutral-300 focus:outline-3 focus:outline-offset-3 focus:outline-solid focus:outline-blue-600",
    "active:text-neutral-900 active:border-neutral-900",
    error && "border-red-500",
    className,
  );
  return <input className={interactive} {...props} />;
};
