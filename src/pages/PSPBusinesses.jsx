import { useMemo, useState } from "react";
import { BriefcaseBusiness, ChevronDown, ChevronLeft, ChevronRight, Eye, Filter, MapPin, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import userProfile from "../assets/userProfile.png";
import SideSheet from "../components/SideSheet";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import Switch from "../components/ui/Switch";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../components/ui/Table";

const STATS = [
  { label: "Total", value: "128", change: "+9", period: "this month", tone: "text-[#12B76A]" },
  { label: "Active", value: "102", change: "-3", period: "this month", tone: "text-[#F04438]" },
  { label: "Pending Verification", value: "11" },
  { label: "On Duty Today", value: "76", change: "+8", period: "Yesterday", tone: "text-[#12B76A]" },
  { label: "Flagged PSPs", value: "7", change: "-2", period: "this month", tone: "text-[#F04438]" },
];

const ROWS = [
  { id: "PSP001", name: "CarePlus Home Services", type: "Company", location: "Downtown", email: "careplus@gmail.com", phone: "(416) 555-0123", services: "Grocery Help", servicesExtra: 3, staff: 24, rating: "4.5", earnings: "$18,540.00", jobs: 236, verification: "Verified", availability: true },
  { id: "PSP002", name: "SilverAge Support", type: "Solo", location: "Westside", email: "silver.age@gmail.com", phone: "(647) 555-0187", services: "Medicine Help", servicesExtra: 2, staff: 12, rating: "3.0", earnings: "$3,413.00", jobs: 158, verification: "Expired Docs", availability: false },
  { id: "PSP003", name: "MedAssist Pro", type: "Company", location: "Northside", email: "medassist@gmail.com", phone: "(604) 555-0246", services: "Local Services", servicesExtra: 2, staff: 18, rating: "4.9", earnings: "$14,210.00", jobs: 74, verification: "Pending", availability: true },
  { id: "PSP004", name: "Golden Years Care", type: "Franchise", location: "Eastside", email: "golden.years@gmail.com", phone: "(778) 555-0315", services: "Cleaning", servicesExtra: 4, staff: 6, rating: "4.1", earnings: "$2,565.00", jobs: 324, verification: "Verified", availability: true },
  { id: "PSP005", name: "HealthBridge Services", type: "Company", location: "Westside", email: "healthbridge@gmail.com", phone: "(905) 555-0472", services: "Bath Help", servicesExtra: 0, staff: 15, rating: "3.9", earnings: "$4,855.00", jobs: 124, verification: "Verified", availability: true },
  { id: "PSP006", name: "ComfortHands", type: "Solo", location: "Downtown", email: "comforthands@gmail.com", phone: "(289) 555-0561", services: "Meal Help", servicesExtra: 1, staff: 10, rating: "4.0", earnings: "$11,430.00", jobs: 245, verification: "Rejected", availability: false },
];

const JOINING_DATE_OPTIONS = ["All", "Today", "Last 7 Days", "Last 30 Days", "Custom Range"];
const ACCOUNT_STATUS_OPTIONS = ["All", "Active", "Pending Approval", "Suspended", "Inactive", "Archived"];
const VERIFICATION_OPTIONS = ["All", "Verified", "Pending Verification", "Documents Expired", "Rejected", "In Review", "Not Submitted"];
const TERRITORY_OPTIONS = ["Select Territory", "Downtown", "Westside", "Northside", "Eastside", "Uptown"];
const CATEGORY_OPTIONS = ["Select Category", "Company", "Solo", "Franchise"];
const RATING_OPTIONS = ["All", "4.5 - 5.0", "4.0 - 4.4", "3.5 - 3.9", "3.0 - 3.4", "Below 3.0", "No Ratings Yet"];
const JOB_COUNT_OPTIONS = ["All", "0 Jobs", "1 - 10 Jobs", "11 - 25 Jobs", "26 - 50 Jobs", "51 - 100 Jobs", "101+ Jobs"];
const REVENUE_OPTIONS = ["All", "< $5K", "$5K - $15K", "$15K+"];

const PSPBusinesses = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rows] = useState(ROWS);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [joiningDate, setJoiningDate] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [territory, setTerritory] = useState("");
  const [category, setCategory] = useState("");
  const [ratingRange, setRatingRange] = useState("");
  const [completedJobs, setCompletedJobs] = useState("");
  const [revenue, setRevenue] = useState("");

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => row.name.toLowerCase().includes(q) || row.id.toLowerCase().includes(q));
  }, [query, rows]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const selectClassName =
    "h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] placeholder:text-[#98A2B3]";

  const SelectField = ({ label, value, onChange, options, placeholder = "Select option" }) => (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#344054]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={selectClassName}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-[320px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#667085]" strokeWidth={2} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, ID"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#667085]"
          />
        </div>

        <div className="flex shrink-0 gap-2">
          <Button variant="secondary" size="md" onClick={() => setIsFilterSheetOpen(true)}>
            <Filter size={18} className="text-[#667085]" />
            Filters
          </Button>
          <Button variant="danger" size="md" onClick={() => navigate("/psp-businesses/new")}>
            <Plus size={18} />
            Add New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#D0D5DD] bg-white px-5 py-4"
          >
            <p className="text-lg leading-none font-medium text-[#1D2939]">
              {stat.label}
            </p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-2xl leading-none font-semibold tracking-[-0.03em] text-[#1D2939]">
                {stat.value}
              </span>
              {stat.change ? (
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm leading-none font-semibold ${
                      stat.tone === "text-[#12B76A]"
                        ? "bg-[#ECFDF3] text-[#12B76A]"
                        : "bg-[#FEF3F2] text-[#F04438]"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm leading-none text-[#667085]">
                    {stat.period}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <TableWrapper>
        <div className="overflow-auto max-h-[calc(100vh-380px)] min-h-[280px]">
          <Table minWidth="min-w-[1280px]">
            <TableHead>
              <Th>Business Name</Th>
              <Th>Type</Th>
              <Th>Services Offered</Th>
              <Th center>Staff</Th>
              <Th center>Rating</Th>
              <Th>Total Earnings</Th>
              <Th>Verification</Th>
              <Th>Status</Th>
              <Th className="w-[88px]">Actions</Th>
            </TableHead>
            <TableBody>
              {pageRows.map((row) => (
                <TableRow key={row.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <img src={userProfile} alt="" className="size-10 rounded-full object-cover ring-1 ring-[#EAECF0]" />
                      <div className="min-w-0">
                        <p className="font-medium text-[#101828]">{row.name}</p>
                        <div className="flex gap-3 text-xs text-[#667085]">
                          <span>ID: {row.id}</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-[#98A2B3]" />
                            {row.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Td>
                  <Td>{row.type}</Td>
                  <Td>
                    <span className="text-sm font-semibold text-gradientVia">{row.services}</span>
                    {row.servicesExtra > 0 ? <span className="text-sm text-[#667085]">, + {row.servicesExtra}</span> : null}
                  </Td>
                  <Td center>{row.staff}</Td>
                  <Td center>{row.rating}</Td>
                  <Td>
                    <p className="font-medium text-[#475467]">{row.earnings}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[#667085]">
                      <BriefcaseBusiness size={14} className="text-[#98A2B3]" />
                      {row.jobs}
                    </p>
                  </Td>
                  <Td>
                    <StatusBadge
                      label={row.verification}
                      tone={
                        row.verification === "Verified"
                          ? "verified"
                          : row.verification === "Expired Docs"
                            ? "expired"
                            : row.verification === "Pending"
                              ? "pending"
                              : "rejected"
                      }
                    />

                  </Td>
                  <Td>
                    <Switch checked={row.availability} ariaLabel={`Toggle ${row.name} status`} />
                  </Td>
                  <Td>
                    <Button variant="icon" size="icon" aria-label={`View ${row.name}`}>
                      <Eye size={16} />
                    </Button>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-[#EAECF0] bg-white px-4 py-3 sm:px-6 sm:py-4">
          <p className="text-sm text-[#667085]">Rows per page: 10</p>
          <div className="flex items-center gap-1">
            <Button variant="secondary" size="icon" onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
              <ChevronLeft size={16} />
            </Button>
            <span className="min-w-[36px] rounded-lg bg-redRejected px-3 py-2 text-center text-sm font-semibold text-white">{safePage}</span>
            <Button variant="secondary" size="icon" onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </TableWrapper>

      <SideSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filters"
        widthClass="w-[430px]"
        footer={(
          <div className="flex gap-3">
            <Button variant="danger" size="lg" className="flex-1">
              Apply
            </Button>
            <Button variant="secondary" size="lg" className="flex-1" onClick={() => setIsFilterSheetOpen(false)}>
              Cancel
            </Button>
          </div>
        )}
      >
        <div className="space-y-4">
          <SelectField
            label="Joining Date"
            value={joiningDate}
            onChange={setJoiningDate}
            options={JOINING_DATE_OPTIONS}
            placeholder="Select Joining Date"
          />

          <SelectField
            label="Account Status"
            value={accountStatus}
            onChange={setAccountStatus}
            options={ACCOUNT_STATUS_OPTIONS}
            placeholder="Select Account Status"
          />

          <SelectField
            label="Verification Status"
            value={verificationStatus}
            onChange={setVerificationStatus}
            options={VERIFICATION_OPTIONS}
            placeholder="Select Verification Status"
          />

          <SelectField
            label="Territory"
            value={territory}
            onChange={setTerritory}
            options={TERRITORY_OPTIONS}
            placeholder="Select Territory"
          />

          <SelectField
            label="Category"
            value={category}
            onChange={setCategory}
            options={CATEGORY_OPTIONS}
            placeholder="Select Category"
          />

          <SelectField
            label="Rating Range"
            value={ratingRange}
            onChange={setRatingRange}
            options={RATING_OPTIONS}
            placeholder="Select Rating Range"
          />

          <SelectField
            label="Completed Job Count"
            value={completedJobs}
            onChange={setCompletedJobs}
            options={JOB_COUNT_OPTIONS}
            placeholder="Select Job Count"
          />

          <SelectField
            label="Revenue"
            value={revenue}
            onChange={setRevenue}
            options={REVENUE_OPTIONS}
            placeholder="Select Revenue Group"
          />
        </div>
      </SideSheet>
    </div>
  );
};

export default PSPBusinesses;
