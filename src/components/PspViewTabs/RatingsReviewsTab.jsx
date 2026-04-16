import { ArrowDown, ArrowUp, Check, ChevronDown, Eye, Flag, Plus, Search, SlidersHorizontal, Star } from "lucide-react";
import { useMemo, useState } from "react";
import userProfile from "../../assets/userProfile.png";
import CreateComplaintSideSheet from "./CreateComplaintSideSheet";
import SideSheet from "../SideSheet";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";

const reviewRows = [
  { id: "J001", date: "Mar 12, 2026", member: "Margaret Thompson", service: "Grocery Trip Assistance", rating: 4.5, comment: "Maria is always punctual, attentive, and caring. She assist me with my grocery needs.", status: "New" },
  { id: "J002", date: "Feb 26, 2026", member: "Robert Chen", service: "Cleaning", rating: 2.0, comment: "Therapist arrived late and session felt rushed.", status: "Flagged" },
  { id: "J003", date: "Jan 03, 2026", member: "Helen Parker", service: "Doctor Visit", rating: 4.0, comment: "Good service overall but communication could be better.", status: "Reviewed" },
  { id: "J004", date: "Mar 26, 2026", member: "Northside", service: "Daily Care Assistance", rating: 1.0, comment: "Very disappointing experience, caregiver was untrained. also Therapist arrived late and session.", status: "Flagged" },
  { id: "J005", date: "Feb 14, 2026", member: "Margaret Thompson", service: "Meal Preparation", rating: 5.0, comment: "Extremely polite and supportive caregiver. Highly recommended.", status: "Reviewed" },
  { id: "J006", date: "Jan 21, 2026", member: "George Walker", service: "House Cleaning", rating: 4.0, comment: "Caregiver was very attentive and professional throughout the visit.", status: "Reviewed" },
  { id: "J007", date: "Feb 26, 2026", member: "Helen Parker", service: "Cleaning", rating: 3.0, comment: "Average session, expected more personalized attention.", status: "Flagged" },
  { id: "J008", date: "Jan 03, 2026", member: "Susan Clark", service: "Meal Preparation", rating: 4.9, comment: "Excellent service, very satisfied with the care provided.", status: "Reviewed" },
  { id: "J009", date: "Mar 26, 2026", member: "Mary O'Connor", service: "House Cleaning", rating: 1.0, comment: "Caregiver did not show up on time and no prior notice given.", status: "Flagged" },
  { id: "J010", date: "Feb 14, 2026", member: "Carlos Rivera", service: "Doctor Visit", rating: 4.0, comment: "Good improvement after sessions, therapist was skilled.", status: "Reviewed" },
];

const statusClass = {
  New: "bg-[#F2F4F7] text-[#667085]",
  Reviewed: "bg-[#EFF8FF] text-[#175CD3]",
  Flagged: "bg-[#FEF3F2] text-[#F04438]",
};

const metrics = [
  { label: "Average Rating", value: "4.6", delta: "+1.5%", positive: true },
  { label: "Total Reviews", value: "186", delta: "+19", positive: true },
  { label: "5-star Reviews", value: "72%", delta: "+2%", positive: true },
  { label: "Low-rated Reviews:", value: "8", delta: "-2", positive: false },
];

