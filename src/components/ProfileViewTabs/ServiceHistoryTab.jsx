import {
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import DateRangePopover from "../DateRangePopover";
import IndividualServiceDetailsView from "./IndividualServiceDetailsView";
import userProfile from "../../assets/userProfile.png";
import SideSheet from "../SideSheet";

const tableHeadClass =
  "px-4 py-3 text-left text-sm font-medium text-textColor first:pl-6 last:pr-6 border";
const tableCellClass = "px-4 py-1.5 align-middle text-sm first:pl-6 last:pr-6";

const serviceRows = [
  {
    service: "Grocery Trip Assistance",
    id: "ID: S001",
    caregiver: "Maria Santos",
    quality: "Strong",
    date: "Mar 12, 2026",
    duration: "1.5 hr",
    slot: "02:15 PM - 03:45 PM",
    cost: "$130.50",
    rating: "4.5",
  },
  {
    service: "Cleaning",
    id: "ID: S002",
    caregiver: "Lisa Wong",
    quality: "Weak",
    date: "Feb 26, 2026",
    duration: "2 hr",
    slot: "10:00 AM - 12:00 PM",
    cost: "$200.50",
    rating: "3.0",
  },
  {
    service: "Doctor Visit",
    id: "ID: S003",
    caregiver: "John Carter",
    quality: "Strong",
    date: "Jan 03, 2026",
    duration: "3.5 hr",
    slot: "03:00 PM - 06:30 PM",
    cost: "$309.50",
    rating: "4.9",
  },
  {
    service: "Daily Care Assistance",
    id: "ID: S004",
    caregiver: "John Smith",
    quality: "Moderate",
    date: "Mar 26, 2026",
    duration: "9:00 A",
    slot: "09:00 AM - 10:00 PM",
    cost: "$249.50",
    rating: "4.1",
  },
  {
    service: "Meal Preparation",
    id: "ID: S006",
    caregiver: "David Leo Joseph",
    quality: "Strong",
    date: "Feb 14, 2026",
    duration: "0.5 hr",
    slot: "10:00 AM - 10:30 PM",
    cost: "$30.50",
    rating: "3.9",
  },
  {
    service: "House Cleaning",
    id: "ID: S006",
    caregiver: "John Carter",
    quality: "Moderate",
    date: "Jan 21, 2026",
    duration: "1 hr",
    slot: "02:30 PM - 03:30 PM",
    cost: "$128.50",
    rating: "4.0",
  },
];

const SERVICE_TYPE_OPTIONS = [
  { value: "", label: "Select Service Type" },
  { value: "all", label: "All" },
  { value: "Bath Help", label: "Bath Help" },
  { value: "Meal Help", label: "Meal Help" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Nurse Visit", label: "Nurse Visit" },
  { value: "Medicine Help", label: "Medicine Help" },
  { value: "Doctor Visit", label: "Doctor Visit" },
  { value: "Grocery Help", label: "Grocery Help" },
  { value: "Grocery Trip Assistance", label: "Grocery Trip Assistance" },
  { value: "Companion", label: "Companion" },
  { value: "Handyman", label: "Handyman" },
  { value: "Tech Help", label: "Tech Help" },
  { value: "Local Services", label: "Local Services" },
  { value: "Daily Care Assistance", label: "Daily Care Assistance" },
  { value: "Meal Preparation", label: "Meal Preparation" },
  { value: "House Cleaning", label: "House Cleaning" },
];

const CAREGIVER_OPTIONS = [
  { value: "", label: "Select Caregiver (PSP)" },
  ...Array.from(new Set(serviceRows.map((r) => r.caregiver))).map((name) => ({
    value: name,
    label: name,
  })),
];

const COST_RANGE_OPTIONS = [
  { value: "", label: "Select Cost Range" },
  { value: "under50", label: "Under $50" },
  { value: "50-100", label: "$50 – $100" },
  { value: "101-200", label: "$101 – $200" },
  { value: "201-300", label: "$201 – $300" },
  { value: "301-500", label: "$301 – $500" },
  { value: "over500", label: "More than $500" },
];

const parseCostValue = (costStr) => {
  const n = Number.parseFloat(String(costStr).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const parseRowServiceDate = (dateStr) => {
  const t = Date.parse(String(dateStr));
  if (Number.isNaN(t)) return null;
  return new Date(t);
};

const costMatchesRange = (costStr, rangeKey) => {
  if (!rangeKey) return true;
  const n = parseCostValue(costStr);
  switch (rangeKey) {
    case "under50":
      return n < 50;
    case "50-100":
      return n >= 50 && n <= 100;
    case "101-200":
      return n >= 101 && n <= 200;
    case "201-300":
      return n >= 201 && n <= 300;
    case "301-500":
      return n >= 301 && n <= 500;
    case "over500":
      return n > 500;
    default:
      return true;
  }
};

const selectClass =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia disabled:text-[#98A2B3]";

const qualityMeta = {
  Strong: {
    dot: "bg-[#12B76A]",
    text: "text-[#344054]",
    title: "Strong Match Quality",
    description: "Multiple PSPs was available within budget entered by Member.",
  },
  Moderate: {
    dot: "bg-[#F79009]",
    text: "text-[#344054]",
    title: "Moderate Match Quality",
    description: "Limited PSPs available within budget entered by Member.",
  },
  Weak: {
    dot: "bg-[#F04438]",
    text: "text-[#344054]",
    title: "Weak Match Quality",
    description: "Few PSPs available within budget entered by Member.",
  },
};

const MatchQuality = ({ quality }) => {
  const meta = qualityMeta[quality] ?? qualityMeta.Moderate;

  return (
    <div
      className="inline-flex items-center gap-1.5"
      title={`${meta.title}: ${meta.description}`}
      aria-label={`${meta.title}: ${meta.description}`}
    >
      <span
        className={`size-2.5 rounded-full ${meta.dot}`}
        title={`${meta.title}: ${meta.description}`}
      />
      <span
        className={`text-xs ${meta.text}`}
        title={`${meta.title}: ${meta.description}`}
      >
        {quality}
      </span>
    </div>
  );
};

const initialFilters = {
  serviceType: "",
  caregiver: "",
  dateStart: "",
  dateEnd: "",
  costRange: "",
};

const isoToMdY = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "";
  return `${m}-${d}-${y}`;
};

const buildRangeDisplay = (dateStart, dateEnd) => {
  const from = isoToMdY(dateStart);
  const to = isoToMdY(dateEnd);
  if (from && to) return `${from} - ${to}`;
  if (from) return `${from} - `;
  return "";
};

const rangeDisplayInputClass =
  "h-11 w-full cursor-pointer rounded-lg border border-[#D0D5DD] bg-white px-3 pr-20 text-sm text-[#344054] placeholder:text-[#98A2B3] read-only:bg-white focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia";

const ServiceHistoryTab = () => {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [selectedService, setSelectedService] = useState(null);
  const rangeAnchorRef = useRef(null);
  const [isRangePickerOpen, setIsRangePickerOpen] = useState(false);

  const closeRangePicker = useCallback(() => {
    setIsRangePickerOpen(false);
  }, []);

  const toggleRangePicker = useCallback(() => {
    setIsRangePickerOpen((open) => !open);
  }, []);

  const handleRangeComplete = useCallback((startIso, endIso) => {
    setDraftFilters((prev) => ({ ...prev, dateStart: startIso, dateEnd: endIso }));
    setIsRangePickerOpen(false);
  }, []);

  const clearDateRange = useCallback((event) => {
    event.stopPropagation();
    setDraftFilters((prev) => ({ ...prev, dateStart: "", dateEnd: "" }));
    setIsRangePickerOpen(false);
  }, []);

  const filteredRows = useMemo(() => {
    return serviceRows.filter((row) => {
      const { serviceType, caregiver, costRange, dateStart, dateEnd } = appliedFilters;

      if (caregiver && row.caregiver !== caregiver) {
        return false;
      }

      if (!costMatchesRange(row.cost, costRange)) {
        return false;
      }

      const rowDate = parseRowServiceDate(row.date);
      if (dateStart) {
        const start = new Date(`${dateStart}T00:00:00`);
        if (!rowDate || rowDate < start) {
          return false;
        }
      }
      if (dateEnd) {
        const end = new Date(`${dateEnd}T23:59:59.999`);
        if (!rowDate || rowDate > end) {
          return false;
        }
      }

      if (!serviceType || serviceType === "all") {
        return true;
      }

      if (serviceType === "Grocery Help") {
        return /grocery/i.test(row.service);
      }

      return row.service === serviceType;
    });
  }, [appliedFilters]);

  const openFilters = () => {
    setDraftFilters(appliedFilters);
    setIsFilterSheetOpen(true);
  };

  const closeFilters = () => {
    setIsRangePickerOpen(false);
    setIsFilterSheetOpen(false);
  };

  const handleApply = () => {
    setAppliedFilters({ ...draftFilters });
    closeFilters();
  };

  const handleCancel = () => {
    setDraftFilters(appliedFilters);
    closeFilters();
  };

  const updateDraft = (key, value) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const rangeDisplay = buildRangeDisplay(draftFilters.dateStart, draftFilters.dateEnd);

  return (
    <>
      <section className="flex h-full min-h-0 flex-col overflow-hidden">
        {selectedService ? (
          <IndividualServiceDetailsView
            service={selectedService}
            onBack={() => setSelectedService(null)}
          />
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div className="relative w-full max-w-[420px]">
                <input
                  type="search"
                  placeholder="Search by Service, Service ID, PSP"
                  className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
                />
              </div>
              <button
                type="button"
                onClick={openFilters}
                className="ml-3 inline-flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.91699 10.7754C9.49286 10.7754 10.812 11.8731 11.1523 13.3457H17.708C18.1219 13.346 18.4578 13.6818 18.458 14.0957C18.458 14.5098 18.122 14.8454 17.708 14.8457H11.1523C10.8122 16.3185 9.49308 17.417 7.91699 17.417C6.3411 17.4168 5.0226 16.3183 4.68262 14.8457H2.29102C1.87695 14.8455 1.54004 14.5098 1.54004 14.0957C1.54024 13.6818 1.87707 13.3459 2.29102 13.3457H4.68262C5.02284 11.8733 6.34133 10.7756 7.91699 10.7754ZM7.91699 12.2754C6.91159 12.2756 6.09668 13.0912 6.09668 14.0967C6.09714 15.1018 6.91187 15.9167 7.91699 15.917C8.92232 15.917 9.73782 15.1019 9.73828 14.0967C9.73828 13.0911 8.92261 12.2754 7.91699 12.2754ZM12.083 2.58301C13.6588 2.58322 14.9772 3.68177 15.3174 5.1543H17.707C18.1211 5.15447 18.457 5.49019 18.457 5.9043C18.4568 6.31823 18.121 6.65412 17.707 6.6543H15.3174C14.9773 8.1268 13.6588 9.2244 12.083 9.22461C10.507 9.22461 9.18787 8.12694 8.84766 6.6543H2.29004C1.87595 6.6543 1.54024 6.31834 1.54004 5.9043C1.54004 5.49008 1.87583 5.1543 2.29004 5.1543H8.84766C9.18793 3.68162 10.5071 2.58301 12.083 2.58301ZM12.083 4.08301C11.0775 4.08301 10.2619 4.89883 10.2617 5.9043C10.262 6.90971 11.0775 7.72461 12.083 7.72461C13.0883 7.72436 13.9031 6.90955 13.9033 5.9043C13.9031 4.89898 13.0883 4.08325 12.083 4.08301Z" fill="#344054"/>
                </svg>
                Filters
              </button>
            </div>

            <div className="min-h-0 overflow-auto rounded-xl border border-[#E4E7EC] bg-white">
              <table className="w-full min-w-[980px] border-collapse">
                <thead>
                  <tr className="border border-[#F2F4F7] bg-tableHeader">
                    {["Service", "Caregiver (PSP)", "Match Quality", "Date", "Duration", "Cost", "Rating", "Actions"].map((head) => (
                      <th key={head} className={tableHeadClass}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {filteredRows.map((row) => (
                    <tr key={`${row.service}-${row.id}`} className="bg-white hover:bg-[#F9FAFB]/80">
                      <td className={tableCellClass}>
                        <p className="text-sm font-medium text-[#101828]">{row.service}</p>
                        <p className="mt-0.5 text-xs text-[#475467]">{row.id}</p>
                      </td>
                      <td className={tableCellClass}>
                        <div className="flex items-center gap-2">
                          <img src={userProfile} alt="" className="size-8 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                          <p className="text-sm text-[#344054] underline underline-offset-4">{row.caregiver}</p>
                        </div>
                      </td>
                      <td className={tableCellClass}>
                        <MatchQuality quality={row.quality} />
                      </td>
                      <td className={`${tableCellClass} text-[#475467]`}>{row.date}</td>
                      <td className={tableCellClass}>
                        <p className="text-sm text-[#667085]">{row.duration}</p>
                        <p className="mt-0.5 text-xs text-[#667085]">{row.slot}</p>
                      </td>
                      <td className={`${tableCellClass} text-[#475467]`}>{row.cost}</td>
                      <td className={`${tableCellClass} text-[#475467]`}>{row.rating}</td>
                      <td className={tableCellClass}>
                        <button
                          type="button"
                          onClick={() => setSelectedService(row)}
                          className="inline-flex size-9 items-center justify-center rounded-lg border border-lineMuted text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054]"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.875 7C0.875 7 3.0625 2.625 7 2.625C10.9375 2.625 13.125 7 13.125 7C13.125 7 10.9375 11.375 7 11.375C3.0625 11.375 0.875 7 0.875 7Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 8.64062C7.90672 8.64062 8.64062 7.90672 8.64062 7C8.64062 6.09328 7.90672 5.35938 7 5.35938C6.09328 5.35938 5.35938 6.09328 5.35938 7C5.35938 7.90672 6.09328 8.64062 7 8.64062Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <SideSheet
        isOpen={isFilterSheetOpen}
        onClose={handleCancel}
        title="Filters"
        footer={
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleApply}
              className="h-11 flex-1 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-base font-semibold text-white"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-base font-medium text-[#344054]"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <div>
            <label htmlFor="sh-filter-service" className="mb-1.5 block text-sm font-medium text-[#344054]">
              Service Type
            </label>
            <div className="relative">
              <select
                id="sh-filter-service"
                value={draftFilters.serviceType}
                onChange={(e) => updateDraft("serviceType", e.target.value)}
                className={selectClass}
              >
                {SERVICE_TYPE_OPTIONS.map((opt) => (
                  <option key={`${opt.value}-${opt.label}`} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label htmlFor="sh-filter-caregiver" className="mb-1.5 block text-sm font-medium text-[#344054]">
              Caregiver (PSP)
            </label>
            <div className="relative">
              <select
                id="sh-filter-caregiver"
                value={draftFilters.caregiver}
                onChange={(e) => updateDraft("caregiver", e.target.value)}
                className={selectClass}
              >
                {CAREGIVER_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-[#344054]">Date Range</span>
            <div ref={rangeAnchorRef} className="relative">
              <input
                id="sh-filter-date-range-display"
                type="text"
                readOnly
                value={rangeDisplay}
                placeholder="MM-DD-YYYY - MM-DD-YYYY"
                onClick={toggleRangePicker}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleRangePicker();
                  }
                  if ((e.key === "Backspace" || e.key === "Delete") && rangeDisplay) {
                    e.preventDefault();
                    setDraftFilters((prev) => ({ ...prev, dateStart: "", dateEnd: "" }));
                    setIsRangePickerOpen(false);
                  }
                }}
                className={rangeDisplayInputClass}
                aria-describedby="sh-filter-date-range-hint"
                aria-expanded={isRangePickerOpen}
              />
              <span id="sh-filter-date-range-hint" className="sr-only">
                One calendar: choose start date, then end date; the panel then closes.
              </span>
              {rangeDisplay ? (
                <button
                  type="button"
                  onClick={clearDateRange}
                  className="absolute right-8 top-1/2 -translate-y-1/2 rounded p-1 text-[#98A2B3] hover:bg-[#F2F4F7] hover:text-[#667085]"
                  aria-label="Clear date range"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              ) : null}
              <button
                type="button"
                onClick={toggleRangePicker}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#98A2B3] hover:bg-[#F2F4F7] hover:text-[#667085]"
                aria-label="Choose date range"
                aria-expanded={isRangePickerOpen}
              >
                <CalendarDays className="size-4" />
              </button>
              {isRangePickerOpen ? (
                <DateRangePopover
                  anchorRef={rangeAnchorRef}
                  initialStart={draftFilters.dateStart}
                  initialEnd={draftFilters.dateEnd}
                  onComplete={handleRangeComplete}
                  onDismiss={closeRangePicker}
                />
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="sh-filter-cost" className="mb-1.5 block text-sm font-medium text-[#344054]">
              Cost Range
            </label>
            <div className="relative">
              <select
                id="sh-filter-cost"
                value={draftFilters.costRange}
                onChange={(e) => updateDraft("costRange", e.target.value)}
                className={selectClass}
              >
                {COST_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>
        </div>
      </SideSheet>
    </>
  );
};

export default ServiceHistoryTab;
