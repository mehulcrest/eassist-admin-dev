import { useMemo, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Download,
  Eye,
  Flag,
  MoreHorizontal,
  PauseCircle,
  Search,
  Settings2,
} from "lucide-react";
import SideSheet from "../../../components/SideSheet";
import PayoutDetailSheet from "./PayoutDetailSheet";
import ConfirmPayoutModal from "./ConfirmPayoutModal";
import HoldPayoutModal from "./HoldPayoutModal";
import FlagPayoutModal from "./FlagPayoutModal";
import userProfile from "../../../assets/userProfile.png";
import userProfileBlue from "../../../assets/userProfile.png"; // Placeholder for icon

/* ─────────────────────────────────────────────
   Dummy Data
───────────────────────────────────────────── */
const PAYOUT_ROWS = [
  {
    id: "PYA-00332",
    party: "Maria Santos",
    avatar: userProfile,
    isBusiness: false,
    period: "Apr 15 - Apr 30, 2026",
    jobs: "9",
    grossEarnings: "$1,620.00",
    platformFee: "$162.00",
    netPayout: "$1,458.00",
    paymentDate: "Wed, May 06, 2026",
    status: "Processing",
    brand: "individual",
    pspType: "Individual",
    territory: "West",
  },
  {
    id: "PYA-00331",
    party: "Lisa Wong",
    avatar: userProfile,
    isBusiness: false,
    period: "Apr 01 - Apr 14, 2026",
    jobs: "12",
    grossEarnings: "$2,400.00",
    platformFee: "$240.00",
    netPayout: "$2,160.00",
    paymentDate: "Wed, Apr 22, 2026",
    status: "Paid",
    pspType: "Individual",
    territory: "Downtown",
  },
  {
    id: "PYA-00330",
    party: "Maria Santos",
    avatar: userProfile,
    isBusiness: false,
    period: "Mar 15 - Mar 31, 2026",
    jobs: "8",
    grossEarnings: "$1,520.00",
    platformFee: "$152.00",
    netPayout: "$1,388.00",
    paymentDate: "Wed, Apr 08, 2026",
    status: "Pending",
    pspType: "Individual",
    territory: "West",
  },
  {
    id: "PYA-00329",
    party: "SilverAge Support",
    avatar: null,
    isBusiness: true,
    period: "Mar 01 - Mar 14, 2026",
    jobs: "10",
    grossEarnings: "$1,950.00",
    platformFee: "$195.00",
    netPayout: "$1,755.00",
    paymentDate: "Wed, Mar 25, 2026",
    status: "Paid",
    pspType: "Business",
    territory: "East",
  },
  {
    id: "PYA-00328",
    party: "John Smith",
    avatar: userProfile,
    isBusiness: false,
    period: "Feb 15 - Feb 28, 2026",
    jobs: "7",
    grossEarnings: "$1,330.00",
    platformFee: "$133.00",
    netPayout: "$1,197.00",
    paymentDate: "Wed, Mar 11, 2026",
    status: "Pending",
    pspType: "Individual",
    territory: "North",
  },
  {
    id: "PYA-00327",
    party: "ComfortHands",
    avatar: null,
    isBusiness: true,
    period: "Feb 01 - Feb 14, 2026",
    jobs: "11",
    grossEarnings: "$2,100.00",
    platformFee: "$210.00",
    netPayout: "$1,890.00",
    paymentDate: "Wed, Feb 25, 2026",
    status: "Failed",
    pspType: "Business",
    territory: "Downtown",
  },
  {
    id: "PYA-00326",
    party: "David Lee Joseph",
    avatar: userProfile,
    isBusiness: false,
    period: "Jan 15 - Jan 31, 2026",
    jobs: "6",
    grossEarnings: "$1,180.00",
    platformFee: "$118.00",
    netPayout: "$1,062.00",
    paymentDate: "Wed, Feb 11, 2026",
    status: "Paid",
    pspType: "Individual",
    territory: "East",
  },
];

/* ─────────────────────────────────────────────
   Style helpers
───────────────────────────────────────────── */
const STATUS_STYLE = {
  Processing: "text-[#F79009] font-semibold bg-[#FFFAEB] px-2.5 py-0.5 rounded-full text-xs border border-[#FEDF89]",
  Paid:       "text-[#12B76A] font-semibold bg-[#ECFDF3] px-2.5 py-0.5 rounded-full text-xs border border-[#ABEFC6]",
  Pending:    "text-[#175CD3] font-semibold bg-[#EFF8FF] px-2.5 py-0.5 rounded-full text-xs border border-[#B2DDFF]",
  Failed:     "text-[#B42318] font-semibold bg-[#FEF3F2] px-2.5 py-0.5 rounded-full text-xs border border-[#FECDCA]",
  "On Hold":  "text-[#344054] font-semibold bg-[#F2F4F7] px-2.5 py-0.5 rounded-full text-xs border border-[#D0D5DD]",
};

