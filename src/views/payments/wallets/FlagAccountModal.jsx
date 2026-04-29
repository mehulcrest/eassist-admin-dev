import { useState } from "react";
import { ChevronDown, Flag, X } from "lucide-react";
import { createPortal } from "react-dom";

const FLAG_ISSUE_TYPES = [
  "Service cancellation",
  "Overcharge",
  "Quality issue",
  "Other",
];

const FlagAccountModal = ({ isOpen, onClose, member }) => {
  const [issueType,    setIssueType]    = useState("");
  const [description,  setDescription]  = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const reset = () => {
    setIssueType(""); setDescription(""); setShowDropdown(false);
  };

  const handleSubmit = () => {
    console.log("Account flagged:", { member: member?.name, issueType, description });
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/30"
        onClick={handleCancel}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[460px] rounded-2xl bg-white shadow-xl p-6">
        {/* Close */}
        <button
          type="button"
          onClick={handleCancel}
          className="absolute right-4 top-4 rounded-lg p-1 text-[#667085] hover:bg-[#F2F4F7] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[#FEF3F2]">
          <Flag size={22} className="text-[#F04438]" strokeWidth={2} />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-[#101828]">Flag Account</h2>
        <p className="mt-1 text-sm text-[#667085]">
          Flag this account for suspicious or abnormal activity.
          <br />
          This may restrict future transactions.
        </p>

        {/* Issue Type */}
        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-[#344054]">Issue Type</label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown((p) => !p)}
              className="flex h-11 w-full items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-sm focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
            >
              <span className={issueType ? "text-[#344054]" : "text-[#98A2B3]"}>
                {issueType || "Select issue type"}
              </span>
              <ChevronDown
                size={16}
                className={`text-[#667085] transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {showDropdown && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-xl border border-[#EAECF0] bg-white shadow-lg">
                {FLAG_ISSUE_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => { setIssueType(type); setShowDropdown(false); }}
                    className={`flex w-full items-center px-4 py-3 text-left text-sm transition-colors hover:bg-[#F9FAFB] ${
                      issueType === type ? "text-[#F04438] font-semibold" : "text-[#344054]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-[#344054]">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe anything you want"
            className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2.5 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
          />
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="h-11 flex-1 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            Submit Flag
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FlagAccountModal;
