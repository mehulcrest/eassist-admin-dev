import { Download, ScrollText } from "lucide-react";
import SideSheet from "../../../components/SideSheet";
import userProfile from "../../../assets/userProfile.png";

/* ─── Static detail records ──────────────────────────────── */
const DETAIL_DATA = {
  TXN001: {
    txId: "TXN001",
    amount: "$120.00",
    paymentDate: "Wed, May 06, 2026",
    status: "Completed",
    paidBy: "Margaret Thompson (E001)",
    receivedBy: "Platform",
    paidFromBank: "xxx 4567",
    timeline: [
      { label: "May 01 – Transaction Created" },
      { label: "May 01 – Payment Authorized" },
      { label: "May 02 – Payment Captured" },
      { label: "May 03 – Platform Fee Deducted" },
      { label: "May 06 – Completed" },
    ],
    earnings: [
      { job: "Grocery Trip Assistance", jobId: "J001", date: "Apr 16, 2026", earning: "$100.00", fee: "$12.00", net: "$112.00" },
    ],
    calculation: [
      { label: "Gross Service Value", value: "$100.00" },
      { label: "Taxes", value: "$20.00" },
      { label: "Platform Fee", value: "-$12.00" },
    ],
    netImpact: "$108.00",
  },
  TXN002: {
    txId: "TXN002",
    amount: "-$800.00",
    paymentDate: "Wed, Apr 22, 2026",
    status: "Processed",
    paidBy: "Maria Santos (P002)",
    receivedBy: "Platform",
    paidFromBank: "xxx 1234",
    timeline: [
      { label: "Apr 20 – Transaction Created" },
      { label: "Apr 21 – Payment Authorized" },
      { label: "Apr 22 – Payout Processed" },
    ],
    earnings: [],
    calculation: [
      { label: "Gross Payout", value: "$800.00" },
      { label: "Platform Fee", value: "-$0.00" },
    ],
    netImpact: "-$800.00",
  },
};

const mkDetail = (tx) =>
  DETAIL_DATA[tx.id] ?? {
    txId: tx.id, amount: tx.amount, paymentDate: tx.date,
    status: tx.status, paidBy: tx.source, receivedBy: "Platform",
    paidFromBank: "xxx 0000",
    timeline: [{ label: "Transaction Created" }, { label: "Completed" }],
    earnings: [],
    calculation: [{ label: "Net", value: tx.amount }],
    netImpact: tx.amount,
  };

/* ─── Status pill ─────────────────────────────────────────── */
const statusPill = {
  Completed: "bg-[#ECFDF3] text-[#027A48] ",
  Processed: "bg-[#EFF8FF] text-[#175CD3] ",
  Pending: "bg-[#FFFAEB] text-[#B54708] ",
  Failed: "bg-[#FEF3F2] text-[#B42318] ",
};

/* ─── Primitives ──────────────────────────────────────────── */
const FieldLabel = ({ children }) => (
  <p className="text-xs font-medium text-[#333] mb-1">{children}</p>
);
const FieldValue = ({ children, className = "" }) => (
  <p className={`text-sm text-[#667085] ${className}`}>{children}</p>
);
const SectionTitle = ({ children }) => (
  <h3 className="text-base font-bold text-[#101828]">{children}</h3>
);
const HDivider = () => <div className="my-6 border-t border-[#EAECF0]" />;

/* ─── Timeline row ───────────────────────────────────────── */
const TimelineRow = ({ label, isLast }) => (
  <div className="flex gap-4 min-h-[44px]">
    <div className="flex shrink-0 flex-col items-center" style={{ width: 18 }}>
      <div className="mt-[3px] shrink-0 rounded-full border-2 border-[#F04438] bg-white" style={{ width: 10, height: 10 }} />
      {!isLast && (
        <div className="mt-1 flex-1" style={{ width: 0, borderLeft: "2px dashed #FECDCA", minHeight: 24 }} />
      )}
    </div>
    <p className="pb-2 text-sm text-[#475467]">{label}</p>
  </div>
);

