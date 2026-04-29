import { useState } from "react";
import PlatformWalletTab from "./wallets/PlatformWalletTab";
import PSPWalletsTab from "./wallets/PSPWalletsTab";
import MemberWalletsTab from "./wallets/MemberWalletsTab";

const INNER_TABS = ["Platform Wallet", "PSP Wallets", "Member Wallets"];

const WalletsTab = ({ renderTabNav }) => {
  const [activeInner, setActiveInner] = useState("Platform Wallet");

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto lg:overflow-hidden">

      {/* ── Outer Tab Navigation (passed from Payments.jsx) ── */}
      <div className="flex gap-4 sm:gap-6 rounded-xl border border-[#EAECF0] bg-white px-4 sm:px-6 pt-3 shrink-0 overflow-x-auto scrollbar-hide">
        {renderTabNav()}
      </div>

      {/* ── Inner Wallet Sub-Tabs ── */}
      <div className="flex gap-0 rounded-xl border border-[#EAECF0] bg-white px-4 sm:px-6 pt-3 shrink-0 overflow-x-auto scrollbar-hide">
        {INNER_TABS.map((tab) => {
          const isActive = tab === activeInner;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveInner(tab)}
              className={`relative mr-6 whitespace-nowrap pb-3 text-sm font-semibold transition-colors ${
                isActive ? "text-[#F04438]" : "text-[#667085] hover:text-[#344054]"
              }`}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#F04438] rounded-t-sm" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Inner Tab Content ── */}
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
        {activeInner === "Platform Wallet" && <PlatformWalletTab />}
        {activeInner === "PSP Wallets"     && <PSPWalletsTab />}
        {activeInner === "Member Wallets"  && <MemberWalletsTab />}
      </div>

    </div>
  );
};

export default WalletsTab;
