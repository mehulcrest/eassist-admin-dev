import { CheckCircle2, CornerUpRight, Info, ChevronDown, XCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SideSheet from "../../../components/SideSheet";

const STATUS_STYLE = {
  Approved: "text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6]",
  Pending: "text-[#B54708] bg-[#FFFAEB] border border-[#FEDF89]",
  Rejected: "text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA]",
  Escalated: "text-[#175CD3] bg-[#EFF8FF] border border-[#B2DDFF]",
};

const FieldLabel = ({ children }) => (
  <p className="mb-1 text-xs font-medium text-[#333333]">{children}</p>
);

const FieldValue = ({ children, className = "" }) => (
  <p className={`text-sm text-[#667085]  ${className}`}>{children}</p>
);

const SectionTitle = ({ children }) => (
  <h3 className="mb-4 text-base font-bold text-[#101828] tracking-tight">{children}</h3>
);

const HDivider = () => <div className="my-6 border-t border-[#EAECF0]" />;

/* ─── Timeline Row ─── */
const TimelineRow = ({ label, isLast }) => (
  <div className="flex gap-4 min-h-[44px]">
    <div className="flex shrink-0 flex-col items-center" style={{ width: 18 }}>
      <div
        className="mt-[3px] shrink-0 rounded-full border-2 border-[#F04438] bg-white"
        style={{ width: 10, height: 10 }}
      />
      {!isLast && (
        <div
          className="mt-1 flex-1"
          style={{ width: 0, borderLeft: "2px dashed #FECDCA", minHeight: 24 }}
        />
      )}
    </div>
    <p className="pb-2 text-sm text-[#475467]">{label}</p>
  </div>
);

const RefundDetailSheet = ({ isOpen, onClose, entry, onApprove, onEscalate, onReject }) => {
  const [isActionOpen, setIsActionOpen] = useState(false);
  const actionRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setIsActionOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!isOpen || !entry) return null;

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title={`Refund Details - ${entry.refundId} • ${entry.credit} • ${entry.status}`}
      widthClass="w-[480px]"
      footer={
        <div className="flex w-full gap-3">
          <div className="relative flex-1" ref={actionRef}>
            <button
              type="button"
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
            >
              Take Action
              <ChevronDown size={16} />
            </button>
            {isActionOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-[#EAECF0] bg-white shadow-xl py-1 z-50">
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] transition-colors"
                  onClick={() => {
                    setIsActionOpen(false);
                    if (onApprove) onApprove(entry);
                  }}
                >
                  <CheckCircle2 size={16} className="text-[#667085]" />
                  Approve Refund
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] transition-colors"
                  onClick={() => {
                    setIsActionOpen(false);
                    if (onEscalate) onEscalate(entry);
                  }}
                >
                  <CornerUpRight size={16} className="text-[#667085]" />
                  Escalate
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#F04438] hover:bg-[#FEF3F2] transition-colors"
                  onClick={() => {
                    setIsActionOpen(false);
                    if (onReject) onReject(entry);
                  }}
                >
                  <XCircle size={16} className="text-[#F04438]" />
                  Reject
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="pb-4">

        {/* ── Entry Details ── */}
        <SectionTitle > Entry Details</SectionTitle>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          <div>
            <FieldLabel>Member (User)</FieldLabel>
            <FieldValue className="underline underline-offset-2 cursor-pointer hover:text-[#F04438]">
              {entry.member}
            </FieldValue>
          </div>
          <div>
            <FieldLabel>Member ID</FieldLabel>
            <FieldValue>{entry.memberId || "E001"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Caregiver (PSP)</FieldLabel>
            <FieldValue className="underline underline-offset-2 cursor-pointer hover:text-[#F04438]">
              {entry.psp}
            </FieldValue>
          </div>
          <div>
            <FieldLabel>PSP ID</FieldLabel>
            <FieldValue>{entry.pspId || "PSP001"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Refund ID</FieldLabel>
            <FieldValue>{entry.refundId}</FieldValue>
          </div>
          <div>
            <FieldLabel>Requested Date</FieldLabel>
            <FieldValue>{entry.requestedOn}</FieldValue>
          </div>
          <div>
            <FieldLabel>Type</FieldLabel>
            <FieldValue>{entry.type}</FieldValue>
          </div>
          <div>
            <FieldLabel>Status</FieldLabel>
            <div className="mt-1">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border-none ${STATUS_STYLE[entry.status] || "text-[#DC6803] bg-[#FFFAEB]"}`}>
                {entry.status}
              </span>
            </div>
          </div>
          <div className="col-span-2">
            <FieldLabel>Refund Requested By</FieldLabel>
            <FieldValue className="text-[#475467] font-normal">{entry.requestedBy || `Member (${entry.member})`}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Original Transaction ── */}
        <SectionTitle >Original Transaction</SectionTitle>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          <div>
            <FieldLabel>Transaction ID</FieldLabel>
            <FieldValue className="text-[#175CD3]">{entry.txId || "TXN1001"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Job ID</FieldLabel>
            <FieldValue className="text-[#175CD3]">{entry.jobId || "JOB234"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Payout ID</FieldLabel>
            <FieldValue className="text-[#175CD3]">{entry.payoutId || "PAY001"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Service</FieldLabel>
            <FieldValue className="text-[#475467] font-normal">{entry.service || "Cleaning Service"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Paid Amount</FieldLabel>
            <FieldValue>{entry.paidAmount || "$120"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Date</FieldLabel>
            <FieldValue className="text-[#475467] font-normal">{entry.txDate || "Mar 14, 2026"}</FieldValue>
          </div>
          <div className="col-span-2">
            <FieldLabel>Payment Method</FieldLabel>
            <FieldValue className="text-[#475467] font-normal">{entry.paymentMethod || "Card (**** 4587)"}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Reason & Notes ── */}
        <SectionTitle>Reason & Notes</SectionTitle>
        <div className="grid grid-cols-1 gap-y-2 mb-2 text-sm text-[#475467] min-[431px]:grid-cols-2 min-[431px]:gap-x-4">
          <div>
            <FieldLabel>Reason</FieldLabel>
            <FieldValue className="text-[#475467] font-normal">{entry.reason}</FieldValue>
          </div>
          <div>
            <FieldLabel>User Notes</FieldLabel>
            <FieldValue className="text-[#475467] font-normal">{entry.notes || "Cleaner did not arrive"}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Approval Logs ── */}
        <SectionTitle>Approval Logs</SectionTitle>
        <div className="mt-4">
          {entry.logs ? entry.logs.map((item, idx) => (
            <TimelineRow key={idx} label={item} isLast={idx === entry.logs.length - 1} />
          )) : (
            <>
              <TimelineRow label={`Mar 14  Refund requested by user (${entry.member})`} />
              <TimelineRow label="Mar 14  Submitted for review" isLast />
            </>
          )}
        </div>

        <HDivider />

        {/* ── Refund Breakdown ── */}
        <SectionTitle>Refund Breakdown</SectionTitle>
        <div className="mt-4 rounded-xl bg-[#F6F6F6] px-5 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Service Amount</span>
            <span>{entry.serviceAmount || "$100.00"}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Tax</span>
            <span>{entry.tax || "$20.00"}</span>
          </div>

          <div className="flex items-center justify-between border-t border-[#EAECF0]  font-medium text-[#101828] text-sm pt-2">
            <span>Total Paid:</span>
            <span>{entry.totalPaid || "$120.00"}</span>
          </div>
        </div>

        <div className="mt-2 rounded-xl bg-[#F6F6F6] px-5 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Refund Requested</span>
            <span>{entry.refundRequested || "$120.00"}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Processing Fee</span>
            <span>{entry.processingFee || "$0.00"}</span>
          </div>

          <div className="flex items-center justify-between border-t border-[#EAECF0] pt-4 font-medium text-sm text-[#F04438]">
            <span>Final Refund:</span>
            <span>{entry.finalRefund || "$120.00"}</span>
          </div>
        </div>


      </div>
    </SideSheet>
  );
};

export default RefundDetailSheet;