/* ─── Main Component ──────────────────────────────────────── */
const PlatformWalletDetailSheet = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;
  const d = mkDetail(transaction);

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Platform Wallet Detail"
      widthClass="w-full sm:w-[600px]"
      footer={
        <div className="flex flex-col items-stretch gap-3 min-[571px]:flex-row min-[571px]:items-center">
          <button
            type="button"
            className="text-sm font-semibold text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors"
          >
            Contact Support
          </button>
          <div className="flex-1" />
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#F04438] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors w-full min-[571px]:w-auto"
          >
            <Download size={15} strokeWidth={2} />
            Download Statement
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#F04438] px-5 py-2.5 text-sm font-semibold text-[#F04438] hover:bg-[#FEF3F2] transition-colors w-full min-[571px]:w-auto"
          >
            <ScrollText size={15} strokeWidth={2} />
            View Transaction Log
          </button>
        </div>
      }
    >
      <div>
        {/* ── Payment Summary ── */}
        <SectionTitle>Payment Summary</SectionTitle>

        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5">
          <div>
            <FieldLabel>Transaction ID</FieldLabel>
            <FieldValue className="text-[#175CD3]">{d.txId}</FieldValue>
          </div>
          <div>
            <FieldLabel>Amount</FieldLabel>
            <FieldValue>{d.amount}</FieldValue>
          </div>
          <div>
            <FieldLabel>Payment Date</FieldLabel>
            <FieldValue className="text-[#175CD3]">{d.paymentDate}</FieldValue>
          </div>
          <div>
            <FieldLabel>Status</FieldLabel>
            <span className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusPill[d.status] ?? statusPill.Pending}`}>
              {d.status}
            </span>
          </div>
          <div>
            <FieldLabel>Paid by</FieldLabel>
            <FieldValue className="text-[#175CD3]">{d.paidBy}</FieldValue>
          </div>
          <div>
            <FieldLabel>Received by</FieldLabel>
            <FieldValue>{d.receivedBy}</FieldValue>
          </div>
          <div className="col-span-2">
            <FieldLabel>Paid from Bank Account</FieldLabel>
            <FieldValue>{d.paidFromBank}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Payout Timeline ── */}
        <SectionTitle>Payout Timeline</SectionTitle>
        <div className="mt-5">
          {d.timeline.map((item, idx) => (
            <TimelineRow key={idx} label={item.label} isLast={idx === d.timeline.length - 1} />
          ))}
        </div>

        <HDivider />

        {/* ── Earnings Breakdown ── */}
        <SectionTitle>Earnings Breakdown</SectionTitle>
        <div className="mt-4 rounded-xl border border-[#EAECF0] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB]">
                {["Job", "Date", "Earning", "Platform Fee", "Net Earnings"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475467] border-b border-[#EAECF0] first:pl-5 last:pr-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {d.earnings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-[#667085]">No earnings data available.</td>
                </tr>
              ) : (
                d.earnings.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB]/60">
                    <td className="px-4 py-3 pl-5 align-top">
                      <p className="text-sm text-[#101828] underline underline-offset-2 cursor-pointer hover:text-[#F04438] transition-colors">{row.job}</p>
                      <p className="text-xs text-[#667085] mt-0.5">ID: {row.jobId}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#667085] whitespace-nowrap">{row.date}</td>
                    <td className="px-4 py-3 text-sm text-[#344054]">{row.earning}</td>
                    <td className="px-4 py-3 text-sm text-[#344054]">{row.fee}</td>
                    <td className="px-4 py-3 pr-5 text-sm text-[#344054]">{row.net}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <HDivider />

        {/* ── Earning Calculation ── */}
        <SectionTitle>Earning Calculation</SectionTitle>
        <div className="mt-4 rounded-xl bg-[#F6F6F6] px-5 py-4 space-y-3">
          {d.calculation.map((row, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-[#333]">{row.label}</span>
              <span className="text-sm text-[#333]">{row.value}</span>
            </div>
          ))}
          <div className="border-t border-[#EAECF0] pt-3 flex items-center justify-between">
            <span className="text-base font-medium text-[#333]">Net Impact</span>
            <span className="text-base font-medium text-[#333]">{d.netImpact}</span>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </SideSheet>
  );
};

export default PlatformWalletDetailSheet;
