import Link from "next/link";

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const baseStyles = "px-8 py-2 rounded transition-all duration-300 capitalize";

  const variants = {
    primary: "cursor-pointer bg-primary text-white hover:opacity-80 disabled:opacity-50",
    border: "cursor-pointer border primary-border text-white hover:text-white/80 disabled:opacity-50",
    secondary: "cursor-pointer bg-white text-black hover:bg-white/90 disabled:opacity-50",
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} {...props}>
        <button className={buttonClass} disabled={disabled}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
}
