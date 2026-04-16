import React from "react";
import { UploadCloud, ChevronDown, Eye, EyeOff, CalendarDays } from "lucide-react";
import { useState, useRef } from "react";

const inputClassName =
  "h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia";
const selectClassName = `${inputClassName} appearance-none pr-9`;
const codeSelectClassName =
  "h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-2 text-sm text-[#344054] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia";

const BasicInformationTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const dobInputRef = useRef(null);

  return (
    <div className="grid gap-6 xl:grid-cols-[2fr_1.25fr]">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1D2939]">Personal Details</h2>
          </div>
          <div className="space-y-6 p-5">
            <div>
              <p className="mb-3 text-sm font-medium text-[#344054]">Profile Photo</p>
              <button
                type="button"
                className="flex p-4 w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#F2B8B5] bg-[#FFF5F54D] text-center"
              >
                <span className="mb-2 inline-flex size-7 items-center justify-center rounded-full bg-[#FEE4E2] text-redRejected">
                  <UploadCloud size={16} />
                </span>
                <span className="text-sm font-semibold text-[#344054]">Drop File Here</span>
                <span className="mt-1 text-xs text-[#667085]">
                  Drag and drop your PNG, JPG, images here or browse
                </span>
                <span className="text-xs font-semibold text-redRejected underline underline-offset-2">Browse File</span>
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  Full Name <span className="text-redRejected">*</span>
                </label>
                <input type="text" placeholder="Enter full name" className={inputClassName} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  Account Status <span className="text-redRejected">*</span>
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
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  Phone <span className="text-redRejected">*</span>
                </label>
                <div className="grid grid-cols-[84px_1fr] gap-3">
                  <div className="relative">
                    <select className={selectClassName} defaultValue="+1">
                      <option>+1</option>
                      <option>+44</option>
                      <option>+61</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                  </div>
                  <input type="text" placeholder="(555) 000-0000" className={inputClassName} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  Email <span className="text-redRejected">*</span>
                </label>
                <input type="email" placeholder="info@gmail.com" className={inputClassName} />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  Gender <span className="text-redRejected">*</span>
                </label>
                <div className="relative">
                  <select className={selectClassName} defaultValue="">
                    <option value="" disabled>Select Gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  Date of Birth <span className="text-redRejected">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={dobInputRef}
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className={`${inputClassName} pr-10 [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-calendar-picker-indicator]:opacity-0`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (dobInputRef.current?.showPicker) dobInputRef.current.showPicker();
                      dobInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                  >
                    <CalendarDays className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  Password <span className="text-redRejected">*</span>
                </label>
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
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  Confirm Password <span className="text-redRejected">*</span>
                </label>
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
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1D2939]">Introduction & Languages</h2>
          </div>
          <div className="space-y-5 p-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#344054]">Introduction</label>
              <textarea
                rows={4}
                placeholder="Enter Introduction and other information"
                className="w-full rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-[#344054]">
                  Languages Spoken <span className="text-redRejected">*</span>
                </label>
                <span className="text-[12px] text-[#667085]">Improves matching with customers</span>
              </div>
              <div className="relative">
                <select className={selectClassName} defaultValue="">
                  <option value="" disabled>Select Languages</option>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1D2939]">Address</h2>
          </div>
          <div className="space-y-5 p-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#344054]">
                Street Address <span className="text-redRejected">*</span>
              </label>
              <input type="text" placeholder="Enter street address" className={inputClassName} />
            </div>

            {[
              { label: "Country", placeholder: "Select Country" },
              { label: "Province (State)", placeholder: "Select Province" },
              { label: "City", placeholder: "Select City" },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  {label} <span className="text-redRejected">*</span>
                </label>
                <div className="relative">
                  <select className={selectClassName} defaultValue="">
                    <option value="" disabled>{placeholder}</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
            ))}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#344054]">
                Postal Code <span className="text-redRejected">*</span>
              </label>
              <input type="text" placeholder="Enter postal code e.g. 94103" className={inputClassName} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BasicInformationTab;
