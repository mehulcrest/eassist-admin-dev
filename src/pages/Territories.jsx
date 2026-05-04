import { useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CircleDollarSign,
  Eye,
  Minus,
  MoreHorizontal,
  Plus,
  Search,
  UserRound,
} from "lucide-react";
import Button, { FiltersButton } from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import mapPlaceholder from "../assets/mapPlaceholder.png";
import userProfile from "../assets/userProfile.png";

const SUMMARY_CARDS = [
  {
    label: "Total Territories",
    value: "6",
    delta: "+1",
    positive: true,
    note: "+1 new territory added in last 30 days",
  },
  {
    label: "Avg Capacity Utilization",
    value: "75%",
    delta: "+2%",
    positive: true,
    note: "Stable utilization across most regions",
  },
  {
    label: "High Risk Territories",
    value: "1",
    delta: "-1",
    positive: false,
    note: "Westside requires immediate attention",
  },
  {
    label: "Active Jobs",
    value: "229",
    delta: "+12",
    positive: true,
    note: "Peak activity in Westside & Northside",
  },
];

const TERRITORY_ROWS = [
  { name: "Downtown District", capacity: 76, demand: "Medium", revenue: "$45k", risk: "Healthy" },
  { name: "Westside", capacity: 82, demand: "High", revenue: "$38k", risk: "Overload" },
  { name: "Eastside", capacity: 70, demand: "High", revenue: "$50k", risk: "In Progress" },
  { name: "Northside", capacity: 65, demand: "Medium", revenue: "$40k", risk: "At Risk" },
];

const TERRITORY_PERFORMANCE_ROWS = [
  {
    territory: "Downtown District",
    manager: "Teresa May",
    psps: 28,
    members: 342,
    capacity: "78%",
    demandSupply: "Balanced",
    activeJobs: 42,
    revenue: "$45,000",
    status: "Healthy",
  },
  {
    territory: "Eastside",
    manager: "Louise Robet",
    psps: 19,
    members: 265,
    capacity: "66%",
    demandSupply: "Slightly High",
    activeJobs: 38,
    revenue: "$40,000",
    status: "At Risk",
  },
  {
    territory: "Granger",
    manager: "Michael Cohen",
    psps: 15,
    members: 211,
    capacity: "72%",
    demandSupply: "Balanced",
    activeJobs: 25,
    revenue: "$33,000",
    status: "Healthy",
  },
  {
    territory: "Northside",
    manager: "Samuel Harris",
    psps: 24,
    members: 287,
    capacity: "76%",
    demandSupply: "High",
    activeJobs: 47,
    revenue: "$50,000",
    status: "In Progress",
  },
  {
    territory: "Southern Hills",
    manager: "Sarah Hill",
    psps: 12,
    members: 180,
    capacity: "64%",
    demandSupply: "Medium",
    activeJobs: 21,
    revenue: "$27,000",
    status: "At Risk",
  },
  {
    territory: "Westside",
    manager: "Monia shoal",
    psps: 31,
    members: 316,
    capacity: "82%",
    demandSupply: "Overloaded",
    activeJobs: 56,
    revenue: "$38,000",
    status: "Overloaded",
  },
];

const ALERTS = [
  { id: 1, text: "Westside: Demand exceeds PSP capacity by 22%", tag: "OVERLOAD", tone: "danger" },
  { id: 2, text: "Eastside: Low PSP availability during peak hours", tag: "IMBALANCE", tone: "warning" },
  { id: 3, text: "Northside: High cancellation rate detected", tag: "HIGH CANCELLATIONS", tone: "danger" },
];

const riskTone = {
  Healthy: "success",
  Overload: "danger",
  "In Progress": "inProgress",
  "At Risk": "warning",
};

const RISK_BADGE_CLASS = {
  Healthy: "bg-[#ECFDF3] text-[#039855]",
  Overload: "bg-[#FEF3F2] text-[#F04438]",
  "In Progress": "bg-[#EFF8FF] text-[#2E90FA]",
  "At Risk": "bg-[#FFFAEB] text-[#DC6803]",
};

const CAPACITY_BAR_CLASS = {
  Healthy: "bg-[#12B76A]",
  Overload: "bg-[#F04438]",
  "In Progress": "bg-[#1570EF]",
  "At Risk": "bg-[#F79009]",
};

const FULL_TABLE_STATUS_CLASS = {
  Healthy: "bg-[#ECFDF3] text-[#039855]",
  "At Risk": "bg-[#FFFAEB] text-[#DC6803]",
  "In Progress": "bg-[#EFF8FF] text-[#2E90FA]",
  Overloaded: "bg-[#FEF3F2] text-[#F04438]",
};

