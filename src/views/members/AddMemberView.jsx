import { useRef, useState } from "react";
import { CalendarDays, Check, ChevronDown, Eye, EyeOff, Gem, UploadCloud } from "lucide-react";
import SideSheet from "../../components/SideSheet";

const inputClassName =
  "h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia";

const selectClassName = `${inputClassName} appearance-none pr-9`;
const codeSelectClassName =
  "h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-2 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia";
const relationshipOptions = [
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Uncle",
  "Aunty",
  "Friend",
  "Other",
];
const mobilityOptions = ["Independent", "Needs Walker", "Wheelchair", "Bedridden"];
const petsOptions = ["Yes", "No"];
const medicalSensitivityOptions = [
  "Diabetes",
  "Mobility Issues",
  "Vision",
  "Dementia",
  "Other",
];

const AddMemberView = () => {
  const [isFamilySheetOpen, setIsFamilySheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [medicalSelections, setMedicalSelections] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const dobInputRef = useRef(null);

  const toggleMedicalSelection = (value) => {
    setMedicalSelections((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="overflow-hidden rounded-lg border border-[#E4E7EC] bg-white">
        <div className="flex gap-6 border-b border-[#EAECF0] px-4 py-3">
          <button
            type="button"
            onClick={() => setActiveTab("basic")}
            className={`pb-1 text-sm ${
              activeTab === "basic"
                ? "border-b-2 border-gradientVia font-semibold text-gradientVia"
                : "font-medium text-[#667085]"
            }`}
          >
            Basic Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("care")}
            className={`pb-1 text-sm ${
              activeTab === "care"
                ? "border-b-2 border-gradientVia font-semibold text-gradientVia"
                : "font-medium text-[#667085]"
            }`}
          >
            Care Preferences
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`pb-1 text-sm ${
              activeTab === "plan"
                ? "border-b-2 border-gradientVia font-semibold text-gradientVia"
                : "font-medium text-[#667085]"
            }`}
          >
            Subscription Plan
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
      {activeTab === "basic" ? (
        <>
          <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1D2939]">Personal Details</h2>
          </div>

          <div className="space-y-6 p-5">
            <div>
              <p className="mb-3 text-base font-medium text-textColor leading-[150%] tracking-[-0.02em]">Profile Photo</p>
              <button
                type="button"
                className="flex p-4 w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#F2B8B5] bg-[#FFF5F54D] text-center"
              >
                <span className="mb-2 inline-flex size-7 items-center justify-center rounded-full bg-[#FEE4E2] text-[#F04438]">
                  <UploadCloud size={16} />
                </span>
                <span className="text-sm font-semibold text-[#344054]">Drop File Here</span>
                <span className="mt-1 text-xs text-[#667085]">
                  Drag and drop your PNG, JPG, images here or browse
                </span>
                <span className="text-xs font-semibold text-gradientVia">Browse File</span>
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Full Name <span className="text-gradientVia">*</span>
                </label>
                <input type="text" placeholder="Enter full name" className={inputClassName} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Status <span className="text-gradientVia">*</span>
                </label>
                <div className="flex h-10 items-center">
                  <button
                    type="button"
                    role="switch"
                    aria-checked
                    className="relative inline-flex h-6 w-11 rounded-full bg-[#12B76A]"
                  >
                    <span className="absolute left-[22px] top-0.5 size-5 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Phone <span className="text-gradientVia">*</span>
                </label>
                <div className="grid grid-cols-[84px_1fr] gap-3">
                  <select className={codeSelectClassName} defaultValue="+1">
                    <option>+1</option>
                    <option>+44</option>
                    <option>+61</option>
                  </select>
                  <input type="text" placeholder="(555) 000-0000" className={inputClassName} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Email <span className="text-gradientVia">*</span>
                </label>
                <input type="email" placeholder="info@gmail.com" className={inputClassName} />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Gender <span className="text-gradientVia">*</span>
                </label>
                <div className="relative">
                  <select className={selectClassName} defaultValue="">
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Date of Birth <span className="text-gradientVia">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={dobInputRef}
                    type="date"
                    value={dateOfBirth}
                    onChange={(event) => setDateOfBirth(event.target.value)}
                    className={`${inputClassName} pr-10 [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-calendar-picker-indicator]:opacity-0`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (dobInputRef.current?.showPicker) {
                        dobInputRef.current.showPicker();
                      }
                      dobInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                    aria-label="Open date picker"
                  >
                    <CalendarDays className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    defaultValue="password123"
                    className={`${inputClassName} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    defaultValue="password123"
                    className={`${inputClassName} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1D2939]">Address</h2>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                Street Address <span className="text-gradientVia">*</span>
              </label>
              <input type="text" placeholder="Enter street address" className={inputClassName} />
            </div>

            {["Country", "Province (State)", "City"].map((label) => (
              <div key={label}>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  {label} <span className="text-gradientVia">*</span>
                </label>
                <div className="relative">
                  <select className={selectClassName} defaultValue="">
                    <option value="" disabled>
                      {`Select ${label}`}
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
            ))}

            <div>
              <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                Postal Code <span className="text-gradientVia">*</span>
              </label>
              <input type="text" placeholder="Enter postal code e.g. 94103" className={inputClassName} />
            </div>
          </div>
        </section>
          </div>

          <section className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
        <div className="flex items-center justify-between border-b border-[#EAECF0] px-4 py-3">
          <h2 className="text-lg font-semibold text-[#1D2939]">Family Contacts</h2>
          <button
            type="button"
            onClick={() => setIsFamilySheetOpen(true)}
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-gradientVia px-3 text-sm font-semibold text-gradientVia"
          >
            <span className="text-base">+</span>
            Add New
          </button>
        </div>
        <p className="p-4 text-sm text-[#667085]">
          Add family members or emergency contacts who should be notified or contacted in case of
          urgent situations.
        </p>
          </section>
        </>
      ) : null}

      {activeTab === "care" ? (
        <section className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
          <div className="space-y-6 p-5">
            <p className="text-sm text-[#475467]">
              Define language, mobility level, and care preferences to support better caregiver
              matching.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Preferred Language <span className="text-gradientVia">*</span>
                </label>
                <div className="relative">
                  <select className={selectClassName} defaultValue="">
                    <option value="" disabled>
                      Select Option
                    </option>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Mobility Level <span className="text-gradientVia">*</span>
                </label>
                <div className="relative">
                  <select className={selectClassName} defaultValue="">
                    <option value="" disabled>
                      Select Option
                    </option>
                    {mobilityOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Pets at Home <span className="text-gradientVia">*</span>
                </label>
                <div className="relative">
                  <select className={selectClassName} defaultValue="">
                    <option value="" disabled>
                      Select Option
                    </option>
                    {petsOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Religious / Cultural Preferences <span className="text-gradientVia">*</span>
                </label>
                <div className="relative">
                  <select className={selectClassName} defaultValue="">
                    <option value="" disabled>
                      Select Option
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Medical Sensitivities <span className="text-gradientVia">*</span>
                </label>
                <div className="rounded-lg border border-[#D0D5DD] bg-white p-3">
                  <div className="space-y-2">
                    {medicalSensitivityOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 text-sm text-[#475467]">
                        <input
                          type="checkbox"
                          checked={medicalSelections.includes(option)}
                          onChange={() => toggleMedicalSelection(option)}
                          className="size-4 rounded border-[#D0D5DD]"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                  Preferred Service Time
                </label>
                <div className="flex gap-4 pt-2">
                  {["Morning", "Afternoon", "Evening"].map((slot) => (
                    <label key={slot} className="flex items-center gap-2 text-sm text-[#475467]">
                      <input type="checkbox" className="size-4 rounded border-[#D0D5DD]" />
                      {slot}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
                Other (anything else caregiver should know)
              </label>
              <textarea
                rows={4}
                placeholder="Enter Details"
                className="w-full rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
              />
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "plan" ? (
        <section className="rounded-xl border border-[#E4E7EC] bg-white p-4">
          <p className="text-sm text-[#475467]">
            The plan determines service-call fees, loyalty points, and platform benefits.
          </p>
          <p className="mt-1 text-sm text-[#475467]">
            By default, elders start on the Free plan, and only the elder can upgrade or change
            the plan from the mobile app.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:max-w-[760px]">
            <button
              type="button"
              onClick={() => setSelectedPlan("free")}
              className={`rounded-xl border p-4 text-left transition ${
                selectedPlan === "free"
                  ? "border-gradientVia bg-[#FFF5F5]"
                  : "border-[#E4E7EC] bg-white"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#FEF3F2] text-gradientVia">
                    <Gem size={14} />
                  </span>
                  <span className="text-base font-semibold text-[#1D2939]">Free</span>
                </div>
                {selectedPlan === "free" ? (
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-gradientVia text-white">
                    <Check size={12} />
                  </span>
                ) : null}
              </div>
              <p className="text-xl font-bold text-[#1D2939]">$0.00</p>
              <p className="mb-2 text-sm text-[#667085]">per month</p>
              <ul className="space-y-1.5 text-sm text-[#475467]">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-gradientVia" />
                  Allowed to order services
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-gradientVia" />
                  $5 service-call fee applies
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-gradientVia" />
                  No Loyalty Points
                </li>
              </ul>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlan("premium")}
              className={`rounded-xl border p-4 text-left transition ${
                selectedPlan === "premium"
                  ? "border-gradientVia bg-[#FFF5F5]"
                  : "border-[#E4E7EC] bg-white"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#FEF3F2] text-gradientVia">
                    <Gem size={14} />
                  </span>
                  <span className="text-base font-semibold text-[#1D2939]">Premium</span>
                  <span className="rounded-full bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Recommended
                  </span>
                </div>
                {selectedPlan === "premium" ? (
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-gradientVia text-white">
                    <Check size={12} />
                  </span>
                ) : null}
              </div>
              <p className="text-xl font-bold text-[#1D2939]">$19.99</p>
              <p className="mb-2 text-sm text-[#667085]">per month / call fee</p>
              <ul className="space-y-1.5 text-sm text-[#475467]">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-gradientVia" />
                  Earn 5% Loyalty Points on subscription
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-gradientVia" />
                  Free cancellation anytime
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-gradientVia" />
                  Auto-renew, but no auto-charge without consent
                </li>
              </ul>
            </button>
          </div>
        </section>
      ) : null}
      </div>

      <div className="mt-2 flex shrink-0 justify-end gap-3 border-t border-[#EAECF0] bg-pageColor pt-3">
        <button
          type="button"
          className="h-11 rounded-lg border border-[#D0D5DD] bg-white px-8 text-sm font-semibold text-[#344054]"
        >
          Cancel
        </button>
        {activeTab === "care" || activeTab === "plan" ? (
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "plan" ? "care" : "basic")}
            className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-[#344054]"
          >
            ← Back
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            if (activeTab === "basic") setActiveTab("care");
            else if (activeTab === "care") setActiveTab("plan");
          }}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-6 text-sm font-semibold text-white"
        >
          {activeTab === "plan" ? "Create Member Profile" : "Save & Continue"}
          {activeTab === "plan" ? null : <span className="text-base">→</span>}
        </button>
      </div>

      <SideSheet
        isOpen={isFamilySheetOpen}
        onClose={() => setIsFamilySheetOpen(false)}
        title="Add Family Contact"
        footer={
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="h-11 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-sm font-semibold text-white"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsFamilySheetOpen(false)}
              className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-sm font-medium text-[#344054]"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium text-[#344054]">Profile Photo</p>
            <button
              type="button"
              className="flex h-28 w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#F2B8B5] bg-[#FFF8F7] text-center"
            >
              <span className="mb-2 inline-flex size-7 items-center justify-center rounded-full bg-[#FEE4E2] text-[#F04438]">
                <UploadCloud size={16} />
              </span>
              <span className="text-sm font-semibold text-[#344054]">Drop File Here</span>
              <span className="mt-1 text-xs text-[#667085]">
                Drag and drop your PNG, JPG, images here or browse
              </span>
              <span className="text-xs font-semibold text-gradientVia">Browse File</span>
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
              Contact Name <span className="text-gradientVia">*</span>
            </label>
            <input type="text" placeholder="Enter Contact Name" className={inputClassName} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
              Relationship <span className="text-gradientVia">*</span>
            </label>
            <div className="relative">
              <select className={selectClassName} defaultValue="">
                <option value="" disabled>
                  Select Relationship
                </option>
                {relationshipOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-textColor leading-[150%] tracking-[-0.02em]">
              Phone <span className="text-gradientVia">*</span>
            </label>
            <div className="grid grid-cols-[84px_1fr] gap-3">
              <select className={selectClassName} defaultValue="+1">
                <option>+1</option>
                <option>+44</option>
                <option>+61</option>
              </select>
              <input type="text" placeholder="(555) 000-0000" className={inputClassName} />
            </div>
          </div>
        </div>
      </SideSheet>
    </div>
  );
};

export default AddMemberView;
