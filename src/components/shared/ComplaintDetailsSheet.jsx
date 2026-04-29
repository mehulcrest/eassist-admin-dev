import { Star, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SideSheet from "../SideSheet";
import StatusBadge from "../ui/StatusBadge";
import userProfile from "../../assets/userProfile.png";

const getToneByStatus = (status) => {
  if (status === "New") return "new";
  if (status === "Resolved") return "resolved";
  if (status === "In Review") return "inReview";
  if (status === "Refund Issued") return "refundIssued";
  if (status === "Awaiting Refund") return "pending";
  if (status === "Closed") return "closed";
  return "neutral";
};

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

const DetailRow = ({ label, children }) => (
  <div>
    <p className="mb-1 text-sm font-semibold text-[#101828]">{label}</p>
    {children}
  </div>
);

const DEFAULT_ACTION_ITEMS = [
  "Mark In Review",
  "Update Status",
  "Contact PSP",
  "Escalate to Operations",
  "Close Complaint",
];

const REFUND_ACTION_ITEMS = [
  "Mark In Review",
  "Request Refund Approval",
  "Issue Refund",
  "Contact PSP",
  "Close Complaint",
];

const TakeActionButton = ({ onAction, actionItems }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
      {open && (
        <div className="absolute bottom-[calc(100%+6px)] left-0 w-full overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-lg">
          {actionItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full px-4 py-3 text-left text-sm text-[#344054] transition-colors hover:bg-[#F9FAFB]"
            >
              {item}
            </button>
          ))}
        </div>
      )}
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

const ComplaintDetailsSheet = ({ complaint, isOpen, onClose, onAction }) => {
  const isAwaitingRefund = complaint?.status === "Awaiting Refund";
  const sheetTitle = isAwaitingRefund ? "Awaiting Refund Details" : "View Complaint Details";
  const actionItems = isAwaitingRefund ? REFUND_ACTION_ITEMS : DEFAULT_ACTION_ITEMS;

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title={sheetTitle}
      footer={
        <div className="flex gap-3">
          <TakeActionButton onAction={onAction} actionItems={actionItems} />
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
          <DetailRow label="Complaint ID">
            <p className="text-sm text-secondaryTextColor">{complaint.id}</p>
          </DetailRow>
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
          <DetailRow label="Service">
            <p className="text-sm text-secondaryTextColor">{complaint.service}</p>
          </DetailRow>
          <DetailRow label="Date">
            <p className="text-sm text-secondaryTextColor">{complaint.date}</p>
          </DetailRow>
          <DetailRow label="Issue Type">
            <p className="text-sm text-secondaryTextColor">{complaint.issueType}</p>
          </DetailRow>
          <DetailRow label="Issue Details">
            <p className="whitespace-pre-line text-sm leading-relaxed text-secondaryTextColor">
              {complaint.issueDetails}
            </p>
          </DetailRow>
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
          <DetailRow label="Requested Resolution">
            <p className="text-sm text-secondaryTextColor">{complaint.requestedResolution}</p>
          </DetailRow>
          {isAwaitingRefund ? (
            <DetailRow label="Refund Tracking">
              <p className="text-sm text-secondaryTextColor">Awaiting finance team review and approval.</p>
            </DetailRow>
          ) : null}
          <DetailRow label="Status">
            <StatusBadge label={complaint.status} tone={getToneByStatus(complaint.status)} />
          </DetailRow>
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
