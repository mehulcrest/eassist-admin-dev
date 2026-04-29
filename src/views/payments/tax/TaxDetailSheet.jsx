import { X } from "lucide-react";
import SideSheet from "../../../components/SideSheet";

const FieldLabel = ({ children }) => (
  <p className="mb-1 text-xs font-semibold text-[#101828]">{children}</p>
);

const FieldValue = ({ children }) => (
  <p className="text-sm font-medium text-[#475467]">{children}</p>
);

const SectionTitle = ({ children }) => (
  <h3 className="mb-4 text-base font-bold text-[#101828]">{children}</h3>
);

const HDivider = () => <div className="my-6 border-t border-[#EAECF0]" />;

const TimelineRow = ({ date, label, isLast }) => (
  <div className="flex gap-4 min-h-[44px]">
    <div className="flex shrink-0 flex-col items-center" style={{ width: 18 }}>
      <div
        className="mt-[5px] shrink-0 rounded-full border-[1.5px] border-[#F04438] bg-white"
        style={{ width: 11, height: 11 }}
      />
      {!isLast && (
        <div
          className="mt-1 flex-1"
          style={{ width: 0, borderLeft: "1px dashed #FECDCA", minHeight: 24 }}
        />
      )}
    </div>
    <p className="pb-2 text-sm text-[#475467]">
      <span className="w-[50px] inline-block font-normal">{date}</span>
      {" "}{label}
    </p>
  </div>
);

const TaxDetailSheet = ({ isOpen, onClose, entry }) => {
  if (!isOpen || !entry) return null;

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Tax Summary Details"
      widthClass="w-[480px]"
      footer={
        <div className="flex w-full gap-3">
          <button
            type="button"
            className="flex-1 rounded-lg border border-[#F04438] bg-white h-11 text-sm font-semibold text-[#F04438] hover:bg-[#FEF3F2] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            View All Transactions
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg bg-[#F04438] h-11 text-sm font-semibold text-white hover:bg-[#D92D20] transition-colors shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            Export Report
          </button>
        </div>
      }
    >
      <div className="pb-4">
        
        {/* ── Summary Overview ── */}
        <SectionTitle>Summary Overview</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel>Total Transactions</FieldLabel>
            <FieldValue>{entry.totalTransactions}</FieldValue>
          </div>
          <div>
            <FieldLabel>Total Tax Collected</FieldLabel>
            <FieldValue>{entry.taxCollected}</FieldValue>
          </div>
        </div>

        <HDivider />

        {/* ── PSP Tax vs Platform Tax ── */}
        <SectionTitle>PSP Tax vs Platform Tax</SectionTitle>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <FieldLabel>PSP Tax</FieldLabel>
            <FieldValue>{entry.pspTax}</FieldValue>
          </div>
          <div>
            <FieldLabel>Platform Tax</FieldLabel>
            <FieldValue>{entry.platformTax}</FieldValue>
          </div>
        </div>
        <p className="text-sm text-[#475467] leading-relaxed">
          Tax is automatically calculated based on transaction components and applicable tax rules.
        </p>

        <HDivider />

        {/* ── Territory Breakdown ── */}
        <SectionTitle>Territory Breakdown</SectionTitle>
        <div className="rounded-xl border border-[#EAECF0] overflow-hidden mb-6">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F9FAFB] border-b border-[#EAECF0]">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-[#101828]">Territory</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#101828]">Tax Collected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              <tr>
                <td className="px-4 py-3 text-sm text-[#475467]">West</td>
                <td className="px-4 py-3 text-sm text-[#475467]">$800</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[#475467]">North</td>
                <td className="px-4 py-3 text-sm text-[#475467]">$600</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[#475467]">East</td>
                <td className="px-4 py-3 text-sm text-[#475467]">$600</td>
              </tr>
              {/* Total Row */}
              <tr>
                <td className="px-4 py-3 bg-white border-r-0"></td>
                <td className="px-4 py-3 text-sm text-[#475467] font-medium bg-[#F2F4F7] border-l border-[#EAECF0]">
                  {entry.taxCollected}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <HDivider />

        {/* ── Processing Timeline ── */}
        <SectionTitle>Processing Timeline</SectionTitle>
        <div className="mt-4">
          <TimelineRow date="Mar 15" label="Tax Calculated" />
          <TimelineRow date="Mar 16" label="Report Generated" />
          <TimelineRow date="Mar 18" label="Filed" isLast />
        </div>

      </div>
    </SideSheet>
  );
};

export default TaxDetailSheet;
