import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import SideSheet from "../../../components/SideSheet";

const STATUS_STYLE = {
  Processing: "bg-[#FFFAEB] text-[#B54708] border border-[#FEDF89]",
  Paid:       "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]",
  Pending:    "bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]",
  Failed:     "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]",
  "On Hold":  "bg-[#F2F4F7] text-[#344054] border border-[#D0D5DD]",
};

/* ─── Shared Parts ─── */
const FieldLabel = ({ children }) => (
  <p className="mb-1 text-xs font-semibold text-[#667085]">{children}</p>
);
const FieldValue = ({ children, className = "" }) => (
  <p className={`text-sm text-[#101828] ${className}`}>{children}</p>
);
const SectionTitle = ({ children }) => (
  <h3 className="text-base font-bold text-[#101828]">{children}</h3>
);
const HDivider = () => <div className="my-6 border-t border-[#EAECF0]" />;

/* ─── Timeline Row ─── */
const TimelineRow = ({ label, isLast, isFailed }) => (
  <div className="flex gap-4 min-h-[44px]">
    <div className="flex shrink-0 flex-col items-center" style={{ width: 18 }}>
      <div
        className="mt-[3px] shrink-0 rounded-full border-2 border-[#F04438] bg-white"
        style={{ width: 13, height: 13 }}
      />
      {!isLast && (
        <div
          className="mt-1 flex-1"
          style={{ width: 0, borderLeft: "2px dashed #FECDCA", minHeight: 24 }}
        />
      )}
    </div>
    <div className="pb-2 flex items-center gap-1.5">
      <p className={`text-sm ${isFailed ? "font-medium text-[#F04438]" : "text-[#475467]"}`}>
        {label}
      </p>
      {isFailed && <AlertTriangle size={15} className="text-[#F04438]" strokeWidth={2} />}
    </div>
  </div>
);