const RatingsReviewsTab = () => {
  const [query, setQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [caregiver, setCaregiver] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [costRange, setCostRange] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [isReviewSheetOpen, setIsReviewSheetOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isTimelineSheetOpen, setIsTimelineSheetOpen] = useState(false);
  const [isComplaintSheetOpen, setIsComplaintSheetOpen] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return reviewRows;

    return reviewRows.filter(
      (row) =>
        row.member.toLowerCase().includes(q) ||
        row.service.toLowerCase().includes(q) ||
        row.id.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
        <button
          type="button"
          onClick={() => setIsFiltersOpen(true)}
          className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054] sm:self-auto"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((card) => (
          <div key={card.label} className="rounded-xl border border-line bg-white px-4 py-4">
            <p className="text-lg font-medium text-textColor">{card.label}</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-2xl leading-none font-semibold text-[#1D2939]">{card.value}</p>
              <div className="flex gap-1 items-center">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium ${
                  card.positive ? "bg-[#ECFDF3] text-[#039855]" : "bg-[#FEF3F2] text-[#F04438]"
                }`}
              >
                {card.positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {card.delta}
              </span>
              <span className="text-sm text-[#667085]">this month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <TableWrapper>
          <Table minWidth="min-w-[1180px]">
          <TableHead>
            <Th>Date</Th>
            <Th>Member</Th>
            <Th>Service</Th>
            <Th>Rating</Th>
            <Th>Review Comment</Th>
            <Th>Status</Th>
            <Th className="text-right">Actions</Th>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <Td>{row.date}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <img src={userProfile} alt={row.member} className="size-7 rounded-full object-cover" />
                    <span className="text-sm font-normal text-[#667085] underline underline-offset-2">{row.member}</span>
                  </div>
                </Td>
                <Td>
                  <div className="flex flex-col">
                    <span className="text-sm text-textColor">{row.service}</span>
                    <span className="mt-0.5 text-xs text-secondaryTextColor">ID: {row.id}</span>
                  </div>
                </Td>
                <Td>
                  <span className="inline-flex items-center gap-1 text-sm text-[#475467]">
                    <Star size={14} className={`${row.rating <= 2 ? "fill-[#F97066] text-[#F97066]" : "fill-[#FDB022] text-[#FDB022]"}`} />
                    {row.rating}
                  </span>
                </Td>
                <Td className="max-w-[360px]">
                  <p className="line-clamp-2">{row.comment}</p>
                </Td>
                <Td>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[row.status]}`}>
                    {row.status}
                  </span>
                </Td>
                <Td className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedReview(row);
                      setIsReviewSheetOpen(true);
                      setIsActionMenuOpen(false);
                      setIsTimelineSheetOpen(false);
                    }}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085]"
                    aria-label={`View review ${row.id}`}
                  >
                    <Eye size={14} />
                  </button>
                </Td>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableWrapper>
      </div>

      <SideSheet
        isOpen={isReviewSheetOpen}
        onClose={() => {
          setIsReviewSheetOpen(false);
          setIsActionMenuOpen(false);
        }}
        title="View Review"
        footer={(
          <div className="relative flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsActionMenuOpen((prev) => !prev)}
              className="inline-flex h-11 flex-1 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-4 text-sm font-semibold text-white"
            >
              Take Action
              <ChevronDown size={15} />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsReviewSheetOpen(false);
                setIsActionMenuOpen(false);
              }}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054]"
            >
              Cancel
            </button>

            {isActionMenuOpen ? (
              <div className="absolute -top-2 left-0 w-[188px] -translate-y-full rounded-xl border border-[#EAECF0] bg-white p-2 shadow-[0_10px_24px_-8px_rgba(16,24,40,0.2)]">
                <button type="button" className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-[#344054] hover:bg-[#F9FAFB]">
                  <Flag size={14} />
                  Flag Review
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsActionMenuOpen(false);
                    setIsComplaintSheetOpen(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-[#344054] hover:bg-[#F9FAFB]"
                >
                  <Plus size={14} />
                  Create Complaint
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-[#344054] hover:bg-[#F9FAFB]">
                  <Check size={14} />
                  Mark as Reviewed
                </button>
              </div>
            ) : null}
          </div>
        )}
      >
        <div className="space-y-4 text-textColor">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-sm text-textColor">Job Name</p>
              <p className="mt-1 text-sm text-secondaryTextColor">{selectedReview?.service ?? "-"}</p>
            </div>
            <div>
              <p className="text-sm text-textColor">Job ID</p>
              <p className="mt-1 text-sm text-secondaryTextColor">{selectedReview?.id ?? "-"}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-textColor">Review and Rating by</p>
            <div className="mt-1 inline-flex items-center gap-2 text-sm text-[#667085]">
              <img src={userProfile} alt={selectedReview?.member ?? "Reviewer"} className="size-7 rounded-full object-cover" />
              <span className="underline underline-offset-2">{selectedReview?.member ?? "-"}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-textColor">Rating</p>
            <span className="mt-1 inline-flex items-center gap-1 text-sm text-[#475467]">
              {selectedReview?.rating ?? 0}
              <Star size={14} className={`${(selectedReview?.rating ?? 0) <= 2 ? "fill-[#F97066] text-[#F97066]" : "fill-[#FDB022] text-[#FDB022]"}`} />
            </span>
          </div>

          <div>
            <p className="text-sm text-textColor">Review</p>
            <p className="mt-1 whitespace-pre-line text-sm text-secondaryTextColor">
              {selectedReview?.comment ?? "-"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-sm text-textColor">Date</p>
              <p className="mt-1 text-sm text-secondaryTextColor">Friday, {selectedReview?.date ?? "-"}</p>
            </div>
            <div>
              <p className="text-sm text-textColor">Time</p>
              <button
                type="button"
                onClick={() => setIsTimelineSheetOpen(true)}
                className="mt-1 text-sm text-secondaryTextColor underline underline-offset-2"
              >
                02:15 PM - 03:45 PM
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm text-textColor">Total Service Time</p>
            <p className="mt-1 inline-flex rounded bg-[#F2F4F7] px-2 py-0.5 text-xs text-[#344054]">1.5 hrs</p>
          </div>

          <div>
            <p className="text-sm text-textColor">Location</p>
            <p className="mt-1 text-sm text-secondaryTextColor">123 Oak Street, Apt 4B</p>
          </div>
        </div>
      </SideSheet>

      <SideSheet
        isOpen={isTimelineSheetOpen}
        onClose={() => setIsTimelineSheetOpen(false)}
        title="Service Timeline"
        footer={(
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsTimelineSheetOpen(false)}
              className="h-11 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-sm font-semibold text-white"
            >
              Got it
            </button>
            <button
              type="button"
              onClick={() => setIsTimelineSheetOpen(false)}
              className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-sm font-medium text-[#344054]"
            >
              Close
            </button>
          </div>
        )}
      >
        <div className="relative pl-10">
          <div className="absolute left-[7px] top-1 h-[148px] border-l border-dashed border-[#FECACA]" />
          {[
            ["02:10 PM", "Caregiver Checked in"],
            ["02:15 PM", "Service Started"],
            ["03:45 PM", "Service Completed"],
            ["03:48 PM", "Payment Processed"],
          ].map(([time, label]) => (
            <div key={`${time}-${label}`} className="relative mb-7 flex items-center gap-4 last:mb-0">
              <span className="absolute -left-10 top-1.5 size-3.5 rounded-full border-[1.5px] border-redRejected bg-white" />
              <span className="text-[16px] font-normal text-textColor">{time}</span>
              <span className="text-[16px] font-normal text-textColor">{label}</span>
            </div>
          ))}
        </div>
      </SideSheet>

      <CreateComplaintSideSheet
        isOpen={isComplaintSheetOpen}
        onClose={() => setIsComplaintSheetOpen(false)}
        review={selectedReview}
      />

      <SideSheet
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        title="Filters"
        widthClass="w-[430px]"
        footer={(
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-11 flex-1 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-4 text-sm font-semibold text-white"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setIsFiltersOpen(false)}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054]"
            >
              Cancel
            </button>
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
              <svg
                className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 2V5M16 2V5M3.5 9.5H20.5M6.8 13H7.2M11.8 13H12.2M16.8 13H17.2M6.8 17H7.2M11.8 17H12.2M16.8 17H17.2M6.4 22H17.6C19.8402 22 20.9603 22 21.816 21.564C22.5686 21.1805 23.1805 20.5686 23.564 19.816C24 18.9603 24 17.8402 24 15.6V8.4C24 6.15979 24 5.03969 23.564 4.18404C23.1805 3.43139 22.5686 2.81947 21.816 2.43597C20.9603 2 19.8402 2 17.6 2H6.4C4.15979 2 3.03969 2 2.18404 2.43597C1.43139 2.81947 0.819467 3.43139 0.435975 4.18404C0 5.03969 0 6.15979 0 8.4V15.6C0 17.8402 0 18.9603 0.435975 19.816C0.819467 20.5686 1.43139 21.1805 2.18404 21.564C3.03969 22 4.15979 22 6.4 22Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
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
                <option value="under-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="101-200">$101 - $200</option>
                <option value="201-300">$201 - $300</option>
                <option value="301-500">$301 - $500</option>
                <option value="more-500">More than $500</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>
        </div>
      </SideSheet>
    </div>
  );
};

export default RatingsReviewsTab;
