import {
  Check,
  CheckCircle2,
  Clock,
  Crosshair,
  Info,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Star,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SideSheet from "../SideSheet";

/** Card shell — matches design: white, light border, ~12px radius, soft shadow, generous padding */
const CARD =
  "rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.06)]";
const CARD_HEADER = "border-b border-[#EAECF0] px-5 py-4 sm:px-6";
const CARD_BODY = "p-5 sm:p-6";

const DetailField = ({ label, children }) => (
  <div className="min-w-0">
    <p className="text-sm font-medium leading-tight text-textColor">{label}</p>
    <div className="mt-1.5 text-sm font-normal leading-snug text-secondaryTextColor">{children}</div>
  </div>
);

const SnapshotMetric = ({ label, children }) => (
  <div className="min-w-0">
    <p className="text-sm font-medium leading-tight text-textColor">{label}</p>
    <div className="mt-1.5 text-sm font-normal leading-snug text-secondaryTextColor">{children}</div>
  </div>
);

const StatusToggle = ({ active, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={active}
    onClick={() => onChange(!active)}
    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-redRejected focus-visible:ring-offset-2 ${
      active ? "bg-[#12B76A]" : "bg-[#E4E7EC]"
    }`}
  >
    <span
      className={`pointer-events-none absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
        active ? "left-[22px]" : "left-0.5"
      }`}
    />
  </button>
);

const categoryToneClass = {
  success: "border-[#12B76A] bg-[#ECFDF3]",
  activeAlt: "border-[#FD853A] bg-white",
  pending: "border-[#FD853A] bg-white",
  rejected: "border-[#FD853A] bg-white",
};

const ServiceCategoryCard = ({ name, label, tone }) => {
  const border = categoryToneClass[tone] ?? categoryToneClass.pending;
  return (
    <div className={`rounded-xl border px-3 py-2 ${border} w-32 `}>
      <p className="text-sm font-medium leading-tight text-[#101828]">{name}</p>
      <div className="mt-1 flex items-center gap-1.5">
        <span
          className={`text-xs font-medium leading-tight ${
            tone === "success" ? "text-greenVerified" : tone === "rejected" ? "text-redRejected" : "text-[#FD853A]"
          }`}
        >
          {label}
        </span>
        {tone === "success" && <Check className="size-3.5 shrink-0 text-greenVerified" strokeWidth={2.5} />}
        {tone === "activeAlt" && <Check className="size-3.5 shrink-0 text-[#FD853A]" strokeWidth={2.5} />}
        {tone === "pending" && <Clock className="size-3.5 shrink-0 text-redRejected" strokeWidth={2} />}
        {tone === "rejected" && <X className="size-3.5 shrink-0 text-redRejected" strokeWidth={2.5} />}
      </div>
    </div>
  );
};

const serviceTagClass = {
  active: "border-[#EF444433] bg-[#FFF6F6] text-[#101828]",
  pending: "border-[#EF444433] bg-[#FFF6F6] text-[#101828]",
  inactive: "border-[#EF444433] bg-[#FFF6F6] text-[#101828]",
};

const ServiceOfferedTag = ({ name, state }) => {
  const cls = serviceTagClass[state] ?? serviceTagClass.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium leading-tight ${cls}`}
    >
      {name}
      {state === "active" && <Check className="size-3 shrink-0" strokeWidth={3} />}
      {state === "pending" && <Info className="size-3 shrink-0 text-[#667085]" strokeWidth={2} />}
      {state === "inactive" && <X className="size-3 shrink-0" strokeWidth={2.5} />}
    </span>
  );
};

const VerifiedBadge = () => (
  <span className="inline-flex shrink-0 rounded-full bg-[#ECFDF3] px-2.5 py-0.5  text-sm font-semibold text-greenVerified">
    <CheckCircle2 size={18} className="fill-[#12B76A] text-white shrink-0 mr-0.5" />Verified
  </span>
);

const SUSPEND_REASONS = [
  "Compliance Issue",
  "Complaint Escalation",
  "Repeated No-Show",
  "Fraud / Misconduct",
  "Other",
];

