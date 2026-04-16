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
  ShieldCheck,
  UserPlus
} from "lucide-react";
import SideSheet from "../../components/SideSheet";

/**
 * Reusable primitive components for consistent styling (matching ActiveJobDetailSheet)
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
    {Icon && <Icon size={18} className="mt-0.5 shrink-0 text-[#333]" />}
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-[#667085]">{label}</p>
      <div className={`mt-0.5 text-sm truncate ${valueClass}`}>
        {value}
      </div>
    </div>
  </div>
);

const InfoCard = ({ image, name, subtitle, id, type, isUnassigned }) => (
  <div className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${isUnassigned ? "border-dashed border-[#F04438] bg-[#FEF3F2]" : "border-[#EAECF0] bg-[#F9FAFB] hover:border-[#D0D5DD]"
    }`}>
    <div className="relative">
      {image ? (
        <img
          src={image}
          alt={name}
          className="size-12 rounded-full border border-white object-cover shadow-sm bg-white"
        />
      ) : (
        <div className={`flex size-12 items-center justify-center rounded-full border border-white shadow-sm ${isUnassigned ? "bg-[#FEE4E2] text-[#F04438]" : "bg-white text-[#98A2B3]"}`}>
          <User size={24} />
        </div>
      )}
      {!isUnassigned && (
        <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-[#12B76A] text-white">
          <ShieldCheck size={10} strokeWidth={3} />
        </div>
      )}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold  tracking-wider text-[#333]">
          {type}
        </p>
        <span className="text-[10px] font-bold text-[#98A2B3]">{id}</span>
      </div>
      <p className={`truncate text-sm font-bold ${isUnassigned ? "text-[#D92D20]" : "text-[#101828]"}`}>
        {name}
      </p>
      <p className="truncate text-xs text-[#667085]">{subtitle}</p>
    </div>
    {!isUnassigned && (
      <button className="flex size-8 items-center justify-center rounded-lg text-[#98A2B3] transition-colors hover:bg-white hover:text-[#667085] hover:shadow-sm">
        <ChevronRight size={18} />
      </button>
    )}
  </div>
);

const Badge = ({ children, variant = "orange" }) => {
  const variants = {
    blue: "bg-[#EFF8FF] text-[#175CD3]",
    green: "bg-[#ECFDF3] text-[#027A48]",
    orange: "bg-[#FFF4ED] text-[#B93815]",
    red: "bg-[#FEF3F2] text-[#B42318]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

const UpcomingJobDetailSheet = ({ isOpen, onClose, job }) => {
  if (!job) return null;

  const isUnassigned = job.caregiverName === "-";

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-[#101828]">Upcoming Job Details</span>
          <Badge variant={isUnassigned ? "red" : "orange"}>{job.id}</Badge>
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
            Cancel Job
          </button>
        </div>
      }
    >
      <div className="flex h-full flex-col overflow-y-auto pr-1">

        {/* Urgent Alert for Unassigned Jobs */}
        {isUnassigned && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#FEE4E2] bg-[#FEF3F2] p-4 text-[#B42318]">
            <AlertTriangle size={20} className="shrink-0" />
            <div>
              <p className="text-sm font-bold">PSP Not Assigned</p>
              <p className="mt-0.5 text-xs">This job is scheduled for {job.scheduledDate} but no caregiver has been assigned yet. High priority action required.</p>
              <button className="mt-3 flex items-center gap-2 rounded-lg bg-[#F04438] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#D92D20]">
                <UserPlus size={14} />
                Assign Now
              </button>
            </div>
          </div>
        )}

        {/* 1. People Involved Section */}
        <Section title="Participants">
          <div className="space-y-1.5">
            <InfoCard
              type="Member"
              name={job.memberName}
              subtitle="Member since Jan 2024"
              id="M-9021"
              image={job.memberAvatar}
            />
            <div className="flex justify-center relative z-10">
              <div className="h-4 w-px bg-[#EAECF0]" />
            </div>
            {isUnassigned ? (
              <InfoCard
                type="Caregiver (PSP)"
                name="Awaiting Assignment"
                subtitle="Marketplace request sent"
                id="P-PENDING"
                isUnassigned
              />
            ) : (
              <InfoCard
                type="Caregiver (PSP)"
                name={job.caregiverName}
                subtitle="Rating: 4.8 | 240+ Jobs"
                id="P-1052"
                image={job.caregiverAvatar}
              />
            )}
          </div>

          {!isUnassigned && (
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
          )}
        </Section>

        <div className="mb-8 border-t border-[#F2F4F7]" />

        {/* 2. Service & Location */}
        <Section title="Job Details">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-y-6">
            <DetailRow
              label="Service Type"
              value={job.serviceName}

            />
            <DetailRow
              label="Service ID"
              value={job.serviceId}

            />
            <DetailRow
              label="Territory"
              value={job.location}

            />
            <DetailRow
              label="Job Status"
              value={job.statusText}

              valueClass="text-[#B93815]"
            />
            <div className="col-span-2">
              <DetailRow
                label="Service Location"
                value="452 Maple Ave, Northside, CA 90211"

              />
            </div>
          </div>
        </Section>

        <div className="mb-8 border-t border-[#F2F4F7]" />

        {/* 3. Schedule Information */}
        <Section title="Schedule">
          <div className="rounded-xl bg-[#F9FAFB] p-5 border border-[#EAECF0]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-white border border-[#EAECF0] shadow-sm text-[#F04438]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#667085]  tracking-wide">Job Date</p>
                  <p className="text-sm font-semibold text-[#344054]">{job.scheduledDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[#667085]  tracking-wide">Total Time</p>
                <p className="text-sm font-semibold text-[#344054]">{job.durationHrs}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#EAECF0]">
              <Clock size={18} className="text-[#333]" />
              <span className="text-sm font-semibold text-[#344054]">{job.durationTime}</span>
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white py-2.5 text-sm font-bold text-[#344054] shadow-sm transition-colors hover:bg-gray-50">
            <Clock size={16} />
            Reschedule Job
          </button>
        </Section>

        <div className="mb-8 border-t border-[#F2F4F7]" />

        {/* 4. Payment Estimate */}
        <Section title="Financial Estimate">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
            <DetailRow
              label="Estimated Total"
              value="$120.00"
              valueClass="text-[#667085]"

            />
            <DetailRow
              label="Commission (20%)"
              value="$24.00"
              valueClass="text-[#667085]"

            />
            <DetailRow
              label="PSP Expected"
              value="$96.00"
              valueClass="text-[#667085]"

            />
            <DetailRow
              label="Payment Status"
              value="Pre-authorized"

              valueClass="text-[#12B76A]"
            />
          </div>
        </Section>

        <div className="mb-8 border-t border-[#F2F4F7]" />

        {/* 5. Additional Notes */}
        <Section title="Special Instructions">
          <div className=" text-sm text-[#475467] leading-relaxed">
            "Please make sure the cleaning products used are eco-friendly as the member has severe allergies to strong chemicals."
          </div>
        </Section>

      </div>
    </SideSheet>
  );
};

export default UpcomingJobDetailSheet;
