import { useState } from "react";
import ActiveTab from "../views/jobs/ActiveTab";
import UpcomingTab from "../views/jobs/UpcomingTab";
import TimelineTab from "../views/jobs/TimelineTab";
import CancellationTab from "../views/jobs/CancellationTab";
import EscalationTab from "../views/jobs/EscalationTab";
import { TabHeader } from "../components/ui/Tabs";

const TABS = ["Active", "Upcoming", "Timeline", "Cancellation", "Escalation"];

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("Active");

  const renderTabNav = () => (
    <TabHeader
      tabs={TABS.map((tab) => ({ id: tab, label: tab }))}
      activeTab={activeTab}
      onChange={setActiveTab}
      className="rounded-xl border border-[#EAECF0] bg-white"
    />
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
