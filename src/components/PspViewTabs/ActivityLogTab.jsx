import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import userProfile from "../../assets/userProfile.png";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";

const activityRows = [
  {
    id: "ACT-001",
    date: "Mar 12, 2026",
    time: "04:45 AM",
    actor: "Robert Brown",
    actorRole: "Admin",
    actorType: "user",
    action: "Updated profile - New photo was uploaded",
    activityType: "Profile Update",
  },
  {
    id: "ACT-002",
    date: "Feb 26, 2026",
    time: "10:00 AM",
    actor: "Marie Santos",
    actorRole: "PSP",
    actorType: "user",
    action: "Approved document - Insurance document was verified",
    activityType: "Verification Update",
  },
  {
    id: "ACT-003",
    date: "Jan 03, 2026",
    time: "11:31 AM",
    actor: "Robert Brown",
    actorRole: "Admin",
    actorType: "user",
    action: "Updated availability - New weekly schedule set",
    activityType: "Availability Change",
  },
  {
    id: "ACT-004",
    date: "Mar 26, 2026",
    time: "8:44 AM",
    actor: "Robert Brown",
    actorRole: "Admin",
    actorType: "user",
    action: "Processed payout - Weekly payout sent successfully",
    activityType: "Payout Event",
  },
  {
    id: "ACT-005",
    date: "Feb 14, 2026",
    time: "12:30 PM",
    actor: "System",
    actorRole: "Automated event",
    actorType: "system",
    action: "Auto-flag triggered - No check-in recorded for job #J-0062",
    activityType: "Verification Update",
  },
  {
    id: "ACT-006",
    date: "Jan 21, 2026",
    time: "11:31 PM",
    actor: "Robert Brown",
    actorRole: "Admin",
    actorType: "user",
    action: "Approved document - Background check was verified",
    activityType: "Verification Update",
  },
  {
    id: "ACT-007",
    date: "Mar 26, 2026",
    time: "10:00 AM",
    actor: "Marie Santos",
    actorRole: "PSP",
    actorType: "user",
    action: "Updated profile - Phone number was changed",
    activityType: "Profile Update",
  },
  {
    id: "ACT-008",
    date: "Feb 14, 2026",
    time: "3:30 PM",
    actor: "Ronit Sundar",
    actorRole: "Admin",
    actorType: "user",
    action: "Rejected document - ID proof was unclear",
    activityType: "Verification Update",
  },
  {
    id: "ACT-009",
    date: "Jan 21, 2026",
    time: "4:47 PM",
    actor: "Michael Lee",
    actorRole: "Admin",
    actorType: "user",
    action: "Escalated complaint - High priority issue flagged",
    activityType: "Complaints & Reviews",
  },
  {
    id: "ACT-010",
    date: "Jan 20, 2026",
    time: "9:00 AM",
    actor: "System",
    actorRole: "Automated event",
    actorType: "system",
    action: "Auto-flag triggered - Frequent cancellations detected",
    activityType: "System Action",
  },
];

const typeClass = {
  "Missed Shift": "bg-[#FEF3F2] text-[#F04438]",
  "Profile Update": "bg-[#FFF6ED] text-[#F79009]",
  "Job Action": "bg-[#EFF8FF] text-[#2E90FA]",
  "Availability Change": "bg-[#F2F4F7] text-[#475467]",
  "Verification Update": "bg-[#ECFDF3] text-[#039855]",
  "Payout Event": "bg-[#ECFDF3] text-[#039855]",
  "Complaints & Reviews": "bg-[#FEF3F2] text-[#F04438]",
  "System Action": "bg-[#FEF3F2] text-[#F04438]",
};

const activityOptions = [
  "All Activities",
  "Profile Update",
  "Job Action",
  "Availability Change",
  "Verification Update",
  "Payout Event",
  "Complaints & Reviews",
  "System Action",
];

const timeRangeOptions = ["All Time", "Today", "Last 7 Days", "Last 30 Days", "This Year"];

const formatAction = (action) => {
  const [title, ...rest] = action.split(" - ");
  const details = rest.join(" - ");
  return { title, details };
};

const ActivityLogTab = () => {
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [timeRange, setTimeRange] = useState("All Time");

  const rows = useMemo(() => {
    return activityRows.filter((row) => {
      const activityMatch = activityFilter === "All Activities" || row.activityType === activityFilter;
      const timeMatch = timeRange === "All Time";
      return activityMatch && timeMatch;
    });
  }, [activityFilter, timeRange]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="relative w-full sm:w-[188px]">
          <select
            value={activityFilter}
            onChange={(event) => setActivityFilter(event.target.value)}
            className="h-10 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm font-medium text-textColor"
          >
            {activityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-textColor" />
        </div>

        <div className="relative w-full sm:w-[140px]">
          <select
            value={timeRange}
            onChange={(event) => setTimeRange(event.target.value)}
            className="h-10 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm font-medium text-textColor"
          >
            {timeRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-textColor" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-[#EAECF0] bg-white">
        <TableWrapper className="h-full max-h-[560px] overflow-y-auto rounded-none border-0">
          <Table minWidth="min-w-[980px]">
            <TableHead>
              <Th>Date</Th>
              <Th>Performed By</Th>
              <Th>Action</Th>
              <Th>Activity Type</Th>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const { title, details } = formatAction(row.action);
                return (
                <TableRow key={row.id}>
                  <Td>
                    <div className="flex flex-col">
                      <span className="text-sm text-textColor">{row.date}</span>
                      <span className="text-xs text-[#98A2B3]">{row.time}</span>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      {row.actorType === "system" ? (
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#F2F4F7] text-xs font-semibold text-textColor">
                          S
                        </span>
                      ) : (
                        <img src={userProfile} alt={row.actor} className="size-7 rounded-full object-cover" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm text-textColor">{row.actor}</span>
                        <span className="text-xs text-[#98A2B3]">{row.actorRole}</span>
                      </div>
                    </div>
                  </Td>
                  <Td className="max-w-[420px]">
                    <p className="text-sm text-textColor">
                      <span className="font-medium text-textColor">{title}</span>
                      {details ? <span>{` - ${details}`}</span> : null}
                    </p>
                  </Td>
                  <Td>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-sm font-medium ${
                        typeClass[row.activityType] ?? "bg-[#F2F4F7] text-textColor"
                      }`}
                    >
                      {row.activityType}
                    </span>
                  </Td>
                </TableRow>
              );
              })}
            </TableBody>
          </Table>
        </TableWrapper>

        <div className="flex flex-col gap-2 border-t border-[#EAECF0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-textColor">Rows per page:</span>
            <span className="inline-flex items-center gap-1 rounded-md border border-[#D0D5DD] px-2 py-1 text-xs font-medium text-textColor">
              10
              <ChevronDown size={12} />
            </span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button type="button" className="inline-flex size-7 items-center justify-center rounded-md border border-[#EAECF0] bg-white text-[#98A2B3]">
              <ChevronLeft size={14} />
            </button>
            <span className="inline-flex size-7 items-center justify-center rounded-md bg-[#FEF3F2] text-xs font-semibold text-redRejected">1</span>
            <button type="button" className="inline-flex size-7 items-center justify-center rounded-md border border-[#EAECF0] bg-white text-textColor">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogTab;
