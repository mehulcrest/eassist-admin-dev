import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const atMidnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const toIsoLocal = (d) => {
  const x = atMidnight(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const parseIsoLocal = (iso) => {
  if (!iso) return null;
  const [y, mo, d] = iso.split("-").map(Number);
  if (!y || !mo || !d) return null;
  return new Date(y, mo - 1, d);
};

const buildMonthCells = (year, month) => {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const cells = [];
  const iter = new Date(start);
  for (let i = 0; i < 42; i += 1) {
    cells.push({
      date: new Date(iter),
      inCurrentMonth: iter.getMonth() === month,
    });
    iter.setDate(iter.getDate() + 1);
  }
  return cells;
};

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const DateRangePopover = ({ anchorRef, initialStart, initialEnd, onComplete, onDismiss }) => {
  const popoverRef = useRef(null);
  const [viewYear, setViewYear] = useState(() => {
    const s = parseIsoLocal(initialStart) || parseIsoLocal(initialEnd) || new Date();
    return s.getFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    const s = parseIsoLocal(initialStart) || parseIsoLocal(initialEnd) || new Date();
    return s.getMonth();
  });
  const [firstPick, setFirstPick] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 320 });

  const updatePosition = useCallback(() => {
    const el = anchorRef?.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const width = Math.max(288, r.width);
    let left = r.left;
    if (left + width > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - width - 8);
    }
    setPos({ top: r.bottom + 6, left, width });
  }, [anchorRef]);

  useEffect(() => {
    let raf = 0;
    const schedulePosition = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updatePosition();
      });
    };
    schedulePosition();
    const onScroll = () => schedulePosition();
    window.addEventListener("resize", schedulePosition);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", schedulePosition);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [updatePosition]);

  useEffect(() => {
    const onMouseDown = (e) => {
      const t = e.target;
      if (anchorRef?.current?.contains(t)) return;
      if (popoverRef.current?.contains(t)) return;
      onDismiss();
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [anchorRef, onDismiss]);

  const cells = buildMonthCells(viewYear, viewMonth);
  const monthTitle = new Date(viewYear, viewMonth, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const previewStart =
    firstPick && hoverDate
      ? atMidnight(firstPick.getTime() <= hoverDate.getTime() ? firstPick : hoverDate)
      : null;
  const previewEnd =
    firstPick && hoverDate
      ? atMidnight(firstPick.getTime() <= hoverDate.getTime() ? hoverDate : firstPick)
      : null;

  const handleDayClick = (day) => {
    const d = atMidnight(day);
    if (!firstPick) {
      setFirstPick(d);
      return;
    }
    const a = firstPick.getTime();
    const b = d.getTime();
    const start = a <= b ? firstPick : d;
    const end = a <= b ? d : firstPick;
    onComplete(toIsoLocal(start), toIsoLocal(end));
  };

  const cellInPreview = (day) => {
    if (!firstPick) return false;
    if (previewStart && previewEnd) {
      const t = atMidnight(day).getTime();
      return t >= previewStart.getTime() && t <= previewEnd.getTime();
    }
    return atMidnight(day).getTime() === firstPick.getTime();
  };

  const isRangeEnd = (day) => {
    if (!firstPick || !hoverDate) return false;
    const t = atMidnight(day).getTime();
    return t === previewEnd?.getTime();
  };

  const isRangeStart = (day) => {
    if (!firstPick) return false;
    if (hoverDate && previewStart) {
      return atMidnight(day).getTime() === previewStart.getTime();
    }
    return atMidnight(day).getTime() === firstPick.getTime();
  };

  if (typeof document === "undefined") {
    return null;
  }

  const panel = (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Choose date range"
      className="rounded-xl border border-[#E4E7EC] bg-white p-3 shadow-[0_8px_24px_rgba(16,24,40,0.12)]"
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        zIndex: 9999,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          type="button"
          className="rounded-md p-1.5 text-[#667085] hover:bg-[#F2F4F7]"
          aria-label="Previous month"
          onClick={() => {
            setViewMonth((m) => {
              if (m === 0) {
                setViewYear((y) => y - 1);
                return 11;
              }
              return m - 1;
            });
          }}
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-sm font-semibold text-[#1D2939]">{monthTitle}</span>
        <button
          type="button"
          className="rounded-md p-1.5 text-[#667085] hover:bg-[#F2F4F7]"
          aria-label="Next month"
          onClick={() => {
            setViewMonth((m) => {
              if (m === 11) {
                setViewYear((y) => y + 1);
                return 0;
              }
              return m + 1;
            });
          }}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <p className="mb-2 text-xs text-[#667085]">
        {firstPick ? "Select end date" : "Select start date"}
      </p>
      <div className="grid grid-cols-7 gap-0.5 text-center text-[11px] font-medium text-[#98A2B3]">
        {weekdayLabels.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-7 gap-0.5"
        onMouseLeave={() => setHoverDate(null)}
      >
        {cells.map(({ date, inCurrentMonth }) => {
          const inPrev = cellInPreview(date);
          const startH = isRangeStart(date);
          const endH = isRangeEnd(date);
          return (
            <button
              key={date.getTime()}
              type="button"
              onClick={() => handleDayClick(date)}
              onMouseEnter={() => firstPick && setHoverDate(atMidnight(date))}
              className={`relative flex h-9 items-center justify-center rounded-md text-sm ${
                inCurrentMonth ? "text-[#344054]" : "text-[#D0D5DD]"
              } ${
                inPrev
                  ? "bg-[#FEF2F2] font-medium text-gradientVia"
                  : "hover:bg-[#F9FAFB]"
              } ${startH || endH ? "ring-1 ring-gradientVia" : ""}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );

  return createPortal(panel, document.body);
};

export default DateRangePopover;
