import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Clock,
  Eye,
  Settings2,
  RefreshCw,
  Search,
  MoreHorizontal,
  PenSquare,
  XCircle, MapPin
} from "lucide-react";
import userProfile from "../../assets/userProfile.png";
import SideSheet from "../../components/SideSheet";
import UpcomingJobDetailSheet from "./UpcomingJobDetailSheet";

const UPCOMING_KPI_DATA = [
  {
    title: "Total Upcoming Jobs",
    value: "8",
    subtitle: "scheduled for today",
    icon: <Briefcase className="text-[#12B76A]" size={20} />,
    iconBg: "bg-[#ECFDF3]",
  },
  {
    title: "Unassigned",
    value: "2",
    subtitle: "at risk of No-show",
    icon: <Clock className="text-[#F79009]" size={20} />,
    iconBg: "bg-[#FFFAEB]",
  },
  {
    title: "Risk Jobs",
    value: "1",
    subtitle: "Urgent issue raised",
    icon: <AlertTriangle className="text-[#F04438]" size={20} />,
    iconBg: "bg-[#FEF3F2]",
  },
];

const UPCOMING_JOBS_DATA = [
  {
    id: "J001",
    serviceId: "S001",
    serviceName: "Grocery Trip Assistance",
    location: "Downtown",
    memberName: "Margaret Thompson",
    memberAvatar: userProfile,
    caregiverName: "Maria Santos",
    caregiverAvatar: userProfile,
    statusText: "Scheduled",
    statusBadgeBg: "bg-transparent",
    statusBadgeText: "text-[#F79009] font-medium px-0",
    scheduledDate: "Today",
    durationHrs: "1.5 hr",
    durationTime: "02:15 PM - 03:45 PM"
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
    statusText: "Scheduled",
    statusBadgeBg: "bg-transparent",
    statusBadgeText: "text-[#F79009] font-medium px-0",
    scheduledDate: "Today",
    durationHrs: "2 hr",
    durationTime: "10:00 AM - 12:00 PM"
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
    statusText: "Scheduled",
    statusBadgeBg: "bg-transparent",
    statusBadgeText: "text-[#F79009] font-medium px-0",
    scheduledDate: "Tomorrow",
    durationHrs: "3.5 hr",
    durationTime: "03:00 PM - 06:30 PM"
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
    statusText: "Scheduled",
    statusBadgeBg: "bg-transparent",
    statusBadgeText: "text-[#F79009] font-medium px-0",
    scheduledDate: "Mar 26, 2026",
    durationHrs: "1 hr",
    durationTime: "09:00 AM - 10:00 PM"
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
    statusText: "No PSP Assigned",
    statusBadgeBg: "bg-[#FEF3F2]",
    statusBadgeText: "text-[#F04438] font-medium",
    scheduledDate: "Feb 14, 2026",
    durationHrs: "0.5 hr",
    durationTime: "10:00 AM - 10:30 PM"
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
    statusText: "Scheduled",
    statusBadgeBg: "bg-transparent",
    statusBadgeText: "text-[#F79009] font-medium px-0",
    scheduledDate: "Jan 21, 2026",
    durationHrs: "2 hr",
    durationTime: "10:00 AM - 12:00 PM"
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
    statusText: "Rescheduled",
    statusBadgeBg: "bg-[#F2F4F7]",
    statusBadgeText: "text-[#344054] font-medium",
    scheduledDate: "Feb 26, 2026",
    durationHrs: "3.5 hr",
    durationTime: "03:00 PM - 06:30 PM"
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
    statusText: "Scheduled",
    statusBadgeBg: "bg-transparent",
    statusBadgeText: "text-[#F79009] font-medium px-0",
    scheduledDate: "Jan 03, 2026",
    durationHrs: "1 hr",
    durationTime: "09:00 AM - 10:00 PM"
  },
];

const thClass =
  "px-4 py-3 text-left text-sm font-semibold text-[#475467] first:pl-6 last:pr-6 border-b border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]";
const tdClass =
  "px-4 py-4 align-middle text-sm text-[#475467] first:pl-6 last:pr-6 whitespace-nowrap";

