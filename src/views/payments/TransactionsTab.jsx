import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  Eye,
  RefreshCw,
  Search,
  Settings2,
} from "lucide-react";
import SideSheet from "../../components/SideSheet";
import TransactionDetailSheet from "./TransactionDetailSheet";
import userProfile from "../../assets/userProfile.png";

/* ─────────────────────────────────────────────
   Dummy Data
───────────────────────────────────────────── */
const TRANSACTIONS = [
  {
    id: "TXN001",
    type: "Payout",
    party: "Maria Santos",
    partyAvatar: userProfile,
    amount: "$1,620.00",
    fee: "$162.00",
    net: "$1,458.00",
    date: "Wed, May 06, 2026",
    status: "Processing",
  },
  {
    id: "TXN002",
    type: "Payout",
    party: "Lisa Wong",
    partyAvatar: userProfile,
    amount: "$2,400.00",
    fee: "$240.00",
    net: "$2,160.00",
    date: "Wed, Apr 22, 2026",
    status: "Paid",
  },
  {
    id: "TXN003",
    type: "Refund",
    party: "Margaret Thompson",
    partyAvatar: userProfile,
    amount: "-$1,520.00",
    fee: "$152.00",
    net: "$1,368.00",
    date: "Wed, Apr 08, 2026",
    status: "Paid",
  },
  {
    id: "TXN004",
    type: "Payout",
    party: "SilverAge Support",
    partyAvatar: userProfile,
    amount: "$1,950.00",
    fee: "$195.00",
    net: "$1,755.00",
    date: "Wed, Mar 25, 2026",
    status: "Paid",
  },
  {
    id: "TXN005",
    type: "Payout",
    party: "John Smith",
    partyAvatar: userProfile,
    amount: "$1,330.00",
    fee: "$133.00",
    net: "$1,197.00",
    date: "Wed, Mar 11, 2026",
    status: "Paid",
  },
  {
    id: "TXN006",
    type: "Refund",
    party: "ComfortHands",
    partyAvatar: userProfile,
    amount: "-$2,100.00",
    fee: "$210.00",
    net: "$1,890.00",
    date: "Wed, Feb 25, 2026",
    status: "Failed",
  },
  {
    id: "TXN007",
    type: "Payout",
    party: "David Lee Joseph",
    partyAvatar: userProfile,
    amount: "$1,180.00",
    fee: "$118.00",
    net: "$1,062.00",
    date: "Wed, Feb 11, 2026",
    status: "Paid",
  },
];

/* ─────────────────────────────────────────────
   Style helpers
───────────────────────────────────────────── */
const statusStyle = {
  Processing: "text-[#F79009] font-semibold",
  Paid:       "text-[#12B76A] font-semibold",
  Failed:     "text-[#F04438] font-semibold",
  Pending:    "text-[#667085] font-semibold",
};

