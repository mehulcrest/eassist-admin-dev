import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EscalationDetailView from "./EscalationDetailView";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Eye,
  Settings2,
  RefreshCw,
  Search,
  Clock, MapPin
} from "lucide-react";
import SideSheet from "../../components/SideSheet";
import userProfile from "../../assets/userProfile.png";

/* ─────────────────────────────────────────────
   KPI Data
───────────────────────────────────────────── */
const KPI_DATA = [
  {
    title: "Resolved",
    value: "14",
    subtitle: "Cases successfully resolved",
    icon: <CheckCircle2 className="text-[#12B76A]" size={22} />,
    iconBg: "bg-[#ECFDF3]",
  },
  {
    title: "Open Escalations",
    value: "6",
    subtitle: "Cases currently",
    icon: <Clock className="text-[#F79009]" size={22} />,
    iconBg: "bg-[#FFFAEB]",
  },
  {
    title: "High Severity",
    value: "2",
    subtitle: "Ongoing critical cases",
    icon: <AlertTriangle className="text-[#F04438]" size={22} />,
    iconBg: "bg-[#FEF3F2]",
  },
];

/* ─────────────────────────────────────────────
   Table Data
───────────────────────────────────────────── */
const ESCALATION_DATA = [
  {
    id: "ES-2053",
    serviceId: "S001",
    serviceName: "Grocery Trip Assistance",
    location: "Downtown",
    issueType: "Provider behavior & Service quality",
    severity: "Low",
    assigneeName: "Maria Santos",
    assigneeAvatar: userProfile,
    status: "In Progress",
  },
  {
    id: "ES-2049",
    serviceId: "S002",
    serviceName: "Cleaning",
    location: "Westside",
    issueType: "Late arrival",
    severity: "Medium",
    assigneeName: "Lisa Wong",
    assigneeAvatar: userProfile,
    status: "New",
  },
  {
    id: "ES-2047",
    serviceId: "S003",
    serviceName: "Doctor Visit",
    location: "Northside",
    issueType: "Safety Concern",
    severity: "Low",
    assigneeName: "John Carter",
    assigneeAvatar: userProfile,
    status: "In Progress",
  },
  {
    id: "ES-2051",
    serviceId: "S004",
    serviceName: "Daily Care Assistance",
    location: "Eastside",
    issueType: "Other",
    severity: "High",
    assigneeName: "John Smith",
    assigneeAvatar: userProfile,
    status: "In Progress",
  },
  {
    id: "ES-2048",
    serviceId: "S005",
    serviceName: "Meal Preparation",
    location: "Westside",
    issueType: "Provider behavior & Service quality",
    severity: "High",
    assigneeName: "John Carter",
    assigneeAvatar: userProfile,
    status: "Resolved",
  },
  {
    id: "ES-2046",
    serviceId: "S006",
    serviceName: "House Cleaning",
    location: "Northside",
    issueType: "Payment Issue",
    severity: "Medium",
    assigneeName: "Lisa Wong",
    assigneeAvatar: userProfile,
    status: "Resolved",
  },
];

/* ─────────────────────────────────────────────
   Badge helpers
───────────────────────────────────────────── */
const severityBadge = {
  Low: "bg-gray-100 text-gray-500",
  Medium: "bg-amber-50 text-amber-600",
  High: "bg-red-50 text-red-500",
};

const statusBadge = {
  "In Progress": "bg-amber-50 text-amber-600",
  New: "bg-blue-50 text-blue-600",
  Resolved: "bg-green-50 text-green-600",
};

/* ─────────────────────────────────────────────
   Table class helpers
───────────────────────────────────────────── */
const thClass =
  "px-4 py-3 text-left text-sm font-semibold text-[#475467] whitespace-nowrap bg-[#F9FAFB] border-b border-[#EAECF0] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] whitespace-nowrap first:pl-6 last:pr-6";

