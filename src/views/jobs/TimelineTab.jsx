import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Filter,
  MapPin,
  Phone,
  RefreshCw,
  Search,
} from "lucide-react";
import SideSheet from "../../components/SideSheet";
import InterveneSideSheet from "./InterveneSideSheet";
import userProfile from "../../assets/userProfile.png";

/* ─────────────────────────────────────────────
   Dummy data
───────────────────────────────────────────── */
const TIMELINE_JOBS = [
  {
    id: "J001",
    date: "Feb 26, 2026",
    serviceName: "Grocery Trip Assistance",
    caregiverName: "Maria Santos",
    caregiverAvatar: userProfile,
    timeRange: "02:15 PM – 03:45 PM",
    duration: "1.5 hr",
    statusText: "Completed",
    statusType: "text",
    statusColor: "text-[#027A48]",
    member: { name: "Margaret Thompson", avatar: userProfile, address: "123 Oak Street, Apt 4B" },
    caregiver: { name: "Maria Santos", avatar: userProfile },
    events: [
      {
        time: "11:59 PM",
        title: "Booking Created",
        tag: "Admin Action",
        lines: ["Robert Brown created a request, Job details"],
        link: "View details",
        chip: null,
        gpsExtra: null,
        mapImg: false,
        avatar: null,
        isCritical: false,
      },
      {
        time: "02:01 PM",
        title: "PSP Assigned",
        tag: "Admin Action",
        lines: ["Robert Brown assigned Maria Santos."],
        link: null,
        chip: null,
        gpsExtra: null,
        mapImg: false,
        avatar: null,
        isCritical: false,
      },
      {
        time: "02:02 PM",
        title: "PSP Accepted",
        tag: null,
        lines: ["accepted the request"],
        link: null,
        chip: "Instant accept",
        gpsExtra: null,
        mapImg: false,
        avatar: userProfile,
        avatarName: "Maria Santos",
        isCritical: false,
      },
      {
        time: "02:10 PM",
        title: "PSP En Route",
        tag: null,
        lines: null,
        link: null,
        chip: "She was arrived in 6 mins.",
        gpsExtra: { bold: "GPS Logs", rest: " • 1.2 km away", line2: "ETA: 1 minutes in 6 mins" },
        mapImg: true,
        avatar: null,
        isCritical: false,
      },
      {
        time: "02:17 PM",
        title: "PSP Arrived",
        tag: null,
        lines: ["Arrived at 123 Oak Street on GPS"],
        link: null,
        chip: null,
        gpsExtra: null,
        mapImg: false,
        avatar: null,
        isCritical: false,
      },
      {
        time: "02:18 PM",
        title: "Service Started",
        tag: null,
        lines: ["checked in. Service started"],
        link: null,
        chip: null,
        gpsExtra: null,
        mapImg: false,
        avatar: userProfile,
        avatarName: "Maria Santos",
        isCritical: false,
      },
      {
        time: "02:18 PM",
        title: "Service Completed",
        tag: null,
        lines: ["Service completed by Maria Santos."],
        link: null,
        chip: null,
        gpsExtra: null,
        mapImg: false,
        avatar: null,
        isCritical: true,
      },
      {
        time: "03:45 PM",
        title: "Payment Processed",
        tag: "System Event",
        lines: ["Payment processed for $103.50"],
        link: null,
        chip: null,
        gpsExtra: null,
        mapImg: false,
        avatar: null,
        isCritical: false,
      },
    ],
  },
  {
    id: "J002",
    date: "Feb 26, 2026",
    serviceName: "Cleaning",
    caregiverName: "John Carter",
    caregiverAvatar: userProfile,
    timeRange: "03:00 PM – 06:30 PM",
    duration: "3 hr",
    statusText: "Completed",
    statusType: "text",
    statusColor: "text-[#027A48]",
    member: { name: "Robert Chen", avatar: userProfile, address: "45 Elm Ave, Suite 3" },
    caregiver: { name: "John Carter", avatar: userProfile },
    events: [
      { time: "10:00 AM", title: "Booking Created", tag: "Admin Action", lines: ["Admin created job."], link: "View details", chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "02:00 PM", title: "PSP Assigned", tag: "Admin Action", lines: ["John Carter assigned."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "03:00 PM", title: "Service Started", tag: null, lines: ["John Carter checked in."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: userProfile, avatarName: "John Carter", isCritical: false },
      { time: "06:30 PM", title: "Service Completed", tag: null, lines: ["Cleaning done successfully."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: true },
    ],
  },
  {
    id: "J003",
    date: "Mar 01, 2026",
    serviceName: "House Cleaning",
    caregiverName: "Lisa wong",
    caregiverAvatar: userProfile,
    timeRange: "09:00 AM – 10:00 PM",
    duration: "1 hr",
    statusText: "Rescheduled",
    statusType: "text",
    statusColor: "text-[#F79009]",
    member: { name: "Helen Parker", avatar: userProfile, address: "89 Pine St" },
    caregiver: { name: "Lisa Wong", avatar: userProfile },
    events: [
      { time: "08:00 AM", title: "Booking Created", tag: "Admin Action", lines: ["Member created request."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "08:30 AM", title: "PSP Assigned", tag: "Admin Action", lines: ["Lisa Wong assigned."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "09:00 AM", title: "Job Rescheduled", tag: "Admin Action", lines: ["Moved to next available slot."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: true },
    ],
  },
  {
    id: "J004",
    date: "Mar 02, 2026",
    serviceName: "Daily Care Assistance",
    caregiverName: "John Smith",
    caregiverAvatar: userProfile,
    timeRange: "10:00 AM – 10:30 PM",
    duration: "0.5 hr",
    statusText: "Delayed",
    statusType: "text",
    statusColor: "text-[#F04438]",
    member: { name: "Northside", avatar: userProfile, address: "12 Maple Blvd" },
    caregiver: { name: "John Smith", avatar: userProfile },
    events: [
      { time: "09:00 AM", title: "Booking Created", tag: "Admin Action", lines: ["Request created."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "09:30 AM", title: "PSP Assigned", tag: "Admin Action", lines: ["John Smith assigned."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "10:00 AM", title: "Delay Flagged", tag: "System Event", lines: ["Job is running 30 mins behind schedule."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: true },
    ],
  },
  {
    id: "J005",
    date: "Mar 02, 2026",
    serviceName: "Doctor Visit",
    caregiverName: "John Carter",
    caregiverAvatar: userProfile,
    timeRange: "10:00 AM – 12:00 PM",
    duration: "2 hr",
    statusText: "In Progress",
    statusType: "pill",
    statusColor: "bg-[#EFF8FF] text-[#175CD3]",
    member: { name: "Helen Parker", avatar: userProfile, address: "89 Pine St" },
    caregiver: { name: "John Carter", avatar: userProfile },
    events: [
      { time: "09:00 AM", title: "Booking Created", tag: "Admin Action", lines: ["Request submitted."], link: "View details", chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "09:20 AM", title: "PSP Assigned", tag: "Admin Action", lines: ["John Carter assigned."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "10:00 AM", title: "Service Started", tag: null, lines: ["Check-in confirmed."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: userProfile, avatarName: "John Carter", isCritical: false },
    ],
  },
  {
    id: "J006",
    date: "Mar 14, 2026",
    serviceName: "Meal Preparation",
    caregiverName: "Lisa wong",
    caregiverAvatar: userProfile,
    timeRange: "02:30 PM – 03:30 PM",
    duration: "1 hr",
    statusText: "Rescheduled",
    statusType: "text",
    statusColor: "text-[#F79009]",
    member: { name: "Margaret Thompson", avatar: userProfile, address: "123 Oak Street" },
    caregiver: { name: "Lisa Wong", avatar: userProfile },
    events: [
      { time: "01:00 PM", title: "Booking Created", tag: "Admin Action", lines: ["Meal prep request."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "02:00 PM", title: "Job Rescheduled", tag: "Admin Action", lines: ["Rescheduled by admin."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: true },
    ],
  },
  {
    id: "J007",
    date: "Mar 02, 2026",
    serviceName: "Grocery Trip Assistance",
    caregiverName: "Maria Santos",
    caregiverAvatar: userProfile,
    timeRange: "10:00 AM – 12:00 PM",
    duration: "2 hr",
    statusText: "In Progress",
    statusType: "pill",
    statusColor: "bg-[#EFF8FF] text-[#175CD3]",
    member: { name: "Robert Chen", avatar: userProfile, address: "45 Elm Ave" },
    caregiver: { name: "Maria Santos", avatar: userProfile },
    events: [
      { time: "09:30 AM", title: "Booking Created", tag: "Admin Action", lines: ["Grocery request submitted."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "09:45 AM", title: "PSP Assigned", tag: "Admin Action", lines: ["Maria Santos assigned."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "10:00 AM", title: "Service Started", tag: null, lines: ["Trip started."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
    ],
  },
  {
    id: "J008",
    date: "Mar 02, 2026",
    serviceName: "Doctor Visit",
    caregiverName: "John Carter",
    caregiverAvatar: userProfile,
    timeRange: "10:00 AM – 12:00 PM",
    duration: "2 hr",
    statusText: "In Progress",
    statusType: "pill",
    statusColor: "bg-[#EFF8FF] text-[#175CD3]",
    member: { name: "Helen Parker", avatar: userProfile, address: "89 Pine St" },
    caregiver: { name: "John Carter", avatar: userProfile },
    events: [
      { time: "09:00 AM", title: "Booking Created", tag: "Admin Action", lines: ["Visit requested."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
      { time: "10:00 AM", title: "Service Started", tag: null, lines: ["Doctor visit started."], link: null, chip: null, gpsExtra: null, mapImg: false, avatar: null, isCritical: false },
    ],
  },
];

/* ─────────────────────────────────────────────
   GPS Map Placeholder
───────────────────────────────────────────── */
const MapPlaceholder = () => (
  <div className="h-[90px] w-[160px] shrink-0 overflow-hidden rounded-lg border border-[#EAECF0] bg-[#E8EDF3]">
    <div className="relative h-full w-full">
      {/* road lines */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[40%] left-0 right-0 h-[2px] bg-white rotate-[5deg]" />
        <div className="absolute top-[55%] left-0 right-0 h-[2px] bg-white rotate-[-8deg]" />
        <div className="absolute left-[45%] top-0 bottom-0 w-[2px] bg-white rotate-[10deg]" />
      </div>
      {/* pin */}
      <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="flex size-5 items-center justify-center rounded-full bg-[#F04438] shadow-md">
          <MapPin size={11} className="text-white" />
        </div>
        <div className="h-1.5 w-0.5 bg-[#F04438]" />
      </div>
      {/* label */}
      <div className="absolute bottom-1 right-1 rounded bg-white/70 px-1 py-0.5 text-[8px] font-medium text-[#344054]">
        Sunnybrook Health
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Timeline Event Row
───────────────────────────────────────────── */
const TimelineEvent = ({ event, isLast }) => (
  <div className="flex gap-0">
    {/* Left: dot + dashed line */}
    <div className="flex flex-col items-center mr-4 shrink-0">
      <div className="flex size-5 items-center justify-center shrink-0">
        <div className="size-3 rounded-full border-2 border-[#F04438] bg-white" />
      </div>
      {!isLast && (
        <div className="mt-1 w-0 flex-1 border-l-2 border-dashed border-[#D0D5DD] mb-0" style={{ minHeight: 40 }} />
      )}
    </div>

    {/* Right: content */}
    <div className="min-w-0 flex-1 pb-8">
      {/* Title row */}
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-sm font-semibold text-[#344054] shrink-0 min-w-[72px]">
          {event.time}
        </span>
        <span className={`text-sm font-semibold ${event.isCritical ? "text-[#12B76A]" : "text-[#101828]"}`}>
          {event.title}
        </span>
        {event.tag && (
          <span className="text-sm text-[#667085]">[{event.tag}]</span>
        )}
      </div>

      {/* GPS lines */}
      {event.gpsExtra && (
        <div className="mt-1 flex items-start gap-4">
          <div className="space-y-0.5">
            <p className="text-sm text-[#475467]">
              <span className="font-semibold underline underline-offset-2 cursor-pointer hover:text-[#F04438]">
                {event.gpsExtra.bold}
              </span>
              {event.gpsExtra.rest}
            </p>
            <p className="text-sm text-[#475467]">{event.gpsExtra.line2}</p>
            {event.chip && (
              <span className="mt-1 inline-flex items-center rounded-full bg-[#F2F4F7] px-2.5 py-0.5 text-xs font-medium text-[#344054]">
                {event.chip}
              </span>
            )}
          </div>
          {event.mapImg && <MapPlaceholder />}
        </div>
      )}

      {/* Avatar + inline name line (PSP Accepted / Service Started style) */}
      {event.avatar && event.lines && (
        <div className="mt-1 flex items-center gap-1.5">
          <img src={event.avatar} alt="" className="size-5 rounded-full object-cover ring-1 ring-[#EAECF0]" />
          <p className="text-sm text-[#475467]">
            <span className="font-medium text-[#344054] underline underline-offset-2 cursor-pointer hover:text-[#F04438] mr-1">
              {event.avatarName}
            </span>
            {event.lines[0]}
          </p>
        </div>
      )}

      {/* Plain lines (no avatar) */}
      {!event.avatar && event.lines && event.lines.map((line, i) => (
        <p key={i} className="mt-1 text-sm text-[#475467]">{line}</p>
      ))}

      {/* View details link */}
      {event.link && (
        <button
          type="button"
          className="mt-1 text-sm font-bold text-[#101828] underline underline-offset-2 hover:text-[#F04438] transition-colors"
        >
          {event.link}
        </button>
      )}

      {/* Chip (non-GPS) */}
      {event.chip && !event.gpsExtra && (
        <span className="mt-1.5 inline-flex items-center rounded-full bg-[#F2F4F7] px-2.5 py-0.5 text-xs font-medium text-[#344054]">
          {event.chip}
        </span>
      )}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Job List Card
───────────────────────────────────────────── */
const JobListCard = ({ job, isSelected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full border-b border-[#EAECF0] px-5 py-4 text-left transition-colors ${
      isSelected
        ? "border-l-[3px] border-l-[#F04438] bg-[#FEF3F2]/30"
        : "border-l-[3px] border-l-transparent bg-white hover:bg-gray-50"
    }`}
  >
    <div className="flex items-start gap-4">
      {/* ID + date */}
      <div className="flex w-[80px] shrink-0 flex-col">
        <span className="text-sm font-bold text-[#344054]">{job.id}</span>
        <span className="mt-0.5 text-xs text-[#667085]">{job.date}</span>
      </div>

      {/* Service info */}
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-semibold text-[#101828]">{job.serviceName}</p>
        <div className="flex items-center gap-1.5">
          <img src={job.caregiverAvatar} alt="" className="size-[18px] rounded-full object-cover ring-1 ring-[#EAECF0]" />
          <span className="text-xs font-medium text-[#175CD3] underline underline-offset-2">{job.caregiverName}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#667085]">
          <Clock size={11} className="shrink-0 text-[#98A2B3]" />
          <span>{job.timeRange}</span>
          <span className="text-[#D0D5DD] mx-0.5">|</span>
          <span>{job.duration}</span>
        </div>
      </div>

      {/* Status */}
      <div className="shrink-0 self-start pt-0.5">
        {job.statusType === "pill" ? (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${job.statusColor}`}>
            {job.statusText}
          </span>
        ) : (
          <span className={`text-xs font-semibold ${job.statusColor}`}>
            {job.statusText}
          </span>
        )}
      </div>
    </div>
  </button>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const TimelineTab = ({ renderTabNav }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isInterveneOpen, setIsInterveneOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(TIMELINE_JOBS[0].id);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TIMELINE_JOBS;
    return TIMELINE_JOBS.filter(
      (j) =>
        j.serviceName.toLowerCase().includes(q) ||
        j.caregiverName.toLowerCase().includes(q) ||
        j.id.toLowerCase().includes(q)
    );
  }, [query]);

  const selectedJob = useMemo(
    () => TIMELINE_JOBS.find((j) => j.id === selectedJobId) ?? TIMELINE_JOBS[0],
    [selectedJobId]
  );

  return (
    <div className="flex flex-col gap-6 h-full min-h-0">

      {/* ── Header Controls ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div className="relative w-full sm:max-w-[400px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#667085]" strokeWidth={2} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setSearchParams(v ? { q: v } : {}, { replace: true });
            }}
            placeholder="Search by Job ID, Member, PSP"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#667085] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button type="button" className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} className="text-[#667085]" strokeWidth={2.5} />
            Refresh
          </button>
          <button type="button" onClick={() => setIsFilterSheetOpen(true)} className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors">
            <Filter size={16} className="text-[#667085]" strokeWidth={2.5} />
            Filters
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden">

        {/* Tab Nav */}
        <div className="flex gap-6 rounded-xl border border-[#EAECF0] bg-white px-4 sm:px-6 pt-3 shrink-0 overflow-x-auto scrollbar-hide">
          {renderTabNav()}
        </div>

        {/* 40/60 Split */}
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row gap-5 overflow-hidden">
<div className="flex lg:w-[40%] shrink-0 flex-col overflow-hidden rounded-xl border border-[#EAECF0] bg-white h-[350px] lg:h-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#EAECF0] px-5 py-3.5 shrink-0">
              <h3 className="text-sm font-bold text-[#101828]">Job list</h3>
              <span className="text-xs text-[#667085]">Last updated: 30 min ago</span>
            </div>
            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto">
              {filteredJobs.length === 0 ? (
                <p className="py-10 text-center text-sm text-[#667085]">No jobs found.</p>
              ) : (
                filteredJobs.map((job) => (
                  <JobListCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJobId === job.id}
                    onClick={() => setSelectedJobId(job.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* ── RIGHT 60%: Timeline Detail ── */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#EAECF0] bg-white">
            {selectedJob && (
              <>
                {/* Detail header */}
                <div className="flex items-center justify-between border-b border-[#EAECF0] px-6 py-4 shrink-0">
                  <h2 className="text-lg font-bold text-[#101828]">
                    {selectedJob.id}
                    <span className="font-normal text-[#D0D5DD] mx-2">•</span>
                    {selectedJob.serviceName}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsInterveneOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#F04438] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#D92D20] transition-colors"
                  >
                    <Phone size={15} strokeWidth={2} />
                    Intervene
                  </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">

                  {/* Member + Service Provider */}
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-2.5 text-sm font-semibold text-[#344054]">Member</p>
                      <div className="flex items-start gap-2.5">
                        <img src={selectedJob.member.avatar} alt="" className="size-9 rounded-full object-cover ring-1 ring-[#EAECF0] shrink-0" />
                        <div>
                          <button type="button" className="text-sm font-semibold text-[#101828] underline underline-offset-2 hover:text-[#F04438] transition-colors">
                            {selectedJob.member.name}
                          </button>
                          <div className="mt-0.5 flex items-start gap-1 text-xs text-[#667085]">
                            <MapPin size={11} className="mt-0.5 shrink-0" />
                            <span>{selectedJob.member.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2.5 text-sm font-semibold text-[#344054]">Service Provide</p>
                      <div className="flex items-start gap-2.5">
                        <img src={selectedJob.caregiver.avatar} alt="" className="size-9 rounded-full object-cover ring-1 ring-[#EAECF0] shrink-0" />
                        <div className="mt-1">
                          <button type="button" className="text-sm font-semibold text-[#101828] underline underline-offset-2 hover:text-[#F04438] transition-colors">
                            {selectedJob.caregiver.name}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Events */}
                  <div>
                    {selectedJob.events.map((evt, idx) => (
                      <TimelineEvent
                        key={idx}
                        event={evt}
                        isLast={idx === selectedJob.events.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* ── Filter SideSheet ── */}
      <SideSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filters"
        footer={
          <div className="flex gap-3">
            <button type="button" onClick={() => setIsFilterSheetOpen(false)} className="h-11 flex-1 rounded-lg bg-[#F04438] text-base font-medium text-white hover:bg-[#D92D20] transition">Apply</button>
            <button type="button" onClick={() => setIsFilterSheetOpen(false)} className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-base font-medium text-[#344054] hover:bg-gray-50 transition">Cancel</button>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Services */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Services</label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>Select Services</option>
                <option>Cleaning</option>
                <option>Doctor Visit</option>
                <option>Grocery</option>
                <option>Meal Preparation</option>
                <option>Daily Care Assistance</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Schedule Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Schedule Date</label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
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

          {/* PSP Assignment */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">PSP Assignment</label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>Select PSP assignment</option>
                <option>All</option>
                <option>PSP Individual</option>
                <option>PSP Business</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Status</label>
            <div className="relative">
              <select defaultValue="" className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438] cursor-pointer">
                <option value="" disabled hidden>Select Status</option>
                <option>All</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Delayed</option>
                <option>Cancelled</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>
        </div>
      </SideSheet>

      {/* Intervene Drawer */}
      <InterveneSideSheet
        isOpen={isInterveneOpen}
        onClose={() => setIsInterveneOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default TimelineTab;
