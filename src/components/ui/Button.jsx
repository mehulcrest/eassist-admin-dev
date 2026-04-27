const VARIANT_CLASS = {
  primary:
    "bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-white border border-transparent",
  secondary: "bg-white text-[#344054] border border-[#D0D5DD]",
  danger: "bg-redRejected text-white border border-transparent",
  dangerOutline: "bg-white text-redRejected border border-redRejected",
  ghost: "bg-transparent text-[#344054] border border-transparent",
  icon: "bg-white text-[#667085] border border-[#D0D5DD]",
};

const SIZE_CLASS = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-4 text-sm",
  icon: "size-8 p-0",
};

export default function Button({
  children,
  type = "button",
  variant = "secondary",
  size = "md",
  className = "",
  ...props
}) {
  const variantClass = VARIANT_CLASS[variant] ?? VARIANT_CLASS.secondary;
  const sizeClass = SIZE_CLASS[size] ?? SIZE_CLASS.md;

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
