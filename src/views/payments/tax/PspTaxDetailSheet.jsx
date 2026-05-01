import SideSheet from "../../../components/SideSheet";

const FieldLabel = ({ children }) => (
  <p className="mb-1 text-xs font-semibold text-[#101828]">{children}</p>
);

const FieldValue = ({ children, className = "" }) => (
  <p className={`text-sm  text-[#667085] ${className}`}>{children}</p>
);

const SectionTitle = ({ children }) => (
  <h3 className="mb-4 text-base font-bold text-[#101828]">{children}</h3>
);

const HDivider = () => <div className="my-6 border-t border-[#EAECF0]" />;

const TimelineRow = ({ date, label, isLast }) => (
  <div className="flex gap-4 min-h-[44px]">
    <div className="flex shrink-0 flex-col items-center" style={{ width: 18 }}>
      <div
        className="mt-[5px] shrink-0 rounded-full border-[1.5px] border-[#F04438] bg-white"
        style={{ width: 10, height: 10 }}
      />
      {!isLast && (
        <div
          className="mt-1 flex-1"
          style={{ width: 0, borderLeft: "1px dashed #FECDCA", minHeight: 24 }}
        />
      )}
    </div>
    <p className="pb-2 text-sm text-[#475467]">
      <span className="w-[50px] inline-block font-normal">{date}</span>
      {" "}{label}
    </p>
  </div>
);

const STATUS_STYLE = {
  Filed: "text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6]",
  Pending: "text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA]",
  Processing: "text-[#B54708] bg-[#FFFAEB] border border-[#FEDF89]",
};

const PspTaxDetailSheet = ({ isOpen, onClose, entry }) => {
  if (!isOpen || !entry) return null;

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title={`PSP Tax Details • ${entry.period}`}
      widthClass="w-[480px]"
      footer={
        <div className="flex w-full gap-3">
          <button
            type="button"
            className="flex-1 rounded-lg border border-[#F04438] bg-white h-11 text-sm font-semibold text-[#F04438] hover:bg-[#FEF3F2] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            View All Transactions
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg bg-[#F04438] h-11 text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            Export Report
          </button>
        </div>
      }
    >
      <div className="pb-4">

        {/* ── Summary Overview ── */}
        <SectionTitle>Summary Overview</SectionTitle>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          <div>
            <FieldLabel>PSP Name</FieldLabel>
            <FieldValue className="text-[#175CD3] underline underline-offset-2 cursor-pointer hover:text-[#F04438]">
              {entry.pspName}
            </FieldValue>
          </div>
          <div>
            <FieldLabel>Period</FieldLabel>
            <FieldValue>{entry.period}</FieldValue>
          </div>
          <div>
            <FieldLabel>Status</FieldLabel>
            <div className="mt-1">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border-none  ${STATUS_STYLE[entry.status] || "text-[#667085]"}`}>
                {entry.status}
              </span>
            </div>
          </div>
        </div>

        <HDivider />

        {/* ── Tax Breakdown ── */}
        <SectionTitle>Tax Breakdown</SectionTitle>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-4">
          <div>
            <FieldLabel>Total Earnings</FieldLabel>
            <FieldValue>{entry.earnings}</FieldValue>
          </div>
          <div>
            <FieldLabel>Taxable Amount</FieldLabel>
            <FieldValue>{entry.taxableAmount}</FieldValue>
          </div>
          <div>
            <FieldLabel>Final Tax</FieldLabel>
            <FieldValue className="text-[#101828] font-medium">{entry.tax}</FieldValue>
          </div>
        </div>
        <p className="text-sm text-[#475467] leading-relaxed">
          Tax is automatically calculated based on taxable earnings elements and applicable PSP tax rules.
        </p>

        <HDivider />

        {/* ── Processing Timeline ── */}
        <SectionTitle>Processing Timeline</SectionTitle>
        <div className="mt-4">
          <TimelineRow date="Mar 15" label="Tax Calculated" />
          <TimelineRow date="Mar 16" label="Report Generated" />
          <TimelineRow date="Mar 18" label="Filed" isLast={entry.status === "Filed"} />
          {entry.status !== "Filed" && (
            <TimelineRow date="Pending" label="Awaiting Filing" isLast />
          )}
        </div>

      </div>
    </SideSheet>
  );
};

export default PspTaxDetailSheet;
