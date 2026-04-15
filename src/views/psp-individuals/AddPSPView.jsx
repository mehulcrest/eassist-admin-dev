import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BasicInformationTab from "../../components/AddPSPTabs/BasicInformationTab";
import ServicesCoverageTab from "../../components/AddPSPTabs/ServicesCoverageTab";
import AvailabilityTab from "../../components/AddPSPTabs/AvailabilityTab";
import VerificationPayoutTab from "../../components/AddPSPTabs/VerificationPayoutTab";

const AddPSPView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");

  // Flow mapping for Save & Continue
  const tabsOrder = ["basic", "services", "availability", "verification"];

  const handleNext = () => {
    const currentIndex = tabsOrder.indexOf(activeTab);
    if (currentIndex < tabsOrder.length - 1) {
      setActiveTab(tabsOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = tabsOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabsOrder[currentIndex - 1]);
    }
  };

  const TABS = [
    { id: "basic", label: "Basic Information" },
    { id: "services", label: "Services & Coverage" },
    { id: "availability", label: "Availability" },
    { id: "verification", label: "Verification & Payout" },
  ];

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      {/* ── Tab bar — scrolls horizontally on very small screens ── */}
      <div className="overflow-hidden rounded-lg border border-[#E4E7EC] bg-white shrink-0">
        <div className="flex gap-6 overflow-x-auto border-b border-[#EAECF0] px-4 py-3 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 whitespace-nowrap pb-1 text-sm ${activeTab === tab.id
                  ? "border-b-2 border-[#F04438] font-semibold text-[#F04438]"
                  : "font-medium text-[#667085]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pb-2">
        {activeTab === "basic" && <BasicInformationTab />}
        {activeTab === "services" && <ServicesCoverageTab />}
        {activeTab === "availability" && <AvailabilityTab />}
        {activeTab === "verification" && <VerificationPayoutTab />}
      </div>

      {/* ── Bottom action bar ─────────────────────────────────────────── */}
      <div className="shrink-0 border-t border-[#EAECF0] bg-pageColor pt-3">
        {/* Mobile layout (hidden on sm+) */}
        <div className="flex flex-col gap-2 sm:hidden">
          {activeTab === "basic" ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigate("/psp-individuals")}
                className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-11 w-full items-center justify-center gap-1 rounded-lg bg-[#F04438] hover:bg-[#D92D20] transition-colors text-sm font-semibold text-white"
              >
                Save & Continue <span className="text-base">→</span>
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={activeTab === "verification" ? () => navigate("/psp-individuals") : handleNext}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#F04438] hover:bg-[#D92D20] transition-colors text-sm font-semibold text-white"
              >
                {activeTab === "verification" ? "Create PSP Individual Profile" : "Save & Continue"}
                {activeTab === "verification" ? null : <span className="text-base">→</span>}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/psp-individuals")}
                  className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054]"
                >
                  ← Back
                </button>
              </div>
            </>
          )}
        </div>

        {/* sm+ layout — right-aligned inline row */}
        <div className="hidden sm:flex sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/psp-individuals")}
            className="h-11 rounded-lg border border-[#D0D5DD] bg-white px-8 text-sm font-semibold text-[#344054]"
          >
            Cancel
          </button>
          {activeTab !== "basic" && (
            <button
              type="button"
              onClick={handleBack}
              className="h-11 rounded-lg bg-white border border-[#D0D5DD] px-5 text-sm font-semibold text-[#344054]"
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={activeTab === "verification" ? () => navigate("/psp-individuals") : handleNext}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#F04438] hover:bg-[#D92D20] transition-colors px-6 text-sm font-semibold text-white"
          >
            {activeTab === "verification" ? "Create PSP Individual Profile" : "Save & Continue"}
            {activeTab === "verification" ? null : <span className="text-base">→</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPSPView;
