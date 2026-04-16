import { AlertCircle, X } from "lucide-react";

/**
 * EscalationResolveModal Component
 * 
 * A premium confirmation dialogue for resolving an escalation.
 * Matches the admin panel's design system with Lucide icons and Tailwind CSS.
 */
const EscalationResolveModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101828]/60 p-4 backdrop-blur-sm">
      <div 
        className="w-full max-w-[400px] overflow-hidden rounded-xl bg-white shadow-xl animate-in fade-in zoom-in duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header - Icon & Close */}
        <div className="relative p-6 pb-0">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-[#98A2B3] hover:text-[#667085] transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex size-12 items-center justify-center rounded-full bg-[#FEF3F2]">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#FEE4E2]">
              <AlertCircle size={24} className="text-[#D92D20]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#101828]">Resolve Escalation</h3>
          <p className="mt-2 text-sm text-[#667085] leading-relaxed">
            Are you sure you want to resolve this escalation? Once resolved, the status will be marked as 'Resolved' and the member will be notified of the outcome.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-3 p-6 pt-0 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-sm hover:bg-gray-50 transition-colors"
          >
            No, Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 rounded-lg bg-[#F04438] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#D92D20] transition-colors"
          >
            Yes, Resolve Case
          </button>
        </div>
      </div>
    </div>
  );
};

export default EscalationResolveModal;
