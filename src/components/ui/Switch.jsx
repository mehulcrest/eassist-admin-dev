export default function Switch({ checked = false, onChange, ariaLabel = "Toggle", className = "" }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
        checked ? "bg-[#12B76A]" : "bg-[#D0D5DD]"
      } ${className}`}
      aria-pressed={checked}
      aria-label={ariaLabel}
    >
      <span
        className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${
          checked ? "left-[18px]" : "left-0.5"
        }`}
      />
    </button>
  );
}
