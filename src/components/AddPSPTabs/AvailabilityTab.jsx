import { Clock } from "lucide-react";
import { useState } from "react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AvailabilityTab = () => {
  // State for each day: { available: boolean, start: string, end: string }
  const [availability, setAvailability] = useState(
    DAYS.reduce((acc, day) => {
      acc[day] = {
        available: !["Saturday", "Sunday"].includes(day), // Mon-Fri default true
        start: "09:00",
        end: "18:00",
      };
      return acc;
    }, {})
  );

  const toggleDay = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], available: !prev[day].available },
    }));
  };

  const updateTime = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleReset = () => {
    setAvailability(
      DAYS.reduce((acc, day) => {
        acc[day] = {
          available: !["Saturday", "Sunday"].includes(day),
          start: "09:00",
          end: "18:00",
        };
        return acc;
      }, {})
    );
  };

  return (
    <section className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white flex flex-col">
      <div className="border-b border-[#EAECF0] px-4 py-4 md:px-6 md:py-5">
        <h2 className="text-lg font-semibold text-[#1D2939]">Weekly Availability</h2>
        <p className="mt-1 text-sm text-[#475467]">
          Set the PSP's regular working hours for receiving job requests. Jobs will only be assigned during active time slots.
        </p>
      </div>

      <div className="p-4 md:p-6 pb-20 relative">
        <div className="grid gap-6 md:grid-cols-2">
          {DAYS.map((day) => {
            const data = availability[day];
            return (
              <div key={day}>
                <h3 className="mb-2 text-sm font-semibold text-[#1D2939]">{day}</h3>
                <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#EAECF0] p-4 sm:flex-nowrap">
                  
                  {/* Toggle */}
                  <div className="shrink-0 flex flex-col gap-2">
                    <label className="text-[13px] font-medium text-[#344054]">
                      Available <span className="text-redRejected">*</span>
                    </label>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={data.available}
                      onClick={() => toggleDay(day)}
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gradientVia focus-visible:ring-offset-2 ${
                        data.available ? "bg-[#12B76A]" : "bg-[#D0D5DD]"
                      }`}
                    >
                      <span
                        className={`pointer-events-none absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                          data.available ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Start Time */}
                  <div className="flex-1 min-w-[120px]">
                    <label className="mb-2 block text-[13px] font-medium text-[#344054]">
                      Start Time <span className="text-redRejected">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={data.start}
                        onChange={(e) => updateTime(day, "start", e.target.value)}
                        disabled={!data.available}
                        className={`h-10 w-full rounded-lg border border-[#D0D5DD] px-3 pr-10 text-sm focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                          data.available 
                            ? "bg-white text-[#344054]" 
                            : "bg-[#F9FAFB] text-[#98A2B3] cursor-not-allowed"
                        }`}
                      />
                      <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                    </div>
                  </div>

                  {/* End Time */}
                  <div className="flex-1 min-w-[120px]">
                    <label className="mb-2 block text-[13px] font-medium text-[#344054]">
                      End Time <span className="text-redRejected">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={data.end}
                        onChange={(e) => updateTime(day, "end", e.target.value)}
                        disabled={!data.available}
                        className={`h-10 w-full rounded-lg border border-[#D0D5DD] px-3 pr-10 text-sm focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                          data.available 
                            ? "bg-white text-[#344054]" 
                            : "bg-[#F9FAFB] text-[#98A2B3] cursor-not-allowed"
                        }`}
                      />
                      <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        
        {/* Reset to Default Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityTab;
