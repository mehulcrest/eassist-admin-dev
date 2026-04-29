import { Download, Info, ScrollText } from "lucide-react";
import SideSheet from "../../components/SideSheet";

/* ─────────────────────────────────────────────
   Static detail data keyed by transaction id
───────────────────────────────────────────── */
const DETAIL_DATA = {
  TXN001: {
    paymentId: "TXN001",
    payoutPeriod: "Apr Cycle 2 (Apr 15 – Apr 30, 2026)",
    paymentDate: "Wed, May 06, 2026",
    payoutStatus: "Processing",
    paidToBank: "xxx 4567",
    pspName: "SilverAge Support",
    pspId: "PSP001",
    timeline: [
      { date: "Apr 30", label: "Period Closed" },
      { date: "May 01", label: "Processing Started" },
      { date: "May 04", label: "Verification Completed" },
      { date: "May 06", label: "Payout Initiated" },
    ],
    earnings: [
      { job: "Grocery Trip Assistance", jobId: "J001", date: "Apr 16, 2026", earning: "$180.00", fee: "$18.00", net: "$162.00" },
      { job: "Cleaning",               jobId: "J002", date: "Apr 17, 2026", earning: "$220.00", fee: "$22.00", net: "$198.00" },
      { job: "Doctor Visit",           jobId: "J003", date: "Apr 18, 2026", earning: "$150.00", fee: "$15.00", net: "$135.00" },
      { job: "Daily Care Assistance",  jobId: "J004", date: "Apr 20, 2026", earning: "$140.00", fee: "$14.00", net: "$126.00" },
      { job: "Meal Preparation",       jobId: "J005", date: "Apr 21, 2026", earning: "$210.00", fee: "$21.00", net: "$189.00" },
      { job: "House Cleaning",         jobId: "J006", date: "Apr 23, 2026", earning: "$120.00", fee: "$12.00", net: "$108.00" },
      { job: "Cleaning",               jobId: "J007", date: "Apr 24, 2026", earning: "$200.00", fee: "$20.00", net: "$180.00" },
      { job: "Meal Preparation",       jobId: "J008", date: "Apr 26, 2026", earning: "$160.00", fee: "$16.00", net: "$144.00" },
      { job: "House Cleaning",         jobId: "J009", date: "Apr 28, 2026", earning: "$240.00", fee: "$24.00", net: "$216.00" },
    ],
    earningTotal: { earning: "$1,620.00", fee: "$162.00", net: "$1,458.00" },
    calculation: [
      { label: "Gross Service Value",            value: "$1,620.00"  },
      { label: "Platform Commission (10%)",      value: "-$162.00"   },
      { label: "Refunds & Adjustments",          value: "-$40.00"    },
      { label: "Penalties",                      value: "-$20.00"    },
      { label: "Service Call Fee (if applicable)", value: "-$10.00"  },
    ],
    netPayout: "$1,388.00",
    adjustments: [
      { label: "Refund Adjustment (Job ID: J005)", value: "-$20.00" },
      { label: "Penalty Applied (Late arrival)",    value: "-$20.00" },
    ],
  },
};

const GENERIC_DETAIL = (tx) => ({
  paymentId: tx.id,
  payoutPeriod: "Apr Cycle 2 (Apr 15 – Apr 30, 2026)",
  paymentDate: tx.date,
  payoutStatus: tx.status,
  paidToBank: "xxx 4567",
  pspName: tx.party,
  pspId: "PSP001",
  timeline: [
    { date: "Apr 30", label: "Period Closed" },
    { date: "May 01", label: "Processing Started" },
    { date: "May 04", label: "Verification Completed" },
    { date: "May 06", label: "Payout Initiated" },
  ],
  earnings: [],
  earningTotal: { earning: tx.amount, fee: tx.fee, net: tx.net },
  calculation: [
    { label: "Gross Service Value",       value: tx.amount },
    { label: "Platform Commission (10%)", value: `-${tx.fee}` },
    { label: "Refunds & Adjustments",     value: "$0.00" },
  ],
  netPayout: tx.net,
  adjustments: [],
});

