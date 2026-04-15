import { useState } from "react";
import ActiveTab from "../views/jobs/ActiveTab";
import UpcomingTab from "../views/jobs/UpcomingTab";
import TimelineTab from "../views/jobs/TimelineTab";
import CancellationTab from "../views/jobs/CancellationTab";
import EscalationTab from "../views/jobs/EscalationTab";

const TABS = ["Active", "Upcoming", "Timeline", "Cancellation", "Escalation"];

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("Active");

  const renderTabNav = () => (
    <>
      {TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative pb-3 text-sm font-semibold transition-colors ${
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
      {activeTab === "Active" && <ActiveTab renderTabNav={renderTabNav} />}
      {activeTab === "Upcoming" && <UpcomingTab renderTabNav={renderTabNav} />}
      {activeTab === "Timeline" && <TimelineTab renderTabNav={renderTabNav} />}
      {activeTab === "Cancellation" && <CancellationTab renderTabNav={renderTabNav} />}
      {activeTab === "Escalation" && <EscalationTab renderTabNav={renderTabNav} />}
    </div>
  );
};

export default Jobs;
