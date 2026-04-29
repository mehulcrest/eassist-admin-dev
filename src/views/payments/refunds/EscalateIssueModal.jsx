import { X, AlertCircle, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { useState } from "react";

const EscalateIssueModal = ({ isOpen, onClose, record }) => {
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Escalate Issue:", { assignee, priority, note });
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
      <div className="relative z-10 w-full max-w-[480px] max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-lg p-1 text-[#667085] hover:bg-[#F2F4F7] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-2 min-h-0">
          {/* Header */}
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[#FEF3F2] ring-8 ring-[#FEF3F2]/50">
            <AlertCircle size={24} className="text-[#F04438]" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold text-[#101828]">Escalate Issue</h2>
          
          <div className="mt-2 text-sm text-[#475467] leading-relaxed">
            <p>User requesting a refund of <span className="font-bold text-[#101828]">{record?.credit || "$120"}</span>.</p>
            <p>Escalate this case for further investigation.</p>
            <p>Processing will be paused until resolution.</p>
          </div>

          <div className="mt-6 flex flex-col gap-5 mb-6">
            {/* Assign to */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">Assign to</label>
              <div className="relative">
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer appearance-none"
                >
                  <option value="">Select Reason</option>
                  <option value="finance">Finance Team</option>
                  <option value="call_center">Call Center</option>
                  <option value="support">Support</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              </div>
            </div>

            {/* Priority Radios */}
            <div>
              <label className="mb-2.5 block text-sm font-medium text-[#344054]">Priority</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`flex size-4 items-center justify-center rounded-full border ${priority === "Medium" ? "border-[#F04438]" : "border-[#D0D5DD]"}`}>
                    {priority === "Medium" && <div className="size-2 rounded-full bg-[#F04438]" />}
                  </div>
                  <span className="text-sm font-medium text-[#344054]">Medium</span>
                  <input
                    type="radio"
                    name="priority"
                    value="Medium"
                    checked={priority === "Medium"}
                    onChange={(e) => setPriority(e.target.value)}
                    className="sr-only"
                  />
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`flex size-4 items-center justify-center rounded-full border ${priority === "High" ? "border-[#F04438]" : "border-[#D0D5DD]"}`}>
                    {priority === "High" && <div className="size-2 rounded-full bg-[#F04438]" />}
                  </div>
                  <span className="text-sm font-medium text-[#344054]">High</span>
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={priority === "High"}
                    onChange={(e) => setPriority(e.target.value)}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* Internal Note */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">Add internal note (optional)</label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Describe anything you want"
                className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white p-3.5 text-sm text-[#101828] placeholder:text-[#98A2B3] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
              />
            </div>
          </div>
        </div>

        {/* Footer sticky */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#EAECF0] shrink-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-[#F04438] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            Escalate Case
          </button>
          <button
            type="button"
            onClick={onClose}
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

export default EscalateIssueModal;
