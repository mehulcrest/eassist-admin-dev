import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import userProfile from "../../assets/userProfile.png";
import OverviewTab from "../../components/PspViewTabs/OverviewTab";
import PlaceholderTab from "../../components/PspViewTabs/PlaceholderTab";
import VerificationTab from "../../components/PspViewTabs/VerificationTab";
import PerformanceTab from "../../components/PspViewTabs/PerformanceTab";
import ComplianceTab from "../../components/PspViewTabs/ComplianceTab";
import AssignedJobsTab from "../../components/PspViewTabs/AssignedJobsTab";
import { AssignedJobDetailPage } from "../../components/PspViewTabs/AssignJobsDetailView";
import RatingsReviewsTab from "../../components/PspViewTabs/RatingsReviewsTab";
import ComplaintsTab from "../../components/PspViewTabs/ComplaintsTab";
import EarningsPayoutTab from "../../components/PspViewTabs/EarningsPayoutTab";
import AvailabilityScheduleTab from "../../components/PspViewTabs/AvailabilityScheduleTab";
import ActivityLogTab from "../../components/PspViewTabs/ActivityLogTab";

const PSP_PROFILE_TABS = [
  { id: "overview", label: "Overview" },
  { id: "verification", label: "Verification" },
  { id: "performance", label: "Performance" },
  { id: "compliance", label: "Compliance" },
  { id: "assigned-jobs", label: "Assigned Jobs" },
  { id: "ratings", label: "Ratings & Reviews" },
  { id: "complaints", label: "Complaints" },
  { id: "earnings", label: "Earnings & Payout" },
  { id: "availability", label: "Availability & Schedule" },
  { id: "activity-log", label: "Activity Log" },
];

/** Default detail fields when opening profile by URL (no navigation state). */
const DEFAULT_DETAIL = {
  gender: "Female",
  dateOfBirth: "Feb 23, 2000",
  ageYears: 26,
  introduction:
    "Experienced caregiver with a passion for helping seniors. Specialized in companionship and daily assistance.",
  languages: ["English", "Francois", "Mandarin"],
  joinedOn: "March 01, 2021",
  verificationBadge: "Verified",
  address: {
    street: "250 Front Street West",
    country: "Canada",
    province: "Ontario",
    city: "Toronto",
    postal: "M5V 3G5",
  },
  availabilitySummary: {
    today: "Available Today",
    upcomingLeave: "Tuesday, April 02, 2026",
    weekly: [
      { day: "Monday-Thursday", hours: "9:00 AM - 6:00 PM" },
      { day: "Friday", hours: "2:00 PM - 6:00 PM" },
      { day: "Saturday", hours: "Off" },
      { day: "Sunday", hours: "Off" },
    ],
  },
  performanceSnapshot: {
    averageRating: "4.4",
    lastServiceDate: "Friday, Mar 12, 2026",
    complaintCountLabel: "8 Complaints",
    cancellationRate: "4%",
    onTimeCompletionPct: "95%",
  },
  servicesCoverage: {
    categories: [
      { name: "Grocery Help", label: "Active", tone: "success" },
      { name: "Meal Help", label: "Active", tone: "activeAlt" },
      { name: "Bath Help", label: "Pending Docs", tone: "pending" },
      { name: "Cleaning", label: "Rejected", tone: "rejected" },
    ],
    offeredServices: [
      { name: "Grocery Help", state: "active" },
      { name: "Meal Preparation", state: "active" },
      { name: "Meal Delivery", state: "active" },
      { name: "Feeding Help", state: "active" },
      { name: "Bath Help", state: "pending" },
      { name: "Daily Care Assistance", state: "pending" },
      { name: "Dementia", state: "pending" },
      { name: "House Cleaning", state: "inactive" },
      { name: "Yard Service", state: "inactive" },
    ],
    serviceNotes:
      "Mild dementia – requires gentle reminders. Prefers female caregivers and morning assistance.",
    eligibilityBullets: [
      "2 services fully active",
      "1 service pending verification",
      "1 service restricted",
    ],
    territory: "Downtown",
    coverageAddress: "123 Oak Street, Apt 4B",
    coverageRadiusKm: 15,
    mapEmbedSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-79.431%2C43.642%2C-79.351%2C43.682&layer=mapnik&marker=43.662%2C-79.391",
  },
  verificationSummary: {
    status: "Verified",
    documents: "6 / 8 Verified",
    pendingReview: "1",
    blockingIssue: "1",
    governmentId: "Verified",
    backgroundCheck: "6 / 8 Verified",
    insurance: "1",
    voidCheque: "Verified",
  },
  payoutInfo: {
    accountHolderName: "Maria Nicolas Santos",
    bankName: "Abcd Bank",
    accountNumberMasked: "**** 4821",
    routingCode: "89742",
    taxIdMasked: "2568 **** 1489",
    payoutSetupStatus: "Verified",
    lastPayoutDate: "March 01, 2026",
  },
};

