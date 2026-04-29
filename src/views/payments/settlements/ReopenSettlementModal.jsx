import { X, Edit3, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

const FieldLabel = ({ children }) => (
  <p className="mb-1 text-xs font-semibold text-[#101828]">{children}</p>
);

const FieldValue = ({ children }) => (
  <p className="text-sm font-medium text-[#475467]">{children}</p>
);

const HDivider = () => <div className="my-5 border-t border-[#EAECF0]" />;

const ReopenSettlementModal = ({ isOpen, onClose, record }) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Reopen Settlement:", record?.id);
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
      <div className="relative z-10 w-[560px] flex flex-col rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-thin">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-lg p-1 text-[#667085] hover:bg-[#F2F4F7] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Focus Header */}
        <div className="mb-4 mt-2">
          <div className="inline-flex size-14 items-center justify-center rounded-full bg-[#FEF3F2] ring-[10px] ring-[#FEF3F2]/50 mb-6">
            <Edit3 size={24} className="text-[#F04438]" strokeWidth={2} />
          </div>
          <h2 className="text-[22px] font-bold text-[#101828] tracking-tight mb-2">
            Reopen Settlement Cycle
          </h2>
          <div className="space-y-1 text-sm text-[#475467]">
            <p>Unlock a closed cycle to allow corrections and updates</p>
            <p>This may impact financial reports and previously finalized balances.</p>
          </div>
        </div>

        {/* ── Entry Details ── */}
        <h3 className="mb-3 text-base font-bold text-[#101828]">Entry Details</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <FieldLabel>Cycle ID</FieldLabel>
            <FieldValue>{record?.id || "CYC003"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Period</FieldLabel>
            <FieldValue>{record?.period || "Mar 15 – Mar 21, 2026"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Closed On</FieldLabel>
            <FieldValue>Mar 26, 2026</FieldValue>
          </div>
          <div>
            <FieldLabel>Closed By</FieldLabel>
            <FieldValue>Robert Brown</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Re-enable Details ── */}
        <h3 className="mb-3 text-sm font-bold text-[#101828]">Reopen Cycle will be re-enabled:</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-2 text-sm text-[#475467]">
          <p>• Modify payouts</p>
          <p>• Adjust ledger entries</p>
          <p>• Process refunds</p>
          <p>• Update tax calculations</p>
        </div>

        <HDivider />

        {/* ── Form ── */}
        <div className="space-y-5 w-full">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#101828]">
              Reason for reopening
            </label>
            <div className="relative">
              <select
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#667085] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
                defaultValue=""
              >
                <option value="" disabled hidden>Select reason</option>
                <option value="1">Administrative Correction</option>
                <option value="2">Missing Transactions</option>
                <option value="3">Tax Adjustment</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-medium text-[#101828]">Description</label>
              <span className="text-xs text-[#667085]">Provide detailed context to help in audit logs.</span>
            </div>
            <textarea
              className="min-h-[100px] w-full resize-none rounded-lg border border-[#D0D5DD] bg-white p-3.5 text-sm text-[#101828] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              placeholder="Provide a clear justification (required for audit logs)"
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-8 flex gap-3 w-full">
          <button
            type="button"
            onClick={handleSubmit}
            className="h-11 flex-1 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            Reopen Cycle
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReopenSettlementModal;
