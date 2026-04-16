import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Eye,
  MessageCircleMore,
  Phone,
  User,
  UploadCloud,
  CircleCheck,
} from "lucide-react";
import userProfile from "../../assets/userProfile.png";
import EscalationResolveModal from "./EscalationResolveModal";

/* ─────────────────────────────────────────────
   Tiny reusable primitives
───────────────────────────────────────────── */
const Label = ({ children }) => (
  <p className="mb-0.5 text-xs font-bold text-[#333333]">{children}</p>
);
const Value = ({ children, className = "" }) => (
  <p className={`text-sm text-[#667085] ${className}`}>{children}</p>
);
const Divider = () => <div className="border-t border-[#F2F4F7]" />;

const SectionTitle = ({ children }) => (
  <h3 className="text-base font-bold text-[#101828]">{children}</h3>
);

const ContactBtns = () => (
  <div className="flex gap-2">
    <button
      type="button"
      className="flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] shadow-sm hover:bg-gray-50 transition-colors"
    >
      <Phone size={14} strokeWidth={2} />
    </button>
    <button
      type="button"
      className="flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] shadow-sm hover:bg-gray-50 transition-colors"
    >
      <MessageCircleMore size={14} strokeWidth={2} />
    </button>
  </div>
);

/* ─────────────────────────────────────────────
   Case Timeline – right sidebar
───────────────────────────────────────────── */
const CASE_TIMELINE = [
  { time: "02:10 PM", label: "Service Started", link: null },
  { time: "02:15 PM", label: "Issue Reported by Member", link: null },
  { time: "03:45 PM", label: "Escalation Created", link: null },
  { time: "03:48 PM", label: "Assigned to ", link: "Maria Santos" },
  { time: "03:48 PM", label: "Support contacted PSP", link: null },
];

