import { useState } from "react";
import AllPayoutsTab from "./payouts/AllPayoutsTab";

const INNER_TABS = [
  "All",
  "Pending",
  "Processing",
  "Completed",
  "On Hold",
  "Failed",
];

const PlaceholderTab = ({ name }) => (
  <div className="flex min-h-[300px] flex-1 items-center justify-center rounded-xl border border-[#EAECF0] bg-white">
    <p className="text-sm text-[#667085]">{name} payouts content coming soon…</p>
  </div>
);

const PayoutsTab = ({ renderTabNav }) => {
  const [activeInnerTab, setActiveInnerTab] = useState("All");

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto w-full">
      {/* ── Outer Main Tab Navigation ── */}
      <div className="flex gap-4 sm:gap-6 rounded-xl border border-[#EAECF0] bg-white px-4 sm:px-6 pt-3 shrink-0 overflow-x-auto scrollbar-hide">
        {renderTabNav()}
      </div>

      {/* ── Inner Tabs ── */}
      <div className="flex overflow-x-auto border-b border-[#EAECF0] shrink-0">
        {INNER_TABS.map((tab) => {
          const isActive = activeInnerTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveInnerTab(tab)}
              className={`whitespace-nowrap border-b-2 px-4 pb-3 pt-1 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-[#F04438] text-[#F04438]"
                  : "border-transparent text-[#667085] hover:border-[#D0D5DD] hover:text-[#344054]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeInnerTab === "All" ? (
          <AllPayoutsTab />
        ) : (
          <PlaceholderTab name={activeInnerTab} />
        )}
      </div>
    </div>
  );
};

export default PayoutsTab;
