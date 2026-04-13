import { Search, Filter, Eye, Star, CalendarDays, ChevronDown } from "lucide-react";
import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import userProfile from "../../assets/userProfile.png";
import SideSheet from "../SideSheet";
import DateRangePopover from "../DateRangePopover";
import ComplaintDetailsSheet from "./ComplaintDetailsSheet";

const complaintsData = [
  {
    id: "#EA-001234",
    caregiver: "Maria Santos",
    service: "Grocery Trip Assistance",
    issueType: "Provider behavior & Service quality",
    date: "Mar 12, 2026",
    source: "From Review",
    status: "New",
    rating: "2.0",
    issueDetails: "The provider did not clearly explain the service process or failed to properly communicate during the visit.",
    requestedResolution: "Just reporting",
    images: [],
  },
  {
    id: "#EA-001232",
    caregiver: "Lisa Wong",
    service: "Cleaning",
    issueType: "Late arrival",
    date: "Feb 26, 2026",
    source: "Direct Complaint",
    status: "Resolved",
    rating: "1.0",
    issueDetails: "The caregiver arrived more than 2 hours late without any prior notice or apology, causing significant inconvenience.",
    requestedResolution: "Apology & refund for the delay",
    images: [],
  },
  {
    id: "#EA-001230",
    caregiver: "John Carter",
    service: "Doctor Visit",
    issueType: "Safety concern",
    date: "Jan 03, 2026",
    source: "Call Center",
    status: "In Review",
    rating: "3.0",
    issueDetails: "The caregiver left the patient unattended briefly in an unsafe environment without proper precautions being taken.",
    requestedResolution: "Review of safety protocols",
    images: [],
  },
  {
    id: "#EA-001229",
    caregiver: "John Smith",
    service: "Daily Care Assistance",
    issueType: "Other",
    date: "Mar 26, 2026",
    source: "From Review",
    status: "Refund Issued",
    rating: "2.0",
    issueDetails: "The service quality was below expectations. Several tasks were left incomplete and required follow-up from another provider.",
    requestedResolution: "Refund",
    images: [],
  },
  {
    id: "#EA-001228",
    caregiver: "David Lee Joseph",
    service: "Meal Preparation",
    issueType: "Provider behavior & Service quality",
    date: "Feb 14, 2026",
    source: "Direct Complaint",
    status: "Awaiting Refund",
    rating: "1.0",
    issueDetails: "The meal was tasteless, as the kitchen and basically were left dirty even after I had asked to clean them multiple times.\nI also had to pay an extra for that, but the service did not meet expectations.",
    requestedResolution: "Refund",
    images: [
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=160&fit=crop",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=160&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=160&fit=crop",
    ],
  },
  {
    id: "#EA-001348",
    caregiver: "John Carter",
    service: "House Cleaning",
    issueType: "Payment issue",
    date: "Jan 21, 2026",
    source: "Call Center",
    status: "Closed",
    rating: "1.0",
    issueDetails: "An incorrect charge was applied to the billing account. The amount deducted did not match the agreed service price.",
    requestedResolution: "Billing correction & refund of overcharge",
    images: [],
  },
];

const getStatusBadge = (status) => {
  const meta = {
    "New": { bg: "bg-[#FEF3F2]", text: "text-[#D92D20]" },
    "Resolved": { bg: "bg-[#ECFDF3]", text: "text-[#039855]" },
    "In Review": { bg: "bg-[#F2F4F7]", text: "text-[#344054]" },
    "Refund Issued": { bg: "bg-[#F0F9FF]", text: "text-[#007AFF]" },
    "Awaiting Refund": { bg: "bg-[#FFFAEB]", text: "text-[#DC6803]" },
    "Closed": { bg: "bg-[#ECFDF3]", text: "text-[#039855]" },
  };
  const config = meta[status] || meta["In Review"];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
      {status}
    </span>
  );
};

const tableHeadClass = "px-4 py-3 text-left text-[14px] font-semibold text-[#344054] border-b border-[#EAECF0] first:pl-6 last:pr-6 whitespace-nowrap";
const tableCellClass = "px-4 py-3.5 align-middle text-[14px] text-secondaryTextColor font-normal first:pl-6 last:pr-6 align-middle";

