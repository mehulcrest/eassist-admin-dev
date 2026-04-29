import { AlertTriangle, Eye, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import Button, { FiltersButton } from "../ui/Button";
import Switch from "../ui/Switch";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";

const STATS = [
  { label: "Total Services", value: "32", note: "All services configured under this business" },
  { label: "Active Services", value: "24", note: "Currently available for booking" },
  { label: "Pending Approval", value: "4", note: "Services awaiting admin approval" },
  { label: "Services with Issues", value: "5", note: "Flagged for pricing, compliance, or quality risks" },
];

const SERVICE_ROWS = [
  { name: "Regular Wash", category: "Per Hour", basePrice: "$26.00 / hr", netEarning: "22.10", active: true },
  { name: "Bathroom (Single / Double) Wash", category: "Per Hour", basePrice: "$18.00 / hr", netEarning: "15.30", active: true },
  { name: "Towel Wash", category: "Per Piece", basePrice: "$23.00 / item", netEarning: "23.80", active: true },
  { name: "Gym Wear Wash", category: "Per Visit", basePrice: "$22.00 / visit", netEarning: "18.70", active: true },
  { name: "School Uniform Wash & Iron", category: "Per Piece", basePrice: "$16.00 / item", netEarning: "12.75", active: false },
  { name: "Wool Sweater", category: "Per Hour", basePrice: "$50.00 / hr", netEarning: "42.50", active: true },
];

const ServiceCatalogTab = () => {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICE_ROWS;
    return SERVICE_ROWS.filter(
      (row) => row.name.toLowerCase().includes(q) || row.category.toLowerCase().includes(q)
    );
  }, [query]);

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
        <div className="flex gap-2">
          <FiltersButton />
          <Button variant="danger" size="md">
            <Plus size={16} />
            Add New
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#EAECF0] bg-white p-4">
            <p className="text-sm font-medium text-[#344054]">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">{stat.value}</p>
            <p className="mt-1 text-xs text-[#667085]">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <TableWrapper>
          <Table minWidth="min-w-[860px]">
            <TableHead>
              <Th>Service Name</Th>
              <Th>Category</Th>
              <Th>Base Price</Th>
              <Th>Net Earnings</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <Td>{row.name}</Td>
                  <Td>{row.category}</Td>
                  <Td>{row.basePrice}</Td>
                  <Td>{row.netEarning}</Td>
                  <Td>
                    <Switch checked={row.active} ariaLabel={`Toggle ${row.name}`} />
                  </Td>
                  <Td className="text-right">
                    <Button variant="icon" size="icon" aria-label={`View ${row.name}`}>
                      <Eye size={14} />
                    </Button>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        <div className="space-y-4">
          <section className="rounded-xl border border-[#EAECF0] bg-white p-4">
            <h3 className="text-sm font-semibold text-[#101828]">Insights & Flags</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#475467]">
              <li className="flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[#F79009]" />
                Multiple services flagged for risks
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[#F79009]" />
                3 services pending admin review
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[#12B76A]" />
                Elder care services highly rated
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-[#EAECF0] bg-white p-4">
            <h3 className="text-sm font-semibold text-[#101828]">Quality Tips</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#475467]">
              <li>Review flagged services promptly</li>
              <li>Verify certifications and compliance documents</li>
              <li>Check pricing against market averages</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalogTab;
