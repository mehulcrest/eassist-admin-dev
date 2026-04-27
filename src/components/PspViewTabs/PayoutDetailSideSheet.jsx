import { AlertCircle } from "lucide-react";
import SideSheet from "../SideSheet";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";
import StatusBadge from "../ui/StatusBadge";

const timelineBase = [
  ["Apr 30", "Period Closed"],
  ["May 01", "Processing Started"],
  ["May 04", "Verification Completed"],
];

const earningsRows = [
  ["Grocery Trip Assistance", "I: J001", "Apr 16, 2026", "$18.00", "$18.00", "$16.20"],
  ["Cleaning", "I: J002", "Apr 17, 2026", "$22.00", "$22.00", "$19.80"],
  ["Doctor Visit", "I: J003", "Apr 20, 2026", "$15.00", "$15.00", "$13.50"],
  ["Daily Care Assistance", "I: J004", "Apr 22, 2026", "$14.00", "$14.00", "$12.60"],
  ["Cleaning", "I: J007", "Apr 24, 2026", "$20.00", "$20.00", "$18.00"],
  ["Meal Preparation", "I: J008", "Apr 26, 2026", "$16.00", "$16.00", "$14.40"],
  ["House Cleaning", "I: J009", "Apr 28, 2026", "$24.00", "$24.00", "$21.60"],
];

const payoutCalculationRows = [
  ["Gross Service Value", "$1,620.00"],
  ["Platform Commision(10%)", "-$162.00"],
  ["Refunds & Adjustments", "-$40.00"],
  ["Penalties", "-$20.00"],
  ["service Call Fee (if applicable)", "-$10.00"],
];

const adjustmentRows = [
  ["Refund Adjustment (Job ID: J005)", "-$20.00"],
  ["Penalty Applied (Late arrival)", "-$20.00"],
];

