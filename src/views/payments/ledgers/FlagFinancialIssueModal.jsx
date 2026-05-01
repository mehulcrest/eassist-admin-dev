import { X, Flag, UploadCloud, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { useState } from "react";

const FlagFinancialIssueModal = ({ isOpen, onClose, record }) => {
  const [issueType, setIssueType] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Flagged financial issue for:", record?.ref, {
      issueType,
      severity,
      description,
      assignee,
    });
    setIssueType("");
    setSeverity("");
    setDescription("");
    setAssignee("");
    onClose();
  };

  const handleCancel = () => {
    setIssueType("");
    setSeverity("");
    setDescription("");
    setAssignee("");
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
        onClick={handleCancel}
      />

      {/* Card (Flex column with max height for scrolling) */}
      <div className="relative z-10 w-full max-w-[560px] max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-xl overflow-hidden">
        
        {/* Close Button - absolute positioning relative to card */}
        <button
          type="button"
          onClick={handleCancel}
          className="absolute right-4 top-4 z-20 rounded-lg p-1 text-[#667085] hover:bg-[#F2F4F7] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Scrollable Body area */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-2 min-h-0">
          
          {/* Icon & Header */}
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[#FEF3F2] ring-8 ring-[#FEF3F2]/50">
            <Flag size={20} className="text-[#F04438]" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold text-[#101828]">Flag Financial Issue</h2>
          <p className="mt-1 text-sm text-[#475467]">
            Report discrepancies, risks, or anomalies for this record.
          </p>

          <div className="mt-6 flex flex-col gap-5">
            {/* Row 1: Type & Severity */}
            <div className="flex flex-col min-[500px]:flex-row gap-4">
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium text-[#344054]">Issue Type</label>
                <div className="relative">
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer appearance-none"
                  >
                    <option value="">Select issue type</option>
                    <option value="discrepancy">Amount discrepancy</option>
                    <option value="duplicate">Duplicate charge</option>
                    <option value="fraud">Suspected fraud</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium text-[#344054]">Severity Level</label>
                <div className="relative">
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer appearance-none"
                  >
                    <option value="">Select Severity type</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <label className="block text-sm font-medium text-[#344054]">Description</label>
                <span className="text-xs text-[#667085]">Provide detailed context to help investigation.</span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail (e.g., mismatch in payout amount, duplicate charge, etc.)"
                className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white p-3.5 text-sm text-[#101828] placeholder:text-[#98A2B3] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
              />
            </div>

            {/* Attach Evidence */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">Attach Evidence (Optional)</label>
              <div className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#FCA5A5] bg-[#FEF2F2]/30 px-6 py-5 text-center transition-colors hover:bg-[#FEF2F2]/60 cursor-pointer">
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-[#FEF3F2]">
                  <UploadCloud size={20} className="text-[#F04438]" />
                </div>
                <p className="text-sm font-semibold text-[#101828]">Drop File Here</p>
                <p className="mt-1 text-xs text-[#667085]">
                  Drag and drop your PDF, PNG, JPG, images here or browse | Max File Size: 10 MB
                </p>
                <p className="mt-1 text-xs font-semibold text-[#F04438] underline underline-offset-2">
                  Browse File
                </p>
              </div>
            </div>

            {/* Assign To */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">Assign to</label>
              <div className="relative">
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer appearance-none"
                >
                  <option value="">Select assign type</option>
                  <option value="finance">Finance Team</option>
                  <option value="risk">Risk Team</option>
                  <option value="support">Support Team</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-6 mb-5 text-sm text-[#475467] leading-relaxed">
            <p>Flagging this issue will notify the finance and risk teams.</p>
            <p>This entry may be temporarily restricted from processing.</p>
          </div>
        </div>

        {/* Footer sticky */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#EAECF0] shrink-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-[#F04438] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            Submit Issue
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FlagFinancialIssueModal;
