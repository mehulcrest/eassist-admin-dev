import { useMemo, useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  CalendarDays,
  Download,
  Eye,
  Flag,
  MoreHorizontal,
  Search,
  Settings2,
} from "lucide-react";
import SideSheet from "../../../components/SideSheet";
import LedgerEntryDetailSheet from "./LedgerEntryDetailSheet";
import FlagFinancialIssueModal from "./FlagFinancialIssueModal";

/* ─────────────────────────────────────────────
   Data & Styles
───────────────────────────────────────────── */
const KPI_CARDS = [
  {
    title: "Total Credits",
    value: "$5,240.00",
    change: "8%",
    trend: "up",
  },
  {
    title: "Total Debits",
    value: "$3,120.00",
    change: "3.5%",
    trend: "down",
  },
  {
    title: "Net Balance Change",
    value: "+$2,120.00",
    change: "12.5%",
    trend: "up",
  },
];

const LEDGER_ROWS = [
  {
    id: "1",
    date: "Mar 14, 2026",
    source: "Cleaning Service",
    type: "Commission",
    ref: "TXN001",
    credit: "$12.00",
    tax: "$2.00",
    balance: "$10.00",
    status: "Earned",
  },
  {
    id: "2",
    date: "Mar 15, 2026",
    source: "Subscription",
    type: "Subscription",
    ref: "SUB001",
    credit: "$50.00",
    tax: "$5.00",
    balance: "$45.00",
    status: "Earned",
  },
  {
    id: "3",
    date: "Mar 18, 2026",
    source: "Cleaning Service",
    type: "Reversal",
    ref: "TXN1003",
    credit: "$9.00",
    tax: "$1.50",
    balance: "$7.50",
    status: "Earned",
  },
  {
    id: "4",
    date: "Mar 15, 2026",
    source: "Refund Adjustment",
    type: "Commission",
    ref: "TXN004",
    credit: "-$5.00",
    tax: "$0.00",
    balance: "-$5.00",
    status: "Adjusted",
  },
  {
    id: "5",
    date: "Mar 16, 2026",
    source: "Home Care",
    type: "Commission",
    ref: "TXN005",
    credit: "$20.00",
    tax: "$4.00",
    balance: "$16.00",
    status: "Earned",
  },
  {
    id: "6",
    date: "Mar 15, 2026",
    source: "Premium Plan",
    type: "Subscription",
    ref: "SUB002",
    credit: "$80.00",
    tax: "$8.00",
    balance: "$72.00",
    status: "Earned",
  },
  {
    id: "7",
    date: "Mar 16, 2026",
    source: "Late Fee",
    type: "Penalty",
    ref: "PEN001",
    credit: "$10.00",
    tax: "$1.00",
    balance: "$9.00",
    status: "Earned",
  },
];

const TYPE_STYLE = {
  Commission: "bg-[#ECFDF3] text-[#027A48]",
  Subscription: "bg-[#EFF8FF] text-[#175CD3]",
  Reversal: "bg-[#FEF3F2] text-[#B42318]",
  Penalty: "bg-[#FFFAEB] text-[#B54708]",
};

const STATUS_STYLE = {
  Earned: "text-[#12B76A] font-semibold bg-[#ECFDF3] px-2.5 py-0.5 rounded-full",
  Adjusted: "text-[#2E90FA] font-semibold bg-[#EFF8FF] px-2.5 py-0.5 rounded-full",
};

const thClass =
  "px-4 py-3 text-left text-xs font-semibold text-[#475467] border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

