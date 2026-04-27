const TONE_STYLES = {
  verified: "bg-[#ECFDF3] text-[#039855]",
  paid: "bg-[#ECFDF3] text-[#039855]",
  resolved: "bg-[#ECFDF3] text-[#039855]",
  closed: "bg-[#ECFDF3] text-[#039855]",
  success: "bg-[#ECFDF3] text-[#039855]",
  pending: "bg-[#FFFAEB] text-[#DC6803]",
  processing: "bg-[#FFFAEB] text-[#DC6803]",
  scheduled: "bg-[#FFFAEB] text-[#DC6803]",
  warning: "bg-[#FFFAEB] text-[#DC6803]",
  expired: "bg-[#FEF3F2] text-[#F04438]",
  failed: "bg-[#FEF3F2] text-[#F04438]",
  canceled: "bg-[#FEF3F2] text-[#F04438]",
  new: "bg-[#FEF3F2] text-[#F04438]",
  danger: "bg-[#FEF3F2] text-[#F04438]",
  inReview: "bg-[#F2F4F7] text-[#667085]",
  neutral: "bg-[#F2F4F7] text-[#667085]",
  info: "bg-[#EFF8FF] text-[#175CD3]",
  inProgress: "bg-[#EFF8FF] text-[#2E90FA]",
  rejected: "bg-[#EFF8FF] text-[#175CD3]",
  refundIssued: "bg-[#EFF8FF] text-[#2E90FA]",
  expiring: "bg-[#FFF1F3] text-[#F04438]",
};

const SIZE_STYLES = {
  xs: "px-2 py-0.5 text-xs font-medium",
  sm: "px-2 py-0.5 text-sm font-semibold",
};

export default function StatusBadge({
  label,
  tone = "neutral",
  size = "xs",
  className = "",
  icon: Icon,
  iconClassName = "",
  showIcon = false,
  textOnly = false,
}) {
  const toneClass = TONE_STYLES[tone] ?? TONE_STYLES.neutral;
  const sizeClass = SIZE_STYLES[size] ?? SIZE_STYLES.xs;
  const textOnlyClass = toneClass.split(" ").find((token) => token.startsWith("text-")) ?? "text-[#667085]";

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap ${
        textOnly ? `font-medium ${textOnlyClass}` : `rounded-full ${sizeClass} ${toneClass}`
      } ${className}`}
    >
      {showIcon && Icon ? <Icon size={13} className={iconClassName || textOnlyClass} /> : null}
      {label}
    </span>
  );
}