const PayoutDetailSideSheet = ({ isOpen, onClose, payout }) => {
  const status = payout?.status ?? "Processing";
  const isFailed = status === "Failed";
  const isPaid = status === "Paid";
  const timeline = [...timelineBase, [isFailed ? "May 06" : "May 06", isFailed ? "Payout Failed" : "Payout Initiated"]];

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Payout Detail"
      widthClass="w-[662px]"
      footer={(
        isFailed ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" className="text-sm font-medium text-textColor underline underline-offset-2">
              Contact Support
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="rounded-lg px-3 py-2.5 bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-sm font-semibold text-white">
                Retry Payout
              </button>
              <button type="button" className="rounded-lg px-3 py-2.5 border border-redRejected bg-white text-sm font-semibold text-redRejected">
                Update Bank Details
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between sm:hidden">
              <button type="button" className="text-sm font-medium text-textColor underline underline-offset-2">
                Contact Support
              </button>
              <button type="button" className="rounded-lg px-3 py-2.5 border border-redRejected bg-white text-sm font-semibold text-redRejected">
                View Transaction Log
              </button>
            </div>
            <button type="button" className="mt-3 w-full rounded-lg px-3 py-2.5 bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-sm font-semibold text-white sm:hidden">
              Download Statement
            </button>

            <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <button type="button" className="text-sm font-medium text-textColor underline underline-offset-2">
                Contact Support
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="rounded-lg px-3 py-2.5 bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-sm font-semibold text-white">
                  Download Statement
                </button>
                <button type="button" className="rounded-lg px-3 py-2.5 border border-redRejected bg-white text-sm font-semibold text-redRejected">
                  View Transaction Log
                </button>
              </div>
            </div>
          </div>
        )
      )}
    >
      <div className="space-y-6">
        {isFailed ? (
          <div className="rounded-xl border border-[#FDA29B] bg-[#FFF5F5] px-4 py-3">
            <p className="inline-flex items-center gap-2 text-base font-semibold leading-none text-textColor">
              <AlertCircle size={14} />
              Payout Failed
            </p>
            <p className="mt-1 text-sm text-secondaryTextColor">Bank tranfer was unsucessful. Please retry or update bank details.</p>
            <button type="button" className="mt-1 text-sm text-secondaryTextColor underline underline-offset-2">
              Learn more
            </button>
          </div>
        ) : null}

        <div>
          <p className="text-base font-semibold text-textColor">Payout Summary</p>
          <div className="mt-2 grid grid-cols-2 gap-5 text-sm">
            <div className="flex flex-col gap-1"><p className="text-textColor">Payment ID</p><p className="text-secondaryTextColor">{payout?.payoutId ?? "PYA-00332"}</p></div>
            <div className="flex flex-col gap-1"><p className="text-textColor">Payout Period</p><p className="text-secondaryTextColor">{payout?.period ?? "Apr Cycle 2 (Apr 15 - Apr 30, 2026)"}</p></div>
            <div className="flex flex-col gap-1"><p className="text-textColor">Payment Date</p><p className="text-secondaryTextColor">{payout?.paymentDate ?? "Wed, May 06, 2026"}</p></div>
            <div>
              <p className="text-textColor">Payout Status</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm text-secondaryTextColor">
                <StatusBadge
                  label={status}
                  tone={isFailed ? "failed" : isPaid ? "paid" : "processing"}
                  size="sm"
                />
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.8333 13.3333H10V10H9.16667M10 6.66667H10.0083M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </p>
            </div>
            <div><p className="text-textColor">Paid to Bank Account</p><p className="mt-1 text-secondaryTextColor">**** 4567</p></div>
            <div></div>
            <div><p className="text-textColor">PSP Name</p><p className="mt-1 text-secondaryTextColor">Maria Santos</p></div>
            <div><p className="text-textColor">PSP ID</p><p className="mt-1 text-secondaryTextColor">PSP001</p></div>
            
          </div>
        </div>

        <div className="border-t border-[#EAECF0] pt-5">
          <p className="text-lg font-semibold text-textColor">Payout Timeline</p>
          <div className="relative mt-2 pl-10">
            <div className="absolute left-[7px] top-1 h-[132px] border-l border-dashed border-[#FECACA]" />
            {timeline.map(([date, label]) => (
              <div key={`${date}-${label}`} className="relative mb-4 flex items-center gap-3 last:mb-0">
                <span className="absolute -left-10 top-1.5 size-3 rounded-full border-[1.5px] border-redRejected bg-white" />
                <span className="text-base text-textColor">{date}</span>
                <span className={`text-base ${label === "Payout Failed" ? "text-redRejected" : "text-textColor"}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-textColor">Earnings Breakdown</p>
          <p className="text-sm text-secondaryTextColor">Includes all completed jobs in this payout cycle</p>
          </div>
          <div className="mt-2 overflow-hidden rounded-xl border border-[#EAECF0]">
            <TableWrapper className="rounded-none border-0">
              <Table minWidth="min-w-[600px]">
              <TableHead>
                <Th>Job</Th>
                <Th>Date</Th>
                <Th>Earning</Th>
                <Th>Platform Fee</Th>
                <Th>Net Earnings</Th>
              </TableHead>
              <TableBody>
                {earningsRows.map((row) => (
                  <TableRow key={row[1]}>
                    <Td><div className="flex flex-col"><span>{row[0]}</span><span className="text-xs">ID: {row[1]}</span></div></Td>
                    <Td>{row[2]}</Td>
                    <Td>{row[3]}</Td>
                    <Td>{row[4]}</Td>
                    <Td>{row[5]}</Td>
                  </TableRow>
                ))}
                <TableRow>
                  <Td className="font-semibold text-textColor">Total</Td>
                  <Td />
                  <Td className="font-semibold">$1,620.00</Td>
                  <Td className="font-semibold">$162.00</Td>
                  <Td className="font-semibold">$1,458.00</Td>
                </TableRow>
              </TableBody>
              </Table>
            </TableWrapper>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-lg font-semibold text-textColor">Payout Calculation</p>
            <div className="mt-2 rounded-xl border border-[#EAECF0] bg-[#F6F6F6] p-3.5">
              <div className="mb-4 space-y-2 text-sm text-textColor">
                {payoutCalculationRows.map(([label, value]) => (
                  <p key={label} className="flex items-center justify-between gap-4">
                    <span>{label}</span>
                    <span className="font-normal text-textColor">{value}</span>
                  </p>
                ))}
              </div>
              <p className="mt-2 flex items-center justify-between border-t border-[#EBEBEB] pt-1 text-base leading-[38px] font-semibold text-greenVerified">
                <span className="text-base leading-7">Net Payout</span>
                <span>{isFailed ? "$1,062.00" : "$1,388.00"}</span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold text-textColor">Adjustments & Deductions</p>
            <div className="mt-2 space-y-2 text-sm text-textColor">
              {adjustmentRows.map(([label, value]) => (
                <p key={label} className="flex items-center justify-between gap-4">
                  <span>{label}</span>
                  <span className="font-normal text-textColor">{value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SideSheet>
  );
};

export default PayoutDetailSideSheet;
