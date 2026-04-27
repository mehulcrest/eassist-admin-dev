import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Eye,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  TriangleAlert,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";
import ReviewDocumentSideSheet from "./ReviewDocumentSideSheet";
import Button from "../ui/Button";
import Switch from "../ui/Switch";
import { TabHeader } from "../ui/Tabs";

const CARD = "rounded-xl border border-line bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.06)]";
const CARD_HEADER = "border-b border-[#EAECF0] px-5 py-4 sm:px-6";
const CARD_BODY = "p-5 sm:p-6";

const documentCategories = [
  {
    title: "Government ID",
    subtitle: "Identity Verification",
    metaLabel: "Last Verified on",
    lastVerifiedOn: "Jan 01, 2026",
    status: "Verified",
    tone: "verified",
  },
  {
    title: "Address Proof",
    subtitle: "Background Check",
    metaLabel: "Updated on",
    lastVerifiedOn: "Jan 01, 2026",
    status: "Verified",
    tone: "verified",
  },
  {
    title: "Other Documents",
    subtitle: "Credentials & Licenses",
    metaLabel: "Last Verified on",
    lastVerifiedOn: "Jan 01, 2026",
    status: "Pending",
    secondaryStatus: "Review",
    tone: "review",
  },
  {
    title: "Void Check",
    subtitle: "Banking & Payout",
    metaLabel: "Last Verified on",
    lastVerifiedOn: "Jan 01, 2026",
    status: "Verified",
    tone: "verified",
  },
];

const serviceDocuments = [
  {
    name: "Grocery Help",
    badge: "Active",
    badgeTone: "green",
    enabled: true,
    warning: "Eligible for assignment",
    warningTone: "ok",
    credentials: [
      { name: "Basic ID", status: "Verified", tone: "verified" },
      { name: "Address Proof", status: "Verified", tone: "verified" },
    ],
  },
  {
    name: "Meal Help",
    badge: "Active",
    badgeTone: "amber",
    enabled: true,
    warning: "Pending certification review may limit assignments",
    warningTone: "warn",
    credentials: [
      { name: "Basic ID", status: "Verified", tone: "verified" },
      { name: "Food Handling Certificate", status: "Pending Review", tone: "warn" },
    ],
  },
  {
    name: "Bath Help",
    badge: "Action Required",
    badgeTone: "amber",
    enabled: false,
    warning: "Cannot perform until certifications are verified",
    warningTone: "warn",
    credentials: [
      { name: "Caregiver Certification", status: "Pending Review", tone: "warn" },
      { name: "First Aid / CPR", status: "Expiring Soon", tone: "warn" },
    ],
  },
  {
    name: "Cleaning",
    badge: "Rejected",
    badgeTone: "red",
    enabled: false,
    warning: "Service restricted due to compliance issues.",
    warningTone: "danger",
    credentials: [
      { name: "Insurance Proof", status: "Rejected", tone: "danger" },
      { name: "Background Check", status: "Pending Review", tone: "warn" },
    ],
  },
];

const verificationTabs = [
  { id: "all", label: "All", note: "" },
  { id: "government", label: "Government ID", note: "Verified", noteTone: "verified" },
  { id: "address", label: "Address Proof", note: "Verified", noteTone: "verified" },
  { id: "other", label: "Other Documents", note: "Pending Review", noteTone: "warn" },
  { id: "void", label: "Void Check", note: "Verified", noteTone: "verified" },
];

const verificationRows = [
  {
    docGroup: "government",
    type: "Government ID (Driver's License)",
    category: "Identity Verification",
    number: "ON-DL-7845-2398",
    uploadedOn: "Jan 18, 2024",
    expiryDate: "Jan 18, 2027",
    status: "Verified",
    reviewedBy: "Robert Brown",
  },
  {
    docGroup: "government",
    type: "Health Card (OHIP)",
    category: "Identity Verification",
    number: "OHIP-9834-6621",
    uploadedOn: "Jan 20, 2024",
    expiryDate: "—",
    status: "Verified",
    reviewedBy: "Robert Brown",
  },
  {
    docGroup: "address",
    type: "Address Proof (Utility Bill)",
    category: "Identity Verification",
    number: "UTIL-ONT-6623",
    uploadedOn: "Jan 18, 2024",
    expiryDate: "Jan 20, 2027",
    status: "Rejected",
    reviewedBy: "Robert Brown",
  },
  {
    docGroup: "other",
    type: "Professional Caregiver Certificate",
    category: "Certifications & Licenses",
    number: "INS-PSP-456902",
    uploadedOn: "Jan 18, 2024",
    expiryDate: "Jan 18, 2027",
    status: "Verified",
    reviewedBy: "Robert Brown",
  },
  {
    docGroup: "other",
    type: "Insurance Proof",
    category: "Insurance & Liability",
    number: "LIAB-778201",
    uploadedOn: "Jan 18, 2024",
    expiryDate: "Jan 20, 2027",
    status: "Pending Review",
    reviewedBy: "Robert Brown",
  },
  {
    docGroup: "other",
    type: "Liability Insurance",
    category: "Insurance & Liability",
    number: "RBC-VOID-8821",
    uploadedOn: "Jan 20, 2024",
    expiryDate: "Jan 18, 2027",
    status: "Expiring Soon",
    reviewedBy: "Robert Brown",
  },
  {
    docGroup: "other",
    type: "Signed Agreement / Contract",
    category: "Compliance",
    number: "AGR-PSP-2024-9921",
    uploadedOn: "Jan 18, 2024",
    expiryDate: "Feb 10, 2026",
    status: "Verified",
    reviewedBy: "Robert Brown",
  },
  {
    docGroup: "void",
    type: "Bank Details / Void Cheque",
    category: "Banking & Payout",
    number: "RBC-VOID-8821",
    uploadedOn: "Jan 18, 2024",
    expiryDate: "Jan 18, 2027",
    status: "Verified",
    reviewedBy: "Robert Brown",
  },
];

