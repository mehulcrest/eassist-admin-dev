import { useMemo, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BadgeDollarSign,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Eye,
  Flag,
  Lock,
  MoreHorizontal,
  RefreshCw,
  Search,
  Settings2,
  CircleCheck,

  Download,
} from "lucide-react";
import SideSheet from "../../../components/SideSheet";
import DateRangeInput from "../../../components/ui/DateRangeInput";
import PlatformWalletDetailSheet from "./PlatformWalletDetailSheet";
import FlagTransactionModal from "./FlagTransactionModal";
import userProfile from "../../../assets/userProfile.png";

/* ─────────────────────────────────────────────
   KPI Data
───────────────────────────────────────────── */
const KPI_DATA = [
  {
    id: "available",
    title: "Available Balance",
    value: "$245,000",
    sub: "Funds ready to use",
    iconBg: "bg-[#ECFDF3]",
    icon: <CircleDollarSign size={20} className="text-[#12B76A]" />,
  },
  {
    id: "incoming",
    title: "Incoming Payments",
    value: "$32,400",
    sub: "Not yet settled",
    iconBg: "bg-[#EFF8FF]",
    icon: <CircleCheck size={20} className="text-[#175CD3]" />,
  },
  {
    id: "pending",
    title: "Pending Payouts",
    value: "$58,200",
    sub: "PSP obligations",
    iconBg: "bg-[#FFFAEB]",
    icon: <CalendarDays size={20} className="text-[#F79009]" />,
  },
  {
    id: "locked",
    title: "Locked Funds",
    value: "$12,000",
    sub: "Disputes / refunds",
    iconBg: "bg-[#FEF3F2]",
    icon: <Lock size={20} className="text-[#F04438]" />,
  },
];

/* ─────────────────────────────────────────────
   Table Data
───────────────────────────────────────────── */
const ROWS = [
  {
    id: "TXN001",
    type: "Payment",
    source: "Margaret Thompson",
    sourceAvatar: userProfile,
    description: "Grocery Trip Assistance",
    amount: "$120.00",
    date: "Wed, May 06, 2026",
    status: "Completed",
  },
  {
    id: "TXN002",
    type: "Payout",
    source: "Maria Santos",
    sourceAvatar: userProfile,
    description: "Weekly Settlement",
    amount: "-$800.00",
    date: "Wed, Apr 22, 2026",
    status: "Processed",
  },
  {
    id: "TXN003",
    type: "Refund",
    source: "George Walker",
    sourceAvatar: userProfile,
    description: "Service Cancellation",
    amount: "-$45.00",
    date: "Wed, Apr 08, 2026",
    status: "Pending",
  },
  {
    id: "TXN004",
    type: "Fee",
    source: "System",
    sourceAvatar: null,
    description: "Commission Earned",
    amount: "$12.00",
    date: "Wed, Mar 25, 2026",
    status: "Completed",
  },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const STATUS_STYLE = {
  Completed: "bg-[#ECFDF3] text-[#039855]",
  Processed: "bg-[#FFFAEB] text-[#DC6803]",
  Pending: "bg-[#FEF3F2] text-[#D92D20]",
  Failed: "text-[#F04438] font-semibold",
};

const thClass =
  "px-4 py-3 text-left text-sm font-semibold text-[#475467] border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6";

/* ─── System avatar fallback ───────────────── */
const SourceCell = ({ source, avatar }) => (
  <div className="flex items-center gap-2.5">
    {avatar ? (
      <img src={avatar} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]" />
    ) : (
      <div className="size-8 shrink-0 rounded-full bg-[#F04438]/10 flex items-center justify-center">
        <BadgeDollarSign size={16} className="text-[#F04438]" />
      </div>
    )}
    <span className="underline underline-offset-2 cursor-pointer hover:text-[#F04438] transition-colors">
      {source}
    </span>
  </div>
);

