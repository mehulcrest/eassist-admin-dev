import { Download, ScrollText } from "lucide-react";
import SideSheet from "../../../components/SideSheet";

/* ─── Status pill styles ─────────────────────────────────── */
const statusPill = {
  Paid: "bg-[#ECFDF3] text-[#027A48] ",
  "Refund Pending": "bg-[#FEF3F2] text-[#B42318] ",
  Active: "bg-[#EFF8FF] text-[#175CD3] ",
  Flagged: "bg-[#FFFAEB] text-[#B54708] ",
};

/* ─── Primitives ─────────────────────────────────────────── */
const FieldLabel = ({ children }) => (
  <p className="text-xs font-medium text-[#333] mb-1">{children}</p>
);
const FieldValue = ({ children, className = "" }) => (
  <p className={`text-sm text-[#667085] ${className}`}>{children}</p>
);
const SectionTitle = ({ children }) => (
  <h3 className="text-base font-bold text-[#333]">{children}</h3>
);
const HDivider = () => <div className="my-6 border-t border-[#EAECF0]" />;

/* ─── Main Component ─────────────────────────────────────── */
const MemberWalletDetailSheet = ({ isOpen, onClose, member }) => {
  if (!isOpen || !member) return null;

  /* Recent transactions per member */
  const recentTransactions = member.recentTx ?? [
    { id: "TXN001", type: "Payment", description: "Grocery Trip Assistance", amount: "$120.00", date: "Apr 16, 2026", status: "Completed" },
    { id: "TXN002", type: "Refund", description: "Service Cancellation", amount: "-$45.00", date: "Apr 10, 2026", status: "Refunded" },
    { id: "TXN003", type: "Payment", description: "Doctor Visit", amount: "$80.00", date: "Apr 05, 2026", status: "Completed" },
  ];

  const txStatusColor = {
    Completed: "text-[#12B76A]",
    Refunded: "text-[#F04438]",
    Pending: "text-[#F79009]",
    Failed: "text-[#F04438]",
  };

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Member Wallet Detail"
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
        {/* ── Member Summary ── */}
        <SectionTitle>Member Summary</SectionTitle>

        <div className="mt-5 flex items-center gap-4 pb-5 border-b border-[#EAECF0]">
          {member.avatar ? (
            <img src={member.avatar} alt="" className="size-14 rounded-full object-cover ring-2 ring-[#EAECF0]" />
          ) : (
            <div className="size-14 rounded-full bg-[#F2F4F7] flex items-center justify-center text-xl font-bold text-[#667085]">
              {member.name?.[0] ?? "M"}
            </div>
          )}
          <div>
            <p className="text-base font-bold text-[#101828]">{member.name}</p>
            <p className="text-sm text-[#667085]">{member.territory}</p>
            <span className={`mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusPill[member.status] ?? statusPill.Active}`}>
              {member.status}
            </span>
          </div>
        </div>

        {/* ── Wallet Info Grid ── */}
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5">
          <div>
            <FieldLabel>Total Spend</FieldLabel>
            <FieldValue className="font-semibold text-[#101828]">{member.totalSpend}</FieldValue>
          </div>
          <div>
            <FieldLabel>Refund Balance</FieldLabel>
            <FieldValue className={`font-semibold ${member.refundBalance === "$0" ? "text-[#667085]" : "text-[#F04438]"}`}>
              {member.refundBalance}
            </FieldValue>
          </div>
          <div>
            <FieldLabel>Last Payment</FieldLabel>
            <FieldValue className="text-[#175CD3]">{member.lastPayment}</FieldValue>
          </div>
          <div>
            <FieldLabel>Territory</FieldLabel>
            <FieldValue>{member.territory}</FieldValue>
          </div>
          <div>
            <FieldLabel>Payment Method</FieldLabel>
            <FieldValue>{member.paymentMethod ?? "Credit Card"}</FieldValue>
          </div>
          <div>
            <FieldLabel>Member Since</FieldLabel>
            <FieldValue>{member.memberSince ?? "Jan 01, 2025"}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── Spending Summary Card ── */}
        <SectionTitle>Spending Summary</SectionTitle>

        <div className="mt-4 rounded-xl  bg-[#F6F6F6] px-5 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#475467]">Total Payments Made</span>
            <span className="text-sm font-medium text-[#344054]">{member.totalSpend}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#475467]">Refunds Issued</span>
            <span className="text-sm font-medium text-[#F04438]">{member.refundBalance}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#475467]">Net Spend</span>
            <span className="text-sm font-medium text-[#344054]">{member.netSpend ?? member.totalSpend}</span>
          </div>
          <div className="border-t border-[#EAECF0] pt-3 flex items-center justify-between">
            <span className="text-base font-medium text-[#333]">Outstanding Balance</span>
            <span className="text-base font-medium text-[#333]">{member.refundBalance}</span>
          </div>
        </div>

        <HDivider />

        {/* ── Recent Transactions ── */}
        <div className="flex items-baseline justify-between gap-2 mb-4">
          <SectionTitle>Recent Transactions</SectionTitle>
          <span className="text-xs text-[#667085] italic shrink-0">Last 30 days</span>
        </div>

        <div className="rounded-xl border border-[#EAECF0] overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB]">
                {["ID", "Type", "Description", "Amount", "Date", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475467] border-b border-[#EAECF0] first:pl-5 last:pr-5 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {recentTransactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB]/60">
                  <td className="px-4 py-3 pl-5 text-sm font-medium text-[#101828]">{tx.id}</td>
                  <td className="px-4 py-3 text-sm text-[#475467]">{tx.type}</td>
                  <td className="px-4 py-3 text-sm text-[#475467]">{tx.description}</td>
                  <td className={`px-4 py-3 text-sm font-medium ${tx.amount.startsWith("-") ? "text-[#F04438]" : "text-[#101828]"}`}>
                    {tx.amount}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#667085] whitespace-nowrap">{tx.date}</td>
                  <td className={`px-4 py-3 pr-5 text-sm font-medium ${txStatusColor[tx.status] + " items-center rounded-full px-2.5 py-0.5 text-xs" ?? "text-[#667085]"}`}>
                    {tx.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-4" />
      </div>
    </SideSheet>
  );
};

export default MemberWalletDetailSheet;
