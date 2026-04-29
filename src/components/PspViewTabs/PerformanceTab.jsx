import {
  AlertTriangle,
  CalendarDays,
  ChevronDown,
  CheckCircle2,
  ClipboardList,
  Star,
  TriangleAlert,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CARD = "rounded-xl border border-line bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.06)]";

const kpiCards = [
  { label: "Average Rating", value: "4.6", delta: "↑ 0.2%", icon: Star, note: "Based on recent reviews", iconTone: "amber" },
  { label: "Completed Jobs", value: "248", delta: "↑ +18", icon: ClipboardList, note: "Lifetime completed jobs", iconTone: "blue" },
  { label: "Active Members", value: "12", delta: "↑ +2", icon: Users, note: "Currently assigned", iconTone: "green" },
  { label: "Completion Rate", value: "95%", delta: "↑ +3%", icon: CheckCircle2, note: "Last 30 days", iconTone: "purple" },
  { label: "Cancellation Rate", value: "2.1%", delta: "↓ -0.4%", icon: XCircle, note: "Last 30 days", iconTone: "red" },
  { label: "Complaints", value: "1", delta: "↓ -2", icon: AlertTriangle, note: "Active complaints", iconTone: "orange" },
];

const jobsTrendData = [
  { label: "Apr 1-7", value: 68 },
  { label: "Apr 8-14", value: 80 },
  { label: "Apr 15-21", value: 86 },
  { label: "Apr 22-28", value: 74 },
];

const ratingTrendData = [
  { label: "Apr 1-7", value: 4.60 },
  { label: "Apr 8-14", value: 4.61 },
  { label: "Apr 10-12", value: 4.70 },
  { label: "Apr 15-21", value: 4.74 },
  { label: "Apr 20-24", value: 4.74 },
  { label: "Apr 22-28", value: 4.71 },
  { label: "Apr 29-30", value: 4.75 },
];

const cancellationTrendData = [
  { label: "Apr 1-7", value: 2.2 },
  { label: "Apr 8-14", value: 2.6 },
  { label: "Apr 15-21", value: 2.9, flagged: true },
  { label: "Apr 22-28", value: 2.4, light: true },
];

const scoreBreakdown = [
  { name: "Rating", value: 38, color: "#E4302F" },
  { name: "Completion", value: 30, color: "#F97066" },
  { name: "Complaints", value: 17, color: "#FDB022" },
  { name: "Timeliness", value: 15, color: "#36BFFA" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-[#EAECF0] bg-white px-3 py-2 text-xs shadow-[0_4px_14px_rgba(16,24,40,0.12)]">
      <p className="font-semibold text-[#344054]">{label}</p>
      <p className="mt-1 text-[#475467]">{payload[0].value}</p>
    </div>
  );
};

const iconToneClass = {
  amber: "bg-[#FFFAEB] text-[#F79009]",
  blue: "bg-[#EFF8FF] text-[#2E90FA]",
  green: "bg-[#ECFDF3] text-[#12B76A]",
  purple: "bg-[#F4F3FF] text-[#7A5AF8]",
  red: "bg-[#FEF3F2] text-[#F04438]",
  orange: "bg-[#FFF6ED] text-[#F79009]",
};

const PerformanceTab = () => {
  return (
    <div className="space-y-4 pb-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#475467]">
          Monitor PSP performance trends, service quality, and potential risks.
        </p>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054]"
        >
          Last 30 Days
          <CalendarDays size={14} />
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`${CARD} min-h-[96px] p-3`}>
              <p className="text-sm font-medium text-[#344054]">{card.label}</p>
              <div className="mt-2 flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={`inline-flex size-5 items-center justify-center rounded-md ${iconToneClass[card.iconTone]}`}>
                    <Icon size={13} />
                  </span>
                  <span className="text-[20px] leading-none font-semibold text-[#101828]">{card.value}</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[10px] font-semibold text-[#027A48]">
                  <TrendingUp size={11} />
                  {card.delta}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#98A2B3]">{card.note}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 xl:grid-cols-[1fr_1fr_0.95fr]">
        <div className={CARD}>
          <div className="flex items-center justify-between border-b border-[#EAECF0] px-4 py-3">
            <h4 className="text-base font-semibold text-[#101828]">Jobs Completed Trend</h4>
            <button type="button" className="inline-flex items-center gap-1 rounded-md border border-[#D0D5DD] px-2 py-1 text-[10px] font-medium text-[#344054]">
              Weekly
              <ChevronDown size={12} />
            </button>
          </div>
          <div className="h-[152px] px-2 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobsTrendData} barSize={30}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F2F4F7" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#98A2B3", fontSize: 11 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#98A2B3", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="url(#jobsBarGradient)" />
                <defs>
                  <linearGradient id="jobsBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8CCAF9" />
                    <stop offset="100%" stopColor="#64AEF5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="px-4 pb-3 text-[11px] text-[#667085]">Total: 74 jobs</p>
        </div>

        <div className={CARD}>
          <div className="flex items-center justify-between border-b border-[#EAECF0] px-4 py-3">
            <h4 className="text-base font-semibold text-[#101828]">Rating Trend</h4>
            <button type="button" className="inline-flex items-center gap-1 rounded-md border border-[#D0D5DD] px-2 py-1 text-[10px] font-medium text-[#344054]">
              Weekly
              <ChevronDown size={12} />
            </button>
          </div>
          <div className="h-[152px] px-2 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ratingTrendData}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F2F4F7" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#98A2B3", fontSize: 11 }} />
                <YAxis domain={[4.5, 4.8]} ticks={[4.5,4.6,4.7,4.8]} axisLine={false} tickLine={false} tick={{ fill: "#98A2B3", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#2E90FA" strokeWidth={2.5} fill="url(#ratingAreaGradient)" />
                <defs>
                  <linearGradient id="ratingAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2E90FA" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#2E90FA" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${CARD} p-4`}>
          <h4 className="text-base font-semibold text-[#101828]">Quality & Risk Signals</h4>
          <ul className="mt-3 space-y-2 border-b border-[#EAECF0] pb-3 text-xs text-[#475467]">
            <li className="flex items-start gap-2"><Star size={13} className="mt-0.5 text-[#FDB022]" /> Low-rated Reviews: 8 (+2)</li>
            <li className="flex items-start gap-2"><XCircle size={13} className="mt-0.5 text-[#F04438]" /> Complaint Rate: 0.8% (stable)</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={13} className="mt-0.5 text-[#7A5AF8]" /> Late Arrivals: 3 (1-1)</li>
          </ul>
          <div className="mt-3">
            <p className="text-sm font-semibold text-[#344054]">Risk Flags</p>
            <ul className="mt-2 space-y-1.5 text-xs text-[#475467]">
              <li className="flex items-center gap-2"><TriangleAlert size={14} className="text-[#F79009]" /> Frequent cancellations</li>
              <li className="flex items-center gap-2"><TriangleAlert size={14} className="text-[#F79009]" /> Low rating trend</li>
            </ul>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" className="rounded-lg border border-[#D0D5DD] px-3 py-2 text-xs font-semibold text-[#344054]">View All Reviews</button>
            <button type="button" className="rounded-lg border border-[#D0D5DD] px-3 py-2 text-xs font-semibold text-[#344054]">Investigate Complaints</button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.3fr_0.9fr]">
        <div className={CARD}>
          <div className="flex items-center justify-between border-b border-[#EAECF0] px-4 py-3">
            <h4 className="text-base font-semibold text-[#101828]">Cancellation Trend</h4>
            <p className="text-xs text-[#667085]">Threshold: 2.5% (above acceptable)</p>
          </div>
          <div className="h-[170px] px-2 pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cancellationTrendData} barSize={34}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F2F4F7" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#98A2B3", fontSize: 11 }} />
                <YAxis domain={[0, 3.2]} ticks={[0,1.5,2.1,2.6,3]} axisLine={false} tickLine={false} tick={{ fill: "#98A2B3", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {cancellationTrendData.map((entry) => (
                    <Cell key={entry.label} fill={entry.flagged ? "#FDA29B" : entry.light ? "#A6F4CF" : "#84E1BC"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="px-4 pb-3 text-xs text-[#667085]">Min: 0% &nbsp; Max: 3% &nbsp; Step: 0.5%</p>
        </div>

        <div className="space-y-3">
          <div className={`${CARD} p-4`}>
            <h4 className="text-base font-semibold text-[#101828]">Performance Score</h4>
            <div className="mt-3 flex items-center gap-4">
              <div className="relative h-24 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreBreakdown}
                      dataKey="value"
                      innerRadius={30}
                      outerRadius={44}
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      {scoreBreakdown.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-semibold text-[#101828]">88</span>
                  <span className="text-xs text-[#667085]">/100</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#344054]">Factors:</p>
                <ul className="space-y-1 text-xs text-[#475467]">
                {scoreBreakdown.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span className="inline-block size-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={`${CARD} p-4`}>
            <h4 className="text-base font-semibold text-[#101828]">Recognition</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-[#475467]">
              <li>Top 10 PSP this month</li>
              <li>Positive member feedback streak: 6 weeks</li>
              <li>On-time service badge earned</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