/* ─── Three-dot action menu ─────────────────── */
const MoreActionsMenu = ({ row, onFlagIssue, onExport }) => {
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
        <div className="absolute right-0 top-full z-30 mt-1 w-44 rounded-xl border border-[#EAECF0] bg-white shadow-lg py-1">
          <button
            type="button"
            onClick={() => { setOpen(false); onFlagIssue(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <Flag size={15} className="text-[#667085]" strokeWidth={2} />
            Flag Issue
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onExport(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <Download size={15} className="text-[#667085]" strokeWidth={2} />
            Export Row
          </button>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const PlatformWalletTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("pwq") ?? "";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [flagRow, setFlagRow] = useState(null);

  /* filter form */
  const [fType, setFType] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fTerritory, setFTerritory] = useState("");
  const [fParty, setFParty] = useState("");
  const [fDate, setFDate] = useState("");
  const [applied, setApplied] = useState({});

  const handleApply = () => {
    setApplied({ type: fType, status: fStatus, territory: fTerritory, party: fParty, date: fDate });
    setIsFilterOpen(false);
  };
  const handleClear = () => {
    setFType(""); setFStatus(""); setFTerritory(""); setFParty(""); setFDate("");
    setApplied({});
    setIsFilterOpen(false);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROWS.filter((r) => {
      const matchSearch = !q || r.id.toLowerCase().includes(q) || r.source.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
      const matchType = !applied.type || r.type === applied.type;
      const matchStatus = !applied.status || r.status === applied.status;
      return matchSearch && matchType && matchStatus;
    });
  }, [query, applied]);

  return (
    <div className="flex flex-col gap-5 min-h-0 overflow-y-auto lg:overflow-hidden h-full">

      {/* ── Header Controls ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div className="relative w-full sm:max-w-[320px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#667085]" strokeWidth={2} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setSearchParams(v ? { pwq: v } : {}, { replace: true });
            }}
            placeholder="Search by Transaction ID"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#667085] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={15} className="text-[#667085]" strokeWidth={2.5} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors"
          >
            <Settings2 size={16} className="text-[#667085]" strokeWidth={2.5} />
            Filters
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {KPI_DATA.map((kpi) => (
          <div key={kpi.id} className="rounded-xl border border-[#EAECF0] bg-white p-5 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                {kpi.icon}
              </div>
              <p className="text-sm font-semibold text-[#344054]">{kpi.title}</p>
            </div>
            <p className="text-2xl font-bold text-[#101828]">{kpi.value}</p>
            <p className="mt-1 text-xs text-[#667085]">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="flex-1 min-h-[300px] overflow-auto rounded-xl border border-[#EAECF0] bg-white">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr>
              <th className={thClass}>ID</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Source</th>
              <th className={thClass}>Description</th>
              <th className={thClass}>Amount</th>
              <th className={thClass}>Date</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} w-[100px] text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center text-sm text-[#667085]">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                  <td className={tdClass}>
                    <span className="font-medium ">{row.id}</span>
                  </td>
                  <td className={tdClass}>
                    <span className="text-[#475467]">{row.type}</span>
                  </td>
                  <td className={tdClass}>
                    <SourceCell source={row.source} avatar={row.sourceAvatar} />
                  </td>
                  <td className={tdClass}>
                    <span className="text-[#475467]">{row.description}</span>
                  </td>
                  <td className={tdClass}>
                    <span className={`font-medium ${row.amount.startsWith("-") ? "text-[#F04438]" : "text-[#101828]"}`}>
                      {row.amount}
                    </span>
                  </td>
                  <td className={tdClass}>
                    <span className="text-[#475467]">{row.date}</span>
                  </td>
                  <td className={tdClass}>
                    <span className={STATUS_STYLE[row.status] + " items-center rounded-full px-2.5 py-0.5 text-xs" ?? "text-[#667085] items-center rounded-full px-2.5 py-0.5 text-xs"}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 last:pr-6 align-middle">
                    <div className="flex items-center justify-center gap-2">
                      {/* Eye */}
                      <button
                        type="button"
                        onClick={() => setSelectedRow(row)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors"
                        aria-label={`View ${row.id}`}
                      >
                        <Eye size={15} strokeWidth={2} />
                      </button>
                      {/* Three-dot */}
                      <MoreActionsMenu
                        row={row}
                        onFlagIssue={(r) => setFlagRow(r)}
                        onExport={(r) => console.log("Export", r.id)}
                      />
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
            <button type="button" onClick={handleApply}
              className="h-11 flex-1 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition">
              Apply Filters
            </button>
            <button type="button" onClick={handleClear}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] hover:bg-gray-50 transition">
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
              <select value={fType} onChange={(e) => setFType(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="">All Types</option>
                <option value="Payment">Payment</option>
                <option value="Payout">Payout</option>
                <option value="Refund">Refund</option>
                <option value="Fee">Fee</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Status</label>
            <div className="relative">
              <select value={fStatus} onChange={(e) => setFStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Processed">Processed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Territory */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Territory</label>
            <div className="relative">
              <select value={fTerritory} onChange={(e) => setFTerritory(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="">All Territories</option>
                <option value="Downtown">Downtown</option>
                <option value="Westside">Westside</option>
                <option value="Northside">Northside</option>
                <option value="Eastside">Eastside</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Source</label>
            <div className="relative">
              <select value={fParty} onChange={(e) => setFParty(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="">All</option>
                <option value="PSP">PSP</option>
                <option value="Elder">Elder</option>
                <option value="System">System</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range</label>
            <DateRangeInput value={fDate} onChange={setFDate} />
          </div>
        </div>
      </SideSheet>

      {/* ── Detail Sheet ── */}
      <PlatformWalletDetailSheet
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        transaction={selectedRow}
      />

      {/* ── Flag Transaction Modal ── */}
      <FlagTransactionModal
        isOpen={!!flagRow}
        onClose={() => setFlagRow(null)}
        transactionId={flagRow?.id}
      />
    </div>
  );
};

export default PlatformWalletTab;
