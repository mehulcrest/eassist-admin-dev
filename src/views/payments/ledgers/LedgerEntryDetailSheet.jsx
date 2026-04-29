import SideSheet from "../../../components/SideSheet";

const STATUS_STYLE = {
  Completed: "text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6]",
  Pending:   "text-[#B54708] bg-[#FFFAEB] border border-[#FEDF89]",
  Failed:    "text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA]",
};

const FieldLabel = ({ children }) => (
  <p className="mb-1 text-xs font-semibold text-[#667085]">{children}</p>
);

const FieldValue = ({ children, className = "" }) => (
  <p className={`text-sm font-medium text-[#101828] ${className}`}>{children}</p>
);

const SectionTitle = ({ children }) => (
  <h3 className="mb-4 text-sm font-bold text-[#101828] tracking-tight">{children}</h3>
);

const HDivider = () => <div className="my-6 border-t border-[#EAECF0]" />;

const LedgerEntryDetailSheet = ({ isOpen, onClose, entry }) => {
  if (!isOpen || !entry) return null;

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Ledger Entry Details"
      widthClass="w-[420px]"
      footer={
        <div className="flex w-full gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            Got it
          </button>
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
        <SectionTitle>Entry Details</SectionTitle>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          <div>
            <FieldLabel>Member</FieldLabel>
            <FieldValue className="text-[#175CD3] underline underline-offset-2 cursor-pointer">
              {entry.member}
            </FieldValue>
          </div>
          <div>
            <FieldLabel>Member ID</FieldLabel>
            <FieldValue>{entry.memberId ?? "PSP001"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Reference</FieldLabel>
            <FieldValue>{entry.ref}</FieldValue>
          </div>
          <div>
            <FieldLabel>Date</FieldLabel>
            <FieldValue>{entry.date}</FieldValue>
          </div>
          <div>
            <FieldLabel>Type</FieldLabel>
            <FieldValue>{entry.type}</FieldValue>
          </div>
          <div>
            <FieldLabel>Status</FieldLabel>
            <div className="mt-1">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[entry.status] || "text-[#344054] bg-[#F2F4F7]"}`}>
                {entry.status}
              </span>
            </div>
          </div>
        </div>

        <HDivider />

        {/* ── Accounting Impact ── */}
        <SectionTitle>Accounting Impact</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel>
              Debit <span className="font-normal italic">(Member Wallet)</span>
            </FieldLabel>
            <FieldValue>{entry.debit === "-" ? "$0.00" : entry.debit}</FieldValue>
          </div>
          <div>
            <FieldLabel>
              Credit <span className="font-normal italic">(Platform Holding)</span>
            </FieldLabel>
            <FieldValue>{entry.credit === "-" ? "$0.00" : entry.credit}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Linked Records ── */}
        <SectionTitle>Linked Records</SectionTitle>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          <div>
            <FieldLabel>Transaction ID</FieldLabel>
            <FieldValue className="text-[#175CD3]">{entry.ref}</FieldValue>
          </div>
          <div>
            <FieldLabel>Job ID</FieldLabel>
            <FieldValue className="text-[#175CD3]">{entry.jobId ?? "JOB234"}</FieldValue>
          </div>
          <div className="col-span-2">
            <FieldLabel>Payout ID</FieldLabel>
            <FieldValue className="text-[#175CD3]">{entry.payoutId ?? "PAY001"}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Tax Details ── */}
        <SectionTitle>Tax Details</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel>Tax Applied</FieldLabel>
            <FieldValue>{entry.taxApplied ?? "$2.00"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Tax Type</FieldLabel>
            <FieldValue>{entry.taxType ?? "GST"}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Breakdown Calculation ── */}
        <SectionTitle>Breakdown Calculation</SectionTitle>
        <div className="mt-3 rounded-xl bg-[#F9FAFB] p-4 text-sm text-[#475467] font-medium space-y-2.5">
          <div className="flex justify-between">
            <span>Service Amount:</span>
            <span>{entry.serviceAmount ?? "$120.00"}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Commission (10%)</span>
            <span>-{entry.commission ?? "$12.00"}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>-{entry.taxApplied ?? "$2.00"}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-[#EAECF0] pt-3 text-sm font-bold text-[#027A48]">
            <span>Net PSP</span>
            <span>{entry.netPsp ?? "$106.00"}</span>
          </div>
        </div>

      </div>
    </SideSheet>
  );
};

export default LedgerEntryDetailSheet;
