import { CalendarDays, ChevronDown, Eye, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import userProfile from "../../assets/userProfile.png";
import ComplaintDetailsSheet from "../shared/ComplaintDetailsSheet";
import SideSheet from "../SideSheet";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";

const complaintRows = [
  {
    id: "#EA-001234",
    member: "Margaret Thompson",
    service: "Grocery Trip Assistance",
    issueType: "Provider behavior & Service quality",
    dateReported: "Mar 12, 2026",
    source: "From Review",
    status: "New",
    rating: "2",
    issueDetails: "The provider did not clearly explain the service process or failed to properly communicate during the visit.",
    requestedResolution: "Just reporting",
    images: [],
  },
  {
    id: "#EA-001232",
    member: "Robert Chen",
    service: "Cleaning",
    issueType: "Late arrival",
    dateReported: "Feb 26, 2026",
    source: "Direct Complaint",
    status: "Resolved",
    rating: "1",
    issueDetails: "The caregiver arrived more than 2 hours late without any prior notice or apology, causing significant inconvenience.",
    requestedResolution: "Apology & refund for the delay",
    images: [],
  },
  {
    id: "#EA-001230",
    member: "Helen Parker",
    service: "Doctor Visit",
    issueType: "Safety Concern",
    dateReported: "Jan 03, 2026",
    source: "Call Center",
    status: "In Review",
    rating: "2",
    issueDetails: "The caregiver left the patient unattended briefly in an unsafe environment without proper precautions being taken.",
    requestedResolution: "Review of safety protocols",
    images: [],
  },
  {
    id: "#EA-001229",
    member: "Northside",
    service: "Daily Care Assistance",
    issueType: "Other",
    dateReported: "Mar 26, 2026",
    source: "From Review",
    status: "Refund Issued",
    rating: "2",
    issueDetails: "The service quality was below expectations. Several tasks were left incomplete and required follow-up from another provider.",
    requestedResolution: "Refund",
    images: [],
  },
  {
    id: "#EA-001228",
    member: "David Lee Joseph",
    service: "Meal Preparation",
    issueType: "Provider behavior & Service quality",
    dateReported: "Feb 14, 2026",
    source: "Direct Complaint",
    status: "Awaiting Refund",
    rating: "1",
    issueDetails:
      "The meal was tasteless, as the kitchen and basically were left dirty even after I had asked to clean them multiple times.\nI also had to pay an extra for that, but the service did not meet expectations.",
    requestedResolution: "Refund",
    images: [
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=160&fit=crop",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=160&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=160&fit=crop",
    ],
  },
  {
    id: "#EA-001348",
    member: "Margaret Thompson",
    service: "House Cleaning",
    issueType: "Payment Issue",
    dateReported: "Jan 21, 2026",
    source: "Call Center",
    status: "Closed",
    rating: "1",
    issueDetails: "An incorrect charge was applied to the billing account. The amount deducted did not match the agreed service price.",
    requestedResolution: "Billing correction & refund of overcharge",
    images: [],
  },
];

const statusClass = {
  New: "bg-[#FEF3F2] text-[#F04438]",
  Resolved: "bg-[#ECFDF3] text-[#039855]",
  "In Review": "bg-[#F2F4F7] text-[#667085]",
  "Refund Issued": "bg-[#EFF8FF] text-[#2E90FA]",
  "Awaiting Refund": "bg-[#FFFAEB] text-[#DC6803]",
  Closed: "bg-[#ECFDF3] text-[#039855]",
};

const ComplaintsTab = () => {
  const [query, setQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [caregiver, setCaregiver] = useState("");
  const [issueType, setIssueType] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [dateReported, setDateReported] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return complaintRows;

    return complaintRows.filter(
      (row) =>
        row.id.toLowerCase().includes(q) ||
        row.service.toLowerCase().includes(q) ||
        row.issueType.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[360px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by Complaint ID, Service, Issue Type"
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

      <div className="min-h-0 flex-1 overflow-y-auto">
        <TableWrapper>
          <Table minWidth="min-w-[1240px]">
          <TableHead>
            <Th>Complaint ID</Th>
            <Th>Member</Th>
            <Th>Service</Th>
            <Th>Issue Type</Th>
            <Th>Date Reported</Th>
            <Th>Source</Th>
            <Th>Status</Th>
            <Th>Rating</Th>
            <Th className="text-right">Actions</Th>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <Td>{row.id}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <img src={userProfile} alt={row.member} className="size-7 rounded-full object-cover" />
                    <span className="text-sm font-normal text-[#667085] underline underline-offset-2">{row.member}</span>
                  </div>
                </Td>
                <Td>{row.service}</Td>
                <Td className="max-w-[220px]">
                  <p className="line-clamp-2">{row.issueType}</p>
                </Td>
                <Td>{row.dateReported}</Td>
                <Td>{row.source}</Td>
                <Td>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[row.status]}`}>
                    {row.status}
                  </span>
                </Td>
                <Td>{row.rating}</Td>
                <Td className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedComplaint({
                        ...row,
                        caregiver: row.member,
                        date: row.dateReported,
                        issueDetails: row.issueDetails,
                        requestedResolution: row.requestedResolution,
                        images: row.images,
                      });
                      setIsViewSheetOpen(true);
                    }}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085]"
                    aria-label={`View complaint ${row.id}`}
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
                <option value="margaret-thompson">Margaret Thompson</option>
                <option value="robert-chen">Robert Chen</option>
                <option value="helen-parker">Helen Parker</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Issue Type</label>
            <div className="relative">
              <select
                value={issueType}
                onChange={(event) => setIssueType(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054]"
              >
                <option value="">Select Cost Group</option>
                <option value="provider-behavior">Provider behavior & Service quality</option>
                <option value="late-arrival">Late arrival</option>
                <option value="payment-issue">Payment issue</option>
                <option value="safety-concern">Safety concern</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Status</label>
            <div className="relative">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054]"
              >
                <option value="">Select Status</option>
                <option value="new">New</option>
                <option value="in-review">In Review</option>
                <option value="awaiting-refund">Awaiting Refund</option>
                <option value="refund-issued">Refund Issued</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Source</label>
            <div className="relative">
              <select
                value={source}
                onChange={(event) => setSource(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054]"
              >
                <option value="">Select Source</option>
                <option value="from-review">From Review</option>
                <option value="direct-complaint">Direct Complaint</option>
                <option value="call-center">Call Center</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Date Reported</label>
            <div className="relative">
              <input
                type="text"
                value={dateReported}
                onChange={(event) => setDateReported(event.target.value)}
                placeholder="MM-DD-YYY ~ MM-DD-YYYY"
                className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-base text-[#344054] placeholder:text-[#98A2B3]"
              />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>
        </div>
      </SideSheet>

      <ComplaintDetailsSheet
        complaint={selectedComplaint}
        isOpen={isViewSheetOpen}
        onClose={() => setIsViewSheetOpen(false)}
        onAction={(action) => console.log("Action:", action, selectedComplaint?.id)}
      />
    </div>
  );
};

export default ComplaintsTab;
