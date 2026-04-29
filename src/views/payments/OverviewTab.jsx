import { useState } from "react";
import {
  ArrowUpRight,
  CircleCheck,
  AlertTriangle,
  Clock,
  TrendingUp,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Static Data
───────────────────────────────────────────── */
const KPI_TOP = [
  {
    id: "total-received",
    title: "Total Payments Received",
    value: "$124,560",
    change: "+8.3%",
    suffix: "this month",
    trend: "up",
    iconBg: "bg-[#ECFDF3]",
    icon: <TrendingUp size={20} className="text-[#12B76A]" />,
    cardBg: "bg-white",
  },
  {
    id: "total-payouts",
    title: "Total Payouts Released",
    value: "$82,340",
    change: "+7.1%",
    suffix: "this month",
    trend: "up",
    iconBg: "bg-[#FFFAEB]",
    icon: <TrendingUp size={20} className="text-[#F79009]" />,
    cardBg: "bg-white",
  },
  {
    id: "platform-revenue",
    title: "Platform Revenue",
    value: "$12,450",
    change: "+9.5%",
    suffix: "this month",
    trend: "up",
    iconBg: "bg-[#EFF8FF]",
    icon: <TrendingUp size={20} className="text-[#175CD3]" />,
    cardBg: "bg-[#EFF8FF]",
  },
];

const KPI_BOTTOM = [
  {
    id: "pending-payout",
    title: "Pending Payout",
    value: "$6,200.00",
    sub: "Scheduled for May 05, 2026",
    iconBg: "bg-[#FFFAEB]",
    icon: <Clock size={20} className="text-[#F79009]" />,
  },
  {
    id: "refunds-issued",
    title: "Refunds Issued",
    value: "$2,140.00",
    sub: "Scheduled for May 05, 2026",
    iconBg: "bg-[#ECFDF3]",
    icon: <CircleCheck size={20} className="text-[#12B76A]" />,
  },
  {
    id: "failed-transactions",
    title: "Failed Transactions",
    value: "8",
    sub: "Scheduled for May 05, 2026",
    iconBg: "bg-[#FEF3F2]",
    icon: <AlertTriangle size={20} className="text-[#F04438]" />,
  },
];

const REVENUE_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Heights as % of max for bar chart (out of 100)
const PAYMENTS_IN  = [82, 90, 100, 75, 95, 95, 98, 95, 78, 78, 80, 88];
const PAYOUTS_OUT  = [60, 70,  80, 55, 72, 74, 78, 74, 55, 56, 60, 68];
const NET_REVENUE  = [22, 20,  20, 20, 23, 21, 20, 21, 23, 22, 20, 20];

const CHART_FILTERS = ["Payments In", "Payouts Out", "Net Revenue"];

const ALERTS = [
  { id: 1, icon: <AlertTriangle size={16} className="text-[#F79009] shrink-0" />, text: "3 payouts failed - action required" },
  { id: 2, icon: <AlertTriangle size={16} className="text-[#F79009] shrink-0" />, text: "5 refunds pending approval" },
  { id: 3, icon: <AlertTriangle size={16} className="text-[#F79009] shrink-0" />, text: "2 tax reports overdue" },
];

/* ─────────────────────────────────────────────
   Reusable: Top KPI Card
───────────────────────────────────────────── */
const TopKpiCard = ({ kpi }) => (
  <div className={`rounded-xl border border-[#EAECF0] ${kpi.cardBg} p-5 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]`}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}>
        {kpi.icon}
      </div>
      <p className="text-sm font-semibold text-[#344054]">{kpi.title}</p>
    </div>
    <p className="text-2xl font-bold text-[#101828]">{kpi.value}</p>
    <div className="mt-1 flex items-center gap-1.5">
      <span className="flex items-center gap-0.5 text-xs font-semibold text-[#12B76A]">
        <ArrowUpRight size={12} />
        {kpi.change}
      </span>
      <span className="text-xs text-[#667085]">{kpi.suffix}</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Reusable: Bottom KPI Card
───────────────────────────────────────────── */
const BottomKpiCard = ({ kpi }) => (
  <div className="rounded-xl border border-[#EAECF0] bg-white p-5 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
    <div className="flex items-center gap-3 mb-3">
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}>
        {kpi.icon}
      </div>
      <p className="text-sm font-semibold text-[#344054]">{kpi.title}</p>
    </div>
    <p className="text-xl font-bold text-[#101828]">{kpi.value}</p>
    <p className="mt-1 text-xs text-[#667085]">{kpi.sub}</p>
  </div>
);