function buildDisplayProfile(id, row) {
  const base = {
    ...DEFAULT_DETAIL,
    id: id ?? "PSP001",
    name: "Maria Santos",
    email: "mariasantos@gmail.com",
    phone: "(416) 555-0123",
    avatar: userProfile,
    availability: "Online",
    rating: "4.5",
    jobs: 236,
    earnings: "5735.00",
    active: true,
    verification: "Verified",
  };

  if (!row) {
    return {
      ...base,
      id: id ?? base.id,
      verificationBadge: DEFAULT_DETAIL.verificationBadge,
    };
  }

  const merged = {
    ...base,
    ...row,
    verificationBadge: row.verification ?? base.verification,
    avatar: row.avatar ?? base.avatar,
  };

  return {
    ...merged,
    performanceSnapshot: {
      ...DEFAULT_DETAIL.performanceSnapshot,
      ...(row?.performanceSnapshot ?? {}),
    },
    servicesCoverage: {
      ...DEFAULT_DETAIL.servicesCoverage,
      ...(row?.servicesCoverage ?? {}),
    },
    verificationSummary: {
      ...DEFAULT_DETAIL.verificationSummary,
      ...(row?.verificationSummary ?? {}),
    },
    payoutInfo: {
      ...DEFAULT_DETAIL.payoutInfo,
      ...(row?.payoutInfo ?? {}),
    },
  };
}

const PSPIndividualProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const row = state?.psp;

  const [activeTab, setActiveTab] = useState(state?.activeTab ?? "overview");
  const [selectedAssignedJob, setSelectedAssignedJob] = useState(null);

  const profile = useMemo(() => buildDisplayProfile(id, row), [id, row]);

  const tabLabel = PSP_PROFILE_TABS.find((t) => t.id === activeTab)?.label ?? "Overview";

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <div className="shrink-0 overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.06)]">
        <div className="flex gap-6 overflow-x-auto border-b border-[#EAECF0] px-4 py-3.5 scrollbar-none sm:px-5">
          {PSP_PROFILE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 whitespace-nowrap pb-1 text-base ${
                activeTab === tab.id
                  ? "border-b-2 border-redRejected font-semibold text-redRejected"
                  : "font-medium text-[#667085]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>                                                                                                                                
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {activeTab === "overview" && <OverviewTab profile={profile} />}
        {activeTab === "verification" && <VerificationTab />}
        {activeTab === "performance" && <PerformanceTab />}
        {activeTab === "compliance" && <ComplianceTab />}
        {activeTab === "assigned-jobs" &&
          (selectedAssignedJob ? (
            <AssignedJobDetailPage
              job={selectedAssignedJob}
              onBack={() => setSelectedAssignedJob(null)}
            />
          ) : (
            <div className="h-full overflow-hidden">
              <AssignedJobsTab onOpenCompletedJob={setSelectedAssignedJob} />
            </div>
          ))}
        {activeTab === "ratings" && (
          <div className="md:h-full md:overflow-hidden">
            <RatingsReviewsTab />
          </div>
        )}
        {activeTab === "complaints" && (
          <div className="h-full overflow-hidden">
            <ComplaintsTab />
          </div>
        )}
        {activeTab === "earnings" && (
          <div className="h-full overflow-hidden">
            <EarningsPayoutTab />
          </div>
        )}
        {activeTab === "availability" && <AvailabilityScheduleTab />}
        {activeTab === "activity-log" && <ActivityLogTab />}
      </div>

      {activeTab === "overview" && (
        <div className="shrink-0 border-t border-[#EAECF0] bg-pageColor pt-3">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/psp-individuals")}
              className="h-11 rounded-lg border border-redRejected bg-white px-6 text-sm font-semibold text-redRejected transition hover:bg-[#FEF3F2]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-11 rounded-lg bg-redRejected px-6 text-sm font-semibold text-white transition hover:bg-[#D92D20]"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
      <span className="sr-only">Active tab: {tabLabel}</span>
    </div>
  );
};

export default PSPIndividualProfileView;
