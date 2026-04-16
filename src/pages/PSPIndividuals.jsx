import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  BriefcaseBusiness,
} from "lucide-react";
import userProfile from "../assets/userProfile.png";
import SideSheet from "../components/SideSheet";
import {
  Table,
  TableBody,
  TableEmpty,
  TableHead,
  TableRow,
  TableWrapper,
  Td,
  Th,
} from "../components/ui/Table";

/* ─── Static data ──────────────────────────────────────────────────────────── */

const STATS = [
  { label: "Total", value: "612", change: 12, positive: true, period: "this month" },
  { label: "Active", value: "548", change: 22, positive: false, period: "this month" },
  { label: "Pending Verification", value: "27", change: null, positive: null, period: null },
  { label: "On Duty Today", value: "184", change: 12, positive: true, period: "Yesterday" },
  { label: "Flagged PSPs", value: "8", change: 2, positive: false, period: "this month" },
];

const BASE_PSPS = [
  { id: "PSP001", name: "Maria Santos", location: "Downtown", email: "mariasantos@gmail.com", phone: "(416) 555-0123", serviceMain: "Grocery Help", serviceCount: 3, verification: "Verified", availability: "Online", rating: "4.5", earnings: "5735.00", jobs: 236, active: true, avatar: userProfile },
  { id: "PSP002", name: "Lisa Wong", location: "Westside", email: "chenrobert@gmail.com", phone: "(647) 555-0187", serviceMain: "Medicine Help", serviceCount: 2, verification: "Expired Docs", availability: "Offline", rating: "3.0", earnings: "3413.00", jobs: 158, active: false, avatar: userProfile },
  { id: "PSP003", name: "John Carter", location: "Northside", email: "helenpark@gmail.com", phone: "(604) 555-0246", serviceMain: "Local Services", serviceCount: 2, verification: "Pending", availability: "Offline", rating: "4.9", earnings: "5413.00", jobs: 74, active: true, avatar: userProfile },
  { id: "PSP004", name: "John Smith", location: "Eastside", email: "northaside@gmail.com", phone: "(778) 555-0315", serviceMain: "Cleaning", serviceCount: 4, verification: "Verified", availability: "Online", rating: "4.1", earnings: "2565.00", jobs: 324, active: true, avatar: userProfile },
  { id: "PSP005", name: "David Lee Joseph", location: "Westside", email: "patellinda@gmail.com", phone: "(905) 555-0472", serviceMain: "Bath Help", serviceCount: 0, verification: "Verified", availability: "On Leave", rating: "3.9", earnings: "4855.00", jobs: 124, active: true, avatar: userProfile },
  { id: "PSP006", name: "Adam Joe", location: "Downtown", email: "george.w@gmail.com", phone: "(289) 555-0561", serviceMain: "Meal Help", serviceCount: 1, verification: "Rejected", availability: "Offline", rating: "4.0", earnings: "2218.00", jobs: 245, active: false, avatar: userProfile },
  { id: "PSP007", name: "Corics Rivera", location: "Northside", email: "clark.s@gmail.com", phone: "(514) 555-0639", serviceMain: "Nurse Visit", serviceCount: 4, verification: "Verified", availability: "Online", rating: "4.5", earnings: "2462.00", jobs: 452, active: true, avatar: userProfile },
  { id: "PSP008", name: "Martha Baycrs", location: "Uptown", email: "marthab@gmail.com", phone: "(438) 555-0724", serviceMain: "Companion", serviceCount: 1, verification: "Expired Docs", availability: "Offline", rating: "3.0", earnings: "129.00", jobs: 15, active: false, avatar: userProfile },
  { id: "PSP009", name: "San Arbloon", location: "Westside", email: "san.arb@gmail.com", phone: "(403) 555-0895", serviceMain: "Doctor Visit", serviceCount: 1, verification: "Pending", availability: "On Leave", rating: "4.9", earnings: "6785.00", jobs: 356, active: true, avatar: userProfile },
  { id: "PSP010", name: "Monica De Leo", location: "Downtown", email: "leo.j@gmail.com", phone: "(587) 555-0941", serviceMain: "Handyman", serviceCount: 3, verification: "Pending", availability: "Online", rating: "4.1", earnings: "3785.00", jobs: 254, active: true, avatar: userProfile },
];

const PSPS = [
  ...BASE_PSPS,
  ...BASE_PSPS.map((m, i) => ({ ...m, id: `PSP${String(11 + i).padStart(3, "0")}`, name: `${m.name.split(" ")[0]} ${m.name.split(" ")[1] ?? "PSP"} (${i + 11})` })),
];

const PAGE_SIZE_OPTIONS = [10, 25, 50];

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

