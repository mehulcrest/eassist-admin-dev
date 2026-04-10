import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ActivityLogTab from "../../components/ProfileViewTabs/ActivityLogTab";
import ComplaintsNotesTab from "../../components/ProfileViewTabs/ComplaintsNotesTab";
import OverviewTab from "../../components/ProfileViewTabs/OverviewTab";
import ServiceHistoryTab from "../../components/ProfileViewTabs/ServiceHistoryTab";
import SubscriptionBillingTab from "../../components/ProfileViewTabs/SubscriptionBillingTab";

const tabs = [
  "Overview",
  "Service History",
  "Complaints & Notes",
  "Subscription & Billing",
  "Activity Log",
];

const MemberProfileView = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const member = state?.member;
  const [activeTab, setActiveTab] = useState("Overview");

  const memberName = member?.name ?? "Margaret Thompson";
  const memberId = member?.id ?? id?.toUpperCase() ?? "E001";

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-[#E4E7EC] bg-white">
        <div className="flex gap-6 border-b border-[#EAECF0] px-4 py-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`pb-1 text-sm ${
                activeTab === tab
                  ? "border-b-2 border-gradientVia font-semibold text-gradientVia"
                  : "font-medium text-[#667085]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Overview" ? <OverviewTab memberName={memberName} member={member} /> : null}
      {activeTab === "Service History" ? <ServiceHistoryTab /> : null}
      {activeTab === "Complaints & Notes" ? <ComplaintsNotesTab /> : null}
      {activeTab === "Subscription & Billing" ? <SubscriptionBillingTab /> : null}
      {activeTab === "Activity Log" ? <ActivityLogTab /> : null}

      <div className="sr-only">{memberId}</div>
    </div>
  );
};

export default MemberProfileView;
