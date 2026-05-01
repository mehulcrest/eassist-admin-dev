import { useState } from "react";
import MembersLedgerTab from "./ledgers/MembersLedgerTab";
import PSPLedgerTab from "./ledgers/PSPLedgerTab";
import PlatformRevenueLedgerTab from "./ledgers/PlatformRevenueLedgerTab";

const INNER_TABS = ["Members", "PSP", "Platform Revenue"];

const LedgersTab = ({ renderTabNav }) => {
  const [activeInnerTab, setActiveInnerTab] = useState("Members");

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
              className={`whitespace-nowrap border-b-2 px-4 pb-3 pt-1 text-sm font-semibold transition-colors ${isActive
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
        {activeInnerTab === "Members" && <MembersLedgerTab />}
        {activeInnerTab === "PSP" && <PSPLedgerTab />}
        {activeInnerTab === "Platform Revenue" && <PlatformRevenueLedgerTab />}
      </div>
    </div>
  );
};

export default LedgersTab;
