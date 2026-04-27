import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CancellationDetailSheet from "./CancellationDetailSheet";
import {
  ChartLine,
  CalendarDays,
  ChevronDown,
  Clock,
  Eye,
  Settings2,
  RefreshCw,
  Search,
  User, MapPin,
} from "lucide-react";
import SideSheet from "../../components/SideSheet";
import userProfile from "../../assets/userProfile.png";

/* ─────────────────────────────────────────────
   KPI Data
───────────────────────────────────────────── */
const KPI_DATA = [
  {
    title: "Cancellation Rate",
    value: "4.5%",
    subtitle: "this month",
    icon: <ChartLine className="text-[#12B76A]" size={20} />,
    iconBg: "bg-[#ECFDF3]",
  },
  {
    title: "PSP No-show %",
    value: "8.2%",
    subtitle: "this month",
    icon: <Clock className="text-[#F79009]" size={20} />,
    iconBg: "bg-[#FFFAEB]",
  },
  {
    title: "Top Reason",
    value: "Member Unavailable",
    subtitle: "4 times this month",
    icon: <User className="text-[#F04438]" size={20} />,
    iconBg: "bg-[#FEF3F2]",
    wideValue: true,
  },
];

/* ─────────────────────────────────────────────
   Table Data
───────────────────────────────────────────── */
const CANCELLATION_DATA = [
  {
    id: "J001",
    serviceId: "S001",
    serviceName: "Grocery Trip Assistance",
    location: "Downtown",
    memberName: "Margaret Thompson",
    memberAvatar: userProfile,
    caregiverName: "Maria Santos",
    caregiverAvatar: userProfile,
    cancelledBy: "Member",
    reason: "PSP Unavailable",
    timeBeforeStart: "1 hour before start",
    refund: "Full Refund",
  },
  {
    id: "J002",
    serviceId: "S002",
    serviceName: "Cleaning",
    location: "Westside",
    memberName: "Robert Chen",
    memberAvatar: userProfile,
    caregiverName: "Lisa Wong",
    caregiverAvatar: userProfile,
    cancelledBy: "PSP",
    reason: "Medical Issue",
    timeBeforeStart: "2.5 min before start",
    refund: "No Refund",
  },
  {
    id: "J003",
    serviceId: "S003",
    serviceName: "Doctor Visit",
    location: "Northside",
    memberName: "Helen Parker",
    memberAvatar: userProfile,
    caregiverName: "John Carter",
    caregiverAvatar: userProfile,
    cancelledBy: "Member",
    reason: "PSP Unavailable",
    timeBeforeStart: "12 hours before start",
    refund: "Full Refund",
  },
  {
    id: "J004",
    serviceId: "S004",
    serviceName: "Daily Care Assistance",
    location: "Eastside",
    memberName: "Northside",
    memberAvatar: userProfile,
    caregiverName: "John Smith",
    caregiverAvatar: userProfile,
    cancelledBy: "PSP",
    reason: "Medical Issue",
    timeBeforeStart: "30 min before start",
    refund: "Full Refund",
  },
  {
    id: "J005",
    serviceId: "S005",
    serviceName: "Meal Preparation",
    location: "Westside",
    memberName: "Margaret Thompson",
    memberAvatar: userProfile,
    caregiverName: "-",
    caregiverAvatar: null,
    cancelledBy: "System",
    reason: "Weather Conditions",
    timeBeforeStart: "2 hours before start",
    refund: "Full Refund",
  },
  {
    id: "J006",
    serviceId: "S006",
    serviceName: "House Cleaning",
    location: "Northside",
    memberName: "Robert Chen",
    memberAvatar: userProfile,
    caregiverName: "John Carter",
    caregiverAvatar: userProfile,
    cancelledBy: "PSP",
    reason: "Member Unavailable",
    timeBeforeStart: "3 days before start",
    refund: "No Refund",
  },
  {
    id: "J007",
    serviceId: "S003",
    serviceName: "Doctor Visit",
    location: "Westside",
    memberName: "Robert Chen",
    memberAvatar: userProfile,
    caregiverName: "John Carter",
    caregiverAvatar: userProfile,
    cancelledBy: "System",
    reason: "PSP No-show",
    timeBeforeStart: "3 days before start",
    refund: "Full Refund",
  },
  {
    id: "J008",
    serviceId: "S002",
    serviceName: "Cleaning",
    location: "Uptown",
    memberName: "Helen Parker",
    memberAvatar: userProfile,
    caregiverName: "Lisa Wong",
    caregiverAvatar: userProfile,
    cancelledBy: "Member",
    reason: "PSP No-show",
    timeBeforeStart: "3 days before start",
    refund: "Full Refund",
  },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const cancelledByBadge = {
  Member: "bg-[#EFF8FF] text-[#175CD3]",
  PSP: "bg-[#FFFAEB] text-[#B54708]",
  System: "bg-[#F2F4F7] text-[#344054]",
};

const refundBadge = {
  "Full Refund": "bg-[#ECFDF3] text-[#027A48]",
  "No Refund": "bg-[#FEF3F2] text-[#F04438]",
};

const thClass =
  "px-4 py-3 text-left text-sm font-semibold text-[#475467] whitespace-nowrap bg-[#F9FAFB] border-b border-[#EAECF0] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] whitespace-nowrap first:pl-6 last:pr-6";

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const CancellationTab = ({ renderTabNav }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CANCELLATION_DATA;
    return CANCELLATION_DATA.filter(
      (j) =>
        j.serviceName.toLowerCase().includes(q) ||
        j.memberName.toLowerCase().includes(q) ||
        j.caregiverName.toLowerCase().includes(q) ||
        j.id.toLowerCase().includes(q) ||
        j.serviceId.toLowerCase().includes(q) ||
        j.reason.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-6 overflow-hidden">
      {/* ── Header Controls ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div className="relative w-full sm:max-w-[400px]">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#667085]"
            strokeWidth={2}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setSearchParams(v ? { q: v } : {}, { replace: true });
            }}
            placeholder="Search by Job ID, Member, PSP, or Service"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#667085] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} className="text-[#667085]" strokeWidth={2.5} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors"
          >
            <Settings2 size={18} className="text-[#667085]" strokeWidth={2.5} />
            Filters
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 shrink-0">
        {KPI_DATA.map((kpi, index) => (
          <div
            key={index}
            className="rounded-xl border border-[#EAECF0] bg-white p-5 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] flex items-start gap-4"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                  {kpi.icon}
                </div>
                <p className="text-base font-medium text-[#101828] mb-1">{kpi.title}</p>
              </div>
              <div className="flex items-center gap-2">
                {kpi.wideValue ? (
                  <span className="text-xl font-bold tracking-tight text-[#101828]">
                    {kpi.value}
                  </span>
                ) : (
                  <span className="text-3xl font-semibold tracking-tight text-[#101828]">
                    {kpi.value}
                  </span>
                )}
                <span className="text-sm font-medium text-[#667085]">{kpi.subtitle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs + Table ── */}
      <div className="flex min-h-0 flex-col gap-5 overflow-hidden flex-1">

        {/* Tab Nav */}
        <div className="shrink-0">
          {renderTabNav()}
        </div>

        {/* Table */}
        <div className="min-h-0 overflow-auto rounded-xl border border-[#EAECF0] bg-white">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr>
                <th className={thClass}>Service</th>
                <th className={thClass}>Member</th>
                <th className={thClass}>Caregiver (PSP)</th>
                <th className={thClass}>Cancelled By</th>
                <th className={thClass}>Reason</th>
                <th className={thClass}>Time Before Start</th>
                <th className={thClass}>Refund</th>
                <th className={`${thClass} w-[80px] text-center`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-sm text-[#667085]">
                    No cancellations found.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={`${row.id}-${row.serviceId}`} className="hover:bg-[#F9FAFB]/60 transition-colors">

                    {/* Service */}
                    <td className={tdClass}>
                      <p className="font-medium text-[#101828] mb-1">{row.serviceName}</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                        <span>JID: {row.serviceId}</span>
                        <span className="size-[3px] rounded-full bg-[#D0D5DD]" />
                        <span className="flex items-center gap-0.5">
                          <MapPin size={14} className="shrink-0" />
                          {row.location}
                        </span>
                      </div>
                    </td>

                    {/* Member */}
                    <td className={tdClass}>
                      <div className="flex items-center gap-2.5">
                        <img src={row.memberAvatar} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                        <span className="text-[#344054] underline decoration-[#D0D5DD] underline-offset-4">{row.memberName}</span>
                      </div>
                    </td>

                    {/* Caregiver */}
                    <td className={tdClass}>
                      {row.caregiverAvatar ? (
                        <div className="flex items-center gap-2.5">
                          <img src={row.caregiverAvatar} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                          <span className="text-[#344054] underline decoration-[#D0D5DD] underline-offset-4">{row.caregiverName}</span>
                        </div>
                      ) : (
                        <span className="text-[#667085]">{row.caregiverName}</span>
                      )}
                    </td>

                    {/* Cancelled By */}
                    <td className={tdClass}>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cancelledByBadge[row.cancelledBy] ?? "bg-[#F2F4F7] text-[#344054]"}`}>
                        {row.cancelledBy}
                      </span>
                    </td>

                    {/* Reason */}
                    <td className={tdClass}>
                      <span className="text-[#344054]">{row.reason}</span>
                    </td>

                    {/* Time Before Start */}
                    <td className={tdClass}>
                      <span className="text-[#475467]">{row.timeBeforeStart}</span>
                    </td>

                    {/* Refund */}
                    <td className={tdClass}>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${refundBadge[row.refund] ?? "bg-[#F2F4F7] text-[#344054]"}`}>
                        {row.refund}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 align-middle text-center first:pl-6 last:pr-6">
                      <button
                        type="button"
                        onClick={() => setSelectedRow(row)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors hover:bg-gray-50"
                        aria-label="View Details"
                      >
                        <Eye size={16} strokeWidth={2} />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Filter SideSheet ── */}
      <SideSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filters"
        footer={
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              className="h-11 flex-1 rounded-lg bg-[#F04438] text-base font-medium text-white hover:bg-[#D92D20] transition"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-base font-medium text-[#344054] hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-4">

          {/* Cancelled By */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Cancelled By</label>
            <div className="relative">
              <select
                defaultValue=""
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
              >
                <option value="" disabled hidden>Select Cancelled By</option>
                <option>All</option>
                <option>Member</option>
                <option>PSP</option>
                <option>System</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Refund Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Refund Type</label>
            <div className="relative">
              <select
                defaultValue=""
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
              >
                <option value="" disabled hidden>Select Refund Type</option>
                <option>All</option>
                <option>Full Refund</option>
                <option>No Refund</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Time Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Time Range</label>
            <div className="relative">
              <select
                defaultValue=""
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
              >
                <option value="" disabled hidden>MM-DD-YYYY – MM-DD-YYYY</option>
                <option>All</option>
                <option>Today</option>
                <option>Tomorrow</option>
                <option>This Week</option>
                <option>Next 7 Days</option>
                <option>Custom Range</option>
              </select>
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Reason</label>
            <div className="relative">
              <select
                defaultValue=""
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
              >
                <option value="" disabled hidden>Select Reason</option>
                <option>All</option>
                <option>PSP Unavailable</option>
                <option>Medical Issue</option>
                <option>Weather Conditions</option>
                <option>Member Unavailable</option>
                <option>PSP No-show</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

        </div>
      </SideSheet>

      {/* Cancellation Detail Drawer */}
      <CancellationDetailSheet
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        row={selectedRow}
      />
    </div>
  );
};

export default CancellationTab;
