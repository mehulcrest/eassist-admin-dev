import { useMemo, useRef, useState, useEffect } from "react";
import {
  CalendarDays,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Search,
  Settings2,
  XCircle,
  Edit,
  Download
} from "lucide-react";
import SideSheet from "../../components/SideSheet";
import SettlementDetailSheet from "./settlements/SettlementDetailSheet";
import CloseSettlementModal from "./settlements/CloseSettlementModal";
import ReopenSettlementModal from "./settlements/ReopenSettlementModal";

/* ─────────────────────────────────────────────
   Data & Styles
───────────────────────────────────────────── */
const SETTLEMENT_ROWS = [
  {
    id: "CYC001",
    period: "Mar 01 – Mar 07, 2026",
    totalPayments: "$50,000",
    totalPayouts: "$40,000",
    adjustments: "-$500",
    taxes: "$2,000",
    netBalance: "$7,500",
    status: "Open",
  },
  {
    id: "CYC002",
    period: "Mar 08 – Mar 14, 2026",
    totalPayments: "$62,000",
    totalPayouts: "$48,000",
    adjustments: "-$1,200",
    taxes: "$3,000",
    netBalance: "$9,800",
    status: "In Progress",
  },
  {
    id: "CYC003",
    period: "Mar 15 – Mar 21, 2026",
    totalPayments: "$45,000",
    totalPayouts: "$35,000",
    adjustments: "-$800",
    taxes: "$1,800",
    netBalance: "$7,400",
    status: "Closed",
  },
  {
    id: "CYC004",
    period: "Mar 22 – Mar 28, 2026",
    totalPayments: "$70,000",
    totalPayouts: "$55,000",
    adjustments: "-$1,500",
    taxes: "$3,500",
    netBalance: "$10,000",
    status: "Closed",
  },
  {
    id: "CYC005",
    period: "Apr 01 – Apr 07, 2026",
    totalPayments: "$52,000",
    totalPayouts: "$41,000",
    adjustments: "-$600",
    taxes: "$2,200",
    netBalance: "$8,200",
    status: "Closed",
  },
  {
    id: "CYC006",
    period: "Apr 08 – Apr 14, 2026",
    totalPayments: "$60,000",
    totalPayouts: "$47,000",
    adjustments: "-$900",
    taxes: "$2,800",
    netBalance: "$9,300",
    status: "Open",
  },
];

const STATUS_STYLE = {
  Closed: "text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6]",
  "In Progress": "text-[#B54708] bg-[#FFFAEB] border border-[#FEDF89]",
  Open: "text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA]",
};

const thClass =
  "px-4 py-3 text-left text-xs font-semibold text-[#475467] border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

