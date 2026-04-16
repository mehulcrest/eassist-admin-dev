import { ChevronDown, MapPin, UploadCloud, Crosshair } from "lucide-react";
import { useState } from "react";

const inputClassName =
  "h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia";
const selectClassName = `${inputClassName} appearance-none pr-9`;

const ServicesCoverageTab = () => {
  const [radius, setRadius] = useState(15);

  return (
    <div className="grid gap-6 xl:grid-cols-[2fr_1.5fr]">
      {/* ── Left Column: Service Details ── */}
      <div className="space-y-6">
        <section className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1D2939]">Service Details</h2>
          </div>
          
          <div className="space-y-6 p-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#344054]">
                Service Category <span className="text-redRejected">*</span>
              </label>
              <div className="relative">
                <select className={selectClassName} defaultValue="">
                  <option value="" disabled>Select Category</option>
                  <option>Home Care</option>
                  <option>Medical Assistance</option>
                  <option>Daily Errands</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#344054]">
                Service Type <span className="text-redRejected">*</span>
              </label>
              <div className="relative">
                <select className={selectClassName} defaultValue="">
                  <option value="" disabled>Select Service</option>
                  <option>Grocery Help</option>
                  <option>Cleaning</option>
                  <option>Nursing</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-base font-semibold text-[#1D2939] mb-4">Required Credentials</h3>
              
              <div className="space-y-2 mb-6">
                <label className="block text-sm font-medium text-[#344054]">
                  Supporting Credential
                </label>
                <button
                  type="button"
                  className="flex p-6 w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#F2B8B5] bg-[#FFF5F54D] text-center"
                >
                  <span className="mb-2 inline-flex size-10 items-center justify-center rounded-full bg-[#FEE4E2] text-redRejected">
                    <UploadCloud size={20} />
                  </span>
                  <span className="text-sm font-semibold text-[#344054]">Drop File Here</span>
                  <span className="mt-1 text-xs text-[#667085]">
                    Drag and drop your PDF, PNG, JPG, images here or browse | Max File Size: 10 MB
                  </span>
                  <span className="mt-1 text-xs font-semibold text-redRejected underline underline-offset-2">Browse File</span>
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#344054]">
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter Details"
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Right Column: Coverage Area ── */}
      <div>
        <section className="overflow-hidden rounded-xl border border-line bg-white flex flex-col h-full">
          <div className="border-b border-[#EAECF0] px-4 py-3 shrink-0">
            <h2 className="text-lg font-semibold text-[#1D2939]">Coverage Area</h2>
          </div>
          
          <div className="space-y-5 p-5 flex flex-col flex-1">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#344054]">
                Operating Region / Territory <span className="text-redRejected">*</span>
              </label>
              <div className="relative">
                <select className={selectClassName} defaultValue="">
                  <option value="" disabled>Select Operating Territory</option>
                  <option>Downtown</option>
                  <option>Westside</option>
                  <option>Eastside</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#344054]">
                Location <span className="text-redRejected">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-redRejected" />
                <input 
                  type="text" 
                  defaultValue="Toronto, ON" 
                  className={`${inputClassName} pl-9 pr-9 text-[#475467] font-medium`} 
                />
                <ChevronDown className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3] pointer-events-none" />
              </div>
              <div className="mt-1 flex justify-end">
                <button type="button" className="text-xs font-medium text-[#667085] hover:text-[#344054] underline underline-offset-2">
                  Use current location
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative w-full h-[220px] rounded-lg overflow-hidden border border-[#EAECF0] bg-line shrink-0">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-79.431%2C43.642%2C-79.351%2C43.682&amp;layer=mapnik&amp;marker=43.662%2C-79.391" 
                style={{ border: 0, opacity: 0.9 }}
                title="Service Map"
              ></iframe>
              <button 
                type="button"
                className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-[#1D2939] text-white shadow-lg transition-transform hover:scale-105"
                aria-label="Target Location"
              >
                <Crosshair size={20} />
              </button>
            </div>

            <div className="pt-2">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#1D2939]">Coverage Radius</h3>
                <span className="text-base font-semibold text-[#1D2939]">{radius} km</span>
              </div>
              
              <div className="relative mb-6">
                <input 
                  type="range" 
                  min="5" 
                  max="30" 
                  value={radius} 
                  onChange={(e) => setRadius(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#FEE4E2] rounded-lg appearance-none cursor-pointer accent-redRejected"
                />
                <div className="mt-3 flex justify-between text-xs font-medium text-[#344054]">
                  <span>5 km</span>
                  <span>30 km</span>
                </div>
              </div>

              <p className="text-sm text-[#475467]">
                This radius defines the area in which the PSP can receive job assignments.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesCoverageTab;
