import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import logoImage from "../../assets/logo.png";
import userProfile from "../../assets/userProfile.png";
import StatusBadge from "../ui/StatusBadge";
import { Table, TableBody, TableEmpty, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const ACTIVITY_TYPE_OPTIONS = [
  "All Activities",
  "Verification Update",
  "Complaints & Reviews",
  "Profile Update",
  "System Event",
  "Payout Event",
  "Account Actions",
];

const TIME_RANGE_OPTIONS = [
  { label: "All Time", value: "all" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
];

const ACTIVITY_TYPE_META = {
  "Verification Update": {
    bg: "bg-[#ECFDF3]",
    text: "text-greenVerified",
  },
  "Complaints & Reviews": {
    bg: "bg-[#FEF3F2]",
    text: "text-redRejected",
  },
  "Profile Update": {
    bg: "bg-[#FFFAEB]",
    text: "text-orangeReview",
  },
  "System Event": {
    bg: "bg-[#F2F4F7]",
    text: "text-[#475467]",
  },
  "Payout Event": {
    bg: "bg-[#ECFDF3]",
    text: "text-[#12B76A]",
  },
  "Account Actions": {
    bg: "bg-[#FFF7ED]",
    text: "text-[#F79009]",
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const getVisiblePages = (current, total, maxVisible = 5) => {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};



const buildActivityRows = (memberName) => [
  {
    id: "1",
    occurredAt: "2026-03-26T16:10:00",
    actor: { name: "Ronit Sundar", role: "Admin", kind: "person" },
    actionTitle: "Viewed billing record",
    actionDetail: "Billing details were opened for invoice #SB-001234.",
    activityType: "Verification Update",
  },
  {
    id: "2",
    occurredAt: "2026-03-12T09:15:00",
    actor: { name: "Robert Brown", role: "Admin", kind: "person" },
    actionTitle: "Updated subscription",
    actionDetail: "Premium plan renewed successfully.",
    activityType: "Verification Update",
  },
  {
    id: "3",
    occurredAt: "2026-03-05T08:45:00",
    actor: { name: "Robert Brown", role: "Admin", kind: "person" },
    actionTitle: "Updated address",
    actionDetail: "Home address details were corrected.",
    activityType: "Profile Update",
  },
  {
    id: "4",
    occurredAt: "2026-02-26T10:42:00",
    actor: { name: memberName, role: "Member", kind: "person" },
    actionTitle: "Added complaint",
    actionDetail: "Complaint recorded for provider behavior and service quality.",
    activityType: "Complaints & Reviews",
  },
  {
    id: "5",
    occurredAt: "2026-02-14T14:30:00",
    actor: { name: "System", role: "Automated event", kind: "system" },
    actionTitle: "Applied loyalty points",
    actionDetail: "Loyalty points were used toward subscription renewal.",
    activityType: "System Event",
  },
  {
    id: "6",
    occurredAt: "2026-02-14T14:30:00",
    actor: { name: "Michael Leo", role: "Admin", kind: "person" },
    actionTitle: "Refund processed",
    actionDetail: "Partial refund was issued for a billing dispute.",
    activityType: "Payout Event",
  },
  {
    id: "7",
    occurredAt: "2026-02-05T18:15:00",
    actor: { name: memberName, role: "Member", kind: "person" },
    actionTitle: "Reviewed service",
    actionDetail: "A 2-star review was submitted for Grocery Trip Assistance.",
    activityType: "Complaints & Reviews",
  },
  {
    id: "8",
    occurredAt: "2026-01-21T23:39:00",
    actor: { name: "Robert Brown", role: "Admin", kind: "person" },
    actionTitle: "Added family contact",
    actionDetail: `New family contact was added to ${memberName}'s profile.`,
    activityType: "Verification Update",
  },
  {
    id: "9",
    occurredAt: "2026-01-21T21:30:00",
    actor: { name: "Robert Brown", role: "Admin", kind: "person" },
    actionTitle: "Added note",
    actionDetail: "Special meal instructions were added to the elder profile.",
    activityType: "Verification Update",
  },
  {
    id: "10",
    occurredAt: "2026-01-20T13:00:00",
    actor: { name: "System", role: "Automated event", kind: "system" },
    actionTitle: "Created profile",
    actionDetail: `${memberName}'s member profile was created successfully.`,
    activityType: "Account Actions",
  },
  {
    id: "11",
    occurredAt: "2026-01-03T11:20:00",
    actor: { name: memberName, role: "Member", kind: "person" },
    actionTitle: "Updated profile",
    actionDetail: "Emergency contact details were changed.",
    activityType: "Profile Update",
  },
  {
    id: "12",
    occurredAt: "2025-12-29T17:25:00",
    actor: { name: "Robert Brown", role: "Admin", kind: "person" },
    actionTitle: "Verified identity",
    actionDetail: "Member verification documents were approved.",
    activityType: "Verification Update",
  },
];

const formatDateLabel = (value) => dateFormatter.format(new Date(value));
const formatTimeLabel = (value) => timeFormatter.format(new Date(value));

const getCutoffDate = (rangeValue) => {
  if (rangeValue === "all") return null;

  const now = new Date();
  const nextDate = new Date(now);

  if (rangeValue === "7d") nextDate.setDate(now.getDate() - 7);
  if (rangeValue === "30d") nextDate.setDate(now.getDate() - 30);
  if (rangeValue === "90d") nextDate.setDate(now.getDate() - 90);

  return nextDate;
};

const SelectField = ({ value, onChange, options, className = "" }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={onChange}
      className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-4 pr-10 text-sm font-medium text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
    >
      {options.map((option) => {
        const optionValue = typeof option === "string" ? option : option.value;
        const optionLabel = typeof option === "string" ? option : option.label;

        return (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
    <ChevronDown
      size={16}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
    />
  </div>
);

const ActivityTypeBadge = ({ label }) => {
  const meta = ACTIVITY_TYPE_META[label] ?? ACTIVITY_TYPE_META["System Event"];
  const tone =
    meta.bg === "bg-[#ECFDF3]"
      ? "success"
      : meta.bg === "bg-[#FEF3F2]"
        ? "danger"
        : meta.bg === "bg-[#FFFAEB]"
          ? "pending"
          : meta.bg === "bg-[#FFF7ED]"
            ? "processing"
            : "neutral";

  return <StatusBadge label={label} tone={tone} className={meta.text} />;
};

const ActorAvatar = ({ actor }) => {
  if (actor.kind === "system") {
    return (
      <span className="inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#FECACA] bg-[#FFF1F0]">
        <img src={logoImage} alt="System event" className="size-8 rounded-full object-cover" />
      </span>
    );
  }

  return (
    <img
      src={userProfile}
      alt={actor.name}
      className="size-9 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
    />
  );
};

const ActivityLogTab = ({ memberName = "Margaret Thompson" }) => {
  const [activityTypeFilter, setActivityTypeFilter] = useState("All Activities");
  const [timeRangeFilter, setTimeRangeFilter] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const activityRows = useMemo(() => buildActivityRows(memberName), [memberName]);

  const filteredRows = useMemo(() => {
    const cutoffDate = getCutoffDate(timeRangeFilter);

    return [...activityRows]
      .sort((left, right) => new Date(right.occurredAt) - new Date(left.occurredAt))
      .filter((row) => {
        if (
          activityTypeFilter !== "All Activities" &&
          row.activityType !== activityTypeFilter
        ) {
          return false;
        }

        if (cutoffDate && new Date(row.occurredAt) < cutoffDate) {
          return false;
        }

        return true;
      });
  }, [activityRows, activityTypeFilter, timeRangeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageNumbers = useMemo(
    () => getVisiblePages(safePage, totalPages, 5),
    [safePage, totalPages]
  );

  const currentRows = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize;
    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, pageSize, safePage]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      <div className="shrink-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <SelectField
          value={activityTypeFilter}
          onChange={(event) => {
            setActivityTypeFilter(event.target.value);
            setPage(1);
          }}
          options={ACTIVITY_TYPE_OPTIONS}
          className="sm:w-[190px]"
        />
        <SelectField
          value={timeRangeFilter}
          onChange={(event) => {
            setTimeRangeFilter(event.target.value);
            setPage(1);
          }}
          options={TIME_RANGE_OPTIONS}
          className="sm:w-[160px]"
        />
      </div>

        <TableWrapper className="flex min-h-0 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-auto">
          <Table minWidth="min-w-[1020px]">
            <TableHead>
              <Th className="w-[170px]">Date</Th>
              <Th className="w-[240px]">Performed By</Th>
              <Th className="min-w-[420px]">Action</Th>
              <Th className="w-[210px]">Activity Type</Th>
            </TableHead>
            <TableBody>
              {currentRows.length > 0 ? (
                currentRows.map((row) => (
                  <TableRow key={row.id}>
                    <Td className="text-[#475467]">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#475467]">
                          {formatDateLabel(row.occurredAt)}
                        </span>
                        <span className="mt-1 text-xs text-[#98A2B3]">
                          {formatTimeLabel(row.occurredAt)}
                        </span>
                      </div>
                    </Td>
                    <Td className="text-[#475467]">
                      <div className="flex items-center gap-3">
                        <ActorAvatar actor={row.actor} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#1D2939]">
                            {row.actor.name}
                          </p>
                          <p className="mt-0.5 text-xs text-[#98A2B3]">
                            {row.actor.role}
                          </p>
                        </div>
                      </div>
                    </Td>
                    <Td className="text-[#475467]">
                      <p className="text-sm leading-5 text-[#667085]">
                        <span className="font-semibold text-[#475467]">
                          {row.actionTitle}
                        </span>
                        {" - "}
                        {row.actionDetail}
                      </p>
                    </Td>
                    <Td className="text-[#475467]">
                      <ActivityTypeBadge label={row.activityType} />
                    </Td>
                  </TableRow>
                ))
              ) : (
                <TableEmpty colSpan={4} message="No activity log entries match the selected filters." />
              )}
            </TableBody>
          </Table>
          </div>

        <div className="shrink-0 flex flex-col gap-4 border-t border-[#EAECF0] bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-sm text-[#667085]">
            <span>Rows per page</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="rounded-lg border border-[#D0D5DD] bg-white px-3 py-2 text-sm font-medium text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center justify-center gap-1 sm:justify-end">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`min-w-[36px] rounded-lg px-3 py-2 text-sm font-semibold ${
                  pageNumber === safePage
                    ? "bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
                    : "border border-[#D0D5DD] text-[#344054]"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() =>
                setPage((currentPage) => Math.min(totalPages, currentPage + 1))
              }
              className="inline-flex size-9 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        </TableWrapper>
    </div>
  );
};

export default ActivityLogTab;
