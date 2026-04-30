import {
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleX,
  Pencil,
  Eye,
  MoreHorizontal,
  PauseCircle,
  Plus,
  Search,
  Trash2,
  X,
  Clock,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SideSheet from "../SideSheet";
import Button, { FiltersButton } from "../ui/Button";
import DateRangeInput from "../ui/DateRangeInput";
import Switch from "../ui/Switch";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";

const STATS = [
  {
    label: "Total Services",
    value: "32",
    note: "All services configured under this business",
    icon: Clock,
    iconClass: "text-[#2E90FA]",
    iconBg: "bg-[#EFF8FF]",
  },
  {
    label: "Active Services",
    value: "24",
    note: "Currently available for booking",
    icon: CheckCircle2,
    iconClass: "text-[#12B76A]",
    iconBg: "bg-[#ECFDF3]",
  },
  {
    label: "Pending Approval",
    value: "4",
    note: "Services awaiting admin approval",
    icon: CalendarDays,
    iconClass: "text-[#F79009]",
    iconBg: "bg-[#FFFAEB]",
  },
  {
    label: "Services with Issues",
    value: "5",
    note: "Flagged for pricing, compliance, or quality risks",
    icon: AlertTriangle,
    iconClass: "text-[#F04438]",
    iconBg: "bg-[#FEF3F2]",
  },
];

const SERVICE_ROWS = [
  { name: "Regular Wash", category: "Per Hour", basePrice: "$26.00 / hr", netEarning: "22.10", active: true },
  { name: "Bathroom (Single / Double) Wash", category: "Per Hour", basePrice: "$18.00 / hr", netEarning: "15.30", active: true },
  { name: "Towel Wash", category: "Per Piece", basePrice: "$23.00 / item", netEarning: "23.80", active: true },
  { name: "Gym Wear Wash", category: "Per Visit", basePrice: "$22.00 / visit", netEarning: "18.70", active: true },
  { name: "School Uniform Wash & Iron", category: "Per Piece", basePrice: "$16.00 / item", netEarning: "12.75", active: false },
  { name: "Wool Sweater", category: "Per Hour", basePrice: "$50.00 / hr", netEarning: "42.50", active: true },
];

const SERVICE_GROUPS = [
  { name: "Medicine Pickup", count: 9, status: "Inactive" },
  { name: "Conversation & Company", count: 7, status: "Active" },
  { name: "Laundry & Dry Cleaning", count: 10, status: "Active" },
];

const SERVICE_TABLE_ROWS = [
  { name: "Anti-Bacterial Wash", category: "Per Hour", basePrice: "$26.00 / hr", netEarning: "22.10", active: true },
  { name: "Regular Wash", category: "Per Hour", basePrice: "$26.00 / hr", netEarning: "22.10", active: true },
  { name: "Bedsheet (Single / Double) Wash", category: "Per Hour", basePrice: "$18.00 / hr", netEarning: "15.30", active: true },
  { name: "Towel Wash", category: "Per Piece", basePrice: "$23.00 / item", netEarning: "23.80", active: true },
  { name: "Gym Wear Wash", category: "Per Visit", basePrice: "$22.00 / visit", netEarning: "18.70", active: true },
  { name: "School Uniform Wash & Iron", category: "Per Piece", basePrice: "$16.00 / item", netEarning: "12.75", active: false },
  { name: "Suit (2 Piece / 3 Piece)", category: "Per Hour", basePrice: "$50.00 / hr", netEarning: "42.50", active: true },
  { name: "Wool Sweater", category: "Per Hour", basePrice: "$50.00 / hr", netEarning: "42.50", active: true },
  { name: "Blazer Dry Clean", category: "Per Hour", basePrice: "$25.00 / hr", netEarning: "21.25", active: true },
  { name: "Curtain Wash & Dry Clean", category: "Per Hour", basePrice: "$50.00 / hr", netEarning: "42.50", active: true },
];

const iconButtonClassName =
  "inline-flex size-7 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] transition hover:bg-[#F9FAFB]";

const statusBadgeClass = {
  Active: "bg-[#ECFDF3] text-[#12B76A]",
  Inactive: "bg-[#FEF3F2] text-[#F04438]",
};

const inputClassName =
  "h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia";

const AmountInput = ({ placeholder }) => (
  <div className="flex h-11 w-full overflow-hidden rounded-lg border border-[#D0D5DD] bg-white">
    <span className="inline-flex w-11 shrink-0 items-center justify-center border-r border-[#D0D5DD] bg-[#F9FAFB] text-xl leading-none text-[#667085]">
      $
    </span>
    <input
      type="text"
      placeholder={placeholder}
      className="h-full w-full border-0 bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:ring-0"
    />
  </div>
);

const RadioPill = ({ label, value, selectedValue, onChange }) => (
  <label className="inline-flex items-center gap-2 text-sm text-[#344054]">
    <input
      type="radio"
      className="size-4 accent-redRejected"
      checked={selectedValue === value}
      onChange={() => onChange(value)}
    />
    {label}
  </label>
);

const ServiceActionModal = ({
  isOpen,
  type,
  serviceName,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  const isDelete = type === "delete";

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close action modal overlay"
        className="absolute inset-0 bg-black/25"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 w-[420px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-[0_20px_40px_rgba(16,24,40,0.2)]">
        <div className="mb-3 flex items-start justify-between">
          <span
            className={`inline-flex size-14 items-center justify-center rounded-full ${
              isDelete ? "bg-[#FEE4E2]" : "bg-[#FEE4E2]"
            }`}
          >
            {isDelete ? (
              <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="60" height="60" rx="30" fill="#FEE4E2"/>
                <rect x="4" y="4" width="60" height="60" rx="30" stroke="#FEF3F2" stroke-width="8"/>
                <path d="M32 32.9167V39.4167M36 32.9167V39.4167M26 28.5833H42M41 28.5833L40.133 41.7372C40.0971 42.2838 39.8713 42.7954 39.5011 43.1689C39.1309 43.5424 38.6439 43.75 38.138 43.75H29.862C29.3561 43.75 28.8691 43.5424 28.4989 43.1689C28.1287 42.7954 27.9029 42.2838 27.867 41.7372L27 28.5833H41ZM37 28.5833V25.3333C37 25.046 36.8946 24.7705 36.7071 24.5673C36.5196 24.3641 36.2652 24.25 36 24.25H32C31.7348 24.25 31.4804 24.3641 31.2929 24.5673C31.1054 24.7705 31 25.046 31 25.3333V28.5833H37Z" stroke="#D92D20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            ) : (
             <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="60" height="60" rx="30" fill="#FEE4E2"/>
                <rect x="4" y="4" width="60" height="60" rx="30" stroke="#FEF3F2" stroke-width="8"/>
                <path d="M31.3333 30V38M36.6667 30V38M46 34C46 35.5759 45.6896 37.1363 45.0866 38.5922C44.4835 40.0481 43.5996 41.371 42.4853 42.4853C41.371 43.5996 40.0481 44.4835 38.5922 45.0866C37.1363 45.6896 35.5759 46 34 46C32.4241 46 30.8637 45.6896 29.4078 45.0866C27.9519 44.4835 26.629 43.5996 25.5147 42.4853C24.4004 41.371 23.5165 40.0481 22.9134 38.5922C22.3104 37.1363 22 35.5759 22 34C22 30.8174 23.2643 27.7652 25.5147 25.5147C27.7652 23.2643 30.8174 22 34 22C37.1826 22 40.2348 23.2643 42.4853 25.5147C44.7357 27.7652 46 30.8174 46 34Z" stroke="#D92D20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            )}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#667085] transition hover:bg-[#F2F4F7]"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {isDelete ? (
          <>
            <h3 className="text-lg font-semibold leading-tight text-textColor">
              Delete "{serviceName}"?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#667085]">
              This will permanently remove all service items under this offering.
              <br />
              This action cannot be undone.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#667085]">
              Request sent for admin review. You'll be notified after verification & settlement.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold leading-tight text-textColor">
              Pause Service Offering?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#667085]">
              Customers will not be able to book the all service items under this service while it is paused.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#667085]">
              You can reactivate the service at any time.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#667085]">
              Existing confirmed bookings will not be affected.
            </p>
          </>
        )}

        <div className="mt-5 grid grid-cols-1 gap-3">
          <Button variant="danger" size="lg" onClick={onConfirm}>
            {isDelete ? "Yes, Delete Service" : "Yes, Pause Service"}
          </Button>
          <Button variant="secondary" size="lg" onClick={onClose}>
            {isDelete ? "Keep Service" : "Cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ServiceListingTable = () => {
  const [openActionMenuFor, setOpenActionMenuFor] = useState(null);

  return (
    <TableWrapper className="rounded-none border-0">
      <Table minWidth="min-w-[920px]">
        <TableHead>
          <Th className="text-xs font-medium">Service Item Name</Th>
          <Th className="text-xs font-medium">Category</Th>
          <Th className="text-xs font-medium">Base Price</Th>
          <Th className="text-xs font-medium">Net Earnings</Th>
          <Th className="text-xs font-medium">Status</Th>
          <Th className="text-xs font-medium">Actions</Th>
        </TableHead>
        <TableBody>
          {SERVICE_TABLE_ROWS.map((row) => (
            <TableRow key={row.name}>
              <Td>{row.name}</Td>
              <Td>{row.category}</Td>
              <Td>{row.basePrice}</Td>
              <Td>{row.netEarning}</Td>
              <Td>
                <Switch checked={row.active} ariaLabel={`Toggle ${row.name}`} />
              </Td>
              <Td>
                <div className="flex items-center gap-1">
                  <button type="button" className={iconButtonClassName} aria-label={`View ${row.name}`}>
                    <Eye size={13} />
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      className={iconButtonClassName}
                      aria-label={`More actions for ${row.name}`}
                      onClick={() =>
                        setOpenActionMenuFor((prev) => (prev === row.name ? null : row.name))
                      }
                    >
                      <MoreHorizontal size={13} />
                    </button>
                    {openActionMenuFor === row.name ? (
                      <div className="absolute right-0 top-[calc(100%+6px)] z-20 w-[128px] overflow-hidden rounded-lg border border-[#EAECF0] bg-white shadow-[0_8px_18px_rgba(16,24,40,0.12)]">
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 border-b border-[#EAECF0] px-3 py-2 text-sm text-[#344054] transition hover:bg-[#F9FAFB]"
                          onClick={() => setOpenActionMenuFor(null)}
                        >
                          <Pencil size={14} className="text-[#667085]" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 border-b border-[#EAECF0] px-3 py-2 text-sm text-[#344054] transition hover:bg-[#F9FAFB]"
                          onClick={() => setOpenActionMenuFor(null)}
                        >
                          <CheckCircle2 size={14} className="text-[#667085]" />
                          Approve
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#344054] transition hover:bg-[#F9FAFB]"
                          onClick={() => setOpenActionMenuFor(null)}
                        >
                          <CircleX size={14} className="text-[#667085]" />
                          Reject
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

const ServiceCatalogTab = () => {
  const [query, setQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [categoryType, setCategoryType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [isAddServiceItemOpen, setIsAddServiceItemOpen] = useState(false);
  const [appliesTo, setAppliesTo] = useState("specific");
  const [priceType, setPriceType] = useState("flat");
  const [pricingMethod, setPricingMethod] = useState("custom");
  const [allowQuantity, setAllowQuantity] = useState(false);
  const [serviceStatus, setServiceStatus] = useState(true);
  const [selectedServiceGroup, setSelectedServiceGroup] = useState("");
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openSections, setOpenSections] = useState(
    Object.fromEntries(SERVICE_GROUPS.map((group) => [group.name, true]))
  );

  const statRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICE_ROWS;
    return SERVICE_ROWS.filter(
      (row) => row.name.toLowerCase().includes(q) || row.category.toLowerCase().includes(q)
    );
  }, [query]);

  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  useEffect(() => {
    const shouldLock = isPauseModalOpen || isDeleteModalOpen;
    if (!shouldLock || typeof document === "undefined") return undefined;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isPauseModalOpen, isDeleteModalOpen]);

  return (
    <div className="space-y-4 pb-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[360px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by service name, category, or type..."
            className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
          />
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <FiltersButton onClick={() => setIsFiltersOpen(true)} className="flex-1 sm:flex-none" />
          <Button variant="danger" size="md" className="flex-1 sm:flex-none">
            <Plus size={16} />
            Add New
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#EAECF0] bg-white p-4">
            <div className="flex items-center gap-2">
              <span className={`inline-flex size-10 items-center justify-center rounded-md ${stat.iconBg}`}>
                <stat.icon size={20} className={stat.iconClass} />
              </span> 
              <p className="text-lg leading-tight font-medium text-[#344054]">{stat.label}</p>
            </div>
            <p className="mt-2 text-xl leading-none font-semibold text-textColor">{stat.value}</p>
            <p className="mt-1 text-sm text-[#667085]">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,2.1fr)_minmax(0,0.85fr)]">
        <div className="space-y-2">
          {SERVICE_GROUPS.map((group) => (
            <div
              key={group.name}
              className="overflow-hidden rounded-xl border border-[#EAECF0] bg-white"
            >
              <button
                type="button"
                onClick={() => toggleSection(group.name)}
                className={`flex w-full items-center justify-between px-4 py-3 text-left ${
                  openSections[group.name] ? "bg-[#F5F5F5]" : "bg-white"
                }`}
              >
                <div className="flex gap-2">
                <p className="font-semibold">{group.name}</p>
                <ul className="ml-4 flex list-disc items-center gap-5 text-sm text-textColor">
                  <li className="ml-2 font-normal text-[#667085]">{group.count} Services</li>
                </ul>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusBadgeClass[group.status] ?? "bg-[#F2F4F7] text-[#667085]"
                    }`}
                  >
                    {group.status}
                  </span>
                  {openSections[group.name] ? (
                    <ChevronUp size={16} className="text-[#667085]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#667085]" />
                  )}
                </div>
              </button>

              {openSections[group.name] && (
                <div className="border-t border-[#EAECF0] bg-white">
                  <div className="flex items-center justify-between px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => {
                          setSelectedServiceGroup(group.name);
                          setIsPauseModalOpen(true);
                        }}
                      >
                        <PauseCircle size={13} />
                        Pause Service
                      </Button>
                      <Button
                        variant="dangerOutline"
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => {
                          setSelectedServiceGroup(group.name);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 size={13} />
                        Delete Service
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      className="h-8 px-3 text-xs"
                      onClick={() => setIsAddServiceItemOpen(true)}
                    >
                      <Plus size={13} />
                      Add Service Item
                    </Button>
                  </div>
                  <ServiceListingTable />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <section className="rounded-xl border border-[#EAECF0] bg-white p-4">
            <h3 className="text-sm font-semibold text-textColor">Insights & Flags</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#475467]">
              <li className="flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[#F79009]" />
                Multiple services flagged for risks
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[#F79009]" />
                Certifications expired for Doctor Visit
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[#F79009]" />
                3 services priced higher than market average
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#12B76A]" />
                4 services pending admin review
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#12B76A]" />
                Elder Care services highly rated
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-[#EAECF0] bg-white p-4">
            <h3 className="text-sm font-semibold text-textColor">Quality Tips</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#475467]">
              <li>Review flagged services promptly</li>
              <li>Verify certifications and compliance documents</li>
              <li>Check pricing against market averages</li>
            </ul>
          </section>
        </div>
      </div>

      <SideSheet
        isOpen={isAddServiceItemOpen}
        onClose={() => setIsAddServiceItemOpen(false)}
        title="Add Service Item"
        footer={(
          <div className="flex items-center gap-3">
            <Button variant="danger" size="lg" className="flex-1">
              Save Service Item
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => setIsAddServiceItemOpen(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      >
        <div className="space-y-5">
          <p className="text-sm text-[#475467]">Configure your service item offering</p>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#344054]">
              Service Name <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="e.g. Deep Cleaning, AC Repair" className={inputClassName} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#344054]">Description</label>
            <textarea
              rows={3}
              placeholder="Short internal description"
              className="w-full rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[#344054]">
              Applies To <span className="text-redRejected">*</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <RadioPill label="Specific Item" value="specific" selectedValue={appliesTo} onChange={setAppliesTo} />
              <RadioPill label="Entire Category" value="category" selectedValue={appliesTo} onChange={setAppliesTo} />
              <RadioPill label="Entire Business" value="business" selectedValue={appliesTo} onChange={setAppliesTo} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#344054]">
              Select Item <span className="text-redRejected">*</span>
            </label>
            <div className="relative">
              <select className={`${inputClassName} appearance-none pr-10`} defaultValue="">
                <option value="" disabled>Select item</option>
                <option>Regular Wash</option>
                <option>Towel Wash</option>
                <option>Wool Sweater</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-[#344054]">
                Base Price <span className="text-redRejected">*</span>
              </label>
              <span className="text-xs text-[#667085]">Displayed to customers while booking.</span>
            </div>
            <AmountInput placeholder="Enter base pickup fee e.g. $5.00" />
            <p className="mt-1 text-xs text-[#667085]">Final totals are calculated automatically by the platform</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[#344054]">
              Price Type <span className="text-redRejected">*</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <RadioPill label="Flat" value="flat" selectedValue={priceType} onChange={setPriceType} />
              <RadioPill label="Per Unit" value="unit" selectedValue={priceType} onChange={setPriceType} />
              <RadioPill label="Percentage" value="percentage" selectedValue={priceType} onChange={setPriceType} />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-[#344054]">
                Pricing Method <span className="text-redRejected">*</span>
              </p>
              <span className="text-xs text-[#667085]">you can add custom label for price</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <RadioPill label="Per Piece" value="piece" selectedValue={pricingMethod} onChange={setPricingMethod} />
              <RadioPill label="Per Hour" value="hour" selectedValue={pricingMethod} onChange={setPricingMethod} />
              <RadioPill label="Per Kg" value="kg" selectedValue={pricingMethod} onChange={setPricingMethod} />
              <RadioPill label="Per Visit" value="visit" selectedValue={pricingMethod} onChange={setPricingMethod} />
              <RadioPill label="Per Session" value="session" selectedValue={pricingMethod} onChange={setPricingMethod} />
              <RadioPill label="Custom" value="custom" selectedValue={pricingMethod} onChange={setPricingMethod} />
            </div>
            <input
              type="text"
              className="mt-3 h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
              placeholder="Custom Pricing Label  e.g. Per Plate, Per Room, Per Test"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-[#344054]">Allow customers to select quantity</p>
            </div>
            <Switch checked={allowQuantity} onChange={() => setAllowQuantity((prev) => !prev)} ariaLabel="Allow quantity" />
            <p className="mt-1 text-xs text-[#667085]">Customers will book this service once per order</p>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-[#344054]">Service Status</p>
              <p className="text-xs text-[#667085]">Inactive services cannot be booked</p>
            </div>
            <Switch checked={serviceStatus} onChange={() => setServiceStatus((prev) => !prev)} ariaLabel="Service status" />
          </div>
        </div>
      </SideSheet>

      <SideSheet
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        title="Filters"
        footer={(
          <div className="flex items-center gap-3">
            <Button variant="danger" size="lg" className="flex-1">
              Apply
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => setIsFiltersOpen(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#344054]">Category Type</label>
            <div className="relative">
              <select
                value={categoryType}
                onChange={(event) => setCategoryType(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054]"
              >
                <option value="">Select Category Type</option>
                <option value="laundry">Laundry</option>
                <option value="home-care">Home Care</option>
                <option value="pickup-delivery">Pickup & Delivery</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#344054]">Service Type</label>
            <div className="relative">
              <select
                value={serviceType}
                onChange={(event) => setServiceType(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054]"
              >
                <option value="">Select Service Type</option>
                <option value="regular-wash">Regular Wash</option>
                <option value="wool-sweater">Wool Sweater</option>
                <option value="gym-wear-wash">Gym Wear Wash</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#344054]">Status</label>
            <div className="relative">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054]"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="pending-approval">Pending Approval</option>
                <option value="rejected">Rejected</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#344054]">Date Range</label>
            <DateRangeInput
              value={dateRange}
              onChange={setDateRange}
              className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] placeholder:text-[#98A2B3]"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#344054]">Show Flagged Only</p>
            </div>
            <p className="text-xs text-[#667085]">Show only flagged reviews</p>
          </div>
          <Switch
            checked={showFlaggedOnly}
            onChange={() => setShowFlaggedOnly((prev) => !prev)}
            ariaLabel="Show flagged only"
          />
        </div>
      </SideSheet>

      <ServiceActionModal
        isOpen={isPauseModalOpen}
        type="pause"
        serviceName={selectedServiceGroup}
        onClose={() => setIsPauseModalOpen(false)}
        onConfirm={() => setIsPauseModalOpen(false)}
      />

      <ServiceActionModal
        isOpen={isDeleteModalOpen}
        type="delete"
        serviceName={selectedServiceGroup}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ServiceCatalogTab;
