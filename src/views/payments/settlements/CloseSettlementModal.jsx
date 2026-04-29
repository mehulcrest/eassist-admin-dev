import { X, XCircle } from "lucide-react";
import { createPortal } from "react-dom";

const CloseSettlementModal = ({ isOpen, onClose, record }) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Close Settlement:", record?.id);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 w-[400px] flex flex-col items-center rounded-2xl bg-white p-6 shadow-xl overflow-hidden text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-lg p-1 text-[#667085] hover:bg-[#F2F4F7] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mb-5 mt-2 inline-flex size-14 items-center justify-center rounded-full bg-[#FEF3F2] ring-[10px] ring-[#FEF3F2]/50">
          <XCircle size={28} className="text-[#F04438]" strokeWidth={2} />
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-[#101828] mb-2">Close Settlement Cycle?</h2>
        <div className="text-sm text-[#475467] leading-relaxed mb-8">
          <p>You are about to close this settlement cycle.</p>
          <p>No further changes (refunds, adjustments, payouts) will be allowed.</p>
        </div>

        {/* Buttons (Stacked) */}
        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-[#F04438] px-4 py-2.5 text-base font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            Confirm & Close
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-base font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CloseSettlementModal;