const thClass =
  "px-4 py-3 text-left text-sm font-semibold text-[#475467] first:pl-6 last:pr-6 border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const TransactionsTab = ({ renderTabNav }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("txq") ?? "";

  const [isFilterOpen, setIsFilterOpen]     = useState(false);
  const [selectedTx,   setSelectedTx]       = useState(null);

  // Filter form state
  const [filterType,      setFilterType]      = useState("");
  const [filterStatus,    setFilterStatus]    = useState("");
  const [filterTerritory, setFilterTerritory] = useState("");
  const [filterParty,     setFilterParty]     = useState("");
  const [filterDate,      setFilterDate]      = useState("");

  // Apply filter state (snapshot on Apply click)
  const [applied, setApplied] = useState({});

  const handleApplyFilters = () => {
    setApplied({
      type: filterType,
      status: filterStatus,
      territory: filterTerritory,
      party: filterParty,
      date: filterDate,
    });
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setFilterType(""); setFilterStatus(""); setFilterTerritory("");
    setFilterParty(""); setFilterDate("");
    setApplied({});
    setIsFilterOpen(false);
  };

  // Filtered rows
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TRANSACTIONS.filter((tx) => {
      const matchesSearch =
        !q ||
        tx.id.toLowerCase().includes(q) ||
        tx.party.toLowerCase().includes(q) ||
        tx.type.toLowerCase().includes(q);
      const matchesType   = !applied.type   || tx.type   === applied.type;
      const matchesStatus = !applied.status || tx.status === applied.status;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [query, applied]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto lg:overflow-hidden">

      {/* ── Tab Navigation ── */}
      <div className="flex gap-4 sm:gap-6 rounded-xl border border-[#EAECF0] bg-white px-4 sm:px-6 pt-3 shrink-0 overflow-x-auto scrollbar-hide">
        {renderTabNav()}
      </div>

      {/* ── Header Controls ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
        {/* Search */}
        <div className="relative w-full sm:max-w-[340px]">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-[16px] -translate-y-1/2 text-[#667085]"
            strokeWidth={2}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setSearchParams(v ? { txq: v } : {}, { replace: true });
            }}
            placeholder="Search by Transaction ID"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#667085] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors hover:bg-gray-50"
          >
            <RefreshCw size={15} className="text-[#667085]" strokeWidth={2.5} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors hover:bg-gray-50"
          >
            <Settings2 size={16} className="text-[#667085]" strokeWidth={2.5} />
            Filters
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 min-h-[300px] overflow-auto rounded-xl border border-[#EAECF0] bg-white">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr>
              <th className={thClass}>ID</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Party</th>
              <th className={thClass}>Amount</th>
              <th className={thClass}>Platform Fee</th>
              <th className={thClass}>PSP Net Payout</th>
              <th className={thClass}>Payment Date</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} w-[72px] text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-16 text-center text-sm text-[#667085]">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F9FAFB]/60 transition-colors">

                  {/* ID */}
                  <td className={tdClass}>
                    <span className="font-medium text-[#101828]">{tx.id}</span>
                  </td>

                  {/* Type */}
                  <td className={tdClass}>
                    <span className="text-[#475467]">{tx.type}</span>
                  </td>

                  {/* Party */}
                  <td className={tdClass}>
                    <div className="flex items-center gap-2.5">
                      <img
                        src={tx.partyAvatar}
                        alt=""
                        className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
                      />
                      <span className="text-[#175CD3] underline underline-offset-2 cursor-pointer hover:text-[#F04438] transition-colors">
                        {tx.party}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className={tdClass}>
                    <span className={`font-medium ${tx.amount.startsWith("-") ? "text-[#F04438]" : "text-[#101828]"}`}>
                      {tx.amount}
                    </span>
                  </td>

                  {/* Platform Fee */}
                  <td className={tdClass}>
                    <span className="text-[#475467]">{tx.fee}</span>
                  </td>

                  {/* PSP Net Payout */}
                  <td className={tdClass}>
                    <span className="font-semibold text-[#101828]">{tx.net}</span>
                  </td>

                  {/* Payment Date */}
                  <td className={tdClass}>
                    <span className="text-[#475467]">{tx.date}</span>
                  </td>

                  {/* Status */}
                  <td className={tdClass}>
                    <span className={`text-sm ${statusStyle[tx.status] ?? "text-[#667085]"}`}>
                      {tx.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 align-middle text-center last:pr-6">
                    <button
                      type="button"
                      onClick={() => setSelectedTx(tx)}
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] transition-colors hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
                      aria-label={`View details for ${tx.id}`}
                    >
                      <Eye size={15} strokeWidth={2} />
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Filter Side Sheet ── */}
      <SideSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Filters"
        widthClass="w-full sm:w-[380px]"
        footer={
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleApplyFilters}
              className="h-11 flex-1 rounded-lg bg-[#F04438] text-sm font-semibold text-white transition hover:bg-[#D92D20]"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] transition hover:bg-gray-50"
            >
              Clear All
            </button>
          </div>
        }
      >
        <div className="space-y-5">

          {/* Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Type</label>
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="Payment">Payment</option>
                <option value="Payout">Payout</option>
                <option value="Refund">Refund</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Status</label>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="Processing">Processing</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Territory */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Territory</label>
            <div className="relative">
              <select
                value={filterTerritory}
                onChange={(e) => setFilterTerritory(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
              >
                <option value="">All Territories</option>
                <option value="Downtown">Downtown</option>
                <option value="Westside">Westside</option>
                <option value="Northside">Northside</option>
                <option value="Eastside">Eastside</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* PSP / Elder */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">PSP / Elder</label>
            <div className="relative">
              <select
                value={filterParty}
                onChange={(e) => setFilterParty(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
              >
                <option value="">All</option>
                <option value="PSP">PSP</option>
                <option value="Elder">Elder</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range</label>
            <div className="relative">
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
              >
                <option value="">MM-DD-YYYY ~ MM-DD-YYYY</option>
                <option value="today">Today</option>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

        </div>
      </SideSheet>

      {/* ── Transaction Detail Sheet ── */}
      <TransactionDetailSheet
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
        transaction={selectedTx}
      />

    </div>
  );
};

export default TransactionsTab;
