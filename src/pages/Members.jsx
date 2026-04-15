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
  Gem,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Ticket,
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
  { label: "Total",    value: "1,248", change: 82,  positive: true  },
  { label: "Active",   value: "1,011", change: 22,  positive: false },
  { label: "Premium",  value: "432",   change: 30,  positive: true  },
  { label: "Services", value: "4,293", change: 382, positive: true  },
];

const BASE_MEMBERS = [
  { id: "E001", name: "Margaret Thompson", location: "Downtown",   gender: "Female", age: 78, email: "margaret.t@email.com",  phone: "(555) 201-8843", spent: "935.00",   orders: 14, premium: true,  active: true,  avatar: userProfile },
  { id: "E002", name: "James Wilson",      location: "Westside",   gender: "Male",   age: 82, email: "j.wilson@email.com",    phone: "(555) 310-2291", spent: "1,240.50", orders: 22, premium: false, active: true,  avatar: userProfile },
  { id: "E003", name: "Helen Carter",      location: "Riverside",  gender: "Female", age: 75, email: "helen.c@email.com",     phone: "(555) 442-1188", spent: "412.00",   orders: 6,  premium: true,  active: false, avatar: userProfile },
  { id: "E004", name: "Robert Lee",        location: "Downtown",   gender: "Male",   age: 98, email: "r.lee@email.com",       phone: "(555) 778-0092", spent: "2,100.00", orders: 31, premium: false, active: true,  avatar: userProfile },
  { id: "E005", name: "Susan Miller",      location: "North Park", gender: "Female", age: 71, email: "susan.m@email.com",     phone: "(555) 661-3344", spent: "688.25",   orders: 11, premium: true,  active: true,  avatar: userProfile },
];

const MEMBERS = [
  ...BASE_MEMBERS,
  ...BASE_MEMBERS.map((m, i) => ({ ...m, id: `E${String(6  + i).padStart(3, "0")}`, name: `${m.name.split(" ")[0]} ${m.name.split(" ")[1] ?? "Member"} (${i + 6})`  })),
  ...BASE_MEMBERS.slice(0, 5).map((m, i) => ({ ...m, id: `E${String(11 + i).padStart(3, "0")}`, name: `${m.name.split(" ")[0]} ${m.name.split(" ")[1] ?? "Member"} (${i + 11})` })),
];

const PAGE_SIZE_OPTIONS = [10, 25, 50];

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

const getVisiblePages = (current, total, maxVisible = 5) => {
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end   = Math.min(total, start + maxVisible - 1);
  start     = Math.max(1, end - maxVisible + 1);
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

/* ─── Page ─────────────────────────────────────────────────────────────────── */

const Members = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [pageSize, setPageSize] = useState(10);
  const [page,     setPage]     = useState(1);
  const [rows,     setRows]     = useState(MEMBERS);
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
  const safePage   = Math.min(page, totalPages);
  const pageRows   = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

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
        <div className="relative flex-1">
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
            onClick={() => navigate("/members/new")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-4 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] sm:flex-none"
          >
            <Plus size={18} className="shrink-0" strokeWidth={2.5} />
            Add New
          </button>
        </div>
      </div>

      {/* ── Stat cards — 2-col → 4-col ───────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-4 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] sm:px-5 sm:py-5"
          >
            <p className="text-sm font-medium text-[#667085] sm:text-base">{s.label}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-xl font-semibold tracking-tight text-[#101828] sm:text-2xl">
                {s.value}
              </span>
              <div className="flex shrink-0 flex-col items-end gap-0.5">
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
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
                <span className="text-[11px] text-[#98A2B3]">this month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table section ─────────────────────────────────────────────────── */}
      {/*
          TableWrapper gives the outer rounded border.
          The inner div is the SINGLE scroll container — overflow:auto handles
          both horizontal scroll (for narrow/mobile viewports) and vertical scroll
          (rows beyond max-height). The sticky <th> paints over scrolling rows.
      */}
      <TableWrapper>
        {/* Scroll container: horizontal + vertical */}
        <div className="overflow-auto max-h-[calc(100vh-380px)] min-h-[280px]">
          <Table minWidth="min-w-[1040px]">
            <TableHead>
              <Th>Member Name</Th>
              <Th>Gender | Age</Th>
              <Th>Contact</Th>
              <Th>Total Spent</Th>
              <Th center>Subscription</Th>
              <Th>Status</Th>
              <Th className="w-[88px]">Actions</Th>
            </TableHead>
            <TableBody>
              {pageRows.length > 0 ? (
                pageRows.map((m) => (
                  <TableRow key={m.id}>
                    {/* Member Name */}
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

                    {/* Gender | Age */}
                    <Td className="text-[#475467]">{m.gender} | {m.age}</Td>

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

                    {/* Total Spent */}
                    <Td>
                      <p className="font-medium text-[#101828]">$ {m.spent}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-[#667085]">
                        <ShoppingBag size={14} className="text-[#98A2B3]" />
                        {m.orders}
                      </p>
                    </Td>

                    {/* Subscription */}
                    <Td center>
                      {m.premium ? (
                        <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[#FEF3F2]">
                          <Gem size={18} className="text-gradientVia" aria-label="Premium" />
                        </span>
                      ) : (
                        <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[#F2F4F7]">
                          <Ticket size={18} className="text-[#667085]" aria-label="Standard" />
                        </span>
                      )}
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
                        onClick={() => navigate(`/member/${m.id}`, { state: { member: m } })}
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-lineMuted text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054]"
                        aria-label={`View ${m.name}`}
                      >
                        <Eye size={18} strokeWidth={2} />
                      </button>
                    </Td>
                  </TableRow>
                ))
              ) : (
                <TableEmpty colSpan={7} message="No members match your search." />
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination — outside the scroll container, always visible */}
        <div className="flex shrink-0 flex-col gap-4 border-t border-[#EAECF0] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <label className="flex items-center gap-2 text-sm text-[#667085]">
            <span>Rows per page</span>
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
                    ? "bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
                    : "border border-[#D0D5DD] text-[#344054]"
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
              className="h-11 flex-1 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-base font-semibold text-white"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              className="h-11 flex-1 rounded-lg border border-[#D0D5DD] bg-white text-base font-medium text-[#344054]"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Last Service Date
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="MM-DD-YYYY ~ MM-DD-YYYY"
                className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
              />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          {["Status", "Subscription Type", "Territory", "Age Group"].map((label) => (
            <div key={label}>
              <label className="mb-1.5 block text-sm font-medium text-[#344054]">
                {label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  placeholder={`Select ${label}`}
                  className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] placeholder:text-[#98A2B3]"
                />
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              </div>
            </div>
          ))}
        </div>
      </SideSheet>
    </div>
  );
};

export default Members;
