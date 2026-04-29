import { useState } from "react";

const inputClassName =
  "h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia";

const Toggle = ({ checked, onChange, ariaLabel }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
      checked ? "bg-redRejected" : "bg-[#D0D5DD]"
    }`}
  >
    <span
      className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-all ${
        checked ? "left-[22px]" : "left-0.5"
      }`}
    />
  </button>
);

const NumberInputWithDollar = ({ placeholder }) => (
  <div className="flex h-10 w-full overflow-hidden rounded-lg border border-[#D0D5DD] bg-white">
    <span className="inline-flex w-11 shrink-0 items-center justify-center border-r border-[#D0D5DD] bg-[#F3F3F3] text-xl leading-none text-[#667085]">
      $
    </span>
    <input
      type="text"
      placeholder={placeholder}
      className="h-full w-full border-0 bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:ring-0"
    />
  </div>
);

const ServiceModelCard = ({
  title,
  subtitle,
  description,
  icon,
  enabled,
  onToggle,
  children,
}) => (
  <section className="overflow-hidden rounded-xl border border-line bg-white">
    <div className="flex items-center justify-between border-b border-[#EAECF0] px-4 py-3.5">
      <h2 className="text-lg leading-none font-semibold text-[#1D2939]">{title}</h2>
      <Toggle checked={enabled} onChange={onToggle} ariaLabel={`Toggle ${title}`} />
    </div>

    <div className="space-y-5 p-4">
      <div className="flex items-center gap-3 rounded-xl border border-[#D0D5DD] bg-white p-3">
        <div className="text-3xl leading-none">{icon}</div>
        <div>
          <p className="text-base leading-none font-semibold text-[#1D2939]">{title}</p>
          <p className="mt-1 text-sm text-[#667085]">{subtitle}</p>
        </div>
      </div>

      <p className="text-base leading-tight text-[#101828]">{description}</p>

      <div className={`space-y-4 ${enabled ? "" : "pointer-events-none opacity-60"}`}>{children}</div>
    </div>
  </section>
);

const ServiceModelSetupTab = () => {
  const [inStoreEnabled, setInStoreEnabled] = useState(true);
  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [onSiteEnabled, setOnSiteEnabled] = useState(true);

  return (
    <div>
      <p className="mb-4 text-sm text-[#101828]">How does this business deliver services?</p>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <ServiceModelCard
          title="In-Store Services"
          subtitle="Customers visit your store."
          description="Customers visit business location"
          icon="🏪"
          enabled={inStoreEnabled}
          onToggle={() => setInStoreEnabled((prev) => !prev)}
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Active Modes <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="Enter active modes" className={inputClassName} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Estimated Charges Preview <span className="text-redRejected">*</span>
            </label>
            <NumberInputWithDollar placeholder="Enter estimated charge preview e.g. $5.00" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Coverage Summary <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="Enter Coverage Summary" className={inputClassName} />
          </div>
        </ServiceModelCard>

        <ServiceModelCard
          title="Pickup & Delivery"
          subtitle="Services picked up and delivered."
          description="Items or services picked and delivered"
          icon="🚚"
          enabled={pickupEnabled}
          onToggle={() => setPickupEnabled((prev) => !prev)}
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Base Pickup Radius (km) <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="e.g. 15 km" className={inputClassName} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Base Pickup Fee <span className="text-redRejected">*</span>
            </label>
            <NumberInputWithDollar placeholder="Enter base pickup fee e.g. $5.00" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Per km Charge <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="e.g. $10.00 / km" className={inputClassName} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Free Pickup Threshold <span className="text-redRejected">*</span>
            </label>
            <NumberInputWithDollar placeholder="e.g. $150.00" />
          </div>
        </ServiceModelCard>

        <ServiceModelCard
          title="On-Site Services"
          subtitle="Services performed at customer location."
          description="Services delivered at customer location"
          icon="🧑‍🔧"
          enabled={onSiteEnabled}
          onToggle={() => setOnSiteEnabled((prev) => !prev)}
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Service Radius (km) <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="e.g. 15 km" className={inputClassName} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Travel Fee <span className="text-redRejected">*</span>
            </label>
            <NumberInputWithDollar placeholder="Enter base travel fee e.g. $5.00" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]">
              Free Visit Threshold<span className="text-redRejected">*</span>
            </label>
            <NumberInputWithDollar placeholder="e.g. $150.00" />
          </div>
        </ServiceModelCard>
      </div>
    </div>
  );
};

export default ServiceModelSetupTab;
