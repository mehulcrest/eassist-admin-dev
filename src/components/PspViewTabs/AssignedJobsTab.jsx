import { CalendarDays, ChevronDown, Eye, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AssignJobsDetailView from "./AssignJobsDetailView";
import SideSheet from "../SideSheet";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";
import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";

const assignedJobsRows = [
  { id: "J001", job: "Grocery Trip Assistance", member: "Margaret Thompson", status: "Completed", date: "Mar 12, 2026", duration: "1.5 hr", time: "02:15 PM - 03:45 PM", earning: "$130.50", rating: "4.5", avatarTone: "bg-[#F2F4F7]" },
  { id: "J002", job: "Cleaning", member: "Robert Chen", status: "Completed", date: "Feb 26, 2026", duration: "2 hr", time: "10:00 AM - 12:00 PM", earning: "$200.50", rating: "3.0", avatarTone: "bg-[#E0F2FE]" },
  { id: "J003", job: "Doctor Visit", member: "Helen Parker", status: "In Progress", date: "Jan 03, 2026", duration: "3.5 hr", time: "03:00 PM - 06:30 PM", earning: "$309.50", rating: "4.9", avatarTone: "bg-[#FEF3C7]" },
  { id: "J004", job: "Daily Care Assistance", member: "Northside", status: "Completed", date: "Mar 26, 2026", duration: "1 hr", time: "09:00 AM - 10:00 PM", earning: "$249.50", rating: "4.1", avatarTone: "bg-[#EDE9FE]" },
  { id: "J005", job: "Meal Preparation", member: "Margaret Thompson", status: "Completed", date: "Feb 14, 2026", duration: "0.5 hr", time: "10:00 AM - 10:30 PM", earning: "$30.50", rating: "3.9", avatarTone: "bg-[#F2F4F7]" },
  { id: "J006", job: "House Cleaning", member: "George Walker", status: "Completed", date: "Jan 21, 2026", duration: "2 hr", time: "10:00 AM - 12:00 PM", earning: "$128.50", rating: "4.0", avatarTone: "bg-[#DCFCE7]" },
  { id: "J007", job: "Cleaning", member: "Helen Parker", status: "Scheduled", date: "Feb 26, 2026", duration: "3.5 hr", time: "03:00 PM - 06:30 PM", earning: "$309.50", rating: "4.5", avatarTone: "bg-[#FEF3C7]" },
  { id: "J008", job: "Meal Preparation", member: "Susan Clark", status: "Completed", date: "Jan 03, 2026", duration: "1 hr", time: "09:00 AM - 10:00 PM", earning: "$249.50", rating: "4.9", avatarTone: "bg-[#FFEDD5]" },
  { id: "J009", job: "House Cleaning", member: "Mary O'Connor", status: "Canceled", date: "Mar 26, 2026", duration: "0.5 hr", time: "10:00 AM - 10:30 PM", earning: "$30.50", rating: "3.9", avatarTone: "bg-[#FCE7F3]" },
  { id: "J010", job: "Doctor Visit", member: "Carlos Rivera", status: "Scheduled", date: "Feb 14, 2026", duration: "1 hr", time: "02:30 PM - 03:30 PM", earning: "$128.50", rating: "4.0", avatarTone: "bg-[#E0F2FE]" },
];

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const AssignedJobsTab = ({ onOpenCompletedJob }) => {
  const [query, setQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [caregiver, setCaregiver] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [costRange, setCostRange] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return assignedJobsRows;

    return assignedJobsRows.filter(
      (row) =>
        row.job.toLowerCase().includes(normalizedQuery) ||
        row.id.toLowerCase().includes(normalizedQuery) ||
        row.member.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const handleViewJob = (row) => {
    if (row.status === "Completed") {
      onOpenCompletedJob?.(row);
      return;
    }
    if (row.status !== "In Progress") return;
    setSelectedJob(row);
    setIsJobDetailOpen(true);
  };

  useEffect(() => {
    if (isJobDetailOpen || !selectedJob) return undefined;

    const timer = window.setTimeout(() => {
      setSelectedJob(null);
    }, 320);

    return () => window.clearTimeout(timer);
  }, [isJobDetailOpen, selectedJob]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="relative w-full sm:max-w-[290px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by Job, Job ID Or Member"
            className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
          />
        </div>
        <Button
          onClick={() => setIsFiltersOpen(true)}
          variant="secondary"
          size="md"
          className="self-start sm:self-auto"
        >
          <SlidersHorizontal size={16} />
          Filters
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
        <TableWrapper>
          <Table minWidth="min-w-[1060px]">
            <TableHead>
              <Th>Job</Th>
              <Th>Member</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Duration</Th>
              <Th>Earning</Th>
              <Th>Rating</Th>
              <Th className="text-right">Actions</Th>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <Td>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-textColor">{row.job}</span>
                      <span className="mt-0.5 text-xs text-secondaryTextColor">ID: {row.id}</span>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-[#344054] ${row.avatarTone}`}
                      >
                        {getInitials(row.member)}
                      </span>
                      <span className="text-sm font-normal text-[#667085] underline underline-offset-2">{row.member}</span>
                    </div>
                  </Td>
                  <Td>
                    <StatusBadge
                      label={row.status}
                      tone={
                        row.status === "Completed"
                          ? "success"
                          : row.status === "In Progress"
                            ? "inProgress"
                            : row.status === "Scheduled"
                              ? "scheduled"
                              : row.status === "Canceled"
                                ? "canceled"
                                : "neutral"
                      }
                    />
                  </Td>
                  <Td>
                    <span className="text-sm text-[#667085]">{row.date}</span>
                  </Td>
                  <Td>
                    <div className="flex flex-col">
                      <span className="text-sm text-[#667085]">{row.duration}</span>
                      <span className="text-sm text-[#667085]">{row.time}</span>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-base font-normal text-[#667085]">{row.earning}</span>
                  </Td>
                  <Td>
                    <span className="text-base font-normal text-[#667085]">{row.rating}</span>
                  </Td>
                  <Td className="text-right">
                    <Button
                      onClick={() => handleViewJob(row)}
                      variant="icon"
                      size="icon"
                      aria-label={`View ${row.id}`}
                    >
                      <Eye size={14} />
                    </Button>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>

      <SideSheet
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        title="Filters"
        widthClass="w-[430px]"
        footer={(
          <div className="flex items-center gap-3">
            <Button variant="primary" size="lg" className="flex-1">
              Apply
            </Button>
            <Button
              onClick={() => setIsFiltersOpen(false)}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Service Type</label>
            <div className="relative">
              <select
                value={serviceType}
                onChange={(event) => setServiceType(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054]"
              >
                <option value="">Select Service Type</option>
                <option value="grocery">Grocery Trip Assistance</option>
                <option value="cleaning">Cleaning</option>
                <option value="doctor-visit">Doctor Visit</option>
                <option value="meal">Meal Preparation</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Caregiver (PSP)</label>
            <div className="relative">
              <select
                value={caregiver}
                onChange={(event) => setCaregiver(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054]"
              >
                <option value="">Select Caregiver (PSP)</option>
                <option value="maria-santos">Maria Santos</option>
                <option value="helen-parker">Helen Parker</option>
                <option value="robert-chen">Robert Chen</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range</label>
            <div className="relative">
              <input
                type="text"
                value={dateRange}
                onChange={(event) => setDateRange(event.target.value)}
                placeholder="MM-DD-YYY ~ MM-DD-YYYY"
                className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054] placeholder:text-[#98A2B3]"
              />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Cost Range</label>
            <div className="relative">
              <select
                value={costRange}
                onChange={(event) => setCostRange(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054]"
              >
                <option value="">Select Cost Range</option>
                <option value="0-100">$0 - $100</option>
                <option value="101-200">$101 - $200</option>
                <option value="201-350">$201 - $350</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>
        </div>
      </SideSheet>

      <AssignJobsDetailView
        isOpen={isJobDetailOpen}
        onClose={() => setIsJobDetailOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default AssignedJobsTab;
