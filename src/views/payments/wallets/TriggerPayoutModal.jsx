import { CircleCheckBig, X } from "lucide-react";
import { createPortal } from "react-dom";

const TriggerPayoutModal = ({ isOpen, onClose, psp }) => {
  if (!isOpen || !psp) return null;

  const handleConfirm = () => {
    console.log("Payout confirmed for:", psp.name, psp.pendingEarnings);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-[440px] rounded-2xl bg-white shadow-xl p-6">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-[#667085] hover:bg-[#F2F4F7] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[#FEF3F2]">
          <CircleCheckBig size={22} className="text-[#F04438]" strokeWidth={2} />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-[#101828]">Confirm Payout</h2>
        <p className="mt-1 text-sm text-[#667085]">
          You are about to release{" "}
          <span className="font-semibold text-[#101828]">{psp.pendingEarnings}</span> to{" "}
          <span className="font-semibold text-[#101828]">{psp.name}</span>.
          <br />
          This action cannot be reversed.
        </p>

        {/* Bank Account */}
        <div className="mt-5">
          <p className="text-sm font-semibold text-[#344054]">Paid to Bank Account</p>
          <p className="mt-1 text-sm text-[#667085]">{psp.bankAccount ?? "xxx 4567"}</p>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-[#EAECF0]" />

        {/* Grid info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-[#344054]">Estimated arrival</p>
            <p className="mt-0.5 text-sm text-[#667085]">1–2 business days</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#344054]">Method</p>
            <p className="mt-0.5 text-sm text-[#667085]">{psp.payoutMethod ?? "Bank Transfer"}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-[#EAECF0]" />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            className="h-11 flex-1 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            Confirm &amp; Release
          </button>
          <button
            type="button"
            onClick={onClose}
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

export default TriggerPayoutModal;