const TerritoryMap = () => (
  <div className="relative h-[430px] overflow-hidden rounded-xl border border-[#EAECF0]">
    <img src={mapPlaceholder} alt="Territory map" className="h-full w-full object-cover" />

    <div className="absolute left-5 top-5 w-[200px] rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-[0_8px_24px_rgba(16,24,40,0.14)]">
      <p className="text-sm font-semibold text-textColor">Downtown District</p>
      <div className="mt-3 space-y-2 text-xs text-[#344054]">
        <p className="flex items-center gap-2"><UserRound size={12} />PSPs: 28</p>
        <p className="flex items-center gap-2"><UserRound size={12} />Members: 342</p>
        <p className="flex items-center gap-2"><CircleDollarSign size={12} />Revenue: $45k</p>
      </div>
      <Button type="button" variant="danger" size="sm" className="mt-4 h-9 w-full text-xs">
        View Territory Details
      </Button>
    </div>

    <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-lg border border-[#D0D5DD] bg-white">
      <button type="button" className="inline-flex size-8 items-center justify-center text-[#667085] hover:bg-[#F2F4F7]">
        <Plus size={15} />
      </button>
      <button type="button" className="inline-flex size-8 items-center justify-center border-t border-[#D0D5DD] text-[#667085] hover:bg-[#F2F4F7]">
        <Minus size={15} />
      </button>
    </div>

    <button
      type="button"
      className="absolute bottom-3 left-3 rounded border border-[#B2DDFF] bg-white px-2 py-1 text-sm font-medium text-[#1570EF]"
    >
      View larger map
    </button>

    <span className="absolute left-[47%] top-[49%] text-sm font-medium text-white drop-shadow-[0_1px_1px_rgba(16,24,40,0.5)]">
      Westside
    </span>
    <span className="absolute left-[41%] top-[30%] text-sm font-medium text-white drop-shadow-[0_1px_1px_rgba(16,24,40,0.5)]">
      Downtown
    </span>
    <span className="absolute left-[58%] top-[54%] text-sm font-medium text-white drop-shadow-[0_1px_1px_rgba(16,24,40,0.5)]">
      Eastside
    </span>
  </div>
);

const Territories = () => {
  const [showFullTerritoriesView, setShowFullTerritoriesView] = useState(false);

  if (showFullTerritoriesView) {
    return (
      <div className="flex flex-col gap-4 pb-4 sm:gap-6 sm:pb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-[300px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            <input
              type="search"
              placeholder="Search by name"
              className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
            />
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <FiltersButton className="flex-1 sm:flex-none" />
            <Button type="button" variant="danger" size="md" className="flex-1 sm:flex-none">
              <Plus size={16} />
              Add New
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SUMMARY_CARDS.map((card) => (
            <div
              key={card.label}
              className="rounded-[10px] border border-[#EAECF0] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
            >
              <p className="text-lg leading-none font-medium text-[#344054]">{card.label}</p>
              <div className="mt-3.5 flex items-center justify-between">
                <p className="text-[22px] leading-none font-semibold text-textColor">{card.value}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      card.positive ? "bg-[#ECFDF3] text-[#039855]" : "bg-[#FEF3F2] text-[#D92D20]"
                    }`}
                  >
                    {card.positive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                    {card.delta}
                  </span>
                  <span className="text-xs text-[#667085]">this month</span>
                </div>
              </div>
              <p className={`mt-3.5 text-xs ${card.positive ? "text-[#667085]" : "text-[#F04438]"}`}>{card.note}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#EAECF0] bg-white">
          <table className="w-full min-w-[1080px]">
            <thead className="bg-[#F9FAFB]">
              <tr className="text-left text-xs font-medium text-[#667085]">
                <th className="px-4 py-3.5">Territory</th>
                <th className="px-4 py-3.5">Manager</th>
                <th className="px-4 py-3.5">PSPs</th>
                <th className="px-4 py-3.5">Members</th>
                <th className="px-4 py-3.5">Capacity</th>
                <th className="px-4 py-3.5">Demand/Supply</th>
                <th className="px-4 py-3.5">Active Jobs</th>
                <th className="px-4 py-3.5">Revenue</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {TERRITORY_PERFORMANCE_ROWS.map((row) => (
                <tr key={row.territory} className="border-t border-[#EAECF0] text-sm text-[#475467]">
                  <td className="px-4 py-3.5 font-medium text-[#344054]">{row.territory}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <img src={userProfile} alt="" className="size-7 rounded-full object-cover" />
                      <span>{row.manager}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">{row.psps}</td>
                  <td className="px-4 py-3.5">{row.members}</td>
                  <td className="px-4 py-3.5">{row.capacity}</td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-[#F2F4F7] px-2 py-1 text-xs text-[#475467]">{row.demandSupply}</span>
                  </td>
                  <td className="px-4 py-3.5">{row.activeJobs}</td>
                  <td className="px-4 py-3.5">{row.revenue}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        FULL_TABLE_STATUS_CLASS[row.status] ?? "bg-[#F2F4F7] text-[#667085]"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="icon" size="icon" aria-label={`View ${row.territory}`}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="icon" size="icon" aria-label={`More actions for ${row.territory}`}>
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-4 sm:gap-6 sm:pb-6">
      <div className="relative w-full sm:max-w-[280px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
        <input
          type="search"
          placeholder="Search by Territory name"
          className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SUMMARY_CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-[10px] border border-[#EAECF0] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
          >
            <p className="text-lg leading-none font-medium text-[#344054]">{card.label}</p>
            <div className="mt-3.5 flex items-center justify-between">
              <p className="text-[22px] leading-none font-semibold text-textColor">{card.value}</p>
              <div className="flex gap-2 items-center">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  card.positive ? "bg-[#ECFDF3] text-[#039855]" : "bg-[#FEF3F2] text-[#D92D20]"
                }`}
              >
                {card.positive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                {card.delta}
              </span>
              <span className="text-xs text-[#667085]">this month</span>
              </div>
            </div>
            <p className={`mt-3.5 text-xs ${card.positive ? "text-[#667085]" : "text-[#F04438]"}`}>{card.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="rounded-xl border border-[#EAECF0] bg-white p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-textColor">Territory Map</h3>
            <FiltersButton className="h-8 px-3 text-xs">Filters</FiltersButton>
          </div>

          <TerritoryMap />

          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
            <span className="inline-flex items-center gap-2 text-[#344054]">
              <span className="size-2.5 rounded-full bg-[#039855]" />
              <span>0-70% :</span>
              <span className="text-[#039855]">Healthy</span>
            </span>
            <span className="inline-flex items-center gap-2 text-[#344054]">
              <span className="size-2.5 rounded-full bg-[#F59E0B]" />
              <span>71-85% :</span>
              <span className="text-[#F59E0B]">Balanced</span>
            </span>
            <span className="inline-flex items-center gap-2 text-[#344054]">
              <span className="size-2.5 rounded-full bg-[#F04438]" />
              <span>86-100% :</span>
              <span className="text-[#F04438]">Overloaded</span>
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-[#EAECF0] bg-white">
            <div className="mb-4 flex items-center justify-between border-b border-[#EAECF0] p-4">
              <h3 className="text-lg font-semibold text-textColor">Territory Performance</h3>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={() => setShowFullTerritoriesView(true)}
              >
                See all
              </Button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#EAECF0] m-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#EAECF0] text-sm font-medium uppercase tracking-wide text-[#98A2B3]">
                    <th className="px-4 py-2">Territory</th>
                    <th className="px-4 py-2">Capacity</th>
                    <th className="px-4 py-2">Demand</th>
                    <th className="px-4 py-2">Revenue</th>
                    <th className="px-4 py-2 text-center">Risk</th>
                  </tr>
                </thead>

                <tbody>
                  {TERRITORY_ROWS.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-[#EAECF0] text-xs last:border-0"
                    >
                      {/* Territory */}
                      <td className="px-4 py-3 text-[#344054]">{row.name}</td>

                      {/* Capacity with progress bar */}
                      <td className="px-4 py-3">
                        <div className="flex-col items-start gap-2 flex">
                          <span className="font-medium text-textColor">
                            {row.capacity}%
                          </span>
                          <div className="h-1.5 w-16 rounded-full bg-gray-200">
                            <div
                              className={`h-1.5 rounded-full ${CAPACITY_BAR_CLASS[row.risk] ?? "bg-[#12B76A]"}`}
                              style={{ width: `${row.capacity}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Demand */}
                      <td className="px-4 py-3 text-[#667085]">{row.demand}</td>

                      {/* Revenue */}
                      <td className="px-4 py-3 text-[#667085]">{row.revenue}</td>

                      {/* Risk */}
                      <td className="px-4 py-3 text-center">
                        <StatusBadge
                          label={row.risk}
                          tone={riskTone[row.risk]}
                          size="xs"
                          className={`text-sm ${RISK_BADGE_CLASS[row.risk] ?? ""}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-[#EAECF0] bg-white">
            <h3 className="mb-4 text-lg font-semibold text-textColor border-b border-[#EAECF0] p-4">Alerts</h3>
            <div className="space-y-0 rounded-xl px-2 pb-2">
              {ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between gap-2 border-b border-[#EAECF0] px-3 py-3 last:border-b-0"
                >
                  <p className="flex items-center gap-1.5 text-xs text-[#344054]">
                    <AlertTriangle size={20} className="mt-0.5 shrink-0 fill-[#F79009] text-white" />
                    {alert.text}
                  </p>
                  <StatusBadge label={alert.tag} tone={alert.tone} size="xs" className="shrink-0 text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Territories;
