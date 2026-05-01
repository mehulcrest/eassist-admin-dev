import { useMemo, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Download,
  Eye,
  MoreHorizontal,
  PauseCircle,
  RefreshCw,
  Search,
  Settings2,
} from "lucide-react";
import SideSheet from "../../../components/SideSheet";
import DateRangeInput from "../../../components/ui/DateRangeInput";
import PSPWalletDetailSheet from "./PSPWalletDetailSheet";
import TriggerPayoutModal from "./TriggerPayoutModal";
import HoldPSPFundsModal from "./HoldPSPFundsModal";
import userProfile from "../../../assets/userProfile.png";

/* ─────────────────────────────────────────────
   Dummy Data
───────────────────────────────────────────── */
const PSP_ROWS = [
  {
    id: "PSP001",
    name: "Maria Santos",
    avatar: userProfile,
    type: "Individual",
    territory: "West",
    pendingEarnings: "$320",
    clearedEarnings: "$1,240",
    nextPayout: "Wed, May 06, 2026",
    status: "Scheduled",
    bankAccount: "xxx 4567",
    payoutMethod: "Bank Transfer",
  },
  {
    id: "PSP002",
    name: "ComfortHands",
    avatar: userProfile,
    type: "Business",
    territory: "Downtown",
    pendingEarnings: "$800",
    clearedEarnings: "$5,600",
    nextPayout: "Wed, Apr 22, 2026",
    status: "Pending",
    bankAccount: "xxx 1122",
    payoutMethod: "Bank Transfer",
  },
  {
    id: "PSP003",
    name: "Lisa Wong",
    avatar: userProfile,
    type: "Individual",
    territory: "North",
    pendingEarnings: "$120",
    clearedEarnings: "$2,340",
    nextPayout: "Wed, Apr 08, 2026",
    status: "Scheduled",
    bankAccount: "xxx 3344",
    payoutMethod: "Bank Transfer",
  },
  {
    id: "PSP004",
    name: "SilverAge Care",
    avatar: null,
    type: "Business",
    territory: "East",
    pendingEarnings: "$0",
    clearedEarnings: "$980",
    nextPayout: "Wed, Mar 25, 2026",
    status: "Paid",
    bankAccount: "xxx 5566",
    payoutMethod: "Bank Transfer",
  },
];

/* ─────────────────────────────────────────────
   Style helpers
───────────────────────────────────────────── */
const STATUS_STYLE = {
  Scheduled: "bg-[#FFFAEB] text-[#DC6803]",
  Pending: "bg-[#FEF3F2] text-[#D92D20]",
  Paid: "bg-[#ECFDF3] text-[#039855]",
  OnHold: "text-[#667085] font-semibold",
};
const thClass =
  "px-4 py-3 text-left text-sm font-semibold text-[#475467] border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

/* ─── More-actions dropdown ─────────────────── */
const MoreActionsMenu = ({ row, onTriggerPayout, onHoldFunds, onDownload }) => {
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
            onClick={() => { setOpen(false); onTriggerPayout(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <CircleCheck size={15} className="text-[#667085]" strokeWidth={2} />
            Trigger Payout
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onHoldFunds(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <PauseCircle size={15} className="text-[#667085]" strokeWidth={2} />
            Hold Funds
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onDownload(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <Download size={15} className="text-[#667085]" strokeWidth={2} />
            Download Statement
          </button>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const PSPWalletsTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("pspwq") ?? "";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPSP, setSelectedPSP] = useState(null);
  const [triggerPayoutRow, setTriggerPayoutRow] = useState(null);
  const [holdFundsRow, setHoldFundsRow] = useState(null);

  /* filter state */
  const [fType, setFType] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fTerritory, setFTerritory] = useState("");
  const [fDate, setFDate] = useState("");
  const [applied, setApplied] = useState({});

  const handleApply = () => {
    setApplied({ type: fType, status: fStatus, territory: fTerritory, date: fDate });
    setIsFilterOpen(false);
  };
  const handleClear = () => {
    setFType(""); setFStatus(""); setFTerritory(""); setFDate("");
    setApplied({});
    setIsFilterOpen(false);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PSP_ROWS.filter((r) => {
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.territory.toLowerCase().includes(q);
      const matchType = !applied.type || r.type === applied.type;
      const matchStatus = !applied.status || r.status === applied.status;
      const matchTerr = !applied.territory || r.territory === applied.territory;
      return matchSearch && matchType && matchStatus && matchTerr;
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
              setSearchParams(v ? { pspwq: v } : {}, { replace: true });
            }}
            placeholder="Search by PSP name"
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

      {/* ── Table ── */}
      <div className="flex-1 min-h-[300px] overflow-auto rounded-xl border border-[#EAECF0] bg-white">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr>
              <th className={thClass}>PSP Name</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Territory</th>
              <th className={thClass}>Pending Earnings</th>
              <th className={thClass}>Cleared Earnings</th>
              <th className={thClass}>Next Payout</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} w-[100px] text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center text-sm text-[#667085]">
                  No PSP wallets found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                  {/* PSP Name */}
                  <td className={tdClass}>
                    <div className="flex items-center gap-2.5">
                      {row.avatar ? (
                        <img src={row.avatar} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                      ) : (
                        <div className="size-8 shrink-0 rounded-full bg-[#F2F4F7] flex items-center justify-center text-sm font-bold text-[#667085]">
                          {row.name?.[0]}
                        </div>
                      )}
                      <span className="underline underline-offset-2 cursor-pointer hover:text-[#F04438] transition-colors">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className={tdClass}>{row.type}</td>
                  <td className={tdClass}>
                    <span className="">{row.territory}</span>
                  </td>
                  <td className={tdClass}>{row.pendingEarnings}</td>
                  <td className={tdClass}>{row.clearedEarnings}</td>
                  <td className={tdClass}>{row.nextPayout}</td>
                  <td className={tdClass}>
                    <span className={STATUS_STYLE[row.status] + " items-center rounded-full px-2.5 py-0.5 text-xs" ?? "text-[#667085] items-center rounded-full px-2.5 py-0.5 text-xs"}>
                      {row.status}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-4 last:pr-6 align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPSP(row)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors"
                        aria-label={`View ${row.name}`}
                      >
                        <Eye size={15} strokeWidth={2} />
                      </button>
                      <MoreActionsMenu
                        row={row}
                        onTriggerPayout={setTriggerPayoutRow}
                        onHoldFunds={setHoldFundsRow}
                        onDownload={(r) => console.log("Download statement for", r.name)}
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
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
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
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="OnHold">On Hold</option>
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
                <option value="West">West</option>
                <option value="Downtown">Downtown</option>
                <option value="North">North</option>
                <option value="East">East</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Next Payout Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Next Payout Date</label>
            <DateRangeInput value={fDate} onChange={setFDate} />
          </div>
        </div>
      </SideSheet>

      {/* ── PSP Wallet Detail Sheet ── */}
      <PSPWalletDetailSheet
        isOpen={!!selectedPSP}
        onClose={() => setSelectedPSP(null)}
        psp={selectedPSP}
      />

      {/* ── Trigger Payout Modal ── */}
      <TriggerPayoutModal
        isOpen={!!triggerPayoutRow}
        onClose={() => setTriggerPayoutRow(null)}
        psp={triggerPayoutRow}
      />

      {/* ── Hold PSP Funds Modal ── */}
      <HoldPSPFundsModal
        isOpen={!!holdFundsRow}
        onClose={() => setHoldFundsRow(null)}
        psp={holdFundsRow}
      />
    </div>
  );
};

export default PSPWalletsTab;
