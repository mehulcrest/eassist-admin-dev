import { Download, ScrollText } from "lucide-react";
import SideSheet from "../../../components/SideSheet";

/* ─── Status pill styles ─────────────────────────────────── */
const statusPill = {
  Scheduled: "bg-[#FFFAEB] text-[#B54708] border border-[#FEDF89]",
  Pending:   "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]",
  Paid:      "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]",
  OnHold:    "bg-[#F2F4F7] text-[#344054] border border-[#D0D5DD]",
};

/* ─── Primitives ─────────────────────────────────────────── */
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

/* ─── Timeline row ───────────────────────────────────────── */
const TimelineRow = ({ label, isLast }) => (
  <div className="flex gap-4 min-h-[44px]">
    <div className="flex shrink-0 flex-col items-center" style={{ width: 18 }}>
      <div className="mt-[3px] shrink-0 rounded-full border-2 border-[#F04438] bg-white" style={{ width: 13, height: 13 }} />
      {!isLast && (
        <div className="mt-1 flex-1" style={{ width: 0, borderLeft: "2px dashed #FECDCA", minHeight: 24 }} />
      )}
    </div>
    <p className="pb-2 text-sm text-[#475467]">{label}</p>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const PSPWalletDetailSheet = ({ isOpen, onClose, psp }) => {
  if (!isOpen || !psp) return null;

  const timeline = psp.timeline ?? [
    { label: `${psp.nextPayout} – Payout Scheduled` },
    { label: "Verification in Progress" },
    { label: "Funds Released to PSP" },
  ];

  const recentJobs = psp.recentJobs ?? [
    { job: "Grocery Trip Assistance",  jobId: "J001", date: "Apr 16, 2026", earning: "$160.00", fee: "$16.00", net: "$144.00" },
    { job: "Daily Care",               jobId: "J002", date: "Apr 18, 2026", earning: "$120.00", fee: "$12.00", net: "$108.00" },
    { job: "Cleaning",                 jobId: "J003", date: "Apr 20, 2026", earning: "$80.00",  fee: "$8.00",  net: "$72.00"  },
  ];

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="PSP Wallet Detail"
      widthClass="w-full sm:w-[600px]"
      footer={
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="text-sm font-semibold text-[#344054] underline underline-offset-2 hover:text-[#F04438] transition-colors"
          >
            Contact Support
          </button>
          <div className="flex-1" />
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#F04438] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            <Download size={15} strokeWidth={2} />
            Download Statement
          </button>
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
        {/* ── PSP Summary ── */}
        <SectionTitle>PSP Summary</SectionTitle>

        <div className="mt-5 flex items-center gap-4 pb-5 border-b border-[#EAECF0]">
          {psp.avatar ? (
            <img src={psp.avatar} alt="" className="size-14 rounded-full object-cover ring-2 ring-[#EAECF0]" />
          ) : (
            <div className="size-14 rounded-full bg-[#F2F4F7] flex items-center justify-center text-xl font-bold text-[#667085]">
              {psp.name?.[0] ?? "P"}
            </div>
          )}
          <div>
            <p className="text-base font-bold text-[#101828]">{psp.name}</p>
            <p className="text-sm text-[#667085]">{psp.type} · {psp.territory}</p>
            <span className={`mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusPill[psp.status] ?? statusPill.Pending}`}>
              {psp.status}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5">
          <div>
            <FieldLabel>Pending Earnings</FieldLabel>
            <FieldValue className="font-semibold text-[#F79009]">{psp.pendingEarnings}</FieldValue>
          </div>
          <div>
            <FieldLabel>Cleared Earnings</FieldLabel>
            <FieldValue className="font-semibold text-[#12B76A]">{psp.clearedEarnings}</FieldValue>
          </div>
          <div>
            <FieldLabel>Next Payout Date</FieldLabel>
            <FieldValue className="text-[#175CD3]">{psp.nextPayout}</FieldValue>
          </div>
          <div>
            <FieldLabel>Bank Account</FieldLabel>
            <FieldValue>{psp.bankAccount ?? "xxx 4567"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Payout Method</FieldLabel>
            <FieldValue>{psp.payoutMethod ?? "Bank Transfer"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Territory</FieldLabel>
            <FieldValue>{psp.territory}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Payout Timeline ── */}
        <SectionTitle>Payout Timeline</SectionTitle>
        <div className="mt-5">
          {timeline.map((item, idx) => (
            <TimelineRow key={idx} label={item.label} isLast={idx === timeline.length - 1} />
          ))}
        </div>

        <HDivider />

        {/* ── Recent Job Earnings ── */}
        <div className="flex items-baseline justify-between gap-2 mb-4">
          <SectionTitle>Recent Job Earnings</SectionTitle>
          <span className="text-xs text-[#667085] italic shrink-0">Current payout cycle</span>
        </div>

        <div className="rounded-xl border border-[#EAECF0] overflow-hidden">
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
              {recentJobs.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB]/60">
                  <td className="px-4 py-3 pl-5 align-top">
                    <p className="text-sm text-[#101828] underline underline-offset-2 cursor-pointer hover:text-[#F04438] transition-colors">{row.job}</p>
                    <p className="text-xs text-[#667085] mt-0.5">ID: {row.jobId}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#667085] whitespace-nowrap">{row.date}</td>
                  <td className="px-4 py-3 text-sm text-[#344054]">{row.earning}</td>
                  <td className="px-4 py-3 text-sm text-[#344054]">{row.fee}</td>
                  <td className="px-4 py-3 pr-5 text-sm font-semibold text-[#101828]">{row.net}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[#EAECF0] bg-[#F9FAFB]">
                <td colSpan={2} className="pl-5 py-3" />
                <td className="px-4 py-3 text-sm font-bold text-[#101828]">{psp.pendingEarnings}</td>
                <td className="px-4 py-3 text-sm text-[#667085]" />
                <td className="px-4 py-3 pr-5 text-sm font-bold text-[#101828]">{psp.clearedEarnings}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="h-4" />
      </div>
    </SideSheet>
  );
};

export default PSPWalletDetailSheet;