const CaseTimeline = () => (
  <div className="rounded-xl border border-[#EAECF0] bg-white  shadow-sm">
    {/* <SectionTitle>Case Timeline</SectionTitle> */}
    <div className="border-b border-[#EAECF0] px-6 py-4">
      <SectionTitle>Case Timeline</SectionTitle>
    </div>
    <div className="space-y-0 p-6">
      {CASE_TIMELINE.map((item, idx) => (
        <div key={idx} className="flex min-h-[38px]">
          {/* dot + line */}
          <div
            className="flex shrink-0 flex-col items-center"
            style={{ width: 14, marginRight: 16 }}
          >
            <div
              className={`shrink-0 rounded-full border-2 ${idx === 0 ? "bg-[#F04438] border-[#FEE4E2]" : "bg-white border-[#F04438]"}`}
              style={{ width: 10, height: 10, marginTop: 4 }}
            />
            {idx < CASE_TIMELINE.length - 1 && (
              <div
                className="mt-1 flex-1"
                style={{ width: 0, borderLeft: "1px dashed #D0D5DD" }}
              />
            )}
          </div>
          {/* content */}
          <div className="pb-4 flex gap-1.5">
            <span className="text-sm font-semibold text-[#333]">{item.time}</span>
            <p className="text-sm font-normal text-[#333]">
              {item.label}
              {item.link && (
                <span className="font-normal text-[#333] underline underline-offset-2 ml-1">
                  {item.link}
                </span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Communication & Notes – right sidebar
───────────────────────────────────────────── */
const NOTES = [
  "Call made to PSP – no response.",
  "Follow-up message sent to PSP",
  "Member contacted for clarification",
];

const CommunicationNotes = ({ row }) => (
  <div className="rounded-xl border border-[#EAECF0] bg-white shadow-sm overflow-hidden">
    <div className="border-b border-[#EAECF0] px-6 py-4">
      <SectionTitle>Communication &amp; Notes</SectionTitle>
    </div>

    <div className="p-6 space-y-6">
      {/* Notes / Logs */}
      <div>
        <Label>Notes / Logs</Label>
        <ul className="mt-2 space-y-1.5">
          {NOTES.map((note, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#475467]">
              <span className="mt-1.5 size-[5px] shrink-0 rounded-full bg-[#D0D5DD]" />
              {note}
            </li>
          ))}
        </ul>
      </div>

      <Divider />

      {/* Member Information */}
      <div>
        <p className="text-base font-semibold text-[#101828] mb-3  tracking-wider">Member Information</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={userProfile} alt="" className="size-10 rounded-full object-cover ring-1 ring-[#EAECF0]" />
            <button type="button" className="text-sm font-sm text-[#667085] underline underline-offset-2 hover:text-[#D92D20] transition-colors">
              Margaret Thompson
            </button>
          </div>
          <ContactBtns />
        </div>
      </div>

      <Divider />

      {/* PSP Information */}
      <div>
        <p className="text-base font-semibold text-[#101828] mb-3 tracking-wider">PSP Information</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={userProfile} alt="" className="size-10 rounded-full object-cover ring-1 ring-[#EAECF0]" />
            <button type="button" className="text-sm font-sm text-[#667085] underline underline-offset-2 hover:text-[#D92D20] transition-colors">
              {row.assigneeName}
            </button>
          </div>
          <ContactBtns />
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Resolution radio options
───────────────────────────────────────────── */
const RESOLUTION_OPTIONS = [
  "Issue Refund",
  "Reschedule Service",
  "Warn Provider",
  "Reassign PSP",
  "Close Case",
  "Additional Training Required",
];

/* ─────────────────────────────────────────────
   Attached Evidence files
───────────────────────────────────────────── */
const EVIDENCE_FILES = [
  { name: "late-arrival.pdf", meta: "6MB · Mar 03, 2021" },
  { name: "visit-check-in-Screenshot.pdf", meta: "6MB · Mar 03, 2021" },
  { name: "psp-statement.pdf", meta: "6MB · Mar 03, 2021" },
];

/* ─────────────────────────────────────────────
   Main EscalationDetailView
   Props:
     row      – escalation data row
     onBack   – () => void
───────────────────────────────────────────── */
const EscalationDetailView = ({ row, onBack }) => {
  const [resolution, setResolution] = useState("Issue Refund");
  const [refundAmount, setRefundAmount] = useState("");
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  if (!row) return null;

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">

      {/* ── First Row: Main details left, sidebar right ── */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* ═══ LEFT MAIN CARD ═══ */}
        <div className="flex flex-1 flex-col gap-6 rounded-xl border border-[#EAECF0] bg-white py-4 shadow-sm min-w-0 w-full lg:w-auto">

          {/* ── Back header ── */}
          <div className="flex items-center gap-3 border-b border-[#EAECF0] bg-white px-4 pb-3 shrink-0">
            <button
              type="button"
              onClick={onBack}
              className="flex size-8 items-center justify-center rounded-lg text-[#667085] hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
            <h2 className="text-base font-bold text-[#101828]">
              Escalation Details&nbsp;
              <span className="text-[#667085] font-normal">{row.id} &bull; {row.serviceId}</span>
            </h2>
          </div>

          {/* ── Job Summary ── */}
          <div className="px-6">
            <SectionTitle>Job Summary</SectionTitle>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <Label>Member</Label>
                <div className="flex items-center gap-2 mt-0.5">
                  <img src={row.assigneeAvatar ?? userProfile} alt="" className="size-6 rounded-full object-cover ring-1 ring-[#EAECF0] shrink-0" />
                  <button type="button" className="text-sm text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors">
                    Margaret Thompson
                  </button>
                  <span className="text-xs text-[#667085]">• E001</span>
                </div>
              </div>
              <div>
                <Label>Service</Label>
                <button type="button" className="mt-0.5 text-sm text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors text-left">
                  {row.serviceName} • JD-1053
                </button>
              </div>
              <div>
                <Label>Date</Label>
                <Value>Mar 12, 2026</Value>
              </div>
              <div>
                <Label>Time</Label>
                <Value>10:00 AM – 11:00 AM • 2 hrs</Value>
              </div>
            </div>
            <div className="mt-4">
              <Label>Location</Label>
              <div className="mt-0.5 flex items-center gap-2">
                <Value>123 Oak Street, Apt 4B</Value>
                <span className="inline-flex items-center rounded-full bg-[#F2F4F7] px-2.5 py-0.5 text-xs font-medium text-[#344054]">
                  {row.location}
                </span>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Escalation Info ── */}
          <div className="px-6">
            <SectionTitle>Escalation Info</SectionTitle>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <Label>Reported By</Label>
                <Value>Member</Value>
              </div>
              <div>
                <Label>Issue Type</Label>
                <Value>{row.issueType}</Value>
              </div>
              <div>
                <Label>Reported On</Label>
                <Value>Mar 12, 2026 • 10:45 AM</Value>
              </div>
              <div>
                <Label>Assigned To</Label>
                <div className="flex items-center gap-2 mt-0.5">
                  <img src={row.assigneeAvatar ?? userProfile} alt="" className="size-6 rounded-full object-cover ring-1 ring-[#EAECF0] shrink-0" />
                  <button type="button" className="text-sm text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors">
                    {row.assigneeName}
                  </button>
                </div>
              </div>
            </div>

            {/* Issue Description */}
            <div className="mt-4 px-6 sm:px-0">
              <Label>Issue Description</Label>
              <p className="mt-0.5 text-sm leading-relaxed text-[#475467]">
                The caregiver arrived late and was not attentive during the service. Member reported dissatisfaction with service quality.<br /><br />
                The service was either delayed or partially impacted, affecting the elder's daily routine. This issue requires attention to ensure timely service delivery and prevent recurrence.
              </p>
            </div>

            {/* Severity + Current Status */}
            <div className="mt-4 px-6 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <Label>Severity</Label>
                <span className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${row.severity === "High" ? "bg-red-50 text-red-500" :
                  row.severity === "Medium" ? "bg-amber-50 text-amber-600" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                  {row.severity}
                </span>
              </div>
              <div>
                <Label>Current Status</Label>
                <span className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${row.status === "In Progress" ? "bg-amber-50 text-amber-600" :
                  row.status === "New" ? "bg-blue-50 text-blue-600" :
                    "bg-green-50 text-green-600"
                  }`}>
                  {row.status}
                </span>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Add-ons & notes ── */}
          <div className="px-6">
            <SectionTitle>Add-ons &amp; notes</SectionTitle>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <Label>Store(s)</Label>
                <Value>2</Value>
              </div>
              <div>
                <Label>Estimated Service Time</Label>
                <Value>1.5 hrs</Value>
              </div>
              <div>
                <Label>Add-ons</Label>
                <ul className="mt-0.5 space-y-0.5">
                  {["Heavy Lifting Support  (+$10)", "In-Home Unpacking Assistance  (+$15)"].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-sm text-[#475467]">
                      <span className="mt-2 size-[5px] shrink-0 rounded-full bg-[#475467]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Label>Caregiver Notes</Label>
                <Value className="text-[#475467]">Please get organic vegetables if available.</Value>
              </div>
            </div>
          </div>

        </div>

        {/* ═══ RIGHT SIDEBAR ═══ */}
        <div className="flex w-full lg:w-[340px] shrink-0 flex-col gap-6">
          <CaseTimeline />
          <CommunicationNotes row={row} />
        </div>
      </div>

      {/* ── Second Row: Attached Evidence ── */}
      <div className="rounded-xl border border-[#EAECF0] bg-white shadow-sm">
        <div>

          <div className="border-b border-[#EAECF0] px-6 py-4">
            <SectionTitle>Attached Evidence</SectionTitle>
          </div>
          <div className=" p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File list */}
            <div className="flex flex-col gap-3">
              {EVIDENCE_FILES.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-[#EAECF0] bg-white px-4 py-3 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-medium text-[#344054] underline underline-offset-2">{file.name}</p>
                    <p className="text-xs text-[#667085]">{file.meta}</p>
                  </div>
                  <button type="button" className="flex size-7 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 transition-colors">
                    <Eye size={14} strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>

            {/* Drop zone */}
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D0D5DD] bg-[#FAFAFA] px-4 py-6 text-center">
              <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-[#FEF3F2]">
                <UploadCloud size={20} className="text-[#F04438]" strokeWidth={2} />
              </div>
              <p className="text-sm font-semibold text-[#344054]">Drop File Here</p>
              <p className="mt-1 text-xs text-[#667085]">
                Drag and drop your PDF, PNG, JPG, images here or browse | Max File Size: 10 MB
              </p>
              <button
                type="button"
                className="mt-2 text-sm font-semibold text-[#F04438] hover:underline transition-colors"
              >
                Browse File
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Third Row: Resolution ── */}
      <div className="rounded-xl border border-[#EAECF0] bg-white shadow-sm">

        <div className="border-b border-[#EAECF0] px-6 py-4">
          <SectionTitle> Resolution</SectionTitle>
        </div>
        <div className="p-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {RESOLUTION_OPTIONS.map((opt) => {
            const isSelected = resolution === opt;
            return (
              <label
                key={opt}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${isSelected
                  ? "border-[#F04438] bg-[#FEF3F2] text-[#F04438]"
                  : "border-[#D0D5DD] bg-white text-[#344054] hover:bg-gray-50"
                  }`}
              >
                <input
                  type="radio"
                  name="resolution"
                  value={opt}
                  checked={isSelected}
                  onChange={() => setResolution(opt)}
                  className="hidden"
                />
                <span className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${isSelected ? "border-[#F04438]" : "border-[#D0D5DD]"
                  }`}>
                  {isSelected && (
                    <span className="size-2 rounded-full bg-[#F04438]" />
                  )}
                </span>
                {opt}
              </label>
            );
          })}
        </div>

        {/* Conditional fields based on selected resolution */}
        {/* Conditional fields based on selected resolution */}
        <div className=" p-6">
          {resolution === "Issue Refund" && (
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label className="text-sm font-medium text-[#344054]">
                  Refund Amount ($) <span className="text-[#F04438]">*</span>
                </label>
                <span className="text-xs text-[#98A2B3]">Full or partial refund for the service</span>
              </div>
              <input
                type="text"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                placeholder="Enter Refund Amount"
                className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
              />
            </div>
          )}

          {resolution === "Reschedule Service" && (
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label className="text-sm font-medium text-[#344054]">
                  New Service Date <span className="text-[#F04438]">*</span>
                </label>
                <span className="text-xs text-[#98A2B3]">Schedule a new service appointment</span>
              </div>
              <input
                type="text"
                placeholder="MM-DD-YYYY – MM-DD-YYYY"
                className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
              />
            </div>
          )}

          {resolution === "Warn Provider" && (
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label className="text-sm font-medium text-[#344054]">
                  Warning Message <span className="text-[#F04438]">*</span>
                </label>
                <span className="text-xs text-[#98A2B3]">This will be documented in the provider's record</span>
              </div>
              <textarea
                rows={4}
                placeholder="Enter Warning Message"
                className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
              ></textarea>
            </div>
          )}

          {resolution === "Reassign PSP" && (
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label className="text-sm font-medium text-[#344054]">
                  Assign New PSP <span className="text-[#F04438]">*</span>
                </label>
                <span className="text-xs text-[#98A2B3]">Full or partial refund for the service</span>
              </div>
              <div className="relative">
                <select
                  defaultValue=""
                  className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
                >
                  <option value="" disabled hidden>Select New PSP</option>
                  <option>Lisa Wong</option>
                  <option>John Carter</option>
                  <option>Maria Santos</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              </div>
            </div>
          )}

          {resolution === "Close Case" && (
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label className="text-sm font-medium text-[#344054]">
                  Closure Notes <span className="text-[#F04438]">*</span>
                </label>
                <span className="text-xs text-[#98A2B3]">This will be documented in the provider's record</span>
              </div>
              <textarea
                rows={4}
                placeholder="Enter Closure Notes"
                className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
              ></textarea>
            </div>
          )}

          {resolution === "Additional Training Required" && (
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label className="text-sm font-medium text-[#344054]">
                  Additional Notes <span className="text-[#F04438]">*</span>
                </label>
                <span className="text-xs text-[#98A2B3]">This will be documented in the provider's record</span>
              </div>
              <textarea
                rows={4}
                placeholder="Enter Additional Notes"
                className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
              ></textarea>
            </div>
          )}

        </div>

        {/* ── Action buttons ── */}
        <div className=" flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#EAECF0] px-6 py-4">
          <button
            type="button"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[#F04438] px-5 py-2.5 text-sm font-semibold text-[#F04438] hover:bg-[#FEF3F2] transition-colors"
          >
            <User size={18} strokeWidth={2} />
            Escalate Supervisor
          </button>
          <button
            type="button"
            onClick={() => setIsResolveModalOpen(true)}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#F04438] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors shadow-sm"
          >
            <CircleCheck size={18} strokeWidth={2} />
            Resolved Case
          </button>
        </div>
      </div>

      <EscalationResolveModal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        onConfirm={() => {
          // Add logic to actually resolve the case here, e.g., an API call
          console.log("Escalation resolved!");
        }}
      />
    </div>
  );
};

export default EscalationDetailView;
