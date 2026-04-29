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
import userProfile from "../../../assets/userProfile.png";

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
    psp: "Maria Santos",
    avatar: userProfile,
    type: "Earning",
    ref: "JOB234",
    debit: "$120.00",
    credit: "-",
    balance: "$120.00",
    status: "Earned",
  },
  {
    id: "2",
    date: "Mar 14, 2026",
    psp: "Lisa Wong",
    avatar: userProfile,
    type: "Commission",
    ref: "FEE12",
    debit: "-",
    credit: "$12.00",
    balance: "$108.00",
    status: "Deducted",
  },
  {
    id: "3",
    date: "Mar 18, 2026",
    psp: "John Carter",
    avatar: userProfile,
    type: "Payout",
    ref: "PAY001",
    debit: "-",
    credit: "$108.00",
    balance: "$0.00",
    status: "Paid",
  },
  {
    id: "4",
    date: "Mar 15, 2026",
    psp: "John Smith",
    avatar: userProfile,
    type: "Adjustment",
    ref: "ADJ101",
    debit: "-",
    credit: "$20.00",
    balance: "$142.00",
    status: "Adjusted",
  },
  {
    id: "5",
    date: "Mar 18, 2026",
    psp: "David Lee Joseph",
    avatar: userProfile,
    type: "Payout",
    ref: "PAY002",
    debit: "-",
    credit: "$142.00",
    balance: "0",
    status: "Paid",
  },
  {
    id: "6",
    date: "Mar 13, 2026",
    psp: "John Carter",
    avatar: userProfile,
    type: "Earning",
    ref: "JOB2315",
    debit: "$90.00",
    credit: "-",
    balance: "$90.00",
    status: "Earned",
  },
];

const TYPE_STYLE = {
  Earning: "bg-[#ECFDF3] text-[#027A48]",
  Commission: "bg-[#FFFAEB] text-[#B54708]",
  Payout: "bg-[#FEF3F2] text-[#B42318]",
  Adjustment: "bg-[#EFF8FF] text-[#175CD3]",
};

const STATUS_STYLE = {
  Earned: "text-[#12B76A] font-semibold bg-[#ECFDF3] px-2.5 py-0.5 rounded-full",
  Deducted: "text-[#F79009] font-semibold bg-[#FFFAEB] px-2.5 py-0.5 rounded-full",
  Paid: "text-[#F04438] font-semibold bg-[#FEF3F2] px-2.5 py-0.5 rounded-full",
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
const PSPLedgerTab = () => {
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
      result = result.filter((r) => r.psp.toLowerCase().includes(q) || r.ref.toLowerCase().includes(q));
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
            placeholder="Search by PSP Name"
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
              <th className={thClass}>PSP</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Ref</th>
              <th className={thClass}>Debit</th>
              <th className={thClass}>Credit</th>
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
                    <div className="flex items-center gap-2.5">
                      <img src={row.avatar} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                      <span className="text-[#175CD3] underline underline-offset-2 cursor-pointer hover:text-[#101828]">
                        {row.psp}
                      </span>
                    </div>
                  </td>
                  <td className={tdClass}>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_STYLE[row.type] || "bg-gray-100 text-gray-700"}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className={tdClass}>{row.ref}</td>
                  <td className={tdClass}>{row.debit}</td>
                  <td className={tdClass}>{row.credit}</td>
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
                <option value="Deducted">Deducted</option>
                <option value="Paid">Paid</option>
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
                <option value="Earning">Earning</option>
                <option value="Commission">Commission</option>
                <option value="Payout">Payout</option>
                <option value="Adjustment">Adjustment</option>
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
          member: selectedEntry?.psp, // mock mapping
          debit: selectedEntry?.debit,
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

export default PSPLedgerTab;
