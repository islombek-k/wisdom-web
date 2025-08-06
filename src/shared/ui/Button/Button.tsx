import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "icon";
  children: ReactNode;
  icon?: ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "w-full cursor-pointer rounded-full font-medium transition-colors disabled:opacity-50";

  const variantClasses = {
    primary: "bg-primary-600 hover:opacity-90 text-white py-3 px-4",
    icon: "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 px-4 flex items-center justify-center gap-2",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
