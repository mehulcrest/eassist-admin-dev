import { Eye } from "lucide-react";
import { useState } from "react";
import SideSheet from "../SideSheet";

const REJECT_REASONS = [
  "Invalid Document",
  "Expired Document",
  "Mismatched Information",
  "Blurry / Unreadable",
  "Incorrect Document Type",
  "Incomplete Document",
  "Duplicate Upload",
  "Fraud Suspected",
  "Other",
];

const REQUEST_UPDATE_REASONS = [
  "Missing Information",
  "Incorrect Details",
  "Expired Document",
  "Signature Missing",
  "Partial Upload",
  "Low Quality Image",
  "Wrong File Format",
  "Needs Re-upload",
  "Additional Document Required",
  "Other",
];

const Toggle = ({ active, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
      active ? "bg-[#12B76A]" : "bg-[#D0D5DD]"
    }`}
    aria-pressed={active}
  >
    <span
      className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${
        active ? "left-[18px]" : "left-0.5"
      }`}
    />
  </button>
);

const ReviewDocumentSideSheet = ({ isOpen, onClose, documentName }) => {
  const [reviewAction, setReviewAction] = useState("approve");
  const [reviewNotes, setReviewNotes] = useState("");
  const [verifiedBy, setVerifiedBy] = useState("Robert Brown");
  const [notifyApproval, setNotifyApproval] = useState(true);
  const [requestReason, setRequestReason] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [notifyRequest, setNotifyRequest] = useState(true);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectComments, setRejectComments] = useState("");
  const [notifyReject, setNotifyReject] = useState(true);

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Review Document"
      footer={
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="h-11 flex-1 rounded-lg bg-[#F04438] px-4 text-sm font-semibold text-white transition hover:bg-[#D92D20]"
          >
            {reviewAction === "approve"
              ? "Approve Document"
              : reviewAction === "request"
                ? "Request Update"
                : "Reject Document"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <p className="font-medium text-[#344054]">{documentName}</p>
          <p className="text-[#667085]">
            Current Status: <span className="font-semibold text-[#F79009]">Pending</span>
          </p>
        </div>

        <div className="rounded-lg border border-[#EAECF0] p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-[#475467]">maria-driver&apos;s-license.pdf</p>
              <p className="mt-1 text-xs text-[#98A2B3]">6MB - Mar 03, 2021</p>
            </div>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] text-[#667085]"
              aria-label="Preview document"
            >
              <Eye size={14} />
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-[#EF444433]">
          <div className="grid grid-cols-3 overflow-hidden rounded-lg">
            {[
              { id: "approve", label: "Approve" },
              { id: "request", label: "Request Update" },
              { id: "reject", label: "Reject" },
            ].map((option, index) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setReviewAction(option.id)}
                className={`relative h-8 text-xs font-medium transition border-l border-[#EF444433] first:border-l-0 ${
                  reviewAction === option.id
                    ? `z-10 bg-[#FFE9E9] ring-inset ring-1 ring-[#E4302F] text-[#E4302F] ${
                        index === 0 ? "rounded-l-lg" : index === 2 ? "rounded-r-lg" : ""
                      }`
                    : "text-[#344054]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {reviewAction === "approve" ? (
          <div className="space-y-4">
            <div className="space-y-1 text-sm text-[#344054]">
              <p>This document will be marked as verified.</p>
              <p>Verified documents will be used for compliance approval</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">Verification Notes</label>
              <textarea
                rows={4}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add internal notes (optional)"
                className="w-full rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">Verified By</label>
              <input
                value={verifiedBy}
                onChange={(e) => setVerifiedBy(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054]"
              />
            </div>
            <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-[#344054]">
                Notify PSP <span className="text-[#F04438]">*</span>
              </p>
              <p className="text-xs text-[#667085]">Notify PSP about approval</p>
            </div>
            <Toggle active={notifyApproval} onToggle={() => setNotifyApproval((p) => !p)} />
            </div>
          </div>
        ) : null}

        {reviewAction === "request" ? (
          <div className="space-y-4">
            <p className="text-sm text-[#344054]">Request updates or corrections from the PSP.</p>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">
                Issue Type <span className="text-[#F04438]">*</span>
              </label>
              <select
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054]"
              >
                <option value="" disabled>Select Issue Type</option>
                {REQUEST_UPDATE_REASONS.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">Issue Description</label>
              <textarea
                rows={4}
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                placeholder="Clearly explain what needs to be fixed..."
                className="w-full rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-[#344054]">
                  Notify PSP <span className="text-[#F04438]">*</span>
                </p>
                <p className="text-xs text-[#667085]">Notify PSP about required action</p>
              </div>
              <Toggle active={notifyRequest} onToggle={() => setNotifyRequest((p) => !p)} />
            </div>
          </div>
        ) : null}

        {reviewAction === "reject" ? (
          <div className="space-y-4">
            <p className="text-sm text-[#344054]">This document will be marked as rejected and the PSP will be notified.</p>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">
                Reject Reason <span className="text-[#F04438]">*</span>
              </label>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054]"
              >
                <option value="" disabled>Select Rejection Reason</option>
                {REJECT_REASONS.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">Additional Comments</label>
              <textarea
                rows={4}
                value={rejectComments}
                onChange={(e) => setRejectComments(e.target.value)}
                placeholder="Provide details to help the PSP correct the issue..."
                className="w-full rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-[#344054]">
                  Notify PSP <span className="text-[#F04438]">*</span>
                </p>
                <p className="text-xs text-[#667085]">Notify PSP about rejection</p>
              </div>
              <Toggle active={notifyReject} onToggle={() => setNotifyReject((p) => !p)} />
            </div>
          </div>
        ) : null}
      </div>
    </SideSheet>
  );
};

export default ReviewDocumentSideSheet;