/* ─────────────────────────────────────────────
   Status pill styles
───────────────────────────────────────────── */
const statusPillStyle = {
  Processing: "bg-[#FFFAEB] text-[#B54708] border border-[#FEDF89]",
  Paid:       "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]",
  Failed:     "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]",
  Pending:    "bg-[#F2F4F7] text-[#344054] border border-[#D0D5DD]",
};

/* ─────────────────────────────────────────────
   Tiny primitives
───────────────────────────────────────────── */
const FieldLabel = ({ children }) => (
  <p className="text-xs font-medium text-[#667085] mb-1">{children}</p>
);

const FieldValue = ({ children, className = "" }) => (
  <p className={`text-sm text-[#344054] ${className}`}>{children}</p>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-base font-bold text-[#101828]">{children}</h3>
);

const HDivider = () => <div className="my-6 border-t border-[#EAECF0]" />;

/* ─────────────────────────────────────────────
   Timeline row
───────────────────────────────────────────── */
const TimelineRow = ({ item, isLast }) => (
  <div className="flex gap-4 min-h-[48px]">
    {/* dot + dashed connector */}
    <div className="flex shrink-0 flex-col items-center" style={{ width: 18 }}>
      <div
        className="mt-[2px] shrink-0 rounded-full border-2 border-[#F04438] bg-white"
        style={{ width: 14, height: 14 }}
      />
      {!isLast && (
        <div
          className="mt-1 flex-1"
          style={{ width: 0, borderLeft: "2px dashed #FECDCA", minHeight: 28 }}
        />
      )}
    </div>
    {/* content */}
    <div className="pb-2 flex items-start gap-6">
      <span className="text-sm font-semibold text-[#344054] shrink-0 w-[52px]">{item.date}</span>
      <span className="text-sm text-[#475467]">{item.label}</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const TransactionDetailSheet = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const d = DETAIL_DATA[transaction.id] ?? GENERIC_DETAIL(transaction);

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Payout Detail"
      widthClass="w-full sm:w-[640px]"
      footer={
        <div className="flex flex-wrap items-center gap-3">
          {/* Contact Support – text link */}
          <button
            type="button"
            className="text-sm font-semibold text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors"
          >
            Contact Support
          </button>

          <div className="flex-1" />

          {/* Download Statement */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#F04438] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#D92D20] transition-colors"
          >
            <Download size={15} strokeWidth={2} />
            Download Statement
          </button>

          {/* View Transaction Log */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#F04438] px-5 py-2.5 text-sm font-semibold text-[#F04438] hover:bg-[#FEF3F2] transition-colors"
          >
            <ScrollText size={15} strokeWidth={2} />
            View Transaction Log
          </button>
        </div>
      }
    >
      <div>

        {/* ══════════════════════════════════════
            SECTION 1 – Payout Summary
        ══════════════════════════════════════ */}
        <SectionTitle>Payout Summary</SectionTitle>

        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5">
          {/* Payment ID */}
          <div>
            <FieldLabel>Payment ID</FieldLabel>
            <FieldValue className="text-[#175CD3]">{d.paymentId}</FieldValue>
          </div>

          {/* Payout Period */}
          <div>
            <FieldLabel>Payout Period</FieldLabel>
            <FieldValue>{d.payoutPeriod}</FieldValue>
          </div>

          {/* Payment Date */}
          <div>
            <FieldLabel>Payment Date</FieldLabel>
            <FieldValue className="text-[#175CD3]">{d.paymentDate}</FieldValue>
          </div>

          {/* Payout Status */}
          <div>
            <FieldLabel>Payout Status</FieldLabel>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusPillStyle[d.payoutStatus] ?? statusPillStyle.Pending}`}>
                {d.payoutStatus}
              </span>
              <Info size={15} className="text-[#98A2B3]" />
            </div>
          </div>

          {/* Paid To Bank Account – full width */}
          <div className="col-span-2">
            <FieldLabel>Paid To Bank Account</FieldLabel>
            <FieldValue>{d.paidToBank}</FieldValue>
          </div>

          {/* PSP Name */}
          <div>
            <FieldLabel>PSP Name</FieldLabel>
            <FieldValue>{d.pspName}</FieldValue>
          </div>

          {/* PSP ID */}
          <div>
            <FieldLabel>PSP ID</FieldLabel>
            <FieldValue>{d.pspId}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ══════════════════════════════════════
            SECTION 2 – Payout Timeline
        ══════════════════════════════════════ */}
        <SectionTitle>Payout Timeline</SectionTitle>

        <div className="mt-5">
          {d.timeline.map((item, idx) => (
            <TimelineRow key={idx} item={item} isLast={idx === d.timeline.length - 1} />
          ))}
        </div>

        <HDivider />

        {/* ══════════════════════════════════════
            SECTION 3 – Earnings Breakdown
        ══════════════════════════════════════ */}
        <div className="flex items-baseline justify-between gap-2 mb-4">
          <SectionTitle>Earnings Breakdown</SectionTitle>
          <span className="text-xs text-[#667085] italic shrink-0">
            Includes all completed jobs in this payout cycle
          </span>
        </div>

        {/* Table card */}
        <div className="rounded-xl border border-[#EAECF0] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB]">
                {["Job", "Date", "Earning", "Platform Fee", "Net Earnings"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-[#475467] border-b border-[#EAECF0] first:pl-5 last:pr-5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {d.earnings.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB]/60">
                  <td className="px-4 py-3 pl-5 align-top">
                    <p className="text-sm text-[#101828] underline underline-offset-2 cursor-pointer hover:text-[#F04438] transition-colors">
                      {row.job}
                    </p>
                    <p className="text-xs text-[#667085] mt-0.5">ID: {row.jobId}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#667085] align-middle whitespace-nowrap">{row.date}</td>
                  <td className="px-4 py-3 text-sm text-[#344054] align-middle">{row.earning}</td>
                  <td className="px-4 py-3 text-sm text-[#344054] align-middle">{row.fee}</td>
                  <td className="px-4 py-3 pr-5 text-sm text-[#344054] align-middle">{row.net}</td>
                </tr>
              ))}
            </tbody>
            {/* Totals row */}
            <tfoot>
              <tr className="border-t border-[#EAECF0] bg-[#F9FAFB]">
                <td colSpan={2} className="pl-5 py-3" />
                <td className="px-4 py-3 text-sm font-bold text-[#101828]">{d.earningTotal.earning}</td>
                <td className="px-4 py-3 text-sm font-bold text-[#101828]">{d.earningTotal.fee}</td>
                <td className="px-4 py-3 pr-5 text-sm font-bold text-[#101828]">{d.earningTotal.net}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <HDivider />

        {/* ══════════════════════════════════════
            SECTION 4 – Payout Calculation
        ══════════════════════════════════════ */}
        <SectionTitle>Payout Calculation</SectionTitle>

        {/* Calculation card */}
        <div className="mt-4 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] px-5 py-4 space-y-3">
          {d.calculation.map((row, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-[#475467]">{row.label}</span>
              <span className={`text-sm text-[#344054] ${row.value.startsWith("-") ? "text-[#344054]" : ""}`}>
                {row.value}
              </span>
            </div>
          ))}

          {/* Net Payout separator */}
          <div className="border-t border-[#EAECF0] pt-3 flex items-center justify-between">
            <span className="text-base font-bold text-[#12B76A]">Net Payout</span>
            <span className="text-base font-bold text-[#12B76A]">{d.netPayout}</span>
          </div>
        </div>

        {/* ══════════════════════════════════════
            SECTION 5 – Adjustments & Deductions
        ══════════════════════════════════════ */}
        {d.adjustments.length > 0 && (
          <>
            <HDivider />
            <SectionTitle>Adjustments &amp; Deductions</SectionTitle>

            <div className="mt-4 space-y-3">
              {d.adjustments.map((row, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-[#475467]">{row.label}</span>
                  <span className="text-sm text-[#344054]">{row.value}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bottom padding for footer clearance */}
        <div className="h-4" />

      </div>
    </SideSheet>
  );
};

export default TransactionDetailSheet;
