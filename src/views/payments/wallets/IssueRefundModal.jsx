import { useState } from "react";
import { ChevronDown, CircleDollarSign, X } from "lucide-react";
import { createPortal } from "react-dom";

const REFUND_REASONS = [
  "Service Cancellation",
  "Overcharge",
  "Quality Issue",
  "Duplicate Charge",
  "Other",
];

const IssueRefundModal = ({ isOpen, onClose, member }) => {
  const [amount,       setAmount]       = useState("");
  const [reason,       setReason]       = useState("");
  const [notes,        setNotes]        = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const reset = () => {
    setAmount(""); setReason(""); setNotes(""); setShowDropdown(false);
  };

  const handleProcess = () => {
    console.log("Refund issued:", { member: member?.name, amount, reason, notes });
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
          <CircleDollarSign size={22} className="text-[#F04438]" strokeWidth={2} />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-[#101828]">Issue Refund</h2>
        <p className="mt-1 text-sm text-[#667085]">
          Refund will be credited to original payment method.
          <br />
          This action impacts platform balance.
        </p>

        {/* Refund Amount */}
        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-[#344054]">
            Refund Amount
          </label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Refund amount"
            className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
          />
          <p className="mt-1.5 text-xs text-[#667085]">
            Max refundable amount:{" "}
            <span className="font-semibold">{member?.refundBalance ?? "$120"}</span>
          </p>
        </div>

        {/* Reason */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-[#344054]">Reason</label>
            <span className="text-xs text-[#667085] italic">This reason will be visible to the user.</span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown((p) => !p)}
              className="flex h-11 w-full items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-sm focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
            >
              <span className={reason ? "text-[#344054]" : "text-[#98A2B3]"}>
                {reason || "Select Reason"}
              </span>
              <ChevronDown
                size={16}
                className={`text-[#667085] transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {showDropdown && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-xl border border-[#EAECF0] bg-white shadow-lg">
                {REFUND_REASONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => { setReason(r); setShowDropdown(false); }}
                    className={`flex w-full items-center px-4 py-3 text-left text-sm transition-colors hover:bg-[#F9FAFB] ${
                      reason === r ? "text-[#F04438] font-semibold" : "text-[#344054]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-[#344054]">Notes</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe anything you want"
            className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2.5 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
          />
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleProcess}
            className="h-11 flex-1 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            Process Refund
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

export default IssueRefundModal;
