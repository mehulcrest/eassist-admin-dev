import { useState } from "react";
import {
  ChevronDown,
  MessageCircleMore,
  Phone,
  X,
} from "lucide-react";
import userProfile from "../../assets/userProfile.png";

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
const SectionHeading = ({ children }) => (
  <h3 className="text-base font-bold text-[#101828] mb-4">{children}</h3>
);

const DetailLabel = ({ children }) => (
  <p className="text-xs font-medium text-[#333333] mb-0.5">{children}</p>
);

/* Values should be regular weight (NOT bold) to match Figma */
const DetailValue = ({ children, className = "" }) => (
  <p className={`text-sm text-[#667085] ${className}`}>{children}</p>
);

const Divider = () => <div className="border-t border-[#F2F4F7]" />;

/* ─────────────────────────────────────────────
   Refund breakdown tooltip — positioned BELOW
   inside drawer, no overflow
───────────────────────────────────────────── */
const RefundTooltip = ({ breakdown }) => (
  <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[230px] rounded-xl border border-[#EAECF0] bg-white shadow-xl p-4">
    <p className="mb-2 text-sm font-bold text-[#101828]">Refund Amount Breakdown</p>
    {breakdown.map((item, i) => (
      <div key={i} className="flex items-center justify-between py-0.5">
        <span className="text-sm text-[#475467]">{item.label}:</span>
        <span className={`text-sm font-semibold ${i === breakdown.length - 1 ? "text-[#027A48]" : "text-[#344054]"}`}>
          {item.value}
        </span>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Timeline event row — proper alignment
───────────────────────────────────────────── */
const DetailTimelineEvent = ({ event, isLast }) => (
  <div className="flex">
    {/* ── Left col: fixed-width dot + dashed connector ── */}
    <div
      className="flex shrink-0 flex-col items-center"
      style={{ width: 20, marginRight: 12 }}
    >
      <div
        className="shrink-0 rounded-full border-2 border-[#F04438] bg-white"
        style={{ width: 10, height: 10, marginTop: 4 }}
      />
      {!isLast && (
        <div
          className="mt-1 flex-1"
          style={{ width: 0, borderLeft: "2px dashed #F7C1C1", minHeight: 32 }}
        />
      )}
    </div>

    {/* ── Right col: all content ── */}
    <div className="min-w-0 flex items-start pb-4">
      <div className="flex flex-col items-center mr-4 shrink-0">
        {/* <span className="text-sm font-semibold text-[#344054] shrink-0 min-w-[72px]">
                {event.time}
              </span> */}
        <span className="text-sm font-semibold text-[#344054] shrink-0">{event.time}</span>
      </div>

      <div className="flex flex-col gap-0.5">
        {/* Time + Date on the same row */}
        <div className="mb-1 flex items-baseline gap-3">
          <span className="text-xs text-[#667085]">{event.date}</span>
        </div>

        {/* Title */}
        <p className={`mb-1 text-sm font-semibold ${event.isCancelled ? "text-[#F04438]" : "text-[#101828]"
          }`}>
          {event.title}
        </p>

        {/* Plain description */}
        {!event.avatar && event.desc && (
          <p className="text-sm text-[#475467]">{event.desc}</p>
        )}

        {/* Avatar + person description */}
        {event.avatar && event.desc && (
          <div className="flex items-center gap-1.5">
            <img
              src={event.avatar}
              alt=""
              className="size-5 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
            />
            <p className="text-sm text-[#475467]">
              <span className="mr-1 font-semibold text-[#344054] underline underline-offset-2">
                {event.actorName}
              </span>
              {event.desc}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Take action dropdown
───────────────────────────────────────────── */
const TAKE_ACTIONS = ["Rebook Service", "Assign New PSP", "Issue Refund", "Escalate to Operations"];

const TakeActionMenu = ({ onClose }) => (
  <div className="absolute bottom-full left-0 mb-2 z-50 w-[200px] rounded-xl border border-[#EAECF0] bg-white py-1 shadow-xl">
    {TAKE_ACTIONS.map((action) => (
      <button
        key={action}
        type="button"
        onClick={() => { console.log("Take action:", action); onClose(); }}
        className="flex w-full items-center px-4 py-2.5 text-sm text-[#344054] hover:bg-gray-50 transition-colors"
      >
        {action}
      </button>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Static data
───────────────────────────────────────────── */
const REFUND_BREAKDOWN = [
  { label: "Service Fee", value: "$50.00" },
  { label: "Cancellation Fee", value: "$5.00" },
  { label: "Platform Fee Retained", value: "$4.43" },
  { label: "Refund Amount", value: "$44.57" },
];

const TIMELINE_EVENTS = [
  {
    time: "02:30 PM", date: "Mar 10, 2026",
    title: "Booking Created",
    desc: null, avatar: null, actorName: null,
    isCancelled: false,
  },
  {
    time: "02:35 PM", date: "Mar 10, 2026",
    title: "PSP Assigned",
    desc: "assigned Maria Santos.",
    avatar: userProfile, actorName: "Robert Brown",
    isCancelled: false,
  },
  {
    time: "02:36 PM", date: "Mar 10, 2026",
    title: "PSP Accepted",
    desc: "accepted the request",
    avatar: userProfile, actorName: "Maria Santos",
    isCancelled: false,
  },
  {
    time: "09:00 AM", date: "Mar 12, 2026",
    title: "Cancelled",
    desc: "cancelled the job.",
    avatar: userProfile, actorName: "Maria Santos",
    isCancelled: true,
  },
];

/* ─────────────────────────────────────────────
   Contact Buttons
───────────────────────────────────────────── */
const ContactButtons = () => (
  <div className="flex items-center gap-2 shrink-0">
    <button type="button" className="flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
      <Phone size={15} strokeWidth={2} />
    </button>
    <button type="button" className="flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
      <MessageCircleMore size={15} strokeWidth={2} />
    </button>
  </div>
);

/* ─────────────────────────────────────────────
   Main CancellationDetailSheet
   Props: isOpen, onClose, row
───────────────────────────────────────────── */
const CancellationDetailSheet = ({ isOpen, onClose, row }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);

  if (!isOpen || !row) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — overflow-hidden to prevent horizontal scroll */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancellation-detail-title"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-full sm:max-w-[480px] flex-col bg-white shadow-2xl overflow-hidden transition-transform duration-300"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-[#EAECF0] px-6 py-5 shrink-0">
          <h2 id="cancellation-detail-title" className="text-xl font-bold text-[#101828]">
            Cancellation Detail
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-[#667085] hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-5 space-y-5">

          {/* Member Information */}
          <div>
            <SectionHeading>Member Information</SectionHeading>
            <div className="flex  gap-3 sm:flex-row sm:items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={row.memberAvatar ?? userProfile}
                  alt=""
                  className="size-9 rounded-full object-cover ring-1 ring-[#EAECF0] shrink-0"
                />
                <button type="button" className="text-sm font-semibold text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors truncate">
                  {row.memberName}
                </button>
              </div>
              <div className="flex justify-start sm:block shrink-0">
                <ContactButtons />
              </div>
            </div>
          </div>

          <Divider />

          {/* PSP Information */}
          <div>
            <SectionHeading>PSP Information</SectionHeading>
            <div className="flex  gap-3 sm:flex-row sm:items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={row.caregiverAvatar ?? userProfile}
                  alt=""
                  className="size-9 rounded-full object-cover ring-1 ring-[#EAECF0] shrink-0"
                />
                <button type="button" className="text-sm font-semibold text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors truncate">
                  {row.caregiverName !== "-" ? row.caregiverName : "No PSP Assigned"}
                </button>
              </div>
              {row.caregiverName !== "-" && (
                <div className="flex justify-start sm:block shrink-0">
                  <ContactButtons />
                </div>
              )}
            </div>
          </div>

          <Divider />

          {/* Job Summary */}
          <div>
            <SectionHeading>Job Summary</SectionHeading>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
              <div>
                <DetailLabel>Member</DetailLabel>
                {/* Regular weight text — not bold */}
                <DetailValue>{row.memberName} • E001</DetailValue>
              </div>
              <div>
                <DetailLabel>Service</DetailLabel>
                <button type="button" className="text-sm text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors text-left">
                  {row.serviceName} • JD-1053
                </button>
              </div>
              <div>
                <DetailLabel>Member</DetailLabel>
                <DetailValue>Mar 12, 2026</DetailValue>
              </div>
              <div>
                <DetailLabel>Service</DetailLabel>
                <DetailValue>10:00 AM – 11:00 AM • 2 hrs</DetailValue>
              </div>
            </div>
            {/* Location — gray pill matching Figma */}
            <div className="mt-4">
              <DetailLabel>Location</DetailLabel>
              <div className="mt-0.5 flex items-center gap-2.5">
                <DetailValue>123 Oak Street, Apt 4B</DetailValue>
                <span className="inline-flex items-center rounded-full bg-[#F2F4F7] px-2.5 py-0.5 text-xs font-medium text-[#344054]">
                  {row.location}
                </span>
              </div>
            </div>
          </div>

          <Divider />

          {/* Cancellation Info */}
          <div>
            <SectionHeading>Cancellation Info</SectionHeading>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 mb-4">
              <div>
                <DetailLabel>Cancelled By</DetailLabel>
                {/* Regular weight — matches Figma */}
                <DetailValue>
                  {row.cancelledBy === "Member" ? "Cancelled by Elder" : `Cancelled by ${row.cancelledBy}`}
                </DetailValue>
              </div>
              <div>
                <DetailLabel>Cancellation Reason</DetailLabel>
                <DetailValue>{row.reason}</DetailValue>
              </div>
            </div>
            <div className="mb-4">
              <DetailLabel>Detailed Note</DetailLabel>
              <DetailValue className="text-[#475467]">
                Member requested cancellation due to travel
              </DetailValue>
            </div>
            <div>
              <DetailLabel>Cancellation Time</DetailLabel>
              {/* Inline: date text + red pill — no extra wrapping */}
              <div className="mt-0.5 flex items-center gap-2.5 flex-wrap">
                <DetailValue>Today, Mar 12, 2026 • 09:00 AM</DetailValue>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  {row.timeBeforeStart}
                </span>
              </div>
            </div>
          </div>

          <Divider />

          {/* Refund & Penalty */}
          <div>
            <SectionHeading>Refund &amp; Penalty</SectionHeading>

            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 mb-4">
              <div>
                <DetailLabel>Refund Status</DetailLabel>
                <span className={`mt-0.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${row.refund === "Full Refund"
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : "bg-[#FEF3F2] text-[#F04438]"
                  }`}>
                  {row.refund}
                </span>
              </div>
              <div>
                <DetailLabel>Refund Amount</DetailLabel>
                {/* Tooltip — positioned below, fully inside drawer */}
                <div
                  className="relative inline-block mt-0.5"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <button
                    type="button"
                    className="text-sm text-[#667085] underline underline-offset-2 hover:text-[#F04438] transition-colors"
                  >
                    $44.57
                  </button>
                  {showTooltip && <RefundTooltip breakdown={REFUND_BREAKDOWN} />}
                </div>
              </div>
            </div>



            <div>
              <DetailLabel>Notes / Logs</DetailLabel>
              <ul className="mt-1.5 space-y-1.5">
                {[
                  "Call center called Helen – member not reachable (voicemail)",
                  "Refund processed successfully",
                  "Refund tag added to booking",
                ].map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#667085]">
                    <span className="mt-[7px] size-[5px] rounded-full bg-[#475467] shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Divider />

          {/* Timeline Events */}
          <div>
            <SectionHeading>Timeline Events</SectionHeading>
            <div>
              {TIMELINE_EVENTS.map((evt, idx) => (
                <DetailTimelineEvent
                  key={idx}
                  event={evt}
                  isLast={idx === TIMELINE_EVENTS.length - 1}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="flex  gap-3 border-t border-[#EAECF0] px-6 py-4 shrink-0 sm:flex-row">
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setShowActionMenu(!showActionMenu)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#F04438] text-base font-semibold text-white hover:bg-[#D92D20] transition-colors"
            >
              Take Action
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${showActionMenu ? "rotate-180" : ""}`}
              />
            </button>
            {showActionMenu && (
              <TakeActionMenu onClose={() => setShowActionMenu(false)} />
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-base font-medium text-[#344054] hover:bg-gray-50 transition-colors order-last sm:order-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default CancellationDetailSheet;
