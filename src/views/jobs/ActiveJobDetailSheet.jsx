import React from "react";
import {
  X,
  User,
  Calendar,
  Clock,
  MessageCircleMore,
  Phone,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import SideSheet from "../../components/SideSheet";
import userProfile from "../../assets/userProfile.png";

const TIMELINE_EVENTS = [
  {
    time: "02:30 PM", date: "Mar 10, 2026",
    title: "Booking Created",
    desc: null, avatar: null, actorName: null,
    isCancelled: false,
  },
  {
    time: "02:35 PM", date: "Mar 10, 2026",
    title: "PSP Assigned",
    desc: "assigned Maria Santos.",
    avatar: userProfile, actorName: "Robert Brown",
    isCancelled: false,
  },
  {
    time: "02:36 PM", date: "Mar 10, 2026",
    title: "PSP Accepted",
    desc: "accepted the request",
    avatar: userProfile, actorName: "Maria Santos",
    isCancelled: false,
  },
  {
    time: "09:00 AM", date: "Mar 12, 2026",
    title: "Service Started",
    desc: "checked in. Service started",
    avatar: userProfile, actorName: "Maria Santos",
    isCancelled: false,
  },
];


/**
 * Reusable primitive components for consistent styling
 */
const Section = ({ title, children, className = "" }) => (
  <div className={`mb-8 ${className}`}>
    <h3 className="text-base font-bold text-[#101828] mb-4">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const DetailRow = ({ label, value, icon: Icon, valueClass = "text-[#344054]" }) => (
  <div className="flex items-start gap-3">
    {Icon && <Icon size={18} className="mt-0.5 shrink-0 text-[#667085]" />}
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-[#667085]">{label}</p>
      <div className={`mt-0.5 text-sm truncate ${valueClass}`}>
        {value}
      </div>
    </div>
  </div>
);

const InfoCard = ({ image, name, subtitle, id, type }) => (
  <div className="flex items-center gap-3 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] p-3 transition-all hover:border-[#D0D5DD]">
    <div className="relative">
      <img
        src={image}
        alt={name}
        className="size-12 rounded-full border border-white object-cover shadow-sm bg-white"
      />
      <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-[#12B76A] text-white">
        <User size={10} strokeWidth={3} />
      </div>
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wider text-[#667085]">
          {type}
        </p>
        <span className="text-[10px] font-bold text-[#98A2B3]">{id}</span>
      </div>
      <p className="truncate text-sm font-bold text-[#101828]">{name}</p>
      <p className="truncate text-xs text-[#667085]">{subtitle}</p>
    </div>
    <button className="flex size-8 items-center justify-center rounded-lg text-[#98A2B3] transition-colors hover:bg-white hover:text-[#667085] hover:shadow-sm">
      <ChevronRight size={18} />
    </button>
  </div>
);

const Badge = ({ children, variant = "blue" }) => {
  const variants = {
    blue: "bg-[#EFF8FF] text-[#175CD3]",
    green: "bg-[#ECFDF3] text-[#027A48]",
    amber: "bg-[#FFFAEB] text-[#B54708]",
    red: "bg-[#FEF3F2] text-[#B42318]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

const ActiveJobDetailSheet = ({ isOpen, onClose, job }) => {
  if (!job) return null;

  const isDelayed = job.statusText === "Delay";


  /* ─────────────────────────────────────────────
     Timeline event row — proper alignment
  ───────────────────────────────────────────── */
  const DetailTimelineEvent = ({ event, isLast }) => (
    <div className="flex">
      {/* ── Left col: fixed-width dot + dashed connector ── */}
      <div
        className="flex shrink-0 flex-col items-center"
        style={{ width: 20, marginRight: 12 }}
      >
        <div
          className="shrink-0 rounded-full border-2 border-[#F04438] bg-white"
          style={{ width: 10, height: 10, marginTop: 4 }}
        />
        {!isLast && (
          <div
            className="mt-1 flex-1"
            style={{ width: 0, borderLeft: "2px dashed #F7C1C1", minHeight: 32 }}
          />
        )}
      </div>

      {/* ── Right col: all content ── */}
      <div className="min-w-0 flex items-start pb-4">
        <div className="flex flex-col items-center mr-4 shrink-0">
          {/* <span className="text-sm font-semibold text-[#344054] shrink-0 min-w-[72px]">
                {event.time}
              </span> */}
          <span className="text-sm font-semibold text-[#344054] shrink-0">{event.time}</span>
        </div>

        <div className="flex flex-col gap-0.5">
          {/* Time + Date on the same row */}
          <div className="mb-1 flex items-baseline gap-3">
            <span className="text-xs text-[#667085]">{event.date}</span>
          </div>

          {/* Title */}
          <p className={`mb-1 text-sm font-semibold ${event.isCancelled ? "text-[#F04438]" : "text-[#101828]"
            }`}>
            {event.title}
          </p>

          {/* Plain description */}
          {!event.avatar && event.desc && (
            <p className="text-sm text-[#475467]">{event.desc}</p>
          )}

          {/* Avatar + person description */}
          {event.avatar && event.desc && (
            <div className="flex items-center gap-1.5">
              <img
                src={event.avatar}
                alt=""
                className="size-5 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
              />
              <p className="text-sm text-[#475467]">
                <span className="mr-1 font-semibold text-[#344054] underline underline-offset-2">
                  {event.actorName}
                </span>
                {event.desc}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );


  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-[#101828]">Job Details</span>
          <Badge variant={isDelayed ? "amber" : "blue"}>{job.id}</Badge>
        </div>
      }
      widthClass="w-full sm:w-[500px]"
      footer={


        <div className="flex  gap-3 sm:flex-row">
          <button
            onClick={onClose}
            className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-base font-bold text-[#344054] shadow-sm transition-all hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => { }}
            className="h-11 flex-1 rounded-lg bg-[#F04438] text-base font-bold text-white shadow-sm transition-all hover:bg-[#D92D20]"
          >
            Escalate Issue
          </button>
        </div>
      }
    >
      <div className="flex h-full flex-col overflow-y-auto pr-1">

        {/* Status Alert for Delays */}
        {isDelayed && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#FEE4E2] bg-[#FEF3F2] p-4 text-[#B42318]">
            <AlertTriangle size={20} className="shrink-0" />
            <div>
              <p className="text-sm font-bold">Job is currently delayed</p>
              <p className="mt-0.5 text-xs">The caregiver (PSP) is behind schedule. Consider reaching out to them.</p>
            </div>
          </div>
        )}

        {/* 1. People Involved Section */}
        <Section title="Participants">
          <div className="space-y-1.5">
            <InfoCard
              type="Member"
              name={job.memberName}
              subtitle="Emergency Contact: +1 (555) 0123"
              id="M-8821"
              image={job.memberAvatar}
            />
            <div className="flex justify-center relative z-10">
              <div className="h-4 w-px bg-[#EAECF0]" />
            </div>
            <InfoCard
              type="Caregiver (PSP)"
              name={job.caregiverName}
              subtitle="Hired via: Individual Agency"
              id="P-1052"
              image={job.caregiverAvatar}
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm font-semibold text-[#344054] shadow-sm transition-colors hover:bg-gray-50">
              <Phone size={16} />
              Call PSP
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm font-semibold text-[#344054] shadow-sm transition-colors hover:bg-gray-50">
              <MessageCircleMore size={16} />
              Message Member
            </button>
          </div>
        </Section>

        <div className="mb-8 border-t border-[#F2F4F7]" />

        {/* 2. Service & Location */}
        <Section title="Job Particulars">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-y-6">
            <DetailRow
              label="Service"
              value={job.serviceName}

            />
            <DetailRow
              label="Service ID"
              value={job.serviceId}

            />
            <DetailRow
              label="Location"
              value={job.location}

            />
            <DetailRow
              label="Status"
              value={job.statusText}

              valueClass={isDelayed ? "text-[#B54708]" : "text-[#175CD3]"}
            />
            <div className="col-span-2">
              <DetailRow
                label="Service Address"
                value="123 Oak Street, Suite 402, Downtown, CA 90210"

              />
            </div>
          </div>
        </Section>

        <div className="mb-8 border-t border-[#F2F4F7]" />

        {/* 3. Schedule & Time */}
        <Section title="Schedule Details">
          <div className="rounded-xl bg-[#F9FAFB] p-4">
            <div className="mb-4 flex items-center justify-between border-b border-[#EAECF0] pb-4">
              <div className="flex items-center gap-2 font-semibold text-[#101828]">
                <Calendar size={18} className="text-[#667085]" />
                <span>Today, Mar 12</span>
              </div>
              <Badge variant="green">Confirmed</Badge>
            </div>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-white border border-[#EAECF0] shadow-sm text-[#12B76A]">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#98A2B3]">Start</p>
                  <p className="text-sm font-semibold text-[#101828]">02:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-white border border-[#EAECF0] shadow-sm text-[#667085]">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#98A2B3]">End (Est)</p>
                  <p className="text-sm font-semibold text-[#101828]">04:00 PM</p>
                </div>
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-[#344054]">Service Progress</p>
                <p className={`text-xs font-bold ${job.timeColor}`}>
                  {job.timeElapsed} {job.timeSuffix}
                </p>
              </div>
              <div className="h-2 w-full rounded-full bg-[#EAECF0] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${job.timeBarColor}`}
                  style={{ width: job.timeBarWidth }}
                />
              </div>
            </div>
          </div>
        </Section>

        <div className="mb-8 border-t border-[#F2F4F7]" />

        {/* 4. Payment Info */}
        <Section title="Financials">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
            <DetailRow
              label="Total Amount"
              value="$85.00"

            />
            <DetailRow
              label="Payment Mode"
              value="Credit Card"

            />
            <DetailRow
              label="PSP Earning"
              value="$64.50"

            />
            <DetailRow
              label="Admin Fee"
              value="$20.50"

            />
          </div>
        </Section>

        <div className="mb-8 border-t border-[#F2F4F7]" />



        {/* 5. Timeline History Snapshot */}
        <Section title="Recent Timeline">

          {/* Timeline Events */}

          <div>
            {TIMELINE_EVENTS.map((evt, idx) => (
              <DetailTimelineEvent
                key={idx}
                event={evt}
                isLast={idx === TIMELINE_EVENTS.length - 1}
              />
            ))}
          </div>

          {/* 
          <button className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#F04438] hover:underline">
            <History size={14} />
            View Full Timeline Detail
          </button> */}
        </Section>

      </div>
    </SideSheet>
  );
};

export default ActiveJobDetailSheet;
