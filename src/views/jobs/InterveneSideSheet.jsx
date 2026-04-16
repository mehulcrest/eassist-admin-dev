import { useState } from "react";
import {
  ChevronRight,
  Clock,
  MapPin,
  MessageCircleMore,
  Phone,
  PenSquare,
  Trash2,
  X,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Reusable Quick-Action button
───────────────────────────────────────────── */
const QuickActionBtn = ({ icon: Icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
  >
    <Icon size={16} className="text-[#667085]" strokeWidth={2} />
    {label}
  </button>
);

/* ─────────────────────────────────────────────
   Reusable Manage-Job row
───────────────────────────────────────────── */
const ManageJobRow = ({ icon: Icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center justify-between rounded-lg border border-[#EAECF0] bg-white px-4 py-3.5 text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50"
  >
    <span className="flex items-center gap-3">
      <Icon size={16} className="text-[#667085]" strokeWidth={2} />
      {label}
    </span>
    <ChevronRight size={16} className="text-[#98A2B3]" />
  </button>
);

/* ─────────────────────────────────────────────
   Main InterveneSideSheet
   Props:
     isOpen      – boolean
     onClose     – () => void
     job         – job object { id, serviceName, member, caregiver, statusText, statusColor }
───────────────────────────────────────────── */
const InterveneSideSheet = ({ isOpen, onClose, job }) => {
  const [notes, setNotes] = useState("");

  if (!isOpen || !job) return null;

  const handleSave = () => {
    // Future: wire up to API
    console.log("Intervene saved for job", job.id, { notes });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="intervene-title"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-full sm:max-w-[480px] flex-col bg-white shadow-2xl transition-transform duration-300"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-[#EAECF0] px-6 py-5 shrink-0">
          <h2 id="intervene-title" className="text-xl font-bold text-[#101828]">
            Intervene in Job {job.id}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-[#667085] transition-colors hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Service + Member info */}
          <div>
            <p className="mb-3 text-base font-bold text-[#101828]">{job.serviceName}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <img
                  src={job.member.avatar}
                  alt=""
                  className="size-10 rounded-full object-cover ring-1 ring-[#EAECF0] shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#101828] truncate">{job.member.name}</p>
                  <div className="mt-0.5 flex items-start gap-1 text-xs text-[#667085]">
                    <MapPin size={15} className="mt-[2px] shrink-0" />
                    <span className="break-words">{job.member.address}</span>
                  </div>
                </div>
              </div>
              {/* Status pill */}
              <div className="flex justify-start sm:block">
                <span className="shrink-0 rounded-full bg-[#EFF8FF] px-2.5 py-0.5 text-xs font-semibold text-[#007AFF]">
                  {job.statusText === "In Progress" ? "In Progress" : job.statusText}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F2F4F7]" />

          {/* Quick Actions */}
          <div>
            <p className="mb-3 text-base font-bold text-[#101828]">Quick Actions</p>
            <div className="grid grid-cols-1 gap-3 grid-cols-2">
              <QuickActionBtn icon={Phone} label="Call PSP" onClick={() => console.log("Call PSP")} />
              <QuickActionBtn icon={Phone} label="Call Member" onClick={() => console.log("Call Member")} />
              <QuickActionBtn icon={MessageCircleMore} label="Message PSP" onClick={() => console.log("Message PSP")} />
              <QuickActionBtn icon={MessageCircleMore} label="Message Member" onClick={() => console.log("Message Member")} />
            </div>
          </div>

          {/* Caregiver */}
          <div>
            <p className="mb-2 text-sm font-semibold text-[#667085]">Caregiver</p>
            <div className="flex items-center gap-2.5">
              <img
                src={job.caregiver.avatar}
                alt=""
                className="size-9 rounded-full object-cover ring-1 ring-[#EAECF0]"
              />
              <button
                type="button"
                className="text-sm font-semibold text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors"
              >
                {job.caregiver.name}
              </button>
            </div>
          </div>

          <div className="border-t border-[#F2F4F7]" />

          {/* Manage Job */}
          <div>
            <p className="mb-3 text-base font-bold text-[#101828]">Manage Job</p>
            <div className="space-y-3">
              <ManageJobRow icon={PenSquare} label="Reassign PSP" onClick={() => console.log("Reassign PSP")} />
              <ManageJobRow icon={Clock} label="Reschedule Job" onClick={() => console.log("Reschedule Job")} />
              <ManageJobRow icon={Trash2} label="Cancel Job" onClick={() => console.log("Cancel Job")} />
            </div>

            {/* Raise Escalation — right-aligned */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => console.log("Raise Escalation")}
                className="rounded-lg bg-[#F04438] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#D92D20] transition-colors"
              >
                Raise Escalation
              </button>
            </div>
          </div>

          <div className="border-t border-[#F2F4F7]" />

          {/* Internal Notes */}
          <div>
            <label
              htmlFor="internal-notes"
              className="mb-1.5 block text-sm font-semibold text-[#344054]"
            >
              Internal Notes
            </label>
            <textarea
              id="internal-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write internal notes for admin use only"
              rows={4}
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-3 text-sm text-[#101828] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex  gap-3 border-t border-[#EAECF0] px-6 py-4 shrink-0 sm:flex-row">
          <button
            type="button"
            onClick={handleSave}
            className="h-11 flex-1 rounded-lg bg-[#F04438] text-base font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            Save
          </button>
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

export default InterveneSideSheet;
