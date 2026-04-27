import { AlertTriangle, CalendarDays, CheckCircle2, Eye, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";
import StatusBadge from "../ui/StatusBadge";

const summaryCards = [
  {
    title: "Current Availability",
    value: "Active",
    subtitle: "9:00 AM - 6:00 PM",
    icon: CheckCircle2,
    iconClass: "text-[#12B76A]",
    iconBadgeClass: "bg-[#ECFDF3]",
  },
  {
    title: "Upcoming Jobs",
    value: "9",
    subtitle: "Next Job: Today, 2:00 PM",
    suffix: "(This Week)",
    icon: CalendarDays,
    iconClass: "text-[#2E90FA]",
    iconBadgeClass: "bg-[#EFF8FF]",
  },
  {
    title: "Leave Status",
    value: "5",
    subtitle: "Upcoming Leave: Apr 04, 2026",
    icon: AlertTriangle,
    iconClass: "text-[#F04438]",
    iconBadgeClass: "bg-[#FEF3F2]",
  },
];

const weekDays = ["Sun 3/4", "Mon 4/4", "Tue 7/4", "Wed 8/4", "Thu 9/4", "Fri 10/4", "Sat 11/4"];
const timeSlots = ["09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm"];

const unavailableRows = [
  ["Apr 04, 2026", "Unavailable"],
  ["Apr 08, 2026 (4 hr)", "Partial Unavailable"],
  ["Apr 12, 2026 to Apr 14, 2026", "Unavailable"],
];

const scheduleRows = [
  ["Mar 12, 2026", "Margaret Thompson", "Grocery Trip Assistance", "1.5 hr", "02:15 PM - 03:45 PM", "Scheduled", "J001"],
  ["Feb 26, 2026", "Robert Chen", "Cleaning", "2 hr", "10:00 AM - 12:00 PM", "Scheduled", "J002"],
  ["Jan 03, 2026", "Helen Parker", "Doctor Visit", "3.5 hr", "03:00 PM - 06:30 PM", "Scheduled", "J003"],
  ["Mar 26, 2026", "Northside", "Daily Care Assistance", "1 hr", "09:00 AM - 10:00 AM", "Scheduled", "J004"],
  ["Feb 14, 2026", "Susan Clark", "Meal Preparation", "1 hr", "09:00 AM - 10:00 AM", "Scheduled", "J008"],
  ["Mar 26, 2026", "Mary O'Connor", "House Cleaning", "0.5 hr", "10:00 AM - 10:30 AM", "Scheduled", "J009"],
  ["Feb 14, 2026", "Carlos Rivera", "Doctor Visit", "1 hr", "02:30 PM - 03:30 PM", "Scheduled", "J010"],
];

const AvailabilityScheduleTab = () => (
  <div className="space-y-4 pb-2">
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {summaryCards.map((card) => (
        <div key={card.title} className="rounded-xl border border-line bg-white p-4 shadow-[0_1px_3px_0_rgba(16,24,40,0.06)]">
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg ${card.iconBadgeClass}`}>
                <card.icon size={18} className={card.iconClass} />
              </span>
              <p className="min-w-0 text-base font-semibold leading-6 text-[#101828]">
                {card.title}
                {card.suffix ? <span className="ml-1 text-sm font-medium text-[#667085]">{card.suffix}</span> : null}
              </p>
            </div>
            <p className="mt-2 text-xl font-semibold leading-7 text-[#101828]">{card.value}</p>
            <p className="mt-1 text-sm font-medium leading-5 text-[#667085]">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
      <div className="self-start rounded-xl border border-line bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.06)]">
        <div className="flex flex-col gap-2 border-b border-[#EAECF0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-textColor">Availability Details</p>
          <p className="text-sm text-secondaryTextColor"><span className="text-textColor">Last updated:</span> Mar 18, 2026</p>
        </div>

        <div className="p-4">
          <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex items-center self-start rounded-lg border border-[#FECACA] bg-white">
              <button type="button" className="h-8 rounded-l-lg border border-[#F04438] bg-[#FFF5F5] px-4 text-sm font-medium leading-none text-[#F04438]">
                Available
              </button>
              <button type="button" className="h-8 rounded-r-lg px-4 text-sm font-medium leading-none text-[#344054]">
                Unavailable
              </button>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              <button type="button" className="inline-flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-sm font-semibold leading-none text-[#344054] sm:w-auto">
                <CalendarDays size={14} />
                <span className="flex-1 text-left">Week 2: Apr 5 to Apr 11</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-sm font-semibold leading-none text-[#344054] sm:w-auto">
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] gap-4 text-xs font-medium text-secondaryTextColor">
                <div />
                {weekDays.map((day) => (
                  <div key={day} className="text-center">{day}</div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-[64px_repeat(7,minmax(0,1fr))] gap-4">
                <div className="grid grid-rows-10 gap-0">
                  {timeSlots.map((slot) => (
                    <div key={slot} className="h-8 text-xs leading-8 text-secondaryTextColor">
                      {slot}
                    </div>
                  ))}
                </div>

                {weekDays.map((day, dayIndex) => (
                  <div key={day} className="relative h-80 overflow-hidden rounded-sm">
                    <div className={`absolute inset-0 ${dayIndex === 0 ? "bg-[#98A2B3]/75" : "bg-[#8FD19E]"}`} />

                    {/* subtle hour separators to mimic the schedule graph */}
                    <div className="absolute inset-0 grid grid-rows-10">
                      {timeSlots.map((slot) => (
                        <div key={`${day}-${slot}`} className="border-t border-dashed border-[#1018281A] first:border-t-0" />
                      ))}
                    </div>

                    {dayIndex === 0 ? (
                      <>
                        <span className="absolute left-1/2 top-[28%] -translate-x-1/2 text-xs font-medium text-[#475467]">Unavailable</span>
                        <span className="absolute left-1/2 top-[68%] -translate-x-1/2 text-xs font-medium text-[#475467]">Unavailable</span>
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.06)]">
        <div className="border-b border-[#EAECF0] px-4 py-3">
          <p className="text-lg font-semibold text-textColor">Unavailable Dates</p>
        </div>
        <div className="p-4">
          <div className="mb-2 grid grid-cols-[1fr_auto] text-xs font-medium text-secondaryTextColor">
            <span>Date</span>
            <span>Status</span>
          </div>
          <div className="space-y-2">
            {unavailableRows.map(([date, status]) => (
              <div key={date} className="grid grid-cols-[1fr_auto] gap-2 text-sm">
                <span className="text-secondaryTextColor">{date}</span>
                <span className="rounded-full bg-[#FEF3F2] px-2 py-0.5 text-xs font-medium text-redRejected">{status}</span>
              </div>
            ))}
          </div>
          <button type="button" className="mt-4 w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-3 text-sm font-semibold text-textColor">
            Add Override
          </button>
        </div>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[300px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
          <input
            type="search"
            placeholder="Search by Service, Member"
            className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
          />
        </div>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054] sm:self-auto"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="rounded-xl border border-[#EAECF0] bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.06)]">
        <div className="flex flex-col gap-1 border-b border-[#EAECF0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-textColor">Upcoming Schedule</p>
          <p className="text-sm text-secondaryTextColor">Next job: Today at 2:00 PM</p>
        </div>
        <TableWrapper className="m-3 max-h-[360px] overflow-y-auto rounded-xl border border-line shadow-[0_1px_3px_0_rgba(16,24,40,0.06)] md:m-4 md:max-h-[420px]">
          <Table minWidth="min-w-[1080px]">
            <TableHead>
              <Th>Date</Th>
              <Th>Member</Th>
              <Th>Service</Th>
              <Th>Duration</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </TableHead>
            <TableBody>
              {scheduleRows.map((row) => (
                <TableRow key={row[6]}>
                  <Td>{row[0]}</Td>
                  <Td className="underline underline-offset-2">{row[1]}</Td>
                  <Td>
                    <div className="flex flex-col">
                      <span className="text-sm text-textColor">{row[2]}</span>
                      <span className="text-xs text-secondaryTextColor">ID: {row[6]}</span>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex flex-col">
                      <span>{row[3]}</span>
                      <span>{row[4]}</span>
                    </div>
                  </Td>
                  <Td>
                    <StatusBadge label={row[5]} tone="pending" />
                  </Td>
                  <Td className="text-right">
                    <button type="button" className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085]">
                      <Eye size={14} />
                    </button>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    </div>
  </div>
);

export default AvailabilityScheduleTab;
