import { useMemo, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Eye,
  Flag,
  MoreHorizontal,
  RefreshCw,
  Search,
  Settings2,
} from "lucide-react";
import SideSheet from "../../../components/SideSheet";
import DateRangeInput from "../../../components/ui/DateRangeInput";
import MemberWalletDetailSheet from "./MemberWalletDetailSheet";
import IssueRefundModal from "./IssueRefundModal";
import FlagAccountModal from "./FlagAccountModal";
import userProfile from "../../../assets/userProfile.png";

/* ─────────────────────────────────────────────
   Dummy Data
───────────────────────────────────────────── */
const MEMBER_ROWS = [
  {
    id: "MBR001",
    name: "Margaret Thompson",
    avatar: userProfile,
    territory: "West",
    totalSpend: "$1,240",
    refundBalance: "$45",
    lastPayment: "Wed, May 06, 2026",
    status: "Paid",
    paymentMethod: "Credit Card",
    memberSince: "Jan 15, 2024",
    netSpend: "$1,195",
  },
  {
    id: "MBR002",
    name: "George Walker",
    avatar: userProfile,
    territory: "Downtown",
    totalSpend: "$560",
    refundBalance: "$120",
    lastPayment: "Wed, Apr 22, 2026",
    status: "Refund Pending",
    paymentMethod: "Bank Transfer",
    memberSince: "Mar 01, 2024",
    netSpend: "$440",
  },
  {
    id: "MBR003",
    name: "Helen Parker",
    avatar: userProfile,
    territory: "North",
    totalSpend: "$890",
    refundBalance: "$0",
    lastPayment: "Wed, Apr 08, 2026",
    status: "Paid",
    paymentMethod: "Credit Card",
    memberSince: "Feb 10, 2024",
    netSpend: "$890",
  },
  {
    id: "MBR004",
    name: "Northside",
    avatar: null,
    territory: "East",
    totalSpend: "$430",
    refundBalance: "$25",
    lastPayment: "Wed, Mar 25, 2026",
    status: "Paid",
    paymentMethod: "Debit Card",
    memberSince: "Apr 20, 2024",
    netSpend: "$405",
  },
];

/* ─────────────────────────────────────────────
   Style helpers
───────────────────────────────────────────── */
const STATUS_STYLE = {
  Paid:             "text-[#12B76A] font-semibold",
  "Refund Pending": "text-[#F04438] font-semibold",
  Flagged:          "text-[#F79009] font-semibold",
};

const thClass =
  "px-4 py-3 text-left text-sm font-semibold text-[#475467] border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

/* ─── Three-dot actions menu ────────────────── */
const MoreActionsMenu = ({ row, onIssueRefund, onFlagAccount }) => {
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
            onClick={() => { setOpen(false); onIssueRefund(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <CircleDollarSign size={15} className="text-[#667085]" strokeWidth={2} />
            Issue Refund
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onFlagAccount(row); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <Flag size={15} className="text-[#667085]" strokeWidth={2} />
            Flag Account
          </button>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const MemberWalletsTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("mwq") ?? "";

  const [isFilterOpen,    setIsFilterOpen]    = useState(false);
  const [selectedMember,  setSelectedMember]  = useState(null);
  const [issueRefundRow,  setIssueRefundRow]  = useState(null);
  const [flagAccountRow,  setFlagAccountRow]  = useState(null);

  /* filter state */
  const [fTerritory, setFTerritory] = useState("");
  const [fStatus,    setFStatus]    = useState("");
  const [fDate,      setFDate]      = useState("");
  const [applied,    setApplied]    = useState({});

  const handleApply = () => {
    setApplied({ territory: fTerritory, status: fStatus, date: fDate });
    setIsFilterOpen(false);
  };
  const handleClear = () => {
    setFTerritory(""); setFStatus(""); setFDate("");
    setApplied({});
    setIsFilterOpen(false);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEMBER_ROWS.filter((r) => {
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.territory.toLowerCase().includes(q);
      const matchStatus = !applied.status    || r.status    === applied.status;
      const matchTerr   = !applied.territory || r.territory === applied.territory;
      return matchSearch && matchStatus && matchTerr;
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
              setSearchParams(v ? { mwq: v } : {}, { replace: true });
            }}
            placeholder="Search by Member name"
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
        <table className="w-full min-w-[780px] border-collapse">
          <thead>
            <tr>
              <th className={thClass}>Member Name</th>
              <th className={thClass}>Territory</th>
              <th className={thClass}>Total Spend</th>
              <th className={thClass}>Refund Balance</th>
              <th className={thClass}>Last Payment</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} w-[100px] text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-sm text-[#667085]">
                  No member wallets found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                  {/* Member Name */}
                  <td className={tdClass}>
                    <div className="flex items-center gap-2.5">
                      {row.avatar ? (
                        <img src={row.avatar} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                      ) : (
                        <div className="size-8 shrink-0 rounded-full bg-[#F2F4F7] flex items-center justify-center text-sm font-bold text-[#667085]">
                          {row.name?.[0]}
                        </div>
                      )}
                      <span className="text-[#175CD3] underline underline-offset-2 cursor-pointer hover:text-[#F04438] transition-colors">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className={tdClass}>{row.territory}</td>
                  <td className={tdClass}>{row.totalSpend}</td>
                  <td className={tdClass}>
                    <span className={row.refundBalance === "$0" ? "text-[#667085]" : "text-[#F04438]"}>
                      {row.refundBalance}
                    </span>
                  </td>
                  <td className={tdClass}>{row.lastPayment}</td>
                  <td className={tdClass}>
                    <span className={STATUS_STYLE[row.status] ?? "text-[#667085]"}>
                      {row.status}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-4 last:pr-6 align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMember(row)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors"
                        aria-label={`View ${row.name}`}
                      >
                        <Eye size={15} strokeWidth={2} />
                      </button>
                      <MoreActionsMenu
                        row={row}
                        onIssueRefund={setIssueRefundRow}
                        onFlagAccount={setFlagAccountRow}
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
          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Status</label>
            <div className="relative">
              <select value={fStatus} onChange={(e) => setFStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Refund Pending">Refund Pending</option>
                <option value="Flagged">Flagged</option>
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

          {/* Last Payment Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Last Payment Date</label>
            <DateRangeInput value={fDate} onChange={setFDate} />
          </div>
        </div>
      </SideSheet>

      {/* ── Member Wallet Detail Sheet ── */}
      <MemberWalletDetailSheet
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />

      {/* ── Issue Refund Modal ── */}
      <IssueRefundModal
        isOpen={!!issueRefundRow}
        onClose={() => setIssueRefundRow(null)}
        member={issueRefundRow}
      />

      {/* ── Flag Account Modal ── */}
      <FlagAccountModal
        isOpen={!!flagAccountRow}
        onClose={() => setFlagAccountRow(null)}
        member={flagAccountRow}
      />
    </div>
  );
};

export default MemberWalletsTab;
