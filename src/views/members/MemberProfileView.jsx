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
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <div className="shrink-0 overflow-hidden rounded-lg border border-[#E4E7EC] bg-white">
        <div className="flex gap-6 overflow-x-auto border-b border-[#EAECF0] px-4 py-3 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`shrink-0 whitespace-nowrap pb-1 text-base ${
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
