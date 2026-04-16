import { Download, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SideSheet from "../SideSheet";

const STATUS_CONFIG = {
  Paid: "text-greenVerified",
  Failed: "text-[#D92D20]",
  Completed: "text-[#007AFF]",
  Refunded: "text-orangeReview",
};

const DetailRow = ({ label, value, valueClass = "text-[#344054]" }) => (
  <div className="flex justify-between items-start py-2">
    <span className="text-sm text-textColor leading-5">{label}</span>
    <span className={`text-sm text-right leading-5 ${valueClass}`}>{value}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-sm font-semibold text-[#101828] mb-2 mt-6">{children}</h3>
);

const MoreActionButton = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative flex-1" ref={ref}>
      {open && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 w-full overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-lg z-10">
          <button className="w-full px-4 py-3 flex items-center gap-2 text-sm text-[#344054] transition-colors hover:bg-[#F9FAFB]">
            Share Bill
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-2 text-sm text-[#344054] transition-colors hover:bg-[#F9FAFB]">
            Print Bill
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D92D20] text-[#D92D20] text-sm font-semibold transition-colors hover:bg-[#FEF3F2]"
      >
        More Action
        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
};

const BillingDetailsSideSheet = ({ invoice, isOpen, onClose }) => {
  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Billing Details"
      footer={
        invoice ? (
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#D92D20] text-sm font-semibold text-white h-11 transition-colors hover:bg-[#B42318]"
            >
              <Download size={16} />
              Download Receipt
            </button>
            <MoreActionButton />
          </div>
        ) : null
      }
    >
      {invoice ? (
        <div className="flex flex-col">
          {/* Top Details */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-sm font-semibold text-[#101828]">Invoice ID:</span>
              <span className="text-sm font-normal text-[#667085]">{invoice.id}</span>
            </div>
            <DetailRow label="Transaction Type:" value={invoice.transactionType} />
            <DetailRow
              label="Status:"
              value={invoice.status}
              valueClass={STATUS_CONFIG[invoice.status] || "text-[#344054] font-medium"}
            />
            <DetailRow label="Created On:" value="Mar 12, 2026 at 03:48 PM" />
            <DetailRow label="Billing Period:" value={invoice.billingPeriod} />
          </div>

          <hr className="border-[#EAECF0]" />

          {/* Plan Details */}
          <SectionTitle>Plan Details</SectionTitle>
          <DetailRow label="Plan Name:" value={`${invoice.plan} Plan`} />
          <DetailRow label="Monthly Fee:" value="$19.99" />
          <DetailRow label="Auto-Renew:" value="Enabled" />
          <DetailRow label="Renewal Date:" value="Apr 12, 2026" />
          <DetailRow label="Subscription Status at Time of Billing:" value="Active" />

          <hr className="border-[#EAECF0] mt-4" />

          {/* Payment Details */}
          <SectionTitle>Payment Details</SectionTitle>
          <DetailRow label="Payment Method:" value="Visa ending in 4242" />
          <DetailRow label="Cardholder Name:" value="Margaret Thompson" />
          <DetailRow label="Payment Gateway Reference:" value="PAY-874392" />
          <DetailRow label="Payment Date:" value="Mar 12, 2026 at 03:48 PM" />
          <DetailRow label="Payment Status:" value="Successful" />
          <DetailRow label="Currency:" value="CAD" />

          <hr className="border-[#EAECF0] mt-4" />

          {/* Loyalty Activity */}
          <SectionTitle>Loyalty Activity</SectionTitle>
          <DetailRow label="Loyalty Balance Before Transaction:" value="320 Points" />
          <DetailRow label="Loyalty Earned:" value="+20 Points" />
          <DetailRow label="Loyalty Redeemed:" value="0 Points" />
          <DetailRow label="Loyalty Balance After Transaction:" value="340 Points" />

          <hr className="border-[#EAECF0] mt-4" />

          {/* Charges Breakdown */}
          <SectionTitle>Charges Breakdown</SectionTitle>
          <div className="bg-[#F9FAFB] rounded-xl p-4 mt-2 flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm text-[#344054]">
              <span>Subscription Fee</span>
              <span>$19.99</span>
            </div>
            <div className="flex justify-between items-center text-sm text-[#344054]">
              <span>Loyalty Points Applied</span>
              <span>-10 Points</span>
            </div>
            <hr className="border-[#EAECF0] my-1" />
            <div className="flex justify-between items-center text-sm font-semibold text-[#101828]">
              <span>Total Amount Paid</span>
              <span>{invoice.totalAmount}</span>
            </div>
          </div>
        </div>
      ) : null}
    </SideSheet>
  );
};

export default BillingDetailsSideSheet;
