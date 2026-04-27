import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Clock,
  Eye,
  RefreshCw,
  Search, Settings2,
  MapPin,
} from "lucide-react";
import userProfile from "../../assets/userProfile.png";
import SideSheet from "../../components/SideSheet";
import ActiveJobDetailSheet from "./ActiveJobDetailSheet";

const KPI_DATA = [
  {
    title: "Total Active Jobs",
    value: "9",
    subtitle: "Currently in progress",
    icon: <Briefcase className="text-[#12B76A]" size={20} />,
    iconBg: "bg-[#ECFDF3]",
  },
  {
    title: "Delays",
    value: "2",
    subtitle: "at risk of No-show",
    icon: <Clock className="text-[#F79009]" size={20} />,
    iconBg: "bg-[#FFFAEB]",
  },
  {
    title: "No-Shows",
    value: "1",
    subtitle: "Urgent issue raised",
    icon: <AlertTriangle className="text-[#F04438]" size={20} />,
    iconBg: "bg-[#FEF3F2]",
  },
];

const JOBS_DATA = [
  {
    id: "J001",
    serviceId: "S001",
    serviceName: "Grocery Trip Assistance",
    location: "Downtown",
    memberName: "Margaret Thompson",
    memberAvatar: userProfile,
    caregiverName: "Maria Santos",
    caregiverAvatar: userProfile,
    startTime: "20 min ago",
    timeElapsed: "01:24",
    timeSuffix: "elapsed",
    timeColor: "text-[#027A48]", // green
    timeBarColor: "bg-[#12B76A]",
    timeBarWidth: "100%", // for demo
    statusText: "In Progress",
    statusBadgeBg: "bg-[#EFF8FF]",
    statusBadgeText: "text-[#175CD3]",
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
    startTime: "1 hr ago",
    timeElapsed: "00:55",
    timeSuffix: "elapsed",
    timeColor: "text-[#027A48]",
    timeBarColor: "bg-[#12B76A]",
    timeBarWidth: "70%",
    statusText: "In Progress",
    statusBadgeBg: "bg-[#EFF8FF]",
    statusBadgeText: "text-[#175CD3]",
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
    startTime: "1.5 hrs ago",
    timeElapsed: "Delayed",
    timeSuffix: "",
    timeColor: "text-[#B42318]", // red/orange
    timeBarColor: "bg-transparent",
    timeBarWidth: "0%",
    statusText: "Delay",
    statusBadgeBg: "bg-[#FFF4ED]",
    statusBadgeText: "text-[#C4320A]",
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
    startTime: "1.5 hrs ago",
    timeElapsed: "00:52",
    timeSuffix: "elapsed",
    timeColor: "text-[#027A48]",
    timeBarColor: "bg-[#12B76A]",
    timeBarWidth: "65%",
    statusText: "In Progress",
    statusBadgeBg: "bg-[#EFF8FF]",
    statusBadgeText: "text-[#175CD3]",
  },
  {
    id: "J005",
    serviceId: "S005",
    serviceName: "Meal Preparation",
    location: "Westside",
    memberName: "Margaret Thompson",
    memberAvatar: userProfile,
    caregiverName: "David Lee Joseph",
    caregiverAvatar: userProfile,
    startTime: "1.5 hrs ago",
    timeElapsed: "No show risk",
    timeSuffix: "",
    timeColor: "text-[#B42318]",
    isAlert: true,
    timeBarColor: "bg-transparent",
    timeBarWidth: "0%",
    statusText: "Delay",
    statusBadgeBg: "bg-[#FFF4ED]",
    statusBadgeText: "text-[#C4320A]",
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
    startTime: "2 hours ago",
    timeElapsed: "00:20",
    timeSuffix: "elapsed",
    timeColor: "text-[#027A48]",
    timeBarColor: "bg-[#12B76A]",
    timeBarWidth: "30%",
    statusText: "In Progress",
    statusBadgeBg: "bg-[#EFF8FF]",
    statusBadgeText: "text-[#175CD3]",
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
    startTime: "1.5 hrs ago",
    timeElapsed: "Delayed",
    timeSuffix: "",
    timeColor: "text-[#B42318]",
    timeBarColor: "bg-transparent",
    timeBarWidth: "0%",
    statusText: "Delay",
    statusBadgeBg: "bg-[#FFF4ED]",
    statusBadgeText: "text-[#C4320A]",
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
    startTime: "2 hours ago",
    timeElapsed: "00:55",
    timeSuffix: "elapsed",
    timeColor: "text-[#027A48]",
    timeBarColor: "bg-[#12B76A]",
    timeBarWidth: "70%",
    statusText: "In Progress",
    statusBadgeBg: "bg-[#EFF8FF]",
    statusBadgeText: "text-[#175CD3]",
  },
];

const thClass =
  "px-4 py-3 text-left text-sm font-semibold text-[#475467] first:pl-6 last:pr-6 border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

