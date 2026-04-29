import { useMemo, useRef, useState, useEffect } from "react";
import {
  CalendarDays,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Search,
  Settings2,
  CheckCircle2,
  CornerUpRight,
  XCircle
} from "lucide-react";
import SideSheet from "../../components/SideSheet";
import RefundDetailSheet from "./refunds/RefundDetailSheet";
import ApproveRefundModal from "./refunds/ApproveRefundModal";
import RejectRefundModal from "./refunds/RejectRefundModal";
import EscalateIssueModal from "./refunds/EscalateIssueModal";
import userProfile from "../../assets/userProfile.png";

/* ─────────────────────────────────────────────
   Data & Styles
───────────────────────────────────────────── */
const REFUND_ROWS = [
  {
    id: "REF001",
    txId: "TXN001",
    member: "Margaret Thompson",
    psp: "Maria Santos",
    type: "Refund",
    reason: "Service not completed",
    credit: "$120.00",
    requestedOn: "Mar 14, 2026",
    status: "Pending",
  },
  {
    id: "REF002",
    txId: "TXN1002",
    member: "Robert Chen",
    psp: "Lisa Wong",
    type: "Refund",
    reason: "Overcharged",
    credit: "$45.00",
    requestedOn: "Mar 15, 2026",
    status: "Approved",
  },
  {
    id: "REF003",
    txId: "TXN1003",
    member: "Helen Parker",
    psp: "John Carter",
    type: "Adjustment",
    reason: "Manual correction",
    credit: "$30.00",
    requestedOn: "Mar 18, 2026",
    status: "Pending",
  },
  {
    id: "REF004",
    txId: "TXN1004",
    member: "Northside",
    psp: "John Smith",
    type: "Refund",
    reason: "Duplicate payment",
    credit: "$80.00",
    requestedOn: "Mar 15, 2026",
    status: "Rejected",
  },
  {
    id: "REF005",
    txId: "TXN1005",
    member: "Margaret Thompson",
    psp: "David Lee Joseph",
    type: "Refund",
    reason: "Service quality issue",
    credit: "$60.00",
    requestedOn: "Mar 16, 2026",
    status: "Escalated",
  },
  {
    id: "REF006",
    txId: "TXN1006",
    member: "Robert Chen",
    psp: "John Carter",
    type: "Adjustment",
    reason: "Tax correction",
    credit: "$20.00",
    requestedOn: "Mar 15, 2026",
    status: "Approved",
  },
  {
    id: "REF007",
    txId: "TXN1007",
    member: "Helen Parker",
    psp: "Lisa Wong",
    type: "Refund",
    reason: "Cancellation",
    credit: "$95.00",
    requestedOn: "Mar 16, 2026",
    status: "Pending",
  },
];

const STATUS_STYLE = {
  Approved: "text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6]",
  Pending: "text-[#B54708] bg-[#FFFAEB] border border-[#FEDF89]",
  Rejected: "text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA]",
  Escalated: "text-[#175CD3] bg-[#EFF8FF] border border-[#B2DDFF]",
};

const thClass =
  "px-4 py-3 text-left text-xs font-semibold text-[#475467] border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