/* ─── More-actions dropdown ────────────────── */
const MoreActionsMenu = ({ row, onFlag }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors"
        aria-label="More actions"
      >
        <MoreHorizontal size={15} strokeWidth={2} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-40 rounded-xl border border-[#EAECF0] bg-white shadow-lg py-1">
          <button
            type="button"
            onClick={() => { setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <Download size={15} className="text-[#667085]" strokeWidth={2} />
            Export
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onFlag(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <Flag size={15} className="text-[#667085]" strokeWidth={2} />
            Flag Issue
          </button>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const PlatformRevenueLedgerTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter States
  const [fType, setFType] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fAmount, setFAmount] = useState("");
  const [fDate, setFDate] = useState("");

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [flagEntryRow, setFlagEntryRow] = useState(null);

  const filtered = useMemo(() => {
    let result = LEDGER_ROWS;
    
    // Search
    const q = searchQuery.toLowerCase();
    if (q) {
      result = result.filter((r) => r.source.toLowerCase().includes(q) || r.ref.toLowerCase().includes(q));
    }

    // Apply exact filter dropdown values
    if (fType) result = result.filter(r => r.type === fType);
    if (fStatus) result = result.filter(r => r.status === fStatus);

    return result;
  }, [searchQuery, fType, fStatus]);

  const handleApplyFilters = () => setIsFilterOpen(false);
  const handleClearFilters = () => {
    setFType("");
    setFStatus("");
    setFAmount("");
    setFDate("");
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 min-h-0 h-full overflow-y-auto lg:overflow-hidden">
      
      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="relative w-full sm:max-w-[400px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#667085]" strokeWidth={2} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Source name, type"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#667085] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors"
        >
          <Settings2 size={16} className="text-[#667085]" strokeWidth={2.5} />
          Filters
        </button>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        {KPI_CARDS.map((kpi, idx) => {
          const isUp = kpi.trend === "up";
          return (
            <div key={idx} className="rounded-xl border border-[#EAECF0] bg-white p-5 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] flex flex-col justify-between">
              <p className="text-sm font-bold text-[#344054]">{kpi.title}</p>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-[28px] font-bold text-[#101828] leading-none">{kpi.value}</span>
                <div className="flex items-center gap-1.5 pb-0.5">
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isUp ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FEF3F2] text-[#B42318]"
                    }`}
                  >
                    {isUp ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
                    {kpi.trend === "up" ? "\u2191" : "\u2193"} {kpi.change}
                  </span>
                  <span className="text-xs text-[#667085]">this month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Table ── */}
      <div className="flex-1 min-h-[300px] overflow-auto rounded-xl border border-[#EAECF0] bg-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr>
              <th className={thClass}>Date</th>
              <th className={thClass}>Source</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Ref</th>
              <th className={thClass}>Credit</th>
              <th className={thClass}>Tax</th>
              <th className={thClass}>Balance</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} w-[90px] text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-16 text-center text-sm text-[#667085]">
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                  <td className={tdClass}>{row.date}</td>
                  <td className={tdClass}>
                    <span className="text-[#475467] font-medium">{row.source}</span>
                  </td>
                  <td className={tdClass}>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_STYLE[row.type] || "bg-gray-100 text-gray-700"}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className={tdClass}>{row.ref}</td>
                  <td className={tdClass}>{row.credit}</td>
                  <td className={tdClass}>{row.tax}</td>
                  <td className="px-4 py-4 text-sm font-bold text-[#101828] align-middle">{row.balance}</td>
                  <td className={tdClass}>
                    <span className={`inline-flex items-center ${STATUS_STYLE[row.status] || "text-[#667085]"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 last:pr-6 align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedEntry(row)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors"
                        aria-label="View record"
                      >
                        <Eye size={15} strokeWidth={2} />
                      </button>
                      <MoreActionsMenu row={row} onFlag={setFlagEntryRow} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Filter Sheet ── */}
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
              className="h-11 flex-1 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
            >
              Apply Filter
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-5">
          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Status</label>
            <div className="relative">
              <select
                value={fStatus}
                onChange={(e) => setFStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">Select Status</option>
                <option value="Earned">Earned</option>
                <option value="Adjusted">Adjusted</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Type</label>
            <div className="relative">
              <select
                value={fType}
                onChange={(e) => setFType(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">Select Type</option>
                <option value="Commission">Commission</option>
                <option value="Subscription">Subscription</option>
                <option value="Reversal">Reversal</option>
                <option value="Penalty">Penalty</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Amount Range</label>
            <div className="relative">
              <select
                value={fAmount}
                onChange={(e) => setFAmount(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">Select Target Amount Range</option>
                <option value="1">Under $100</option>
                <option value="2">$100 - $500</option>
                <option value="3">Over $500</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range</label>
            <div className="relative">
              <select
                value={fDate}
                onChange={(e) => setFDate(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">MM-DD-YYYY ~ MM-DD-YYYY</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
              </select>
              <CalendarDays className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>
        </div>
      </SideSheet>

      {/* ── Drawers / Modals ── */}
      <LedgerEntryDetailSheet
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        entry={{
          ...selectedEntry,
          member: selectedEntry?.source,
          debit: "-",
          credit: selectedEntry?.credit
        }}
      />
      
      <FlagFinancialIssueModal
        isOpen={!!flagEntryRow}
        onClose={() => setFlagEntryRow(null)}
        record={flagEntryRow}
      />
    </div>
  );
};

export default PlatformRevenueLedgerTab;
