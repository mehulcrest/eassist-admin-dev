import React from "react";
import SideSheet from "../SideSheet";
import { Star, MapPin, CircleDollarSign, CheckCircle2 } from "lucide-react";

const pspDummyData = [
  { id: 1, name: "Maria Santos", verified: true, avatar: "https://i.pravatar.cc/150?u=1", rating: 4.9, reviews: 277, rate: 48, distance: 3, budgetStatus: "Within Budget" },
  { id: 2, name: "Lisa Wong", verified: true, avatar: "https://i.pravatar.cc/150?u=2", rating: 4.9, reviews: 127, rate: 50, distance: 1.2, budgetStatus: "Within Budget" },
  { id: 3, name: "John Smith", verified: true, avatar: "https://i.pravatar.cc/150?u=3", rating: 4.6, reviews: 98, rate: 70, distance: 2.5, budgetStatus: "Slightly Above" },
  { id: 4, name: "David Lee Joseph", verified: true, avatar: "https://i.pravatar.cc/150?u=4", rating: 4.7, reviews: 82, rate: 52, distance: 1.1, budgetStatus: "Within Budget" },
  { id: 5, name: "Santa Leo John", verified: true, avatar: "https://i.pravatar.cc/150?u=5", rating: 4.9, reviews: 277, rate: 62, distance: 0.6, budgetStatus: "Slightly Above" },
  { id: 6, name: "Bishop J", verified: true, avatar: "https://i.pravatar.cc/150?u=6", rating: 4.9, reviews: 127, rate: 95, distance: 1.2, budgetStatus: "Out Of Range" },
  { id: 7, name: "John Carter", verified: true, avatar: "https://i.pravatar.cc/150?u=7", rating: 4.6, reviews: 98, rate: 70, distance: 2.5, budgetStatus: "Slightly Above" },
  { id: 8, name: "Jonathan Joseph", verified: true, avatar: "https://i.pravatar.cc/150?u=8", rating: 4.7, reviews: 82, rate: 88, distance: 1.1, budgetStatus: "Out Of Range" },
  { id: 9, name: "Jason Biose", verified: true, avatar: "https://i.pravatar.cc/150?u=9", rating: 4.9, reviews: 127, rate: 110, distance: 1.2, budgetStatus: "Out Of Range" },
];

const PSPsSideSheet = ({ isOpen, onClose, type = "total" }) => {
  let title = "";
  let description = "";
  let data = [];

  switch (type) {
    case "matched":
      title = "Matched PSPs";
      data = pspDummyData.filter(p => p.budgetStatus === "Within Budget");
      description = `Based on the member search, total ${data.length} PSPs are Matched at the time.`;
      break;
    case "not_eligible":
      title = "Not Eligible PSPs";
      data = pspDummyData.filter(p => p.budgetStatus !== "Within Budget");
      description = `Based on the member search, total ${data.length} PSPs are not eligible at the time.`;
      break;
    case "total":
    default:
      title = "Total PSPs Available";
      data = pspDummyData;
      description = `Based on the member search, total ${data.length} PSPs are available at the time.`;
      break;
  }

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      widthClass="w-[761px]"
      footer={
        <div className="grid grid-cols-2 gap-3 max-w-[400px] ml-auto">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-lg bg-redRejected hover:bg-[#D92D20] transition-colors text-sm font-semibold text-white"
          >
            Got it
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-6 pt-2 pb-4">
        <p className="text-[15px] font-medium text-[#344054]">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((psp) => (
            <div key={psp.id} className="flex gap-4 rounded-[14px] border border-[#EAECF0] p-4 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
              <img src={psp.avatar} alt={psp.name} className="size-[84px] rounded-xl object-cover" />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[16px] font-semibold text-[#1D2939] truncate">{psp.name}</h4>
                  {psp.verified && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.01407 2.76447C5.52868 2.72339 6.0172 2.52098 6.41007 2.18607C6.8538 1.80815 7.41761 1.60059 8.00047 1.60059C8.58333 1.60059 9.14714 1.80815 9.59087 2.18607C9.98374 2.52098 10.4723 2.72339 10.9869 2.76447C11.568 2.81092 12.1136 3.06284 12.5259 3.47509C12.9381 3.88733 13.19 4.43293 13.2365 5.01407C13.2773 5.52847 13.4797 6.01727 13.8149 6.41007C14.1928 6.8538 14.4004 7.41761 14.4004 8.00047C14.4004 8.58333 14.1928 9.14714 13.8149 9.59087C13.48 9.98374 13.2776 10.4723 13.2365 10.9869C13.19 11.568 12.9381 12.1136 12.5259 12.5259C12.1136 12.9381 11.568 13.19 10.9869 13.2365C10.4723 13.2776 9.98374 13.48 9.59087 13.8149C9.14714 14.1928 8.58333 14.4004 8.00047 14.4004C7.41761 14.4004 6.8538 14.1928 6.41007 13.8149C6.0172 13.48 5.52868 13.2776 5.01407 13.2365C4.43293 13.19 3.88733 12.9381 3.47509 12.5259C3.06284 12.1136 2.81092 11.568 2.76447 10.9869C2.72339 10.4723 2.52098 9.98374 2.18607 9.59087C1.80815 9.14714 1.60059 8.58333 1.60059 8.00047C1.60059 7.41761 1.80815 6.8538 2.18607 6.41007C2.52098 6.0172 2.72339 5.52868 2.76447 5.01407C2.81092 4.43293 3.06284 3.88733 3.47509 3.47509C3.88733 3.06284 4.43293 2.81092 5.01407 2.76447ZM10.9661 6.96607C11.1118 6.81519 11.1924 6.61311 11.1906 6.40335C11.1888 6.1936 11.1047 5.99295 10.9563 5.84462C10.808 5.69629 10.6074 5.61216 10.3976 5.61033C10.1878 5.60851 9.98576 5.68915 9.83487 5.83487L7.20047 8.46927L6.16607 7.43487C6.01519 7.28915 5.81311 7.20851 5.60335 7.21033C5.39359 7.21216 5.19295 7.29629 5.04462 7.44462C4.89629 7.59295 4.81216 7.7936 4.81033 8.00335C4.80851 8.21311 4.88915 8.41519 5.03487 8.56607L6.63487 10.1661C6.7849 10.3161 6.98834 10.4003 7.20047 10.4003C7.41261 10.4003 7.61605 10.3161 7.76607 10.1661L10.9661 6.96607Z" fill="#0A690A"/>
                    </svg>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-[#475467]">
                  <Star size={14} className="fill-[#FDB022] text-[#FDB022] shrink-0" />
                  <span className="font-semibold text-[#344054]">{psp.rating}</span>
                  <span className="truncate">({psp.reviews} reviews)</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-[#667085]">
                  <div className="flex items-center gap-1.5 truncate">
                    <CircleDollarSign size={15} />
                    <span>${psp.rate} / hour</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin size={15} />
                    <span>{psp.distance} km away</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="inline-flex items-center rounded-full border border-[#EF444433] bg-[#FFF6F6] px-2.5 py-0.5 text-[12px] font-medium text-textColor">
                    {psp.budgetStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SideSheet>
  );
};

export default PSPsSideSheet;
