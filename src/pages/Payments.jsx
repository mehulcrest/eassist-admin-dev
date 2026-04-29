import { useState } from "react";
import OverviewTab from "../views/payments/OverviewTab";
import TransactionsTab from "../views/payments/TransactionsTab";
import WalletsTab from "../views/payments/WalletsTab";
import PayoutsTab from "../views/payments/PayoutsTab";
import LedgersTab from "../views/payments/LedgersTab";
import TaxComplianceTab from "../views/payments/TaxComplianceTab";
import RefundsAdjustmentsTab from "../views/payments/RefundsAdjustmentsTab";
import SettlementsTab from "../views/payments/SettlementsTab";

const TABS = [
  "Overview",
  "Transactions",
  "Wallets",
  "Payouts",
  "Ledgers",
  "Tax & Compliance",
  "Refunds & Adjustments",
  "Settlements",
];

const Payments = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderTabNav = () => (
    <>
      {TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative whitespace-nowrap pb-3 text-sm font-semibold transition-colors ${
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
    </>
  );

  return (
    <div className="h-full">
      {activeTab === "Overview"              && <OverviewTab             renderTabNav={renderTabNav} />}
      {activeTab === "Transactions"          && <TransactionsTab         renderTabNav={renderTabNav} />}
      {activeTab === "Wallets"               && <WalletsTab              renderTabNav={renderTabNav} />}
      {activeTab === "Payouts"               && <PayoutsTab              renderTabNav={renderTabNav} />}
      {activeTab === "Ledgers"               && <LedgersTab              renderTabNav={renderTabNav} />}
      {activeTab === "Tax & Compliance"      && <TaxComplianceTab        renderTabNav={renderTabNav} />}
      {activeTab === "Refunds & Adjustments" && <RefundsAdjustmentsTab   renderTabNav={renderTabNav} />}
      {activeTab === "Settlements"           && <SettlementsTab          renderTabNav={renderTabNav} />}
      {/* HMR Triggered */}
    </div>
  );
};

export default Payments;
