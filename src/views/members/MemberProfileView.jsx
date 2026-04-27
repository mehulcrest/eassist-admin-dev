import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ActivityLogTab from "../../components/ProfileViewTabs/ActivityLogTab";
import ComplaintsNotesTab from "../../components/ProfileViewTabs/ComplaintsNotesTab";
import OverviewTab from "../../components/ProfileViewTabs/OverviewTab";
import ServiceHistoryTab from "../../components/ProfileViewTabs/ServiceHistoryTab";
import SubscriptionBillingTab from "../../components/ProfileViewTabs/SubscriptionBillingTab";
import { TabHeader } from "../../components/ui/Tabs";

const tabs = [
  { id: "Overview", label: "Overview" },
  { id: "Service History", label: "Service History" },
  { id: "Complaints & Notes", label: "Complaints & Notes" },
  { id: "Subscription & Billing", label: "Subscription & Billing" },
  { id: "Activity Log", label: "Activity Log" },
];

const MemberProfileView = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const member = state?.member;
  const [activeTab, setActiveTab] = useState("Overview");

  const memberName = member?.name ?? "Margaret Thompson";
  const memberId = member?.id ?? id?.toUpperCase() ?? "E001";

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <div className="shrink-0 overflow-hidden rounded-lg border border-line bg-white">
        <TabHeader tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTab === "Overview" ? (
          <div className="h-full overflow-y-auto pr-1">
            <OverviewTab memberName={memberName} member={member} />
          </div>
        ) : null}
        {activeTab === "Service History" ? <ServiceHistoryTab /> : null}
        {activeTab === "Complaints & Notes" ? <ComplaintsNotesTab /> : null}
        {activeTab === "Subscription & Billing" ? (
          <div className="h-full overflow-y-auto pr-1">
            <SubscriptionBillingTab />
          </div>
        ) : null}
        {activeTab === "Activity Log" ? (
          <div className="h-full overflow-hidden">
            <ActivityLogTab memberName={memberName} />
          </div>
        ) : null}
      </div>

      <div className="sr-only">{memberId}</div>
    </div>
  );
};

export default MemberProfileView;