const ActiveTab = ({ renderTabNav }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Filter functionality based on search
  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return JOBS_DATA;
    return JOBS_DATA.filter(
      (j) =>
        j.serviceName.toLowerCase().includes(q) ||
        j.memberName.toLowerCase().includes(q) ||
        j.caregiverName.toLowerCase().includes(q) ||
        j.id.toLowerCase().includes(q) ||
        j.serviceId.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-6 overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


        <div className="relative w-full sm:max-w-[400px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#667085]" strokeWidth={2} />
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
            className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors hover:bg-gray-50 mb-0"
          >
            <RefreshCw size={16} className="shrink-0 text-[#667085]" strokeWidth={2.5} />
            <span className="truncate">Refresh</span>
          </button>
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors hover:bg-gray-50"
          >
            {/* <Filter size={16} className="shrink-0 text-[#667085]" strokeWidth={2.5} /> */}
            <Settings2 size={18} className="shrink-0 text-[#667085]" strokeWidth={2.5} />
            <span className="truncate">Filters</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                <p className="text-base font-medium text-[#101828]">
                  {kpi.title}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-semibold tracking-tight text-[#101828]">
                  {kpi.value}
                </span>
                <span className="text-sm font-medium text-[#667085]">
                  {kpi.subtitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area: Tabs + Table separate containers */}
      <div className="flex min-h-0 flex-col gap-5 overflow-hidden shrink">

        {/* Render Tab Navigation passed parent Layout */}
        <div className="shrink-0">
          {renderTabNav()}
        </div>

        {/* Table container */}
        <div className="min-h-0 overflow-auto rounded-xl border border-[#EAECF0] bg-white">
          <table className="w-full min-w-[1000px] border-collapse relative">
            <thead>
              <tr>
                <th className={thClass}>Service</th>
                <th className={thClass}>Member</th>
                <th className={thClass}>Caregiver (PSP)</th>
                <th className={thClass}>Start Time</th>
                <th className={thClass}>Time</th>
                <th className={thClass}>Status</th>
                <th className={`${thClass} w-[88px] text-center`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#F9FAFB]/50 transition-colors cursor-default">

                  {/* Service Column */}
                  <td className={tdClass}>
                    <p className="font-medium text-[#101828] mb-1">{job.serviceName}</p>
                    <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                      <span>JID: {job.serviceId}</span>
                      <span className="w-[3px] h-[3px] rounded-full bg-[#D0D5DD]"></span>
                      <span className="flex items-center gap-0.5">
                        <span className="text-[#98A2B3]">
                          <MapPin size={14} className="shrink-0" />
                        </span>

                        {job.location}
                      </span>
                    </div>
                  </td>

                  {/* Member Column */}
                  <td className={tdClass}>
                    <div className="flex items-center gap-2.5">
                      <img
                        src={job.memberAvatar}
                        alt=""
                        className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
                      />
                      <span className="font-medium text-[#344054]">{job.memberName}</span>
                    </div>
                  </td>

                  {/* Caregiver Column */}
                  <td className={tdClass}>
                    <div className="flex items-center gap-2.5">
                      <img
                        src={job.caregiverAvatar}
                        alt=""
                        className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
                      />
                      <span className="text-[#344054] underline decoration-[#D0D5DD] underline-offset-4">{job.caregiverName}</span>
                    </div>
                  </td>

                  {/* Start Time Column */}
                  <td className={tdClass}>
                    {job.startTime}
                  </td>

                  {/* Time Column (Elapsed) */}
                  <td className={tdClass}>
                    <div className="flex flex-col gap-1 w-28">
                      <div className="flex items-center gap-1.5 text-sm">
                        {job.isAlert ? (
                          <AlertTriangle size={14} className="text-[#F04438]" />
                        ) : null}
                        <span className={`font-semibold ${job.timeColor}`}>
                          {job.timeElapsed}
                        </span>
                        {job.timeSuffix && (
                          <span className="text-[#667085]">{job.timeSuffix}</span>
                        )}
                      </div>
                      {/* Bar indicator */}
                      <div className="h-1.5 w-full rounded-full bg-[#F2F4F7] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${job.timeBarColor}`}
                          style={{ width: job.timeBarWidth }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className={tdClass}>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${job.statusBadgeBg} ${job.statusBadgeText}`}>
                      {job.statusText}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-4 py-4 align-middle text-center first:pl-6 last:pr-6">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] transition-colors hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
                      aria-label="View Details"
                    >
                      <Eye size={16} strokeWidth={2} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter SideDrawer */}
      <SideSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filters"
        footer={
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              className="h-11 flex-1 rounded-lg bg-[#F04438] text-base font-medium text-white transition hover:bg-[#D92D20]"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-base font-medium text-[#344054] transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Territory
            </label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>Select Territory</option>
                <option value="Downtown">Downtown</option>
                <option value="Westside">Westside</option>
                <option value="Northside">Northside</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Services
            </label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>Select Services</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Doctor Visit">Doctor Visit</option>
                <option value="Grocery">Grocery</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Schedule Date
            </label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>MM-DD-YYYY ~ MM-DD-YYYY</option>
                <option value="All">All</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="This Week">This Week</option>
                <option value="Next 7 Days">Next 7 Days</option>
                <option value="Custom Range">Custom Range</option>
              </select>
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Status
            </label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>Select Verification Status</option>
                <option value="All">All</option>
                <option value="In Progress">In Progress</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Delayed">Delayed</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              PSP Types
            </label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>Select Category</option>
                <option value="All PSP">All PSP</option>
                <option value="Individual PSP">Individual PSP</option>
                <option value="Business PSP">Business PSP</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>
        </div>
      </SideSheet>

      <ActiveJobDetailSheet
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </div>
  );
};

export default ActiveTab;