const STATUS_PILL_STYLES = {
  verified: {
    chipClassName: "bg-[#ECFDF3] text-[#039855]",
    textClassName: "text-[#039855]",
    Icon: CheckCircle2,
    iconClassName: "text-[#12B76A]",
  },
  warn: {
    chipClassName: "bg-[#FFFAEB] text-[#DC6803]",
    textClassName: "text-[#DC6803]",
    Icon: AlertTriangle,
    iconClassName: "text-[#F79009]",
  },
  review: {
    chipClassName: "bg-[#FEF3F2] text-[#F04438]",
    textClassName: "text-[#F04438]",
    Icon: X,
    iconClassName: "text-[#F04438]",
  },
  rejected: {
    chipClassName: "bg-[#EFF8FF] text-[#175CD3]",
    textClassName: "text-[#175CD3]",
    Icon: X,
    iconClassName: "text-[#175CD3]",
  },
  expiring: {
    chipClassName: "bg-[#FFF1F3] text-[#F04438]",
    textClassName: "text-[#F04438]",
    Icon: AlertTriangle,
    iconClassName: "text-[#F04438]",
  },
  neutral: {
    chipClassName: "bg-[#F2F4F7] text-[#667085]",
    textClassName: "text-[#667085]",
  },
};

const StatusPill = ({ label, tone = "verified", showIcon = true, variant = "chip", className = "" }) => {
  const config = STATUS_PILL_STYLES[tone] ?? STATUS_PILL_STYLES.neutral;
  const Icon = config.Icon;
  const baseClass =
    variant === "text"
      ? "inline-flex items-center gap-1 text-sm font-medium"
      : "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-semibold";
  const toneClass = variant === "text" ? config.textClassName : config.chipClassName;

  return (
    <span
      className={`${baseClass} ${toneClass} ${className}`}
    >
      {showIcon && Icon ? <Icon size={13} className={config.iconClassName} strokeWidth={2.2} /> : null}
      {label}
    </span>
  );
};

