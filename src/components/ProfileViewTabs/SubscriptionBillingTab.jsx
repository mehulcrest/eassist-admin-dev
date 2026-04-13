import { Eye } from "lucide-react";

/* ─── Static data ───────────────────────────────────────────────────────── */

const PLAN = {
  name: "Premium Plan",
  price: "$19.99",
  period: "per month",
  renewal: "Renewal Due Soon",
  nextBillingDate: "Apr 12, 2026 at 03:48 PM",
  startDate: "Mar 12, 2026 at 03:48 PM",
  autoRenew: "Enabled",
  paymentBrand: "VISA",
  paymentLast4: "4242",
  benefits: [
    "No service-call fee",
    "Earn 5% Loyalty Points on subscription",
    "Free cancellation anytime",
    "Auto-renew, but no auto-charge without consent",
  ],
};

const BILLING_HISTORY = [
  {
    id: "#SB-001234",
    transactionType: "Subscription Renewal",
    plan: "Premium",
    billingPeriod: "Mar 12 – Apr 11, 2026",
    loyaltyActivity: "+20 Points Earned",
    loyaltyColor: "text-[#039855]",
    paymentDate: "Mar 12, 2026",
    totalAmount: "$22.49",
    status: "Paid",
  },
  {
    id: "#SB-001232",
    transactionType: "Loyalty Redemption",
    plan: "Premium",
    billingPeriod: "Feb 12 – Mar 11, 2026",
    loyaltyActivity: "-10 Points Applied",
    loyaltyColor: "text-[#D92D20]",
    paymentDate: "Feb 12, 2026",
    totalAmount: "$22.49",
    status: "Paid",
  },
  {
    id: "#SB-001230",
    transactionType: "Failed Renewal Attempt",
    plan: "Premium",
    billingPeriod: "Jan 12 – Feb 11, 2026",
    loyaltyActivity: "No Loyalty Activity",
    loyaltyColor: "text-[#667085]",
    paymentDate: "Jan 12, 2026",
    totalAmount: "$22.49",
    status: "Failed",
  },
  {
    id: "#SB-001229",
    transactionType: "Plan Change",
    plan: "Premium",
    billingPeriod: "Effective Mar 26, 2026",
    loyaltyActivity: "No Loyalty Activity",
    loyaltyColor: "text-[#667085]",
    paymentDate: "Mar 26, 2026",
    totalAmount: "$0.00",
    status: "Completed",
  },
  {
    id: "#SB-001228",
    transactionType: "Refund",
    plan: "Premium",
    billingPeriod: "Feb 12 – Mar 11, 2026",
    loyaltyActivity: "Points Reversed",
    loyaltyColor: "text-[#667085]",
    paymentDate: "Feb 14, 2026",
    totalAmount: "-$19.99",
    status: "Refunded",
  },
];

const STATUS_CONFIG = {
  Paid: { bg: "bg-[#ECFDF3]", text: "text-[#039855]" },
  Failed: { bg: "bg-[#FEF3F2]", text: "text-[#D92D20]" },
  Completed: { bg: "bg-[#F0F9FF]", text: "text-[#007AFF]" },
  Refunded: { bg: "bg-[#FFFAEB]", text: "text-[#DC6803]" },
};

/* ─── Sub-components (all arrow functions) ──────────────────────────────── */

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["Completed"];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      {status}
    </span>
  );
};

const VisaIcon = () => (
  <svg
    width="32"
    height="20"
    viewBox="0 0 32 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <rect width="32" height="20" rx="3" fill="#1A1F71" />
    <text
      x="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      y="55%"
      fill="white"
      fontSize="8"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
      letterSpacing="1"
    >
      VISA
    </text>
  </svg>
);



const TH = ({ children, className = "" }) => (
  <th
    className={`px-4 py-3 text-left text-[14px] font-semibold text-[#344054] border-b border-[#EAECF0] whitespace-nowrap first:pl-6 last:pr-6 ${className}`}
  >
    {children}
  </th>
);

const TD = ({ children, className = "" }) => (
  <td
    className={`px-4 py-3.5 align-middle text-[14px] text-secondaryTextColor font-normal first:pl-6 last:pr-6 ${className}`}
  >
    {children}
  </td>
);

/* ─── Main component ────────────────────────────────────────────────────── */