const ActionMenu = ({ onAssign, onReschedule, onReject }) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-[180px] z-50 rounded-lg border border-[#EAECF0] bg-white p-1.5 shadow-lg">
      <button
        onClick={onAssign}
        className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-[#344054] transition-colors hover:bg-[#F9FAFB]"
      >
        <PenSquare size={16} className="text-[#667085]" />
        Assign PSP
      </button>
      <button
        onClick={onReschedule}
        className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-[#344054] transition-colors hover:bg-[#F9FAFB]"
      >
        <Clock size={16} className="text-[#667085]" />
        Reschedule
      </button>
      <button
        onClick={onReject}
        className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-[#344054] transition-colors hover:bg-[#F9FAFB]"
      >
        <XCircle size={16} className="text-[#667085]" />
        Reject
      </button>
    </div>
  );
};

const UpcomingTab = ({ renderTabNav }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const menuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter functionality based on search
  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return UPCOMING_JOBS_DATA;
    return UPCOMING_JOBS_DATA.filter(
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
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#667085]"
            aria-hidden
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
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#667085] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
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
            <Settings2 size={18} className="shrink-0 text-[#667085]" strokeWidth={2.5} />
            <span className="truncate">Filters</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {UPCOMING_KPI_DATA.map((kpi, index) => (
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
        <div className="min-h-0 overflow-auto rounded-xl border border-[#EAECF0] bg-white pb-[100px]">
          <table className="w-full min-w-[1000px] border-collapse relative">
            <thead>
              <tr>
                <th className={thClass}>Service</th>
                <th className={thClass}>Member</th>
                <th className={thClass}>Caregiver (PSP)</th>
                <th className={thClass}>Status</th>
                <th className={thClass}>Scheduled Date</th>
                <th className={thClass}>Duration</th>
                <th className={`${thClass} w-[100px] text-center`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#F9FAFB]/50 transition-colors">

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
                    {job.caregiverAvatar ? (
                      <div className="flex items-center gap-2.5">
                        <img
                          src={job.caregiverAvatar}
                          alt=""
                          className="size-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
                        />
                        <span className="text-[#344054] underline decoration-[#D0D5DD] underline-offset-4">{job.caregiverName}</span>
                      </div>
                    ) : (
                      <span className="text-[#667085]">{job.caregiverName}</span>
                    )}
                  </td>

                  {/* Status Column */}
                  <td className={tdClass}>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${job.statusBadgeBg} ${job.statusBadgeText}`}>
                      {job.statusText}
                    </span>
                  </td>

                  {/* Scheduled Date Column */}
                  <td className={tdClass}>
                    {job.scheduledDate}
                  </td>

                  {/* Duration Column */}
                  <td className={tdClass}>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-[#344054]">{job.durationHrs}</span>
                      <span className="text-xs text-[#667085]">{job.durationTime}</span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-4 py-4 align-middle text-center first:pl-6 last:pr-6">
                    <div className="relative flex items-center justify-center gap-2" ref={openMenuId === job.id ? menuRef : null}>
                      <button
                        type="button"
                        onClick={() => setSelectedJob(job)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] transition-colors hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
                        aria-label="View Details"
                      >
                        <Eye size={16} strokeWidth={2} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] transition-colors hover:bg-gray-50 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
                        aria-label="More actions"
                      >
                        <MoreHorizontal size={16} strokeWidth={2} />
                      </button>

                      {openMenuId === job.id && (
                        <ActionMenu
                          onAssign={() => { console.log(`Assign PSP requested for ${job.id}`); setOpenMenuId(null); }}
                          onReschedule={() => { console.log(`Reschedule requested for ${job.id}`); setOpenMenuId(null); }}
                          onReject={() => { console.log(`Reject requested for ${job.id}`); setOpenMenuId(null); }}
                        />
                      )}
                    </div>
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
              PSP Assignment
            </label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>Select PSP assignment</option>
                <option value="All">All</option>
                <option value="Assigned">Assigned</option>
                <option value="Unassigned">Unassigned</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Status
            </label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>Select Status</option>
                <option value="All">All</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Rescheduled">Rescheduled</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

        </div>
      </SideSheet>

      <UpcomingJobDetailSheet
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </div>
  );
};

export default UpcomingTab;
