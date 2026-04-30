import { useMemo, useState } from "react";
import { Search, Settings2, Eye, ArrowUp, ArrowDown, CalendarDays, ChevronDown } from "lucide-react";
import SideSheet from "../../../components/SideSheet";
import DateRangeInput from "../../../components/ui/DateRangeInput";
import PlatformTaxDetailSheet from "./PlatformTaxDetailSheet";

/* ─────────────────────────────────────────────
   Data & Styles
───────────────────────────────────────────── */
const ROWS = [
  {
    id: "PTX001",
    revenueType: "Commission Fees",
    amount: "$10,000",
    tax: "$1,200",
    period: "Mar 01–07",
    status: "Filed",
  },
  {
    id: "PTX002",
    revenueType: "Subscription Fees",
    amount: "$3,000",
    tax: "$360",
    period: "Mar 01–07",
    status: "Filed",
  },
  {
    id: "PTX003",
    revenueType: "Service Call Fees",
    amount: "$1,500",
    tax: "$180",
    period: "Mar 01–07",
    status: "Pending",
  },
  {
    id: "PTX004",
    revenueType: "Commission Fees",
    amount: "$12,000",
    tax: "$1,440",
    period: "Mar 08–14",
    status: "Filed",
  },
  {
    id: "PTX005",
    revenueType: "Subscription Fees",
    amount: "$3,500",
    tax: "$420",
    period: "Mar 08–14",
    status: "Pending",
  },
  {
    id: "PTX006",
    revenueType: "Service Call Fees",
    amount: "$1,800",
    tax: "$216",
    period: "Mar 08–14",
    status: "Processing",
  },
];

const STATUS_STYLE = {
  Filed: "text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6]",
  Pending: "text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA]",
  Processing: "text-[#B54708] bg-[#FFFAEB] border border-[#FEDF89]",
};

const thClass =
  "px-4 py-3 text-left text-xs font-semibold text-[#475467] border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB] first:pl-6 last:pr-6";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

const KPICard = ({ title, value, trend, trendVal, description }) => {
  const isPositive = trend === "up";
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;
  const trendColor = isPositive ? "text-[#027A48]" : "text-[#B42318]";
  const trendBg = isPositive ? "bg-[#ECFDF3]" : "bg-[#FEF3F2]";

  return (
    <div className="flex flex-col justify-between rounded-xl border border-[#EAECF0] bg-white p-5 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
      <div className="mb-2">
        <h3 className="text-sm font-medium text-[#101828] mb-2">{title}</h3>
        <div className="flex items-end gap-3">
          <span className="text-2xl font-bold text-[#101828]">{value}</span>
          {trendVal && (
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${trendColor} ${trendBg}`}>
                <TrendIcon size={12} strokeWidth={2.5} />
                {trendVal}
              </span>
              <span className="text-xs text-[#667085]">this month</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-[#667085]">{description}</p>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const PlatformTaxTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Filter States
  const [fStatus, setFStatus] = useState("");
  const [fDate, setFDate] = useState("");
  const [fRevenueType, setFRevenueType] = useState("");

  const filtered = useMemo(() => {
    let result = ROWS;
    
    // Search 
    const q = searchQuery.toLowerCase();
    if (q) {
      result = result.filter((r) => r.revenueType.toLowerCase().includes(q));
    }

    if (fStatus) result = result.filter(r => r.status === fStatus);

    return result;
  }, [searchQuery, fStatus]);

  const handleApplyFilters = () => setIsFilterOpen(false);
  const handleClearFilters = () => {
    setFStatus("");
    setFDate("");
    setFRevenueType("");
    setIsFilterOpen(false);
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 w-full">
      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="relative w-full sm:max-w-[400px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#667085]" strokeWidth={2} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Revenue Type"
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 shrink-0">
        <KPICard
          title="Total Tax Collected"
          value="$12,450"
          trend="up"
          trendVal="8%"
          description="Total tax collected from all transactions"
        />
        <KPICard
          title="PSP Tax Liability"
          value="$9,200"
          trend="down"
          trendVal="3.5%"
          description="Total tax payable by PSP on earnings"
        />
        <KPICard
          title="Platform Tax Liability"
          value="$3,250"
          trend="up"
          trendVal="12.5%"
          description="Tax owed by the platform"
        />
        <KPICard
          title="Pending Tax Reports"
          value="5 Reports"
          description="Reports are generated but not yet filed"
        />
      </div>

      {/* ── Table ── */}
      <div className="flex-1 min-h-[300px] overflow-auto rounded-xl border border-[#EAECF0] bg-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
        <table className="w-full min-w-[1000px] border-collapse text-left">
          <thead>
            <tr>
              <th className={thClass}>Revenue Type</th>
              <th className={thClass}>Amount</th>
              <th className={thClass}>Tax</th>
              <th className={thClass}>Period</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} w-[90px] text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-sm text-[#667085]">
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                  <td className={`${tdClass} text-[#175CD3] font-medium`}>{row.revenueType}</td>
                  <td className={tdClass}>{row.amount}</td>
                  <td className="px-4 py-4 text-sm font-bold text-[#101828] align-middle">{row.tax}</td>
                  <td className={tdClass}>{row.period}</td>
                  <td className={tdClass}>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[row.status] || "text-[#667085]"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 last:pr-6 align-middle text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedEntry(row)}
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors"
                      aria-label="View record"
                    >
                      <Eye size={15} strokeWidth={2} />
                    </button>
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
                <option value="Filed">Filed</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range</label>
            <DateRangeInput
              value={fDate}
              onChange={setFDate}
              className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
            />
          </div>

          {/* Revenue Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Revenue Type</label>
            <div className="relative">
              <select
                value={fRevenueType}
                onChange={(e) => setFRevenueType(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3.5 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <option value="">Select Type</option>
                <option value="Commission">Commission Fees</option>
                <option value="Subscription">Subscription Fees</option>
                <option value="ServiceCall">Service Call Fees</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>
        </div>
      </SideSheet>

      {/* ── Detail Drawer ── */}
      <PlatformTaxDetailSheet
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        entry={selectedEntry}
      />
    </div>
  );
};

export default PlatformTaxTab;