const SubscriptionBillingTab = () => (
  <div className="flex flex-col gap-6">
    {/* ── Current Plan ──────────────────────────────────────────────────── */}
    <section className="rounded-xl border border-[#EAECF0] bg-white p-6">
      <h2 className="text-base font-semibold text-[#101828]">Current Plan</h2>
      <p className="mt-0.5 text-sm text-[#667085]">
        View the member's active subscription, billing status, renewal details, and payment method.
      </p>

      {/* Plan card layout */}
      <div className="mt-5 flex flex-col md:flex-row rounded-xl border border-[#EAECF0] bg-white">
        {/* Left Section */}
        <div className="flex w-full flex-col gap-6 p-6 md:w-[35%] md:border-r border-b md:border-b-0 border-[#EAECF0]">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* SVG Icon matching exactly the red diamond from Figma */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#FEE0E0"/>
            <path d="M25.1289 16.1406L20 30.4609M20 30.4609L14.8711 16.1406M20 30.4609L7.76172 16.1406M7.76172 16.1406L14.4141 9.53906H20M7.76172 16.1406H32.2383" stroke="#E4302F" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.8711 16.1406L20 9.53906M20 9.53906H26.0938L32.2383 16.1406L20 30.4609M20 9.53906L25.1289 16.1406" stroke="#E4302F" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className="flex flex-col items-start gap-1.5">
              <h3 className="text-lg font-semibold text-[#101828]">{PLAN.name}</h3>
              <p className="text-sm font-semibold text-[#101828]">
                {PLAN.price} <span className="font-normal text-[#667085]">{PLAN.period}</span>
              </p>
              <span className="mt-1 inline-flex items-center rounded-full bg-[#EFF8FF] px-2.5 py-0.5 text-xs font-semibold text-[#175CD3]">
                {PLAN.renewal}
              </span>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[#101828]">Benefits</h4>
            <ul className="flex flex-col gap-2.5">
              {PLAN.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-[#344054]">
                  <span className="mt-1.5 block size-[5px] shrink-0 rounded-full bg-[#F04438]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex w-full flex-col justify-between sm:flex-row sm:items-start gap-6">
            {/* Grid of details */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#101828]">Next Billing Date</span>
                <span className="text-sm text-[#667085]">{PLAN.nextBillingDate}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#101828]">Start Date</span>
                <span className="text-sm text-[#667085]">{PLAN.startDate}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#101828]">Auto Renew</span>
                <span className="text-sm text-[#667085]">{PLAN.autoRenew}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#101828]">Payment By</span>
                <div className="flex items-center gap-2">
                  <VisaIcon />
                  <span className="text-sm text-[#667085]">
                    {PLAN.paymentBrand} **** {PLAN.paymentLast4}
                  </span>
                </div>
              </div>
            </div>

            {/* Manage Subscription Button */}
            <div className="shrink-0">
              <button
                type="button"
                className="rounded-lg bg-[#F04438] px-[18px] py-[10px] text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#D92D20] whitespace-nowrap"
              >
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Billing History ───────────────────────────────────────────────── */}
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-[#101828]">Billing History</h2>

      <div className="overflow-x-auto rounded-xl border border-[#EAECF0] bg-white">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-[#FCFCFD]">
              <TH>Billing ID</TH>
              <TH>Transaction Type</TH>
              <TH>Plan</TH>
              <TH>Billing Period</TH>
              <TH>Loyalty Activity</TH>
              <TH>Payment Date</TH>
              <TH>Total Amount</TH>
              <TH>Status</TH>
              <TH>Actions</TH>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {BILLING_HISTORY.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-[#F9FAFB]/80">
                <TD>
                  <span className="font-normal text-secondaryTextColor">{row.id}</span>
                </TD>
                <TD>{row.transactionType}</TD>
                <TD>
                  <span className="font-medium text-[#344054]">{row.plan}</span>
                </TD>
                <TD>{row.billingPeriod}</TD>
                <TD>
                  <span className={`font-medium ${row.loyaltyColor}`}>
                    {row.loyaltyActivity}
                  </span>
                </TD>
                <TD>{row.paymentDate}</TD>
                <TD>
                  <span
                    className={
                      row.totalAmount.startsWith("-")
                        ? "font-medium text-[#D92D20]"
                        : "font-medium text-[#344054]"
                    }
                  >
                    {row.totalAmount}
                  </span>
                </TD>
                <TD>
                  <StatusBadge status={row.status} />
                </TD>
                <TD>
                  <button
                    type="button"
                    aria-label={`View billing record ${row.id}`}
                    className="inline-flex size-[34px] items-center justify-center rounded-lg border border-[#EAECF0] text-[#667085] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F2F4F7] hover:text-[#344054]"
                  >
                    <Eye size={18} strokeWidth={1.5} />
                  </button>
                </TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </div>
);

export default SubscriptionBillingTab;
