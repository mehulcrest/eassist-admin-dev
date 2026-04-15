import { Star, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SideSheet from "../SideSheet";
import userProfile from "../../assets/userProfile.png";

/* ── Status badge ──────────────────────────────────────────────────────────── */
const STATUS_META = {
  New: { bg: "bg-[#FEF3F2]", text: "text-[#D92D20]" },
  Resolved: { bg: "bg-[#ECFDF3]", text: "text-greenVerified" },
  "In Review": { bg: "bg-[#F2F4F7]", text: "text-[#344054]" },
  "Refund Issued": { bg: "bg-[#F0F9FF]", text: "text-[#007AFF]" },
  "Awaiting Refund": { bg: "bg-[#FFFAEB]", text: "text-orangeReview" },
  Closed: { bg: "bg-[#ECFDF3]", text: "text-greenVerified" },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_META[status] || STATUS_META["In Review"];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      {status}
    </span>
  );
};

/* ── Star rating row ───────────────────────────────────────────────────────── */
const RatingStars = ({ rating }) => {
  const num = Number(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          strokeWidth={1.5}
          className={
            i < Math.round(num)
              ? "fill-[#EF7C74] text-[#F97066]"
              : "fill-[#D0D5DD] text-[#D0D5DD]"
          }
        />
      ))}
    </div>
  );
};

/* ── Detail row ────────────────────────────────────────────────────────────── */
const DetailRow = ({ label, children }) => (
  <div>
    <p className="mb-1 text-sm font-semibold text-[#101828]">{label}</p>
    {children}
  </div>
);

/* ── Take-Action dropdown ──────────────────────────────────────────────────── */
const ACTION_ITEMS = [
  "Mark In Review",
  "Update Status",
  "Contact PSP",
  "Escalate to Operations",
  "Close Complaint",
];

const TakeActionButton = ({ onAction }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (item) => {
    setOpen(false);
    onAction?.(item);
  };

  return (
    <div className="relative flex-1" ref={ref}>
      {/* Dropdown menu — renders ABOVE the button */}
      {open && (
        <div className="absolute bottom-[calc(100%+6px)] left-0 w-full overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-lg">
          {ACTION_ITEMS.map((item, idx) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(item)}
              className={`w-full px-4 py-3 text-left text-sm text-[#344054] transition-colors hover:bg-[#F9FAFB] }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#D92D20] text-sm font-semibold text-white transition-colors hover:bg-[#B42318]"
      >
        Take Action
        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
};

/* ── Main exported component ───────────────────────────────────────────────── */
const ComplaintDetailsSheet = ({ complaint, isOpen, onClose, onAction }) => {
  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="View Complaint Details"
      footer={
        <div className="flex gap-3">
          <TakeActionButton onAction={onAction} />
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] transition-colors hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>
        </div>
      }
    >
      {complaint && (
        <div className="space-y-5">
          {/* Complaint ID */}
          <DetailRow label="Complaint ID">
            <p className="text-sm text-secondaryTextColor">{complaint.id}</p>
          </DetailRow>

          {/* Caregiver */}
          <DetailRow label="Caregiver">
            <div className="flex items-center gap-2">
              <img
                src={userProfile}
                alt={complaint.caregiver}
                className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
              />
              <span className="cursor-pointer text-sm text-secondaryTextColor underline underline-offset-2 transition-colors">
                {complaint.caregiver}
              </span>
            </div>
          </DetailRow>

          {/* Service */}
          <DetailRow label="Service">
            <p className="text-sm text-secondaryTextColor">{complaint.service}</p>
          </DetailRow>

          {/* Date */}
          <DetailRow label="Date">
            <p className="text-sm text-secondaryTextColor">{complaint.date}</p>
          </DetailRow>

          {/* Issue Type */}
          <DetailRow label="Issue Type">
            <p className="text-sm text-secondaryTextColor">{complaint.issueType}</p>
          </DetailRow>

          {/* Issue Details */}
          <DetailRow label="Issue Details">
            <p className="whitespace-pre-line text-sm leading-relaxed text-secondaryTextColor">
              {complaint.issueDetails}
            </p>
          </DetailRow>

          {/* Images – only shown when present */}
          {complaint.images?.length > 0 && (
            <DetailRow label="Images">
              <div className="grid grid-cols-3 gap-2">
                {complaint.images.map((src, idx) => (
                  <div
                    key={idx}
                    className="aspect-[5/4] overflow-hidden rounded-lg border border-[#EAECF0]"
                  >
                    <img
                      src={src}
                      alt={`Complaint image ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </DetailRow>
          )}

          {/* Requested Resolution */}
          <DetailRow label="Requested Resolution">
            <p className="text-sm text-secondaryTextColor">{complaint.requestedResolution}</p>
          </DetailRow>

          {/* Status */}
          <DetailRow label="Status">
            <StatusBadge status={complaint.status} />
          </DetailRow>

          {/* Rating */}
          <DetailRow label="Rating">
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondaryTextColor">{complaint.rating}</span>
              <RatingStars rating={complaint.rating} />
            </div>
          </DetailRow>
        </div>
      )}
    </SideSheet>
  );
};

export default ComplaintDetailsSheet;