const VerificationTab = () => {
  const [serviceSwitches, setServiceSwitches] = useState(
    Object.fromEntries(serviceDocuments.map((d) => [d.name, d.enabled]))
  );
  const [activeDocTab, setActiveDocTab] = useState("government");
  const [query, setQuery] = useState("");
  const [isReviewSheetOpen, setIsReviewSheetOpen] = useState(false);
  const [reviewDocName, setReviewDocName] = useState("Government ID");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const tabFiltered =
      activeDocTab === "all"
        ? verificationRows
        : verificationRows.filter((r) => r.docGroup === activeDocTab);

    if (!q) return tabFiltered;

    return tabFiltered.filter(
      (r) =>
        r.type.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.number.toLowerCase().includes(q)
    );
  }, [activeDocTab, query]);

  const getRowStatusTone = (status) => {
    if (status === "Verified") return "verified";
    if (status === "Pending Review") return "warn";
    if (status === "Rejected") return "rejected";
    if (status === "Expiring Soon") return "expiring";
    return "neutral";
  };

  const openReviewSheet = (docName) => {
    setReviewDocName(docName);
    setIsReviewSheetOpen(true);
  };

  return (
    <div className="space-y-4 pb-2">
      <div className={CARD}>
        <div className="px-5 pt-4 sm:px-6">
          <h3 className="text-xl font-semibold leading-none text-textColor">Document Categories</h3>
        </div>
        <div className={`${CARD_BODY} grid gap-3 md:grid-cols-2 xl:grid-cols-4`}>
          {documentCategories.map((doc) => (
            <div key={doc.title} className="flex min-h-[132px] flex-col rounded-xl border border-[#DDE1E6] bg-white p-4">
              <div>
                <p className="text-base font-semibold leading-tight text-textColor">{doc.title}</p>
                <p className="mt-1 text-sm font-normal leading-tight text-secondaryTextColor">{doc.subtitle}</p>
              </div>

              <div className="mt-auto">
                <p className="text-right text-sm font-medium leading-tight text-textColor">
                  {doc.metaLabel}: <span className="text-TextColor font-normal">{doc.lastVerifiedOn}</span>
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  {doc.tone === "review" ? (
                    <>
                      <StatusPill label={doc.status} tone="warn" showIcon={false} />
                      <StatusPill label={doc.secondaryStatus} tone="review" showIcon={false} />
                    </>
                  ) : (
                    <StatusPill label={doc.status} tone="verified" className="ml-auto" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={CARD}>
        <div className={`${CARD_HEADER} flex items-center justify-between`}>
          <h3 className="text-base xl:text-lg font-semibold text-textColor">Service Documents</h3>
          <StatusPill label="Verified" tone="verified" />
        </div>
        <div className={`${CARD_BODY} grid gap-3 xl:grid-cols-2`}>
          {serviceDocuments.map((service) => (
            <div key={service.name} className="rounded-xl border border-[#DDE1E6] bg-white">
              <div className="flex items-center justify-between border-b border-[#EAECF0] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-base xl:text-lg">🧺</span>
                  <p className="text-base font-medium text-textColor">{service.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill
                    label={service.badge}
                    tone={service.badgeTone === "green" ? "verified" : service.badgeTone === "amber" ? "warn" : "review"}
                  />
                  <Switch
                    checked={serviceSwitches[service.name]}
                    onChange={() =>
                      setServiceSwitches((prev) => ({ ...prev, [service.name]: !prev[service.name] }))
                    }
                    ariaLabel={`${service.name} enabled`}
                  />
                  <Button
                    onClick={() => openReviewSheet(service.name)}
                    variant="secondary"
                    size="sm"
                  >
                    Review Doc
                  </Button>
                </div>
              </div>

              <div className="space-y-2 px-4 py-3">
                <p className="text-sm xl:text-sm font-medium text-textColor">Required Credentials:</p>
                {service.credentials.map((c) => (
                  <div key={c.name} className="flex items-center justify-between text-sm">
                    <span className="text-textColor">{c.name}</span>
                    <StatusPill
                      label={c.status}
                      tone={c.tone === "verified" ? "verified" : c.tone === "danger" ? "review" : "warn"}
                      variant="text"
                    />
                  </div>
                ))}
              </div>

              <div className="border-t border-[#EAECF0] px-4 py-3">
                <p
                  className="inline-flex items-center gap-1 text-sm text-textColor"
                >
                  {service.warningTone === "ok" ? <CheckCircle2 size={24} className="text-white fill-[#12B76A]" strokeWidth={2.4} /> : <TriangleAlert size={24} className="text-white fill-[#F59E0B]" strokeWidth={2.4} />}
                  {service.warning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4 px-4 py-2 sm:px-5 border-b border-[#EAECF0]">
          <h3 className="text-base xl:text-lg font-semibold text-[#101828]">Verification Documents</h3>
          <StatusPill label="Verified" tone="verified" />
        </div>

        <div className="px-4 py-3 sm:px-5 mb-2">
          <div className="rounded-xl border border-[#EAECF0] bg-white p-2">
            <TabHeader
              tabs={verificationTabs.map((tab) => ({
                ...tab,
                renderMeta: tab.note
                  ? () => (
                      <StatusPill
                        label={tab.note}
                        tone={tab.noteTone === "verified" ? "verified" : "warn"}
                        showIcon={false}
                        className="text-xs font-medium"
                      />
                    )
                  : undefined,
              }))}
              activeTab={activeDocTab}
              onChange={setActiveDocTab}
            />
          </div>
        </div>

        <div className="px-4 pb-3 sm:px-5 mb-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-[290px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by document category"
                className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
              />
            </div>
            <Button
              variant="secondary"
              size="md"
            >
              <SlidersHorizontal size={16} />
              Filters
            </Button>
          </div>
        </div>

        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <TableWrapper>
            <Table minWidth="min-w-[980px]">
              <TableHead>
                <Th>Document Type</Th>
                <Th>Category</Th>
                <Th>Document Number</Th>
                <Th>Uploaded On</Th>
                <Th>Expiry Date</Th>
                <Th>Status</Th>
                <Th>Reviewed By</Th>
                <Th className="text-right">Actions</Th>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.number}>
                    <Td>{row.type}</Td>
                    <Td>{row.category}</Td>
                    <Td>{row.number}</Td>
                    <Td>{row.uploadedOn}</Td>
                    <Td>{row.expiryDate}</Td>
                    <Td>
                      <StatusPill label={row.status} tone={getRowStatusTone(row.status)} />
                    </Td>
                    <Td>{row.reviewedBy}</Td>
                    <Td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="icon"
                          size="icon"
                          aria-label="View"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          variant="icon"
                          size="icon"
                          aria-label="More actions"
                        >
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </Td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </div>
      </div>

      <ReviewDocumentSideSheet
        isOpen={isReviewSheetOpen}
        onClose={() => setIsReviewSheetOpen(false)}
        documentName={reviewDocName}
      />
    </div>
  );
};

export default VerificationTab;
