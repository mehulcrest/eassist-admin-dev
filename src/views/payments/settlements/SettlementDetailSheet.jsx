import { XCircle, Edit, Download, MoreHorizontal, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SideSheet from "../../../components/SideSheet";

const STATUS_STYLE = {
  Closed: "text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6]",
  "In Progress": "text-[#B54708] bg-[#FFFAEB] border border-[#FEDF89]",
  Open: "text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA]",
};

const STATUS_DESCRIPTION = {
  Closed: "This cycle is finalized and locked for changes.",
  "In Progress": "Settlement calculations and adjustments are in progress.",
  Open: "Cycle is active and collecting transactions.",
};

const FieldLabel = ({ children }) => (
  <p className="mb-1 text-xs font-semibold text-[#333]">{children}</p>
);

const FieldValue = ({ children, className = "" }) => (
  <p className={`text-sm text-[#667085] font-medium ${className}`}>{children}</p>
);

const SectionTitle = ({ children }) => (
  <h3 className="mb-4 text-base font-bold text-[#101828] tracking-tight">{children}</h3>
);

const HDivider = () => <div className="my-6 border-t border-[#EAECF0]" />;

/* ─── Timeline Row ─── */
const TimelineRow = ({ date, label, systemText, isLast }) => (
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
    <p className="pb-2 text-sm text-[#101828]">
      <span className="text-[#475467] w-[45px] inline-block">{date}</span>{" "}
      {label}{" "}
      {systemText && <span className="text-[#667085]">({systemText})</span>}
    </p>
  </div>
);

const SettlementDetailSheet = ({ isOpen, onClose, entry, onCloseCycle }) => {
  if (!isOpen || !entry) return null;

  const cycleParts = entry.period.split(" – ");
  const shortPeriod = cycleParts[0]; // e.g. "Mar 01" to "Mar 07" -> "Mar 01–07"
  const formattedTitle = `Settlement Details - ${entry.id} • ${shortPeriod}`;

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title={formattedTitle}
      widthClass="w-[540px]"
      footer={
        <div className="flex w-full gap-3">
          <button
            type="button"
            onClick={() => onCloseCycle?.(entry)}
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
          >
            <XCircle size={16} />
            Close Cycle
          </button>
          <button
            type="button"
            className="h-11 flex items-center justify-center gap-2 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      }
    >
      <div className="pb-4">

        {/* ── Entry Details ── */}
        <SectionTitle>Entry Details</SectionTitle>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-5">
          <div>
            <FieldLabel>Cycle ID</FieldLabel>
            <FieldValue>{entry.id}</FieldValue>
          </div>
          <div>
            <FieldLabel>Period</FieldLabel>
            <FieldValue className="text-[#475467] font-normal">{entry.period}</FieldValue>
          </div>
          <div className="col-span-2">
            <FieldLabel>Status</FieldLabel>
            <div className="mt-1 flex items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border-none ${STATUS_STYLE[entry.status] || "bg-[#FFFAEB] text-[#DC6803]"}`}>
                {entry.status}
              </span>
              <span className="text-sm text-[#475467]">{STATUS_DESCRIPTION[entry.status]}</span>
            </div>
          </div>
        </div>

        {/* ── Summary ── */}
        <SectionTitle>Summary</SectionTitle>
        <div className="mt-4 rounded-xl bg-[#F6F6F6] px-5 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-[#333]">
            <span>Total Payments</span>
            <span>{entry.totalPayments}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#333]">
            <span>Total Payouts</span>
            <span>{entry.totalPayouts}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#333]">
            <span>Platform Revenue</span>
            <span>$10,000</span> {/* Mock based on screenshot */}
          </div>
          <div className="flex items-center justify-between text-sm text-[#333]">
            <span>Adjustments</span>
            <span>{entry.adjustments}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#333]">
            <span>Taxes</span>
            <span>{entry.taxes}</span>
          </div>

          <div className="flex items-center justify-between border-t border-[#EAECF0] pt-3 font-medium text-sm text-[#039855]">
            <span>Net Balance</span>
            <span>{entry.netBalance}</span>
          </div>
        </div>

        <HDivider />

        {/* ── PSP Breakdown ── */}
        <SectionTitle>PSP Breakdown</SectionTitle>
        <div className="rounded-xl border border-[#EAECF0] overflow-auto bg-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] border-b border-[#EAECF0] text-xs font-medium text-[#475467]">
              <tr>
                <th className="px-4 py-3 font-semibold">PSP</th>
                <th className="px-4 py-3 font-semibold">Earnings</th>
                <th className="px-4 py-3 font-semibold">Commission</th>
                <th className="px-4 py-3 font-semibold">Net Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              <tr>
                <td className="px-4 py-3 align-top">
                  <p className="text-[#1D2939] underline underline-offset-2 cursor-pointer mb-0.5">Maria Santos</p>
                  <p className="text-xs text-[#667085]">ID: PSP001</p>
                </td>
                <td className="px-4 py-3 align-top text-[#475467]">$12,000</td>
                <td className="px-4 py-3 align-top text-[#475467]">$1,200</td>
                <td className="px-4 py-3 align-top text-[#475467]">$10,800</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">
                  <p className="text-[#1D2939] underline underline-offset-2 cursor-pointer mb-0.5">SilverAge Support</p>
                  <p className="text-xs text-[#667085]">ID: J002</p>
                </td>
                <td className="px-4 py-3 align-top text-[#475467]">$18,000</td>
                <td className="px-4 py-3 align-top text-[#475467]">$1,800</td>
                <td className="px-4 py-3 align-top text-[#475467]">$16,200</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">
                  <p className="text-[#1D2939] underline underline-offset-2 cursor-pointer mb-0.5">Lisa Wong</p>
                  <p className="text-xs text-[#667085]">ID: PSP006</p>
                </td>
                <td className="px-4 py-3 align-top text-[#475467]">$10,000</td>
                <td className="px-4 py-3 align-top text-[#475467]">$1,000</td>
                <td className="px-4 py-3 align-top text-[#475467]">$9,000</td>
              </tr>
              <tr className="bg-[#F9FAFB] font-medium text-[#667085]">
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">$40,000</td>
                <td className="px-4 py-3">$4,000</td>
                <td className="px-4 py-3">$36,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <HDivider />

        {/* ── Adjustments ── */}
        <SectionTitle>Adjustments</SectionTitle>
        <div className="space-y-3 px-1">
          <div className="flex justify-between text-sm text-[#333]">
            <span>Refund Adjustments (7 cases)</span>
            <span>-$300</span>
          </div>
          <div className="flex justify-between text-sm text-[#333]">
            <span>Manual Corrections (2 entries)</span>
            <span>-$200</span>
          </div>
          <div className="pt-2 border-t border-[#EAECF0] mt-3 flex justify-between font-medium text-sm text-[#E4302F]">
            <span>Total Adjustments</span>
            <span>-$500</span>
          </div>
        </div>

        <HDivider />

        {/* ── Tax Details ── */}
        <SectionTitle>Tax Details</SectionTitle>
        <div className="space-y-3 px-1">
          <div className="flex justify-between text-sm text-[#333]">
            <span>GST Collected</span>
            <span>$2,000</span>
          </div>
          <div className="flex justify-between text-sm text-[#333]">
            <span>TDS Deducted</span>
            <span>$800</span>
          </div>
          <div className="pt-2 border-t border-[#EAECF0] mt-3 flex justify-between font-medium text-sm text-[#E4302F]">
            <span>Net Tax Liability</span>
            <span>$1,200</span>
          </div>
        </div>

        <HDivider />

        {/* ── Status Timeline ── */}
        <SectionTitle>Status Timeline</SectionTitle>
        <div className="mt-4 px-1">
          <TimelineRow date="Mar 01" label="Cycle Created" systemText="System" />
          <TimelineRow date="Mar 01" label="Verification / Processing Started" systemText="System" />
          <TimelineRow date="Mar 08" label="Adjustments Applied" systemText="Admin" />
          <TimelineRow date="Mar 09" label="Finalized and Closed by Robert Brown" isLast />
        </div>

      </div>
    </SideSheet>
  );
};

export default SettlementDetailSheet;