const initialFilters = {
  serviceTypes: [],
  caregivers: [],
  issueTypes: [],
  statuses: [],
  sources: [],
  dateStart: "",
  dateEnd: "",
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

const parseRowServiceDate = (dateStr) => {
  const t = Date.parse(String(dateStr));
  if (Number.isNaN(t)) return null;
  return new Date(t);
};

const CheckboxSelect = ({ label, placeholder, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (optValue) => {
    if (value.includes(optValue)) onChange(value.filter((v) => v !== optValue));
    else onChange([...value, optValue]);
  };

  const displayText = value.length === 0 ? placeholder : `${value.length} selected`;

  return (
    <div className="relative" ref={containerRef}>
      <label className="mb-1.5 block text-sm font-medium text-[#344054]">{label}</label>
      <div
        className="flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] focus:border-gradientVia focus:ring-1 focus:ring-gradientVia"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className={value.length === 0 ? "text-[#98A2B3]" : "text-[#101828]"}>{displayText}</span>
        <ChevronDown size={16} className="text-[#98A2B3]" />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-[#EAECF0] bg-white shadow-lg">
          <div
            className="cursor-pointer bg-[#F2F4F7] px-3 py-2 text-sm font-semibold text-[#344054]"
            onClick={() => {
              onChange([]);
              setIsOpen(false);
            }}
          >
            All
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {options.map((opt) => (
              <label key={opt} className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-[#F9FAFB]">
                <input
                  type="checkbox"
                  checked={value.includes(opt)}
                  onChange={() => handleToggle(opt)}
                  className="size-4 shrink-0 rounded border-[#D0D5DD] text-[#F04438] focus:ring-[#F04438]"
                />
                <span className="text-sm text-[#344054] truncate">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};



const ComplaintsNotesTab = () => {
  const [query, setQuery] = useState("");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);

  const rangeAnchorRef = useRef(null);
  const [isRangePickerOpen, setIsRangePickerOpen] = useState(false);

  const closeRangePicker = useCallback(() => setIsRangePickerOpen(false), []);
  const toggleRangePicker = useCallback(() => setIsRangePickerOpen((open) => !open), []);

  const handleRangeComplete = useCallback((startIso, endIso) => {
    setDraftFilters((prev) => ({ ...prev, dateStart: startIso, dateEnd: endIso }));
    setIsRangePickerOpen(false);
  }, []);

  const clearDateRange = useCallback((event) => {
    event.stopPropagation();
    setDraftFilters((prev) => ({ ...prev, dateStart: "", dateEnd: "" }));
    setIsRangePickerOpen(false);
  }, []);

  const openFilters = () => {
    setDraftFilters(appliedFilters);
    setIsFilterSheetOpen(true);
  };

  const openViewSheet = (complaint) => {
    setSelectedComplaint(complaint);
    setIsViewSheetOpen(true);
  };

  const closeViewSheet = () => {
    setIsViewSheetOpen(false);
  };

  const closeFilters = () => {
    setIsRangePickerOpen(false);
    setIsFilterSheetOpen(false);
  };

  const handleApply = () => {
    setAppliedFilters({ ...draftFilters });
    closeFilters();
  };

  const updateDraft = (key, value) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return complaintsData.filter((row) => {
      const q = query.trim().toLowerCase();
      if (q && !row.id.toLowerCase().includes(q) && !row.service.toLowerCase().includes(q) && !row.issueType.toLowerCase().includes(q)) {
        return false;
      }

      const { serviceTypes, caregivers, issueTypes, statuses, sources, dateStart, dateEnd } = appliedFilters;
      if (serviceTypes.length > 0 && !serviceTypes.includes(row.service)) return false;
      if (caregivers.length > 0 && !caregivers.includes(row.caregiver)) return false;
      if (issueTypes.length > 0 && !issueTypes.includes(row.issueType)) return false;
      if (statuses.length > 0 && !statuses.includes(row.status)) return false;
      if (sources.length > 0 && !sources.includes(row.source)) return false;

      if (dateStart || dateEnd) {
        const rowDate = parseRowServiceDate(row.date);
        if (!rowDate) return false;
        if (dateStart && rowDate < new Date(`${dateStart}T00:00:00`)) return false;
        if (dateEnd && rowDate > new Date(`${dateEnd}T23:59:59.999`)) return false;
      }

      return true;
    });
  }, [query, appliedFilters]);

  const uniqueOptions = useMemo(() => {
    return {
      serviceTypes: Array.from(new Set(complaintsData.map(d => d.service))),
      caregivers: Array.from(new Set(complaintsData.map(d => d.caregiver))),
      issueTypes: Array.from(new Set(complaintsData.map(d => d.issueType))),
      statuses: Array.from(new Set(complaintsData.map(d => d.status))),
      sources: Array.from(new Set(complaintsData.map(d => d.source))),
    };
  }, []);

  const rangeDisplay = buildRangeDisplay(draftFilters.dateStart, draftFilters.dateEnd);

  return (
    <>
      <div className="flex h-full min-h-0 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-[420px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#667085]" strokeWidth={2.5} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Complaint ID, Service, Issue Type"
              className="h-[42px] w-full rounded-lg border border-[#D0D5DD] bg-white pl-[38px] pr-3 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={openFilters}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] sm:px-4"
          >
            <Filter size={18} strokeWidth={2} className="text-[#667085]" />
            Filters
          </button>
        </div>

        <div className="min-h-0 shrink overflow-auto rounded-xl border border-[#EAECF0] bg-white">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="bg-[#FCFCFD]">
                <th className={tableHeadClass}>Complaint ID</th>
                <th className={tableHeadClass}>Caregiver (PSP)</th>
                <th className={tableHeadClass}>Service</th>
                <th className={tableHeadClass}>Issue Type</th>
                <th className={tableHeadClass}>Date Reported</th>
                <th className={tableHeadClass}>Source</th>
                <th className={tableHeadClass}>Status</th>
                <th className={tableHeadClass}>Rating</th>
                <th className={tableHeadClass}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB]/80 transition-colors">
                  <td className={tableCellClass}>
                    <span className="font-normal text-secondaryTextColor">{row.id}</span>
                  </td>
                  <td className={tableCellClass}>
                    <div className="flex items-center gap-2.5">
                      <img
                        src={userProfile}
                        alt={row.caregiver}
                        className="size-[30px] rounded-full object-cover ring-1 ring-[#EAECF0]"
                      />
                      <span className="font-normal text-secondaryTextColor underline underline-offset-2">
                        {row.caregiver}
                      </span>
                    </div>
                  </td>
                  <td className={tableCellClass}>{row.service}</td>
                  <td className="font-normal text-[#1D2939]">{row.issueType}</td>
                  <td className={tableCellClass}>{row.date}</td>
                  <td className={tableCellClass}>{row.source}</td>
                  <td className={tableCellClass}>{getStatusBadge(row.status)}</td>
                  <td className={tableCellClass}>
                    <div className="flex items-center gap-1.5 font-normal text-secondaryTextColor">
                      <Star
                        size={16}
                        strokeWidth={2}
                        className={
                          Number(row.rating) <= 2
                            ? "fill-[#EF7C74] text-[#F97066]"
                            : "fill-[#A8A8A7] text-[#D0D5DD]"
                        }
                      />
                      {row.rating}
                    </div>
                  </td>
                  <td className={tableCellClass}>
                    <button
                      type="button"
                      onClick={() => openViewSheet(row)}
                      className="inline-flex size-[34px] items-center justify-center rounded-lg border border-[#EAECF0] text-[#667085] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F2F4F7] hover:text-[#344054]"
                      aria-label={`View Complaint ${row.id}`}
                    >
                      <Eye size={18} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm text-[#667085]">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* View Complaint Details Side Sheet */}
      <ComplaintDetailsSheet
        complaint={selectedComplaint}
        isOpen={isViewSheetOpen}
        onClose={closeViewSheet}
        onAction={(action) => console.log("Action:", action, selectedComplaint?.id)}
      />

      {/* Filters Side Sheet */}
      <SideSheet
        isOpen={isFilterSheetOpen}
        onClose={closeFilters}
        title="Filters"
        footer={
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleApply}
              className="h-11 flex-1 rounded-lg bg-[#F04438] hover:bg-[#D92D20] text-sm font-semibold text-white transition-colors"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={closeFilters}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <CheckboxSelect
            label="Service Type"
            placeholder="Select Service Type"
            options={uniqueOptions.serviceTypes}
            value={draftFilters.serviceTypes}
            onChange={(val) => updateDraft("serviceTypes", val)}
          />
          <CheckboxSelect
            label="Caregiver (PSP)"
            placeholder="Select Caregiver (PSP)"
            options={uniqueOptions.caregivers}
            value={draftFilters.caregivers}
            onChange={(val) => updateDraft("caregivers", val)}
          />
          <CheckboxSelect
            label="Issue Type"
            placeholder="Select Issue Type"
            options={uniqueOptions.issueTypes}
            value={draftFilters.issueTypes}
            onChange={(val) => updateDraft("issueTypes", val)}
          />
          <CheckboxSelect
            label="Status"
            placeholder="Select Status"
            options={uniqueOptions.statuses}
            value={draftFilters.statuses}
            onChange={(val) => updateDraft("statuses", val)}
          />
          <CheckboxSelect
            label="Source"
            placeholder="Select Source"
            options={uniqueOptions.sources}
            value={draftFilters.sources}
            onChange={(val) => updateDraft("sources", val)}
          />

          <div>
            <span className="mb-1.5 block text-sm font-medium text-[#344054]">Date Reported</span>
            <div ref={rangeAnchorRef} className="relative">
              <input
                id="cn-filter-date-range-display"
                type="text"
                readOnly
                value={rangeDisplay}
                placeholder="MM-DD-YYYY - MM-DD-YYYY"
                onClick={toggleRangePicker}
                className="h-11 w-full cursor-pointer rounded-lg border border-[#D0D5DD] bg-white px-3 pr-[80px] text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
              />
              {rangeDisplay ? (
                <button
                  type="button"
                  onClick={clearDateRange}
                  className="absolute right-8 top-1/2 -translate-y-1/2 rounded p-1 text-[#98A2B3] hover:bg-[#F2F4F7] hover:text-[#667085]"
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
        </div>
      </SideSheet>
    </>
  );
};

export default ComplaintsNotesTab;