/* ─────────────────────────────────────────────
   KPI Card
───────────────────────────────────────────── */
const KpiCard = ({ kpi }) => (
  <div className="flex items-center gap-4 rounded-xl border border-[#EAECF0] bg-white p-5 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">

    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}>
          {kpi.icon}
        </div>
        <p className="text-base font-medium text-[#101828]">
          {kpi.title}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-[#101828]">{kpi.value}</span>
        <span className="text-sm text-[#667085]">{kpi.subtitle}</span>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Location pin SVG
───────────────────────────────────────────── */
const LocationPin = () => (
  <MapPin size={14} className="shrink-0" />
);

/* ─────────────────────────────────────────────
   Select field (filter drawer)
───────────────────────────────────────────── */
const FilterSelect = ({ label, placeholder, options }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-[#344054]">{label}</label>
    <div className="relative">
      <select
        defaultValue=""
        className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer"
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const EscalationTab = ({ renderTabNav }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ESCALATION_DATA;
    return ESCALATION_DATA.filter(
      (row) =>
        row.id.toLowerCase().includes(q) ||
        row.serviceName.toLowerCase().includes(q) ||
        row.issueType.toLowerCase().includes(q) ||
        row.assigneeName.toLowerCase().includes(q) ||
        row.serviceId.toLowerCase().includes(q)
    );
  }, [query]);

  /* ── When a row is selected, show detail view with tabs still on top ── */
  if (selectedRow) {
    return (
      <div className="flex h-full min-h-0 flex-col gap-5 overflow-hidden">
        {/* Tab nav preserved (sticky) */}
        <div className="flex gap-6 rounded-xl border border-[#EAECF0] bg-white px-4 sm:px-6 pt-3 shrink-0 overflow-x-auto scrollbar-hide">
          {renderTabNav()}
        </div>
        {/* Scrollable detail view */}
        <div className="flex-1 min-h-0 overflow-y-auto w-full pr-1 pb-4">
          <EscalationDetailView
            row={selectedRow}
            onBack={() => setSelectedRow(null)}
          />
        </div>
      </div>
    );
  }

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
        {KPI_DATA.map((kpi, i) => (
          <KpiCard key={i} kpi={kpi} />
        ))}
      </div>

      {/* ── Tabs + Table ── */}
      <div className="flex min-h-0 flex-col gap-5 overflow-hidden flex-1">

        {/* Tab Nav */}
        <div className="flex gap-6 rounded-xl border border-[#EAECF0] bg-white px-4 sm:px-6 pt-3 shrink-0 overflow-x-auto scrollbar-hide">
          {renderTabNav()}
        </div>

        {/* Table */}
        <div className="min-h-0 overflow-auto rounded-xl border border-[#EAECF0] bg-white">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                <th className={thClass}>ID</th>
                <th className={thClass}>Service</th>
                <th className={thClass}>Issue Type</th>
                <th className={thClass}>Severity</th>
                <th className={thClass}>Assign To</th>
                <th className={thClass}>Status</th>
                <th className={`${thClass} w-[80px] text-center`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-sm text-[#667085]">
                    No escalations found.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F9FAFB]/60 transition-colors">

                    {/* ID */}
                    <td className={tdClass}>
                      <span className="font-medium text-[#101828]">{row.id}</span>
                    </td>

                    {/* Service */}
                    <td className={tdClass}>
                      <p className="font-medium text-[#101828] mb-0.5">{row.serviceName}</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                        <span>JID: {row.serviceId}</span>
                        <span className="size-[3px] rounded-full bg-[#D0D5DD]" />
                        <span className="flex items-center gap-0.5">
                          <LocationPin />
                          {row.location}
                        </span>
                      </div>
                    </td>

                    {/* Issue Type */}
                    <td className={tdClass}>
                      <span className="text-[#344054]">{row.issueType}</span>
                    </td>

                    {/* Severity */}
                    <td className={tdClass}>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityBadge[row.severity] ?? "bg-gray-100 text-gray-500"
                        }`}>
                        {row.severity}
                      </span>
                    </td>

                    {/* Assign To */}
                    <td className={tdClass}>
                      <div className="flex items-center gap-2">
                        <img
                          src={row.assigneeAvatar}
                          alt=""
                          className="size-7 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
                        />
                        <span className="text-[#344054] underline decoration-[#D0D5DD] underline-offset-4">
                          {row.assigneeName}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className={tdClass}>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge[row.status] ?? "bg-gray-100 text-gray-500"
                        }`}>
                        {row.status}
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

          {/* Status */}
          <FilterSelect
            label="Status"
            placeholder="Select Status"
            options={["All", "New", "In Progress", "Resolved"]}
          />

          {/* Severity */}
          <FilterSelect
            label="Severity"
            placeholder="Select Severity Level"
            options={["All", "Low", "Medium", "High"]}
          />

          {/* Assignees */}
          <FilterSelect
            label="Assignees"
            placeholder="Select Assignees"
            options={["All", "Maria Santos", "Lisa Wong", "John Carter", "John Smith"]}
          />

          {/* Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range</label>
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

        </div>
      </SideSheet>

    </div>
  );
};

export default EscalationTab;