const PayoutDetailSheet = ({ isOpen, onClose, payout, onProcessPayout }) => {
  if (!isOpen || !payout) return null;

  const isFailed = payout.status === "Failed";
  const isPending = payout.status === "Pending";

  const timeline = payout.timeline ?? (isFailed ? [
    { label: "Apr 30  Period Closed" },
    { label: "May 01  Processing Started" },
    { label: "May 04  Verification Completed" },
    { label: "May 06  Payout Failed", isFailed: true },
  ] : [
    { label: "Mar 07  Period Closed" },
    { label: "Mar 07  Processing Started" },
    { label: "Mar 08  Verification Started" },
    { label: "Mar 09  Adjustments Applied" },
    { label: "Mar 10  Ready for Payout" },
  ]);

  const earnings = payout.earnings ?? [
    { job: "Grocery Trip Assistance", jobId: "J001", date: "Apr 16, 2026", earning: "$180.00", fee: "$18.00", net: "$162.00" },
    { job: "Cleaning",                jobId: "J002", date: "Apr 17, 2026", earning: "$220.00", fee: "$22.00", net: "$198.00" },
    { job: "Doctor Visit",            jobId: "J003", date: "Apr 18, 2026", earning: "$150.00", fee: "$15.00", net: "$135.00" },
    { job: "Daily Care Assistance",   jobId: "J004", date: "Apr 20, 2026", earning: "$140.00", fee: "$14.00", net: "$126.00" },
    { job: "Meal Preparation",        jobId: "J005", date: "Apr 21, 2026", earning: "$210.00", fee: "$21.00", net: "$189.00" },
    { job: "House Cleaning",          jobId: "J006", date: "Apr 23, 2026", earning: "$120.00", fee: "$12.00", net: "$108.00" },
    { job: "Cleaning",                jobId: "J007", date: "Apr 24, 2026", earning: "$200.00", fee: "$20.00", net: "$180.00" },
    { job: "Meal Preparation",        jobId: "J008", date: "Apr 26, 2026", earning: "$160.00", fee: "$16.00", net: "$144.00" },
    { job: "House Cleaning",          jobId: "J009", date: "Apr 28, 2026", earning: "$240.00", fee: "$24.00", net: "$216.00" },
  ];

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Payout Detail"
      widthClass="w-[640px]"
      footer={
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            className="text-sm font-semibold text-[#344054] underline underline-offset-2 hover:text-[#101828] transition-colors"
          >
            Contact Support
          </button>
          <div className="flex gap-3">
            {isFailed ? (
              <>
                <button
                  type="button"
                  className="rounded-lg bg-[#F04438] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
                >
                  Retry Payout
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#F04438] bg-white px-5 py-2.5 text-sm font-semibold text-[#F04438] hover:bg-[#FEF3F2] transition-colors"
                >
                  Update Bank Details
                </button>
              </>
            ) : isPending ? (
               <>
                <button
                  type="button"
                  onClick={() => onProcessPayout(payout)}
                  className="rounded-lg bg-[#F04438] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
                >
                  Process Payout
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-[#D0D5DD] bg-white px-5 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[#D0D5DD] bg-white px-5 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      }
    >
      <div className="pb-6">
        
        {/* ── Failed Alert Banner ── */}
        {isFailed && (
          <div className="mb-6 rounded-xl border border-[#FDA4AF] bg-[#FEF2F2] p-4 flex gap-3 shadow-sm">
            <AlertCircle size={20} className="text-[#F04438] shrink-0 translate-y-0.5" strokeWidth={2.5} />
            <div>
              <h4 className="text-sm font-bold text-[#101828]">Payout Failed</h4>
              <p className="mt-1 text-sm text-[#475467]">
                Bank transfer was unsuccessful. Please retry or update bank details.{" "}
                <a href="#" className="underline text-[#667085] hover:text-[#344054] transition-colors">Learn more</a>
              </p>
            </div>
          </div>
        )}

        {/* ── Summary ── */}
        <SectionTitle>Payout Summary</SectionTitle>
        <div className="mt-5 grid grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <FieldLabel>Payment ID</FieldLabel>
            <FieldValue>{payout.id}</FieldValue>
          </div>
          <div>
            <FieldLabel>Payout Period</FieldLabel>
            <FieldValue>{payout.payoutPeriod ?? (isFailed ? "Jan Cycle 2 (Jan 15 - Jan 31, 2026)" : "Apr Cycle 2 (Apr 15 - Apr 30, 2026)")}</FieldValue>
          </div>
          <div>
            <FieldLabel>PSP Name</FieldLabel>
            <FieldValue className="text-[#175CD3] underline underline-offset-2 cursor-pointer">{payout.party}</FieldValue>
          </div>
          <div>
            <FieldLabel>PSP ID</FieldLabel>
            <FieldValue>{payout.pspId ?? "PSP001"}</FieldValue>
          </div>
          
          {isFailed ? (
            <>
              <div>
                <FieldLabel>Payment Date</FieldLabel>
                <FieldValue>{payout.paymentDate ?? "Wed, Feb 25, 2026"}</FieldValue>
              </div>
              <div>
                <FieldLabel>Payout Status</FieldLabel>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      STATUS_STYLE[payout.status] || "bg-[#F2F4F7] text-[#344054]"
                    }`}
                  >
                    {payout.status}
                  </span>
                  <Info size={15} className="text-[#98A2B3] cursor-help" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <FieldLabel>Net Payout</FieldLabel>
                <FieldValue>{payout.netPayout}</FieldValue>
              </div>
              <div>
                <FieldLabel>Payout Status</FieldLabel>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      STATUS_STYLE[payout.status] || "bg-[#F2F4F7] text-[#344054]"
                    }`}
                  >
                    {payout.status}
                  </span>
                  <Info size={15} className="text-[#98A2B3] cursor-help" />
                </div>
              </div>
            </>
          )}

          <div>
            <FieldLabel>Paid To Bank Account</FieldLabel>
            <FieldValue>{payout.bankAccount ?? (isFailed ? "xxx 1234" : "xxx 4567")}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Timeline ── */}
        <SectionTitle>Payout Timeline</SectionTitle>
        <div className="mt-5">
          {timeline.map((item, idx) => (
            <TimelineRow key={idx} label={item.label} isLast={idx === timeline.length - 1} isFailed={item.isFailed} />
          ))}
        </div>

        <HDivider />

        {/* ── Earnings Breakdown ── */}
        <div className="mb-4 flex items-baseline justify-between gap-2">
          <SectionTitle>Earnings Breakdown</SectionTitle>
          <span className="text-xs italic text-[#667085] shrink-0">
            Includes all completed jobs in this payout cycle
          </span>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#EAECF0]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB]">
                {["Job", "Date", "Earning", "Platform Fee", "Net Earnings"].map((h) => (
                  <th
                    key={h}
                    className="border-b border-[#EAECF0] px-4 py-3 text-left text-xs font-semibold text-[#475467] first:pl-5 last:pr-5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {earnings.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB]/60">
                  <td className="px-4 py-3 pl-5 align-top">
                    <p className="cursor-pointer text-sm font-medium text-[#101828] underline underline-offset-2 hover:text-[#F04438] transition-colors">
                      {row.job}
                    </p>
                    <p className="mt-0.5 text-xs text-[#667085]">ID: {row.jobId}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-[#475467]">{row.date}</td>
                  <td className="px-4 py-3 text-sm text-[#344054]">{row.earning}</td>
                  <td className="px-4 py-3 text-sm text-[#344054]">{row.fee}</td>
                  <td className="px-4 py-3 pr-5 text-sm font-semibold text-[#101828]">{row.net}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[#EAECF0] bg-[#F9FAFB]">
                <td colSpan={2} className="py-3 pl-5" />
                <td className="px-4 py-3 text-sm font-bold text-[#101828]">{payout.grossEarnings}</td>
                <td className="px-4 py-3 text-sm font-bold text-[#667085]">{payout.platformFee}</td>
                <td className="px-4 py-3 pr-5 text-sm font-bold text-[#101828]">{payout.netPayout}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <HDivider />

        {/* ── Calculation ── */}
        <SectionTitle>Payout Calculation</SectionTitle>
        <div className="mt-4 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] px-5 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Gross Service Value</span>
            <span>{payout.grossEarnings}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Platform Commission (10%)</span>
            <span>-{payout.platformFee}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Refunds & Adjustments</span>
            <span>-$40.00</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Penalties</span>
            <span>-$20.00</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Service Call Fee (if applicable)</span>
            <span>-$10.00</span>
          </div>
          <div className="flex items-center justify-between border-t border-[#EAECF0] pt-3 text-base font-bold">
            <span className="text-[#12B76A]">Net Payout</span>
            <span className="text-[#12B76A]">{payout.netPayout}</span>
          </div>
        </div>

        <HDivider />

        {/* ── Adjustments & Deductions ── */}
        <SectionTitle>Adjustments & Deductions</SectionTitle>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Refund Adjustment (Job ID: J005)</span>
            <span>-$20.00</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <span>Penalty Applied (Late arrival)</span>
            <span>-$20.00</span>
          </div>
        </div>
      </div>
    </SideSheet>
  );
};

export default PayoutDetailSheet;