const getVisiblePages = (current, total, maxVisible = 5) => {
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/* ─── Sub-components ───────────────────────────────────────────────────────── */

const StatusToggle = ({ active, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={active}
    onClick={() => onChange(!active)}
    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gradientVia focus-visible:ring-offset-2 ${
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

const VerificationBadge = ({ status }) => {
  const meta = {
    "Verified": { bg: "bg-[#ECFDF3]", text: "text-greenVerified" },
    "Expired Docs": { bg: "bg-[#FEF3F2]", text: "text-redRejected" },
    "Pending": { bg: "bg-[#FFFAEB]", text: "text-orangeReview" },
    "Rejected": { bg: "bg-[#EFF8FF]", text: "text-[#175CD3]" },
  };
  const config = meta[status] || meta["Pending"];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${config.bg} ${config.text}`}>
      {status}
    </span>
  );
}

const AvailabilityText = ({ status }) => {
  const meta = {
    "Online": "text-greenVerified",
    "Offline": "text-[#667085]",
    "On Leave": "text-redRejected",
  };
  const color = meta[status] || meta["Offline"];
  return (
    <span className={`font-semibold ${color}`}>
      {status}
    </span>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

const PSPIndividuals = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(PSPS);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  useEffect(() => { setPage(1); }, [query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (m) => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)
    );
  }, [query, rows]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const setActive = (id, val) =>
    setRows((prev) => prev.map((m) => (m.id === id ? { ...m, active: val } : m)));

  const pageNumbers = useMemo(
    () => getVisiblePages(safePage, totalPages, 5),
    [safePage, totalPages]
  );

  return ( 
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-[320px]">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#667085]"
            aria-hidden
            strokeWidth={2}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setSearchParams(v ? { q: v } : {}, { replace: true });
            }}
            placeholder="Search by name, ID"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] placeholder:text-[#667085] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
          />
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] sm:flex-none"
          >
            <Filter size={18} className="shrink-0 text-[#667085]" strokeWidth={2} />
            Filters
          </button>
          <button
            type="button"
            onClick={() => navigate("/psp-individuals/new")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-redRejected hover:bg-[#D92D20] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] sm:flex-none transition-colors"
          >
            <Plus size={18} className="shrink-0" strokeWidth={2.5} />
            Add New
          </button>
        </div>
      </div>

      {/* ── Stat cards — Responsive layout ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-4 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] sm:px-5 sm:py-5 flex flex-col justify-between"
          >
            <p className="text-sm font-medium text-[#667085] sm:text-base">{s.label}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-xl font-semibold tracking-tight text-[#101828] sm:text-[28px] leading-none">
                {s.value}
              </span>
              {s.change !== null && (
                <div className="flex shrink-0 flex-row items-center gap-1">
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-sm font-semibold ${
                      s.positive
                        ? "bg-[#ECFDF3] text-[#027A48]"
                        : "bg-[#FEF3F2] text-[#B42318]"
                    }`}
                  >
                    {s.positive
                      ? <ArrowUp className="size-3 shrink-0" strokeWidth={2.5} />
                      : <ArrowDown className="size-3 shrink-0" strokeWidth={2.5} />}
                    {s.change.toLocaleString()}
                  </span>
                  <span className="text-sm text-[#98A2B3]">{s.period}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Table section ─────────────────────────────────────────────────── */}
      <TableWrapper>
        {/* Scroll container: horizontal + vertical */}
        <div className="overflow-auto max-h-[calc(100vh-380px)] min-h-[280px]">
          <Table minWidth="min-w-[1240px]">
            <TableHead>
              <Th>PSP Name</Th>
              <Th>Contact</Th>
              <Th>Services Offered</Th>
              <Th>Verification</Th>
              <Th>Availability</Th>
              <Th center>Rating</Th>
              <Th>Total Earnings</Th>
              <Th>Status</Th>
              <Th className="w-[88px]">Actions</Th>
            </TableHead>
            <TableBody>
              {pageRows.length > 0 ? (
                pageRows.map((m) => (
                  <TableRow key={m.id}>
                    {/* PSP Name */}
                    <Td>
                      <div className="flex items-center gap-3">
                        <img
                          src={m.avatar}
                          alt=""
                          className="size-10 shrink-0 rounded-full object-cover ring-1 ring-[#EAECF0]"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-[#101828]">{m.name}</p>
                          <div className="flex gap-3">
                            <p className="mt-0.5 text-xs text-[#667085]">ID: {m.id}</p>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-[#667085]">
                              <MapPin size={14} className="shrink-0 text-[#98A2B3]" />
                              {m.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Td>

                    {/* Contact */}
                    <Td>
                      <div className="space-y-1.5">
                        <p className="flex items-center gap-2 text-sm text-[#475467]">
                          <Mail size={16} className="shrink-0 text-[#98A2B3]" />
                          <span className="max-w-[180px] truncate">{m.email}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm text-[#475467]">
                          <Phone size={16} className="shrink-0 text-[#98A2B3]" />
                          {m.phone}
                        </p>
                      </div>
                    </Td>

                    {/* Services Offered */}
                    <Td>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gradientVia">{m.serviceMain}</span>
                        {m.serviceCount > 0 && (
                          <span className="text-sm text-[#667085]">
                            , <span className="underline underline-offset-2">+ {m.serviceCount}</span>
                          </span>
                        )}
                      </div>
                    </Td>
                    
                    {/* Verification */}
                    <Td>
                      <VerificationBadge status={m.verification} />
                    </Td>

                    {/* Availability */}
                    <Td>
                      <AvailabilityText status={m.availability} />
                    </Td>

                    {/* Rating */}
                    <Td center>
                      <span className="text-[#475467] font-medium">{m.rating}</span>
                    </Td>

                    {/* Total Earnings */}
                    <Td>
                      <p className="font-medium text-[#475467]">$ {m.earnings}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-[#667085]">
                        <BriefcaseBusiness size={14} className="text-[#98A2B3]" />
                        {m.jobs}
                      </p>
                    </Td>

                    {/* Status */}
                    <Td>
                      <StatusToggle
                        active={m.active}
                        onChange={(next) => setActive(m.id, next)}
                      />
                    </Td>

                    {/* Actions */}
                    <Td>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/psp-individuals/${encodeURIComponent(m.id)}`, {
                            state: { psp: m },
                          })
                        }
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-lineMuted text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054]"
                        aria-label={`View ${m.name}`}
                      >
                        <Eye size={18} strokeWidth={2} />
                      </button>
                    </Td>
                  </TableRow>
                ))
              ) : (
                <TableEmpty colSpan={9} message="No PSPs match your search." />
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination — static footer inside wrapper */}
        <div className="flex shrink-0 flex-col gap-4 border-t border-[#EAECF0] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <label className="flex items-center gap-2 text-sm text-[#667085]">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="rounded-lg border border-[#D0D5DD] bg-white px-3 py-1.5 text-sm font-medium text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
            >
              {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>

          <div className="flex items-center justify-center gap-1 sm:justify-end">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {pageNumbers.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`min-w-[36px] rounded-lg px-3 py-2 text-sm font-semibold ${
                  n === safePage
                    ? "bg-redRejected text-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
                    : "border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB]"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </TableWrapper>

      {/* ── Filter side sheet ─────────────────────────────────────────────── */}
      <SideSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filters"
        footer={
          <div className="flex gap-3">
            <button
              type="button"
              className="h-11 flex-1 rounded-lg bg-redRejected hover:bg-[#D92D20] text-sm font-semibold text-white transition-colors"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Joining Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Joining Date
            </label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Account Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Account Status</label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="" disabled selected hidden>Select Account Status</option>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Verification Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Verification Status</label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="" disabled selected hidden>Select Verification Status</option>
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending Verification</option>
                <option value="expired">Documents Expired</option>
                <option value="rejected">Rejected</option>
                <option value="review">In Review</option>
                <option value="not_submitted">Not Submitted</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Availability Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Availability Status</label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="" disabled selected hidden>Select Availability Status</option>
                <option value="all">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="on_leave">On Leave</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Territory */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Territory</label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="" disabled selected hidden>Select Territory</option>
                <option value="all">All</option>
                <option value="downtown">Downtown</option>
                <option value="westside">Westside</option>
                <option value="eastside">Eastside</option>
                <option value="northside">Northside</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Service Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Service Type</label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="" disabled selected hidden>Select Service Type</option>
                <option value="all">All</option>
                <option value="grocery">Grocery Help</option>
                <option value="cleaning">Cleaning</option>
                <option value="medical">Medical Assistance</option>
                <option value="companion">Companion</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Rating Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Rating Range</label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="" disabled selected hidden>Select Rating Range</option>
                <option value="all">All</option>
                <option value="4.5-5.0">4.5 - 5.0</option>
                <option value="4.0-4.4">4.0 - 4.4</option>
                <option value="3.5-3.9">3.5 - 3.9</option>
                <option value="3.0-3.4">3.0 - 3.4</option>
                <option value="below-3.0">Below 3.0</option>
                <option value="no-rating">No Ratings Yet</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Completed Job Count */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Completed Job Count</label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="" disabled selected hidden>Select Job Count</option>
                <option value="all">All</option>
                <option value="0">0 Jobs</option>
                <option value="1-10">1 - 10 Jobs</option>
                <option value="11-25">11 - 25 Jobs</option>
                <option value="26-50">26 - 50 Jobs</option>
                <option value="51-100">51 - 100 Jobs</option>
                <option value="101+">101+ Jobs</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Age Group */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Age Group</label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="" disabled selected hidden>Select Age Group</option>
                <option value="all">All</option>
                <option value="18-24">18 - 24</option>
                <option value="25-34">25 - 34</option>
                <option value="35-44">35 - 44</option>
                <option value="45-54">45 - 54</option>
                <option value="55+">55+</option>
                <option value="prefer-not">Prefer Not to Say / Not Available</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">Gender</label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia">
                <option value="" disabled selected hidden>Select Gender</option>
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>
        </div>
      </SideSheet>
    </div>
  );
};

export default PSPIndividuals;
