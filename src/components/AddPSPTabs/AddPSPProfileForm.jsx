import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicInformationTab from "./BasicInformationTab";
import ServicesCoverageTab from "./ServicesCoverageTab";
import ServiceModelSetupTab from "./ServiceModelSetupTab";
import AvailabilityTab from "./AvailabilityTab";
import VerificationPayoutTab from "./VerificationPayoutTab";
import { TabHeader } from "../ui/Tabs";

const AddPSPProfileForm = ({ pspType = "individual", cancelPath, finalButtonLabel, onFinalSubmit }) => {
  const navigate = useNavigate();
  const isBusiness = pspType === "business";
  const tabsOrder = isBusiness
    ? ["basic", "services", "service-model", "availability", "verification"]
    : ["basic", "services", "availability", "verification"];
  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "services", label: "Services & Coverage" },
    ...(isBusiness ? [{ id: "service-model", label: "Service Model Setup" }] : []),
    { id: "availability", label: "Availability" },
    { id: "verification", label: "Verification & Payout" },
  ];
  const [activeTab, setActiveTab] = useState("basic");

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

  const handleFinalAction = () => {
    if (onFinalSubmit) {
      onFinalSubmit();
      return;
    }
    navigate(cancelPath);
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <div className="shrink-0 overflow-hidden rounded-lg border border-line bg-white">
        <TabHeader tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-2">
        {activeTab === "basic" && <BasicInformationTab pspType={pspType} />}
        {activeTab === "services" && <ServicesCoverageTab pspType={pspType} />}
        {activeTab === "service-model" && isBusiness && <ServiceModelSetupTab />}
        {activeTab === "availability" && <AvailabilityTab pspType={pspType} />}
        {activeTab === "verification" && <VerificationPayoutTab pspType={pspType} />}
      </div>

      <div className="shrink-0 border-t border-[#EAECF0] bg-pageColor pt-3">
        <div className="flex flex-col gap-2 sm:hidden">
          {activeTab === "basic" ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigate(cancelPath)}
                className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-11 w-full items-center justify-center gap-1 rounded-lg bg-redRejected text-sm font-semibold text-white transition-colors hover:bg-[#D92D20]"
              >
                Save & Continue <span className="text-base">→</span>
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={activeTab === "verification" ? handleFinalAction : handleNext}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-redRejected text-sm font-semibold text-white transition-colors hover:bg-[#D92D20]"
              >
                {activeTab === "verification" ? finalButtonLabel : "Save & Continue"}
                {activeTab === "verification" ? null : <span className="text-base">→</span>}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => navigate(cancelPath)}
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

        <div className="hidden sm:flex sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={() => navigate(cancelPath)}
            className="h-11 rounded-lg border border-[#D0D5DD] bg-white px-8 text-sm font-semibold text-[#344054]"
          >
            Cancel
          </button>
          {activeTab !== "basic" && (
            <button
              type="button"
              onClick={handleBack}
              className="h-11 rounded-lg border border-[#D0D5DD] bg-white px-5 text-sm font-semibold text-[#344054]"
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={activeTab === "verification" ? handleFinalAction : handleNext}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-redRejected px-6 text-sm font-semibold text-white transition-colors hover:bg-[#D92D20]"
          >
            {activeTab === "verification" ? finalButtonLabel : "Save & Continue"}
            {activeTab === "verification" ? null : <span className="text-base">→</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPSPProfileForm;
