import { AlertTriangle, CalendarDays, CircleDollarSign, Clock3, Eye, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import PayoutDetailSideSheet from "./PayoutDetailSideSheet";
import SideSheet from "../SideSheet";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";

const payoutRows = [
  {
    payoutId: "PYA-00332",
    period: "Apr 15 - Apr 30, 2026",
    jobsCompleted: 9,
    grossEarnings: "$1,620.00",
    platformFee: "$162.00",
    netPayout: "$1,458.00",
    paymentDate: "Wed, May 06, 2026",
    status: "Processing",
  },
  {
    payoutId: "PYA-00331",
    period: "Apr 01 - Apr 14, 2026",
    jobsCompleted: 12,
    grossEarnings: "$2,400.00",
    platformFee: "$240.00",
    netPayout: "$2,160.00",
    paymentDate: "Wed, Apr 22, 2026",
    status: "Paid",
  },
  {
    payoutId: "PYA-00330",
    period: "Mar 15 - Mar 31, 2026",
    jobsCompleted: 8,
    grossEarnings: "$1,520.00",
    platformFee: "$152.00",
    netPayout: "$1,368.00",
    paymentDate: "Wed, Apr 08, 2026",
    status: "Paid",
  },
  {
    payoutId: "PYA-00329",
    period: "Mar 01 - Mar 14, 2026",
    jobsCompleted: 10,
    grossEarnings: "$1,950.00",
    platformFee: "$195.00",
    netPayout: "$1,755.00",
    paymentDate: "Wed, Mar 25, 2026",
    status: "Paid",
  },
  {
    payoutId: "PYA-00328",
    period: "Feb 15 - Feb 28, 2026",
    jobsCompleted: 7,
    grossEarnings: "$1,330.00",
    platformFee: "$133.00",
    netPayout: "$1,197.00",
    paymentDate: "Wed, Mar 11, 2026",
    status: "Paid",
  },
  {
    payoutId: "PYA-00327",
    period: "Feb 01 - Feb 14, 2026",
    jobsCompleted: 11,
    grossEarnings: "$2,100.00",
    platformFee: "$210.00",
    netPayout: "$1,890.00",
    paymentDate: "Wed, Feb 25, 2026",
    status: "Failed",
  },
  {
    payoutId: "PYA-00326",
    period: "Jan 15 - Jan 31, 2026",
    jobsCompleted: 6,
    grossEarnings: "$1,180.00",
    platformFee: "$118.00",
    netPayout: "$1,062.00",
    paymentDate: "Wed, Feb 11, 2026",
    status: "Paid",
  },
];

const statusClass = {
  Processing: "bg-[#FFFAEB] text-[#DC6803]",
  Paid: "bg-[#ECFDF3] text-[#039855]",
  Failed: "bg-[#FEF3F2] text-[#F04438]",
};

const metricCards = [
  {
    title: "This Month Earnings",
    value: "$2,480.00",
    subtitle: "$350 since last month",
    icon: CircleDollarSign,
    iconClass: "text-[#12B76A]",
    cardClass: "border-[#E4E7EC] bg-[#ECFDF3]",
  },
  {
    title: "Pending Payout",
    value: "$620.00",
    subtitle: "Scheduled for May 05, 2026",
    icon: Clock3,
    iconClass: "text-[#F79009]",
    cardClass: "border-[#E4E7EC] bg-[#FFFAEB]",
  },
  {
    title: "Paid to Date",
    value: "$18,450.00",
    subtitle: "",
    icon: CalendarDays,
    iconClass: "text-[#2E90FA]",
    cardClass: "border-[#E4E7EC] bg-[#DFF3FF]",
  },
  {
    title: "Failed Payouts",
    value: "1",
    subtitle: "",
    icon: AlertTriangle,
    iconClass: "text-[#F04438]",
    cardClass: "border-[#E4E7EC] bg-[#FCE5E7]",
  },
];

const EarningsPayoutTab = () => {
  const [query, setQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [payoutStatus, setPayoutStatus] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [amountRange, setAmountRange] = useState("");
  const [showFailedOnly, setShowFailedOnly] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [isPayoutDetailOpen, setIsPayoutDetailOpen] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return payoutRows;

    return payoutRows.filter(
      (row) =>
        row.payoutId.toLowerCase().includes(q) ||
        row.period.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-y-auto md:overflow-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[360px] mb-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by Complaint ID, Service, Issue Type"
            className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsFiltersOpen(true)}
          className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054] sm:self-auto"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="mb-1 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={`rounded-xl border px-4 py-3 ${card.cardClass}`}>
              <div className="flex items-center gap-2">
                <Icon size={21} className={card.iconClass} />
                <p className="text-lg font-medium text-textColor">{card.title}</p>
              </div>
              <p className="mt-2 text-xl leading-none font-semibold text-[#1D2939]">{card.value}</p>
              {card.subtitle ? <p className="mt-2 text-sm text-[#667085]">{card.subtitle}</p> : null}
            </div>
          );
        })}
      </div>

      <div className="min-h-0 md:flex-1 md:overflow-hidden">
        <TableWrapper className="max-h-[320px] overflow-y-auto sm:max-h-[380px] md:h-full md:max-h-none">
          <Table minWidth="min-w-[1320px]">
            <TableHead>
              <Th>Payout ID</Th>
              <Th>Period</Th>
              <Th>Jobs Completed</Th>
              <Th>Gross Earnings</Th>
              <Th>Platform Fee (10%)</Th>
              <Th>Net Payout</Th>
              <Th>Payment Date</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.payoutId}>
                  <Td>{row.payoutId}</Td>
                  <Td>{row.period}</Td>
                  <Td>{row.jobsCompleted}</Td>
                  <Td>{row.grossEarnings}</Td>
                  <Td>{row.platformFee}</Td>
                  <Td className="font-semibold text-[#1D2939]">{row.netPayout}</Td>
                  <Td>{row.paymentDate}</Td>
                  <Td>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[row.status]}`}>
                      {row.status}
                    </span>
                  </Td>
                  <Td className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPayout(row);
                        setIsPayoutDetailOpen(true);
                      }}
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085]"
                      aria-label={`View ${row.payoutId}`}
                    >
                      <Eye size={14} />
                    </button>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>

      <SideSheet
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        title="Filters"
        widthClass="w-[430px]"
        footer={(
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-11 flex-1 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-4 text-sm font-semibold text-white"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setIsFiltersOpen(false)}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054]"
            >
              Cancel
            </button>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Payout Status</label>
            <div className="relative">
              <select
                value={payoutStatus}
                onChange={(event) => setPayoutStatus(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054]"
              >
                <option value="">Select Status</option>
                <option value="processing">Processing</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#667085]" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range (Period)</label>
            <div className="relative">
              <input
                type="text"
                value={dateRange}
                onChange={(event) => setDateRange(event.target.value)}
                placeholder="MM-DD-YY ~ MM-DD-YYYY"
                className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054] placeholder:text-[#98A2B3]"
              />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Amount Range</label>
            <div className="relative">
              <select
                value={amountRange}
                onChange={(event) => setAmountRange(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054]"
              >
                <option value="">Select Rating count</option>
                <option value="under-1k">&lt; $1K</option>
                <option value="2k-5k">$2K-$5K</option>
                <option value="5k-plus">$5K+</option>
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#667085]" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#344054]">Show Failed Only</p>
            <p className="text-xs text-[#667085]">Show only Failed Payouts</p>
          </div>
          <button
            type="button"
            onClick={() => setShowFailedOnly((prev) => !prev)}
            className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
              showFailedOnly ? "bg-[#12B76A]" : "bg-[#D0D5DD]"
            }`}
            aria-pressed={showFailedOnly}
          >
            <span
              className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${
                showFailedOnly ? "left-[18px]" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </SideSheet>

      <PayoutDetailSideSheet
        isOpen={isPayoutDetailOpen}
        onClose={() => setIsPayoutDetailOpen(false)}
        payout={selectedPayout}
      />
    </div>
  );
};

export default EarningsPayoutTab;