const PROFILE_MORE_ACTIONS = ["Reset Password", "Mark as Verified", "Download Profile"];

const OverviewTab = ({ profile }) => {
  const [accountActive, setAccountActive] = useState(profile.active !== false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isSuspendSheetOpen, setIsSuspendSheetOpen] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendDescription, setSuspendDescription] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("immediate");
  const [notifyPsp, setNotifyPsp] = useState(true);
  const moreMenuRef = useRef(null);

  const snap = profile.performanceSnapshot;
  const svc = profile.servicesCoverage;
  const ver = profile.verificationSummary;
  const pay = profile.payoutInfo;

  const earningsDisplay = `$${Number(profile.earnings).toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const showOnlineDot = profile.availability === "Online";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!isMoreMenuOpen) return;
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMoreMenuOpen]);

  return (
    <div className="space-y-5 pb-2">
      {/* ── Top area: left column stacks Personal + Performance, right column stacks Address + Availability ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        <div className="flex min-w-0 flex-col gap-5">
          {/* Personal Details */}
          <div className={`${CARD} overflow-hidden`}>
            <div className={CARD_HEADER}>
              <h2 className="text-lg font-semibold text-[#101828]">Personal Details</h2>
            </div>

            <div className={CARD_BODY}>
              <div className="flex items-start justify-between gap-4">
                <div className="shrink-0">
                  <p className="mb-2 text-sm font-medium text-[#101828]">Profile Photo</p>
                  <div className="relative w-fit">
                    <img
                      src={profile.avatar}
                      alt=""
                      className="size-[84px] rounded-2xl object-cover ring-1 ring-[#EAECF0]"
                    />
                    {showOnlineDot ? (
                      <span
                        className="absolute bottom-0 right-0 size-3.5 translate-x-1/3 translate-y-1/4 rounded-full border-[2.5px] border-white bg-[#12B76A]"
                        title="Online"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-redRejected bg-white px-4 py-2 text-sm font-semibold text-redRejected shadow-sm transition hover:bg-[#FEF3F2]"
                  >
                    Assign Job
                  </button>
                  <button
                    type="button"
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] shadow-sm transition hover:bg-[#F2F4F7]"
                    aria-label="Call"
                  >
                    <Phone size={18} strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] shadow-sm transition hover:bg-[#F2F4F7]"
                    aria-label="Message"
                  >
                    <MessageCircle size={18} strokeWidth={2} />
                  </button>
                  <div className="relative" ref={moreMenuRef}>
                    <button
                      type="button"
                      onClick={() => setIsMoreMenuOpen((prev) => !prev)}
                      className="inline-flex size-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] shadow-sm transition hover:bg-[#F2F4F7]"
                      aria-label="More options"
                      aria-expanded={isMoreMenuOpen}
                    >
                      <MoreHorizontal size={18} strokeWidth={2} />
                    </button>
                    {isMoreMenuOpen ? (
                      <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[170px] overflow-hidden rounded-lg border border-[#EAECF0] bg-white shadow-[0_12px_24px_rgba(16,24,40,0.12)]">
                        {PROFILE_MORE_ACTIONS.map((action) => (
                          <button
                            key={action}
                            type="button"
                            onClick={() => setIsMoreMenuOpen(false)}
                            className="block w-full border-b border-[#EAECF0] px-4 py-3 text-left text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB] last:border-0"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-5">
                <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  <DetailField label="Full Name">{profile.name}</DetailField>
                  <DetailField label="PSP ID">{profile.id}</DetailField>
                  <DetailField label="Phone">{profile.phone}</DetailField>
                  <DetailField label="Email">{profile.email}</DetailField>
                  <DetailField label="Gender">{profile.gender}</DetailField>
                  <DetailField label="Date of Birth">
                    {profile.dateOfBirth} ({profile.ageYears} Years)
                  </DetailField>
                </div>

                <div>
                  <DetailField label="Introduction">{profile.introduction}</DetailField>
                </div>

                <div>
                  <p className="text-sm font-medium leading-tight text-textColor">Language Spoken</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full bg-[#FFF6F6] px-3 py-1 text-xs font-normal text-textColor border border-[#EF444433]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-[#EAECF0] pt-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <DetailField label="Joined On">{profile.joinedOn}</DetailField>
                    <DetailField label="Verification Status">
                      <span className="inline-flex rounded-full bg-[#ECFDF3] px-2.5 py-0.5 text-xs font-semibold text-greenVerified">
                        {profile.verificationBadge}
                      </span>
                    </DetailField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-[1fr_1fr] sm:items-end">
                    <DetailField label="Availability Status">
                      <span className="text-sm font-semibold text-greenVerified">{profile.availability}</span>
                    </DetailField>
                    <div>
                      <div className="flex justify-between items-end">
                        <div>
                        <p className="text-sm font-medium leading-tight text-textColor">Account Status</p>
                        <div className="mt-2 flex items-center gap-2">
                          <StatusToggle active={accountActive} onChange={setAccountActive} />
                          <span className="text-sm font-medium text-[#101828]">
                          </span>
                        </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsSuspendSheetOpen(true)}
                          className="h-10 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
                        >
                          Suspend PSP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Snapshot directly below Personal Details */}
          <div className={`${CARD} min-w-0`}>
            <div className={`${CARD_HEADER} pb-3`}>
              <h2 className="text-lg font-semibold text-[#101828]">Performance Snapshot</h2>
            </div>
            <div className={CARD_BODY}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4">
                <SnapshotMetric label="Total Earnings">{earningsDisplay}</SnapshotMetric>
                <SnapshotMetric label="Completed Services">{profile.jobs}</SnapshotMetric>
                <SnapshotMetric label="Average Rating">
                  <span className="inline-flex items-center gap-1">
                    {snap.averageRating}
                    <Star className="size-4 fill-amber-400 text-amber-400" strokeWidth={0} aria-hidden />
                  </span>
                </SnapshotMetric>
                <SnapshotMetric label="Last Service Date">{snap.lastServiceDate}</SnapshotMetric>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4">
                <SnapshotMetric label="Complaint Count">{snap.complaintCountLabel}</SnapshotMetric>
                <SnapshotMetric label="Cancellation Rate">{snap.cancellationRate}</SnapshotMetric>
                <SnapshotMetric label="On-time Completion %">{snap.onTimeCompletionPct}</SnapshotMetric>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Home Address + Availability (stacked) */}
        <div className="flex flex-col gap-5">
          <div className={`${CARD}`}>
            <div className={`${CARD_HEADER}`}>
              <h2 className="text-lg font-semibold text-[#101828]">Home Address</h2>
            </div>
            <div className={`${CARD_BODY} space-y-4`}>
              <DetailField label="Street Address">{profile.address.street}</DetailField>
              <DetailField label="Country">{profile.address.country}</DetailField>
              <DetailField label="Province (State)">{profile.address.province}</DetailField>
              <DetailField label="City">{profile.address.city}</DetailField>
              <DetailField label="Postal Code">{profile.address.postal}</DetailField>
            </div>
          </div>

          <div className={`${CARD}`}>
            <div className={`${CARD_HEADER}`}>
              <h2 className="text-lg font-semibold text-[#101828]">Availability Summary</h2>
            </div>
            <div className={CARD_BODY}>
              <div className="flex flex-wrap gap-5 sm:grid-cols-2 justify-between">
                <DetailField label="Today Status">{profile.availabilitySummary.today}</DetailField>
                <DetailField label="Upcoming Leave">{profile.availabilitySummary.upcomingLeave}</DetailField>
              </div>
              <div className="flex flex-col gap-4 mt-5 border-t border-[#EAECF0] pt-2">
                {profile.availabilitySummary.weekly.slice(0, -2).map((row) => (
                  <DetailField key={row.day} label={row.day}>
                    {row.hours}
                  </DetailField>
                ))}

                <div className="flex items-center justify-between">
                  {profile.availabilitySummary.weekly.slice(-2).map((row) => (
                    <div className="flex-1" key={row.day}>
                      <DetailField label={row.day}>
                        {row.hours}
                      </DetailField>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Line 3: Services & Coverage (full width) ── */}
      <div className={`${CARD} overflow-hidden`}>
        <div className={`${CARD_HEADER}`}>
          <h2 className="text-lg font-semibold text-[#1D2939]">Services & Coverage</h2>
        </div>
        <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#1D2939]">Service Details</h3>
              <p className="mt-4 text-sm font-medium text-[#344054]">Service Category</p>
              <div className="mt-2 flex gap-3 flex-wrap">
                {svc.categories.map((c) => (
                  <ServiceCategoryCard key={c.name} name={c.name} label={c.label} tone={c.tone} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#344054]">
                Services Offered{" "}
                <span className="font-normal text-[#667085]">({svc.offeredServices.length} Services)</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {svc.offeredServices.map((s) => (
                  <ServiceOfferedTag key={s.name} name={s.name} state={s.state} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#101828]">Additional Notes</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6678A4]">
                {svc.serviceNotes}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#101828]">Service Eligibility Summary</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#344054]">
                {svc.eligibilityBullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="rounded-lg border border-[#D0D5DD] bg-white px-5 py-2.5 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
              >
                View Service Verification
              </button>
            </div>
          </div>

          <div className="space-y-5 border-t border-[#EAECF0] pt-5 xl:border-t-0 xl:pt-0">
            <h3 className="text-lg font-semibold text-[#1D2939]">Coverage Area</h3>
            <div>
              <p className="text-sm font-medium text-[#101828]">Operating Region / Territory</p>
              <span className="mt-2 inline-flex rounded-full border border-redRejected bg-white px-3 py-0.5 text-sm font-medium text-redRejected">
                {svc.territory}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#101828]">Location</p>
              <p className="mt-1 text-sm font-medium text-[#6678A4]">
                {svc.coverageAddress}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#101828]">Coverage Radius</p>
              <span className="mt-2 inline-flex rounded-full border border-redRejected px-2.5 py-0.5 text-sm font-medium text-redRejected">
                {svc.coverageRadiusKm} Km
              </span>
            </div>
            <div className="relative h-[290px] w-full overflow-hidden rounded-lg border border-[#EAECF0] bg-[#E4E7EC]">
              <iframe
                width="100%"
                height="100%"
                title="Coverage map"
                className="opacity-95"
                style={{ border: 0 }}
                src={svc.mapEmbedSrc}
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 size-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-sky-400/70 bg-sky-400/15"
                aria-hidden
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-[#344054] text-white shadow-lg transition hover:scale-105"
                aria-label="Map center"
              >
                <Crosshair size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Line 4: Verification Summary | Payout Information ── */}
      <div className="flex flex-col gap-5 lg:flex-row items-start">
        <div className={`${CARD} w-full lg:w-1/2`}>
          <div className={`${CARD_HEADER} flex flex-wrap items-center justify-between gap-2`}>
            <h2 className="text-lg font-semibold text-[#101828]">Verification Summary</h2>
            <VerifiedBadge />
          </div>
          <div className={CARD_BODY}>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <ul className="list-disc space-y-2 pl-4 text-sm text-[#344054] marker:text-[#101828]">
                <li>
                  <span className="mr-1">Verification Status:</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-greenVerified">
                    {ver.status}
                    <CheckCircle2 className="size-3.5 shrink-0" strokeWidth={2.2} />
                  </span>
                </li>
                <li>
                  <span className="mr-1">Documents:</span>
                  <span>{ver.documents}</span>
                </li>
                <li>
                  <span className="mr-1">Pending Review:</span>
                  <span>{ver.pendingReview}</span>
                </li>
                <li>
                  <span className="mr-1">Blocking Issue:</span>
                  <span>{ver.blockingIssue}</span>
                </li>
              </ul>

              <ul className="list-disc space-y-2 pl-4 text-sm text-[#344054] marker:text-[#101828]">
                <li>
                  <span className="mr-1">Government ID:</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-greenVerified">
                    {ver.governmentId}
                    <CheckCircle2 className="size-3.5 shrink-0" strokeWidth={2.2} />
                  </span>
                </li>
                <li>
                  <span className="mr-1">Background Check:</span>
                  <span>{ver.backgroundCheck}</span>
                </li>
                <li>
                  <span className="mr-1">Insurance:</span>
                  <span>{ver.insurance}</span>
                </li>
                <li>
                  <span className="mr-1">Void Cheque:</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-greenVerified">
                    {ver.voidCheque}
                    <CheckCircle2 className="size-3.5 shrink-0" strokeWidth={2.2} />
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                className="rounded-lg border border-[#D0D5DD] bg-white px-5 py-2.5 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
              >
                View All Documents
              </button>
            </div>
          </div>
        </div>

        <div className={`${CARD} w-full lg:w-1/2`}>
          <div className={`${CARD_HEADER} flex flex-wrap items-center justify-between gap-2`}>
            <h2 className="text-lg font-semibold text-[#101828]">Payout Information</h2>
            <VerifiedBadge />
          </div>
          <div className={CARD_BODY}>
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailField label="Account Holder Name">{pay.accountHolderName}</DetailField>
              <DetailField label="Bank Name">{pay.bankName}</DetailField>
              <DetailField label="Account Number">{pay.accountNumberMasked}</DetailField>
              <DetailField label="Routing Code">{pay.routingCode}</DetailField>
              <DetailField label="Tax ID">{pay.taxIdMasked}</DetailField>
              <DetailField label="Payout Setup Status">{pay.payoutSetupStatus}</DetailField>
            </div>
            <p className="mt-5 text-sm text-[#667085]">
              Last payout processed date: {pay.lastPayoutDate}
            </p>
          </div>
        </div>
      </div>

      <SideSheet
        isOpen={isSuspendSheetOpen}
        onClose={() => setIsSuspendSheetOpen(false)}
        title="Suspend PSP"
        footer={
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-11 flex-1 rounded-lg bg-redRejected px-4 text-sm font-semibold text-white transition hover:bg-[#D92D20]"
            >
              Suspend PSP
            </button>
            <button
              type="button"
              onClick={() => setIsSuspendSheetOpen(false)}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-5">
          <p className="text-sm text-[#475467]">
            This PSP will not receive new job assignments while suspended.
          </p>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Suspend Reason <span className="text-redRejected">*</span>
            </label>
            <select
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] focus:border-redRejected focus:outline-none focus:ring-1 focus:ring-redRejected"
            >
              <option value="" disabled>
                Select Rejection Reason
              </option>
              {SUSPEND_REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Description</label>
            <textarea
              rows={4}
              value={suspendDescription}
              onChange={(e) => setSuspendDescription(e.target.value)}
              placeholder="Provide additional context for suspension"
              className="w-full rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-redRejected focus:outline-none focus:ring-1 focus:ring-redRejected"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[#344054]">
              Effective Date <span className="text-redRejected">*</span>
            </p>
            <div className="flex items-center gap-5">
              <label className="inline-flex items-center gap-2 text-sm text-[#344054]">
                <input
                  type="radio"
                  name="effectiveDate"
                  value="immediate"
                  checked={effectiveDate === "immediate"}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="size-4 accent-redRejected"
                />
                Immediate
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-[#344054]">
                <input
                  type="radio"
                  name="effectiveDate"
                  value="scheduled"
                  checked={effectiveDate === "scheduled"}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="size-4 accent-redRejected"
                />
                Scheduled
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-sm font-medium text-[#344054]">
                Notify PSP <span className="text-redRejected">*</span>
              </p>
                <StatusToggle active={notifyPsp} onChange={setNotifyPsp} />
            </div>
            <p className="mt-1 text-xs text-[#667085]">Notify PSP about Suspension</p>
          </div>
        </div>
      </SideSheet>
    </div>
  );
};

export default OverviewTab;