/* ─── More-actions dropdown ────────────────── */
const MoreActionsMenu = ({ row, onApprove, onReject, onEscalate }) => {
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
        <div className="absolute right-0 top-full z-30 mt-1 w-[180px] rounded-xl border border-[#EAECF0] bg-white shadow-xl py-1">
          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] transition-colors"
            onClick={() => { setOpen(false); onApprove(row); }}
          >
            <CheckCircle2 size={15} className="text-[#667085]" strokeWidth={2} />
            Approve Refund
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] transition-colors"
            onClick={() => { setOpen(false); onEscalate(row); }}
          >
            <CornerUpRight size={15} className="text-[#667085]" strokeWidth={2} />
            Escalate
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#F04438] hover:bg-[#FEF3F2] transition-colors"
            onClick={() => { setOpen(false); onReject(row); }}
          >
            <XCircle size={15} className="text-[#F04438]" strokeWidth={2} />
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const RefundsAdjustmentsTab = ({ renderTabNav }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter States
  const [fType, setFType] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fAmount, setFAmount] = useState("");
  const [fDate, setFDate] = useState("");
  const [fTerritory, setFTerritory] = useState("");

  const [selectedEntry, setSelectedEntry] = useState(null);
  
  // Modal States
  const [approveEntry, setApproveEntry] = useState(null);
  const [rejectEntry, setRejectEntry] = useState(null);
  const [escalateEntry, setEscalateEntry] = useState(null);

  const filtered = useMemo(() => {
    let result = REFUND_ROWS;
    
    // Search
    const q = searchQuery.toLowerCase();
    if (q) {
      result = result.filter(
        (r) => 
          r.id.toLowerCase().includes(q) || 
          r.txId.toLowerCase().includes(q) ||
          r.member.toLowerCase().includes(q)
      );
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
        <div className="relative w-full sm:max-w-[440px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#667085]" strokeWidth={2} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Refund ID, Transaction ID, or User"
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
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr>
              <th className={thClass}>Refund ID</th>
              <th className={thClass}>Transaction ID</th>
              <th className={thClass}>Member (User)</th>
              <th className={thClass}>Caregiver (PSP)</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Reason</th>
              <th className={thClass}>Credit</th>
              <th className={thClass}>Requested On</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} w-[90px] text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-16 text-center text-sm text-[#667085]">
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                  <td className={tdClass}>{row.id}</td>
                  <td className={tdClass}>{row.txId}</td>
                  <td className={tdClass}>
                    <div className="flex items-center gap-2.5">
                      <img src={userProfile} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                      <span className="text-[#175CD3] underline underline-offset-2 cursor-pointer hover:text-[#101828]">
                        {row.member}
                      </span>
                    </div>
                  </td>
                  <td className={tdClass}>
                    <div className="flex items-center gap-2.5">
                      <img src={userProfile} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                      <span className="text-[#175CD3] underline underline-offset-2 cursor-pointer hover:text-[#101828]">
                        {row.psp}
                      </span>
                    </div>
                  </td>
                  <td className={tdClass}>{row.type}</td>
                  <td className={tdClass}>{row.reason}</td>
                  <td className={tdClass}>{row.credit}</td>
                  <td className={tdClass}>{row.requestedOn}</td>
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
                        onApprove={setApproveEntry}
                        onReject={setRejectEntry}
                        onEscalate={setEscalateEntry}
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
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Status</label>
            <div className="relative">
              <select
                value={fStatus}
                onChange={(e) => setFStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Escalated">Escalated</option>
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
                <option value="Refund">Refund</option>
                <option value="Adjustment">Adjustment</option>
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

          {/* Amount Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Amount Range</label>
            <div className="relative">
              <select
                value={fAmount}
                onChange={(e) => setFAmount(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">Select Rating count</option>
                <option value="1">Under $100</option>
                <option value="2">$100 - $500</option>
                <option value="3">Over $500</option>
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
      <RefundDetailSheet
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        entry={selectedEntry ? {
          ...selectedEntry,
          refundId: selectedEntry.id,
        } : null}
        onApprove={setApproveEntry}
        onReject={setRejectEntry}
        onEscalate={setEscalateEntry}
      />

      {/* ── Action Modals ── */}
      <ApproveRefundModal
        isOpen={!!approveEntry}
        onClose={() => setApproveEntry(null)}
        record={approveEntry}
      />

      <RejectRefundModal
        isOpen={!!rejectEntry}
        onClose={() => setRejectEntry(null)}
        record={rejectEntry}
      />

      <EscalateIssueModal
        isOpen={!!escalateEntry}
        onClose={() => setEscalateEntry(null)}
        record={escalateEntry}
      />
    </div>
  );
};

export default RefundsAdjustmentsTab;