/* ─────────────────────────────────────────────
   Revenue Flow Chart (pure CSS bars + SVG trend line)
───────────────────────────────────────────── */
const RevenueFlowChart = ({ activeFilter }) => {
  const dataMap = {
    "Payments In": PAYMENTS_IN,
    "Payouts Out": PAYOUTS_OUT,
    "Net Revenue": NET_REVENUE,
  };
  const data = dataMap[activeFilter] ?? PAYMENTS_IN;

  // Y-axis labels
  const yLabels = ["$12k", "$11k", "$10k", "$5k", "0"];

  // Build SVG polyline points for trend line
  // Chart area: width = 100%, height = 100%
  // We'll use a viewBox approach
  const chartW = 560;
  const chartH = 120;
  const barCount = data.length;
  const barWidth = chartW / barCount;

  const points = data.map((v, i) => {
    const x = i * barWidth + barWidth / 2;
    const y = chartH - (v / 100) * chartH;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative w-full">
      {/* Y axis labels */}
      <div className="flex">
        {/* Y-axis */}
        <div className="flex flex-col justify-between text-[10px] text-[#667085] pr-2 shrink-0" style={{ height: 140 }}>
          {yLabels.map((l) => <span key={l}>{l}</span>)}
        </div>

        {/* Bars + trend SVG */}
        <div className="relative flex-1 min-w-0" style={{ height: 140 }}>
          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-[3px] px-1">
            {data.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${v}%`,
                  backgroundColor: i === 2 ? "#175CD3" : "#C2D5F8",
                }}
                aria-label={`${REVENUE_MONTHS[i]}: ${v}%`}
              />
            ))}
          </div>

          {/* Trend line SVG */}
          <svg
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <polyline
              points={points}
              fill="none"
              stroke="#F04438"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {data.map((v, i) => {
              const x = i * barWidth + barWidth / 2;
              const y = chartH - (v / 100) * chartH;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i === 2 ? 5 : 3}
                  fill={i === 2 ? "#175CD3" : "#F04438"}
                  stroke="white"
                  strokeWidth={i === 2 ? 2 : 1}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* X axis labels */}
      <div className="flex pl-8 mt-1">
        {REVENUE_MONTHS.map((m) => (
          <div key={m} className="flex-1 text-center text-[10px] text-[#667085]">{m}</div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main OverviewTab Component
───────────────────────────────────────────── */
const OverviewTab = ({ renderTabNav }) => {
  const [chartFilter, setChartFilter] = useState("Payments In");

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto">

      {/* ── Tab Navigation ── */}
      <div className="flex gap-4 sm:gap-6 rounded-xl border border-[#EAECF0] bg-white px-4 sm:px-6 pt-3 shrink-0 overflow-x-auto scrollbar-hide">
        {renderTabNav()}
      </div>

      {/* ── Top KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 shrink-0">
        {KPI_TOP.map((kpi) => (
          <TopKpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* ── Bottom KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 shrink-0">
        {KPI_BOTTOM.map((kpi) => (
          <BottomKpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* ── Revenue Flow + Alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4">

        {/* Revenue Flow Chart */}
        <div className="lg:col-span-2 rounded-xl border border-[#EAECF0] bg-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-[#EAECF0]">
            <h3 className="text-base font-bold text-[#101828]">Revenue Flow</h3>
            {/* Filter Tabs */}
            <div className="flex items-center rounded-lg border border-[#EAECF0] p-1 bg-[#F9FAFB] self-start sm:self-auto">
              {CHART_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setChartFilter(f)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    chartFilter === f
                      ? "bg-[#344054] text-white shadow-sm"
                      : "text-[#667085] hover:text-[#344054]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Body */}
          <div className="p-5">
            <RevenueFlowChart activeFilter={chartFilter} />
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="rounded-xl border border-[#EAECF0] bg-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
          <div className="px-5 py-4 border-b border-[#EAECF0]">
            <h3 className="text-base font-bold text-[#101828]">Alerts</h3>
          </div>
          <div className="p-5 flex flex-col gap-3">
            {ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 rounded-lg border border-[#FEE4E2] bg-[#FFFBF0] px-3 py-3"
              >
                {alert.icon}
                <p className="text-sm text-[#344054]">{alert.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverviewTab;