/* ─── More-actions dropdown ────────────────── */
const MoreActionsMenu = ({ row, onCloseCycle, onReopenCycle }) => {
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
        <div className="absolute right-0 top-full z-30 mt-1 w-[160px] rounded-xl border border-[#EAECF0] bg-white shadow-xl py-1">
          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] transition-colors"
            onClick={() => {
              setOpen(false);
              onCloseCycle?.(row);
            }}
          >
            <XCircle size={15} className="text-[#667085]" strokeWidth={2} />
            Close Cycle
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] transition-colors"
            onClick={() => {
              setOpen(false);
              onReopenCycle?.(row);
            }}
          >
            <Edit size={15} className="text-[#667085]" strokeWidth={2} />
            Reopen Cycle
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] transition-colors"
            onClick={() => setOpen(false)}
          >
            <Download size={15} className="text-[#667085]" strokeWidth={2} />
            Export Report
          </button>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const SettlementsTab = ({ renderTabNav }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter States
  const [fStatus, setFStatus] = useState("");
  const [fDate, setFDate] = useState("");
  const [fNetBalance, setFNetBalance] = useState("");
  const [fTerritory, setFTerritory] = useState("");

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedCloseEntry, setSelectedCloseEntry] = useState(null);
  const [selectedReopenEntry, setSelectedReopenEntry] = useState(null);

  const filtered = useMemo(() => {
    let result = SETTLEMENT_ROWS;
    
    // Search
    const q = searchQuery.toLowerCase();
    if (q) {
      result = result.filter((r) => r.id.toLowerCase().includes(q));
    }

    // Apply exact filter dropdown values
    if (fStatus) result = result.filter(r => r.status === fStatus);

    return result;
  }, [searchQuery, fStatus]);

  const handleApplyFilters = () => setIsFilterOpen(false);
  const handleClearFilters = () => {
    setFStatus("");
    setFDate("");
    setFNetBalance("");
    setFTerritory("");
    setIsFilterOpen(false);
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto w-full">
      {/* ── Outer Main Tab Navigation ── */}
      <div className="flex gap-4 sm:gap-6 rounded-xl border border-[#EAECF0] bg-white px-4 sm:px-6 pt-3 shrink-0 overflow-x-auto scrollbar-hide">
        {renderTabNav()}
      </div>

      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 mt-1">
        <div className="relative w-full sm:max-w-[400px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#667085]" strokeWidth={2} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Cycle ID"
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

      {/* ── Table ── */}
      <div className="flex-1 min-h-[300px] overflow-auto rounded-xl border border-[#EAECF0] bg-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr>
              <th className={thClass}>Cycle ID</th>
              <th className={thClass}>Period</th>
              <th className={thClass}>Total Payments</th>
              <th className={thClass}>Total Payouts</th>
              <th className={thClass}>Adjustments</th>
              <th className={thClass}>Taxes</th>
              <th className={thClass}>Net Settlement Balance</th>
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
                  <td className={tdClass}>{row.id}</td>
                  <td className={tdClass}>{row.period}</td>
                  <td className={tdClass}>{row.totalPayments}</td>
                  <td className={tdClass}>{row.totalPayouts}</td>
                  <td className={tdClass}>{row.adjustments}</td>
                  <td className={tdClass}>{row.taxes}</td>
                  <td className="px-4 py-4 text-sm font-bold text-[#101828] align-middle">{row.netBalance}</td>
                  <td className={tdClass}>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${STATUS_STYLE[row.status] || "text-[#667085]"}`}>
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
                      <MoreActionsMenu 
                        row={row} 
                        onCloseCycle={(record) => setSelectedCloseEntry(record)}
                        onReopenCycle={(record) => setSelectedReopenEntry(record)}
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
            <button
              type="button"
              onClick={handleApplyFilters}
              className="h-11 flex-1 rounded-lg bg-[#F04438] text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors"
            >
              Apply
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
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Settlement Status</label>
            <div className="relative">
              <select
                value={fStatus}
                onChange={(e) => setFStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range (Period)</label>
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

          {/* Net Balance Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Net Balance Range</label>
            <div className="relative">
              <select
                value={fNetBalance}
                onChange={(e) => setFNetBalance(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">Select Net Balance Range</option>
                <option value="1">Under $5000</option>
                <option value="2">$5000 - $10000</option>
                <option value="3">Over $10000</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Territory */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Territory</label>
            <div className="relative">
              <select
                value={fTerritory}
                onChange={(e) => setFTerritory(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">Select Territory</option>
                <option value="north">North Region</option>
                <option value="south">South Region</option>
                <option value="east">East Region</option>
                <option value="west">West Region</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>
        </div>
      </SideSheet>

      {/* ── Detail Drawer ── */}
      <SettlementDetailSheet
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        entry={selectedEntry}
        onCloseCycle={(record) => {
          setSelectedEntry(null);
          setSelectedCloseEntry(record);
        }}
      />

      {/* ── Action Modals ── */}
      <CloseSettlementModal
        isOpen={!!selectedCloseEntry}
        onClose={() => setSelectedCloseEntry(null)}
        record={selectedCloseEntry}
      />
      
      <ReopenSettlementModal
        isOpen={!!selectedReopenEntry}
        onClose={() => setSelectedReopenEntry(null)}
        record={selectedReopenEntry}
      />
    </div>
  );
};

export default SettlementsTab;