const thClass =
  "px-4 py-3 text-left text-sm font-semibold text-[#475467] border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

/* ─── More-actions dropdown ────────────────── */
const MoreActionsMenu = ({ row, onProcess, onHold, onFlag }) => {
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
        <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-xl border border-[#EAECF0] bg-white shadow-lg py-1">
          <button
            type="button"
            onClick={() => { setOpen(false); onProcess(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <CircleDollarSign size={15} className="text-[#667085]" strokeWidth={2} />
            Process Payout
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onHold(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <PauseCircle size={15} className="text-[#667085]" strokeWidth={2} />
            Hold Payout
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <Download size={15} className="text-[#667085]" strokeWidth={2} />
            Download Statement
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
const AllPayoutsTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("pq") ?? "";

  const [isFilterOpen,     setIsFilterOpen]     = useState(false);
  const [selectedPayout,   setSelectedPayout]   = useState(null);
  const [processPayoutRow, setProcessPayoutRow] = useState(null);
  const [holdPayoutRow,    setHoldPayoutRow]    = useState(null);
  const [flagPayoutRow,    setFlagPayoutRow]    = useState(null);

  /* filter state */
  const [fStatus,   setFStatus]   = useState("");
  const [fDate,     setFDate]     = useState("");
  const [fAmount,   setFAmount]   = useState("");
  const [fPspType,  setFPspType]  = useState("");
  const [fTerritory,setFTerritory]= useState("");
  const [fFailed,   setFFailed]   = useState(false);

  const [applied,   setApplied]   = useState({});

  const handleApply = () => {
    setApplied({
      status: fStatus,
      date: fDate,
      amount: fAmount,
      pspType: fPspType,
      territory: fTerritory,
      failedOnly: fFailed,
    });
    setIsFilterOpen(false);
  };

  const handleClear = () => {
    setFStatus(""); setFDate(""); setFAmount(""); setFPspType(""); setFTerritory(""); setFFailed(false);
    setApplied({});
    setIsFilterOpen(false);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PAYOUT_ROWS.filter((r) => {
      const matchSearch = !q || r.party.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
      const matchStatus = !applied.status || r.status === applied.status;
      const matchType   = !applied.pspType || r.pspType === applied.pspType;
      const matchTerr   = !applied.territory || r.territory === applied.territory;
      const matchFailed = !applied.failedOnly || r.status === "Failed";
      return matchSearch && matchStatus && matchType && matchTerr && matchFailed;
    });
  }, [query, applied]);

  return (
    <div className="flex flex-col gap-5 min-h-0 h-full overflow-y-auto lg:overflow-hidden">

      {/* ── Header Controls ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div className="relative w-full sm:max-w-[320px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#667085]" strokeWidth={2} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setSearchParams(v ? { pq: v } : {}, { replace: true });
            }}
            placeholder="Search by PSP or payout ID"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#667085] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
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

      {/* ── Table ── */}
      <div className="flex-1 min-h-[300px] overflow-auto rounded-xl border border-[#EAECF0] bg-white">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr>
              <th className={thClass}>Payout ID</th>
              <th className={thClass}>Party</th>
              <th className={thClass}>Period</th>
              <th className={thClass}>Jobs</th>
              <th className={thClass}>Gross Earnings</th>
              <th className={thClass}>Platform Fee</th>
              <th className={thClass}>Net Payout</th>
              <th className={thClass}>Payment Date</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} w-[80px] text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-16 text-center text-sm text-[#667085]">
                  No payouts found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                  <td className={tdClass}>{row.id}</td>
                  <td className={tdClass}>
                    <div className="flex items-center gap-2.5">
                      {row.avatar ? (
                        <img src={row.avatar} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                      ) : (
                        <div className="size-8 shrink-0 rounded-full bg-[#EFF8FF] flex items-center justify-center text-[#175CD3] ring-1 ring-[#B2DDFF]">
                           {/* Placeholder for business icon */}
                           <div className="size-4 bg-current" style={{mask: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M6 13h1V2H3v11h1\'/%3E%3Cpath d=\'M9 13h12V8H9v5z\'/%3E%3Cpath d=\'M15 8V4h6v4\'/%3E%3Cpath d=\'M6 22V13\'/%3E%3Cpath d=\'M15 22V13\'/%3E%3C/svg%3E") no-repeat center / contain', WebkitMask: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M6 13h1V2H3v11h1\'/%3E%3Cpath d=\'M9 13h12V8H9v5z\'/%3E%3Cpath d=\'M15 8V4h6v4\'/%3E%3Cpath d=\'M6 22V13\'/%3E%3Cpath d=\'M15 22V13\'/%3E%3C/svg%3E") no-repeat center / contain'}} />
                        </div>
                      )}
                      <span className="text-[#175CD3] underline underline-offset-2 cursor-pointer hover:text-[#F04438] transition-colors">
                        {row.party}
                      </span>
                    </div>
                  </td>
                  <td className={tdClass}>{row.period}</td>
                  <td className={tdClass}>{row.jobs}</td>
                  <td className={tdClass}>{row.grossEarnings}</td>
                  <td className={tdClass}>{row.platformFee}</td>
                  <td className="px-4 py-4 text-sm font-bold text-[#101828] align-middle">{row.netPayout}</td>
                  <td className={tdClass}>{row.paymentDate}</td>
                  <td className={tdClass}>
                    <span className={STATUS_STYLE[row.status] ?? "text-[#667085]"}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 last:pr-6 align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPayout(row)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors"
                        aria-label={`View ${row.id}`}
                      >
                        <Eye size={15} strokeWidth={2} />
                      </button>
                      <MoreActionsMenu
                        row={row}
                        onProcess={setProcessPayoutRow}
                        onHold={setHoldPayoutRow}
                        onFlag={setFlagPayoutRow}
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
              Apply
            </button>
            <button type="button" onClick={handleClear}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-5">
          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Payout Status</label>
            <div className="relative">
              <select value={fStatus} onChange={(e) => setFStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="">Select Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Failed">Failed</option>
                <option value="On Hold">On Hold</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range (Period)</label>
            <div className="relative">
              <select value={fDate} onChange={(e) => setFDate(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="">MM-DD-YYYY ~ MM-DD-YYYY</option>
                <option value="today">Today</option>
                <option value="last7">Last 7 Days</option>
              </select>
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Amount Range</label>
            <div className="relative">
              <select value={fAmount} onChange={(e) => setFAmount(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="">Select Amount Range</option>
                <option value="low">Under $500</option>
                <option value="med">$500 - $2,000</option>
                <option value="high">Over $2,000</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* PSP Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">PSP Type</label>
            <div className="relative">
              <select value={fPspType} onChange={(e) => setFPspType(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="">Select PSP Type</option>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
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
                <option value="">Select Territory</option>
                <option value="West">West</option>
                <option value="Downtown">Downtown</option>
                <option value="North">North</option>
                <option value="East">East</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Show Failed Only */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <label className="block text-sm font-medium text-[#344054]">Show Failed Only</label>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#667085]">Show only Failed Payouts</span>
              <button
                type="button"
                onClick={() => setFFailed(!fFailed)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#F04438] focus:ring-offset-2 ${
                  fFailed ? "bg-[#F04438]" : "bg-gray-200"
                }`}
              >
                <span className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  fFailed ? "translate-x-4" : "translate-x-0"
                }`} />
              </button>
            </div>
          </div>
        </div>
      </SideSheet>

      {/* ── Drawers / Modals ── */}
      <PayoutDetailSheet
        isOpen={!!selectedPayout}
        onClose={() => setSelectedPayout(null)}
        payout={selectedPayout}
        onProcessPayout={(p) => {
          setSelectedPayout(null);
          setProcessPayoutRow(p);
        }}
      />
      
      <ConfirmPayoutModal
        isOpen={!!processPayoutRow}
        onClose={() => setProcessPayoutRow(null)}
        payout={processPayoutRow}
      />
      
      <HoldPayoutModal
        isOpen={!!holdPayoutRow}
        onClose={() => setHoldPayoutRow(null)}
        payout={holdPayoutRow}
      />
      
      <FlagPayoutModal
        isOpen={!!flagPayoutRow}
        onClose={() => setFlagPayoutRow(null)}
        payout={flagPayoutRow}
      />

    </div>
  );
};

export default AllPayoutsTab;
