import { AlertTriangle, BellRing, CheckCircle2, Eye, GraduationCap, MoreHorizontal, TriangleAlert, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableHead, TableRow, TableWrapper, Td, Th } from "../ui/Table";
import ReviewDocumentSideSheet from "./ReviewDocumentSideSheet";

const CARD = "rounded-xl border border-line bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.06)]";

const eligibilityRows = [
  { plan: "Government ID", status: "Verified", tone: "verified" },
  { plan: "Background Check", status: "Expiring Soon", tone: "expiring" },
  { plan: "Insurance", status: "Pending Review", tone: "pending" },
  { plan: "License", status: "Verified", tone: "verified" },
  { plan: "Training", status: "Incomplete", tone: "incomplete" },
];

const statusClass = {
  verified: "bg-greenVerified/10 text-greenVerified",
  expiring: "bg-redRejected/10 text-redRejected",
  pending: "bg-orangeReview/10 text-orangeReview",
};

const ComplianceTab = () => {
  const [isReviewSheetOpen, setIsReviewSheetOpen] = useState(false);
  const [reviewDocName, setReviewDocName] = useState("Government ID");
  const [openActionMenuFor, setOpenActionMenuFor] = useState(null);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenActionMenuFor(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const openReviewSheet = (planName) => {
    setReviewDocName(planName);
    setIsReviewSheetOpen(true);
    setOpenActionMenuFor(null);
  };

  return (
    <div className="space-y-4 pb-2">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
        <div className="space-y-3">
          <div className="rounded-xl border border-[#A6F4C5] border-l-4 border-l-[#12B76A] bg-[#F2FCF6] px-4 py-3.5">
            <p className="inline-flex items-center gap-2 text-lg font-semibold leading-tight text-textColor">
              <CheckCircle2 className="text-[#039855]" size={18} strokeWidth={2.2} />
              Fully Compliant
            </p>
            <p className="mt-1 text-base font-normal leading-tight text-textColor">Bank transfer was unsuccessful. Please retry or update bank details.</p>
          </div>

          <div className="rounded-xl border border-[#FBC893] border-l-4 border-l-[#F79009] bg-[#FFF9F2] px-4 py-3.5">
            <p className="inline-flex items-center gap-2 text-lg font-semibold leading-tight text-textColor">
              <AlertTriangle className="text-[#B54708]" size={18} strokeWidth={2.2} />
              Action Required
            </p>
            <p className="mt-1 text-base font-normal leading-tight text-textColor">Bank transfer was unsuccessful. Please retry or update bank details.</p>
          </div>

          <div className="rounded-xl border border-[#FDA29B] border-l-4 border-l-[#F04438] bg-[#FFF5F5] px-4 py-3.5">
            <p className="inline-flex items-center gap-2 text-lg font-semibold leading-tight text-textColor">
              <XCircle className="text-[#D92D20]" size={18} strokeWidth={2.2} />
              Restricted
            </p>
            <p className="mt-1 text-base font-normal leading-tight text-textColor">Bank transfer was unsuccessful. Please retry or update bank details.</p>
          </div>

          <div className={CARD}>
            <div className="border-b border-[#EAECF0] px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold text-[#101828]">Eligibility Checklist</h3>
            </div>
            <div className="px-5 py-4 sm:px-6">
              <p className="text-sm text-textColor">
                All mandatory requirements must be verified for full eligibility.
              </p>
            </div>
            <div className="px-4 pb-4 sm:px-6 sm:pb-5">
              <TableWrapper>
                <Table minWidth="min-w-[620px]">
                  <colgroup>
                    <col className="w-[58%]" />
                    <col className="w-[26%]" />
                    <col className="w-[16%]" />
                  </colgroup>
                  <TableHead>
                    <Th>Plan</Th>
                    <Th>
                      <div className="flex items-center justify-center">Status</div>
                    </Th>
                    <Th>
                      <div className="flex items-center justify-end">Actions</div>
                    </Th>
                  </TableHead>
                  <TableBody>
                    {eligibilityRows.map((row) => (
                      <TableRow key={row.plan}>
                        <Td>{row.plan}</Td>
                        <Td>
                          <div className="flex items-center justify-center">
                            {row.tone === "incomplete" ? (
                              <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-textColor">
                                <TriangleAlert size={14} className="text-orangeReview" />
                                {row.status}
                              </span>
                            ) : (
                              <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm font-medium leading-none ${statusClass[row.tone]}`}>
                                {row.status}
                              </span>
                            )}
                          </div>
                        </Td>
                        <Td>
                          <div className="relative flex items-center justify-end gap-2" ref={openActionMenuFor === row.plan ? actionMenuRef : null}>
                            <button
                              type="button"
                              onClick={() => openReviewSheet(row.plan)}
                              className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085]"
                              aria-label="View"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setOpenActionMenuFor((prev) => (prev === row.plan ? null : row.plan))}
                              className="inline-flex size-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085]"
                              aria-label="More actions"
                            >
                              <MoreHorizontal size={14} />
                            </button>

                            {openActionMenuFor === row.plan ? (
                              <div className="absolute right-0 top-full z-20 mt-1 w-[210px] rounded-xl border border-[#EAECF0] bg-white p-2 shadow-[0_12px_24px_-8px_rgba(16,24,40,0.18)]">
                                <button
                                  type="button"
                                  className="flex h-10 w-full items-center gap-2 rounded-lg px-2.5 text-left text-base font-normal text-[#344054] transition hover:bg-[#F9FAFB]"
                                >
                                  <BellRing size={16} className="text-[#667085]" />
                                  Request Update
                                </button>
                                <button
                                  type="button"
                                  className="flex h-10 w-full items-center gap-2 rounded-lg px-2.5 text-left text-base font-normal text-[#344054] transition hover:bg-[#F9FAFB]"
                                >
                                  <GraduationCap size={16} className="text-[#667085]" />
                                  Assign Training
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </Td>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className={CARD}>
            <div className="border-b border-[#EAECF0] px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold text-[#101828]">Restrictions Alerts</h3>
            </div>
            <div className="px-5 py-4 text-sm text-textColor sm:px-6">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-[#F04438]" />
                  <div className="flex flex-col gap-0.5">
                  <span>Cannot accept medical services</span>
                  <span className="text-secondaryTextColor">(Training incomplete)</span>
                  </div>

                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-[#F04438]" />
                  <div className="flex flex-col gap-0.5">
                  <span>Cannot work cleaning related services</span>
                  <span className="text-secondaryTextColor">(Certification missing)</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={CARD}>
            <div className="border-b border-[#EAECF0] px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold text-[#101828]">Training Progress</h3>
            </div>
            <div className="space-y-6 px-5 py-4 text-sm sm:px-6">
              <ul className="space-y-1 text-textColor list-disc pl-5">
                <li>Completed: 3 / 5 modules</li>
                <li>Progress: 60%</li>
              </ul>
              <div>
                <p className="font-semibold text-textColor">Required:</p>

                <ul className="mt-1 space-y-1 text-textColor list-disc pl-5">
                  <li>
                    CPR Training: <span className="font-medium text-greenVerified">Completed</span>
                  </li>
                  <li>
                    Elder Safety: <span className="font-medium text-greenVerified">Completed</span>
                  </li>
                  <li>
                    Dementia Care: <span className="font-medium text-orangeReview">! Pending</span>
                  </li>
                  <li>
                    Mobility Assistance: <span className="font-medium text-orangeReview">! Pending</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="mt-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-semibold text-textColor"
                >
                  View Training Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:w-2/3">
        <div className={CARD}>
          <div className="border-b border-[#EAECF0] px-5 py-4 sm:px-6">
            <h3 className="text-lg font-semibold text-[#101828]">Expiring Documents</h3>
          </div>
          <div className="space-y-4 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 xxs:flex-row xxs:items-center xxs:justify-between">
              <div>
                <p className="text-sm font-semibold text-textColor underline">Insurance</p>
                <p className="text-sm text-textColor">Expires in <span className="text-DangerRed">5 days</span></p>
              </div>
              <button className="rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-semibold text-textColor">Request Update</button>
            </div>
            <div className="flex flex-col gap-3 xxs:flex-row xxs:items-center xxs:justify-between">
              <div>
                <p className="text-sm font-semibold text-textColor underline">CPR Certificate</p>
                <p className="text-sm text-textColor">Expires in <span className="text-DangerRed">12 days</span></p>
              </div>
              <button className="rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-semibold text-textColor">Request Update</button>
            </div>
          </div>
        </div>

        <div className={CARD}>
          <div className="border-b border-[#EAECF0] px-5 py-4 sm:px-6">
            <h3 className="text-lg font-semibold text-[#101828]">Compliance Rules</h3>
          </div>
          <div className="px-5 py-4 sm:px-6">
            <ul className="space-y-2 text-sm text-textColor">
              <li className="flex items-start gap-2"><span className="mt-2 size-1.5 rounded-full bg-[#12B76A]" /> PSP cannot be assigned jobs if required certification is expired</li>
              <li className="flex items-start gap-2"><span className="mt-2 size-1.5 rounded-full bg-[#12B76A]" /> Pending background checks limit high-risk service assignments</li>
              <li className="flex items-start gap-2"><span className="mt-2 size-1.5 rounded-full bg-[#12B76A]" /> Expired insurance blocks all assignments</li>
              <li className="flex items-start gap-2"><span className="mt-2 size-1.5 rounded-full bg-[#12B76A]" /> Missing mandatory training restricts specific service categories</li>
            </ul>
          </div>
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

export default ComplianceTab;
