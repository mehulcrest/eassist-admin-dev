import { useEffect, useMemo, useRef, useState } from "react";
import { format, setYear } from "date-fns";
import { DayPicker } from "react-day-picker";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/dist/style.css";

const DEFAULT_PLACEHOLDER = "MM-DD-YYYY ~ MM-DD-YYYY";

const DateRangeInput = ({
  value = "",
  onChange,
  placeholder = DEFAULT_PLACEHOLDER,
  className = "h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-[#F04438] focus:outline-none focus:ring-1 focus:ring-[#F04438]",
}) => {
  const [selectedRange, setSelectedRange] = useState(undefined);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isYearGridOpen, setIsYearGridOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const pickerRef = useRef(null);

  const yearGridItems = useMemo(() => Array.from({ length: 151 }, (_, idx) => 1950 + idx), []);

  useEffect(() => {
    if (!isPickerOpen) return;

    const handleOutsideClick = (event) => {
      if (!pickerRef.current?.contains(event.target)) {
        setIsPickerOpen(false);
        setIsYearGridOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
        setIsYearGridOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPickerOpen]);

  const formattedRange = useMemo(() => {
    const from = selectedRange?.from;
    const to = selectedRange?.to;

    if (!from && !to) return "";
    if (from && to) return `${format(from, "MM-dd-yyyy")} ~ ${format(to, "MM-dd-yyyy")}`;
    return `${format(from ?? to, "MM-dd-yyyy")} ~`;
  }, [selectedRange]);

  return (
    <div className="relative" ref={pickerRef}>
      <input
        type="text"
        value={value || formattedRange}
        readOnly
        onClick={() => {
          setIsPickerOpen(true);
          setIsYearGridOpen(false);
        }}
        onFocus={() => {
          setIsPickerOpen(true);
          setIsYearGridOpen(false);
        }}
        placeholder={placeholder}
        className={className}
      />
      <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />

      {isPickerOpen && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-[348px] rounded-xl border border-[#EAECF0] bg-white p-3 shadow-lg">
          {isYearGridOpen ? (
            <div className="grid max-h-[260px] grid-cols-4 gap-2 overflow-y-auto pr-1">
              {yearGridItems.map((year) => {
                const isActive = year === calendarMonth.getFullYear();
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      setCalendarMonth((prev) => setYear(prev, year));
                      setIsYearGridOpen(false);
                    }}
                    className={`h-10 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? "bg-[#EAECF0] text-[#101828]" : "text-[#344054] hover:bg-[#F2F4F7]"
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          ) : (
            <DayPicker
              mode="range"
              min={1}
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              captionLayout="label"
              navLayout="around"
              styles={{
                month_caption: { marginBottom: "12px" },
              }}
              selected={selectedRange}
              components={{
                MonthCaption: ({ calendarMonth: monthData, ...props }) => (
                  <div
                    {...props}
                    className="flex items-center justify-center gap-2 text-base font-semibold text-[#101828]"
                  >
                    <span>{format(monthData.date, "MMMM")}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCalendarMonth(monthData.date);
                        setIsYearGridOpen(true);
                      }}
                      className="rounded-md px-1.5 py-0.5 text-base font-semibold text-[#101828] hover:bg-[#F2F4F7]"
                    >
                      {format(monthData.date, "yyyy")}
                    </button>
                  </div>
                ),
                Chevron: ({ orientation, ...props }) => (
                  orientation === "left"
                    ? <ChevronLeft {...props} size={16} />
                    : <ChevronRight {...props} size={16} />
                ),
              }}
              onSelect={(range) => {
                setSelectedRange(range);

                if (!onChange) return;

                if (range?.from && range?.to) {
                  onChange(`${format(range.from, "MM-dd-yyyy")} ~ ${format(range.to, "MM-dd-yyyy")}`);
                  setIsPickerOpen(false);
                  return;
                }

                if (range?.from) {
                  onChange(`${format(range.from, "MM-dd-yyyy")} ~`);
                  return;
                }

                onChange("");
              }}
              className="text-sm"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangeInput;
