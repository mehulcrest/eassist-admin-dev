import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Printer,
  Share2,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import SideSheet from "../SideSheet";
import PSPsSideSheet from "./PSPsSideSheet";

const IndividualServiceDetailsView = ({ service, onBack }) => {
  const [isTimelineSheetOpen, setIsTimelineSheetOpen] = useState(false);
  const [pspsSheetState, setPspsSheetState] = useState({ isOpen: false, type: "total" });

  return (
    <>
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        <div className="grid gap-4 xl:grid-cols-[2fr_1.25fr]">
          <section className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
          <div className="flex items-center gap-2 border-b border-lineMuted px-4 py-3">
            <button type="button" onClick={onBack} className="inline-flex size-8 items-center justify-center rounded-md text-[#344054] hover:bg-[#F2F4F7]">
              <ArrowLeft size={18} />
            </button>
            <h3 className="text-[22px] font-semibold text-[#1D2939]">Service Details</h3>
          </div>
          <div className="space-y-6 p-4">
            <div className="grid gap-6 sm:grid-cols-2">
              <div><p className="text-sm font-medium text-[#344054]">Service Name</p><p className="mt-1 text-base text-[#475467]">{service.service}</p></div>
              <div><p className="text-sm font-medium text-[#344054]">Service ID</p><p className="mt-1 text-base text-[#475467]">{service.id.replace("ID: ", "")}</p></div>
              <div><p className="text-sm font-medium text-[#344054]">Caregiver</p><p className="mt-1 text-base text-[#475467] underline underline-offset-2">{service.caregiver}</p></div>
              <div><p className="text-sm font-medium text-[#344054]">Location</p><p className="mt-1 text-base text-[#475467]">123 Oak Street, Apt 4B</p></div>
              <div><p className="text-sm font-medium text-[#344054]">Date</p><p className="mt-1 text-base text-[#475467]">Friday, {service.date}</p></div>
              <div>
                <p className="text-sm font-medium text-[#344054]">Time</p>
                <button
                  type="button"
                  onClick={() => setIsTimelineSheetOpen(true)}
                  className="mt-1 text-base text-[#475467] underline underline-offset-2"
                >
                  02:15 PM - 03:45 PM
                </button>
              </div>
            </div>
            <div><p className="text-sm font-medium text-[#344054]">Estimated Service Time</p><p className="mt-1 text-base text-[#475467]">1.5 hrs</p></div>
            <div><p className="text-sm font-medium text-[#344054]">Service Status</p><div className="mt-1 flex items-center gap-2"><span className="rounded-full bg-[#ECFDF3] px-2 py-1 text-xs font-medium text-[#039855]">Completed</span><span className="text-sm text-[#475467]">No issue were reported in this service</span></div></div>
            <div className="border-t border-lineMuted pt-4">
              <p className="text-lg font-semibold text-[#1D2939]">Add-ons & notes</p>
              <div className="mt-3 grid gap-6 sm:grid-cols-2">
                <div><p className="text-sm font-medium text-[#344054]">Store(s)</p><p className="mt-1 text-sm text-[#475467]">2</p><p className="mt-3 text-sm font-medium text-[#344054]">Add-ons</p><ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-[#475467]"><li>Heavy Lifting Support (+$10)</li><li>In-Home Unpacking Assistance (+$15)</li></ul></div>
                <div><p className="text-sm font-medium text-[#344054]">Caregiver Notes</p><p className="mt-1 text-sm text-[#475467]">Please get organic vegetables if available.</p></div>
              </div>
            </div>
            <div className="border-t border-lineMuted pt-4">
              <p className="text-sm font-medium text-[#344054]">Rating & Reviews</p>
              <p className="mt-3 text-sm font-medium text-[#344054]">Rating</p>
              <div className="mt-2 flex items-center gap-1 text-sm text-[#475467]"><span>{service.rating}</span><Star size={14} className="fill-[#FDB022] text-[#FDB022]" /></div>
              <p className="mt-4 text-sm font-medium text-[#344054]">Review</p>
              <p className="mt-2 text-sm text-[#475467]">Maria is wonderful!<br />Very patient and caring. Highly recommend, excellent service. Always on time and very Professional. I will defiantly book her for my next requirement and service</p>
            </div>
          </div>
          </section>
          <section className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
            <div className="border-b border-lineMuted px-4 py-3">
              <h4 className="text-[22px] font-semibold leading-[1.05] text-[#1D2939]">Payment Information</h4>
            </div>
            <div className="space-y-5 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-[#344054]">Payment By</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-[#475467]">
                  <span className="inline-flex items-center gap-[2px] leading-none">
                    <span className="font-extrabold tracking-[-0.02em] text-[#00A6E7]">VI</span>
                    <span className="font-extrabold tracking-[-0.02em] text-[#1A1F71]">SA</span>
                  </span>
                  <span>Visa •••• 4242</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#344054]">Payment Date</p>
                <p className="mt-1 text-sm text-[#667085]">Thu, Mar 12 2026 at 03:48 PM</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
            <div className="flex items-center justify-between border-b border-lineMuted px-4 py-3">
              <h4 className="text-[22px] font-semibold leading-none text-[#1D2939]">Invoice</h4>
              <div className="flex items-center gap-2">
                <button type="button" className="rounded-lg border border-lineMuted p-2 text-[#667085]"><Printer size={16} /></button>
                <button type="button" className="rounded-lg border border-lineMuted p-2 text-[#667085]"><Share2 size={16} /></button>
                <button type="button" className="rounded-lg border border-lineMuted p-2 text-[#667085]"><Download size={16} /></button>
              </div>
            </div>
            <div className="space-y-6 px-4 py-4">
              <div>
                <p className="text-sm font-semibold leading-none text-[#1D2939]">Invoice ID: <span className="font-normal">#EA-001234</span></p>
                <p className="mt-1.5 text-xs leading-tight text-[#667085]">Charges for provider time & platform services</p>
                <div className="flex flex-col gap-2 mt-3 rounded-xl bg-[#F9FAFB] p-3 text-sm leading-[1.35] text-[#344054]">
                  <div className="flex justify-between"><span>Service Cost (2.5 hrs x $20.00 / hr )</span><span>$50.00</span></div>
                  <div className="flex justify-between"><span>Travel Expense (0.6 km)</span><span>$15.00</span></div>
                  <div className="flex justify-between"><span>Add-ons</span><span>$25.00</span></div>
                  <div className="flex justify-between"><span>Platform Fee(10%)</span><span>$9.00</span></div>
                  <div className="flex justify-between"><span>Taxes</span><span>$4.50</span></div>
                  <div className="mt-2 flex justify-between border-t border-lineMuted pt-2 font-semibold text-[#1D2939]">
                    <span>Service Fees Total:</span><span className="text-gradientVia">$103.50</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-base font-semibold leading-none text-[#1D2939]">Reimbursable Expenses</h5>
                <p className="mt-1.5 text-xs leading-tight text-[#667085]">Purchases made by provider for Member</p>
                <div className="mt-3 rounded-xl bg-[#F9FAFB] p-3 text-sm leading-[1.35] text-[#344054]">
                  <div className="flex justify-between"><span>Groceries Purchased</span><span>$27.00</span></div>
                  <div className="mt-2 flex justify-between border-t border-lineMuted pt-2 font-semibold text-[#1D2939]">
                    <span>Expenses Total:</span><span className="text-gradientVia">$27.00</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-base font-semibold leading-none text-[#1D2939]">Payment Summary</h5>
                <div className="flex flex-col gap-2 mt-3 rounded-xl bg-[#F9FAFB] p-3 text-sm leading-[1.35] text-[#344054]">
                  <div className="flex justify-between"><span>Service Fees Total:</span><span>$103.50</span></div>
                  <div className="flex justify-between"><span>Expenses Total:</span><span>$27.00</span></div>
                  <div className="mt-2 flex justify-between border-t border-lineMuted pt-2 text-base font-semibold">
                    <span className="text-gradientVia">Total Paid:</span><span className="text-gradientVia">$130.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>
        </div>
        <section className="rounded-xl border border-[#E4E7EC] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="px-4 py-3 text-[22px] font-semibold leading-none text-[#1D2939]">Matching Summary</h4>
            <div className="flex items-center gap-2 pr-4">
              <span className="inline-flex items-center rounded-md bg-[#F9FAFB] px-2.5 py-1 text-sm font-medium text-[#475467]">
                Match Strength: {service.quality}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#ECFDF3] px-2.5 py-1 text-sm font-medium text-[#039855]">
                <CheckCircle2 size={18} className="fill-[#12B76A] text-white shrink-0" />
                Successfully Matched
              </span>
            </div>
          </div>
          <div className="border-t border-lineMuted px-4 pb-4 pt-3 flex flex-col gap-2">
            <p className="text-sm text-textColor">Quick overview of how this service request matched against available PSPs.</p>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-lineMuted bg-white p-4">
                <p className="text-[16px] font-medium text-[#344054]">Member Budget</p>
                <p className="mt-4 text-xl font-semibold leading-none text-[#1D2939]">$50</p>
              </div>
              <div className="rounded-xl border border-lineMuted bg-white p-4">
                <p className="text-[16px] font-medium text-[#344054]">Market Range</p>
                <p className="mt-4 text-xl font-semibold leading-none text-[#1D2939]">$40 - $120</p>
              </div>
              <div className="rounded-xl border border-lineMuted bg-white p-4">
                <p className="text-[16px] font-medium text-[#344054]">Selected PSP</p>
                <p className="mt-4 text-xl font-semibold leading-none text-[#1D2939]">{service.caregiver} ($40/hr)</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="relative h-6">
                <div className="absolute left-0 right-0 top-2 h-4 overflow-hidden rounded-sm bg-[#E4E7EC]">
                  <div className="h-full w-[33%] bg-[#17A117]" />
                  <div className="absolute left-[33%] top-0 h-full w-[33%] bg-[#75C97A]" />
                </div>
                <div className="absolute left-[24%] -top-2 -translate-x-1/2">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16L0.339746 0.999999L17.6603 1L9 16Z" fill="#17A117"/>
                  </svg>
                </div>
              </div>
              <div className="mt-1 flex justify-between text-base text-textColor">
                <span className="text-medium">$40</span>
                <span className="text-medium">Avg $75</span>
                <span className="text-medium">$120</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-lineMuted bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-[#344054]">Total PSPs Available</p>
                  <button type="button" onClick={() => setPspsSheetState({ isOpen: true, type: "total" })} className="text-sm font-semibold text-textColor underline underline-offset-2">View All</button>
                </div>
                <p className="mt-3 text-2xl font-semibold leading-none text-[#1D2939]">9</p>
              </div>
              <div className="rounded-xl border border-lineMuted bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-[#344054]">PSP Matches</p>
                  <button type="button" onClick={() => setPspsSheetState({ isOpen: true, type: "matched" })} className="text-sm font-semibold text-textColor underline underline-offset-2">View All</button>
                </div>
                <p className="mt-3 inline-flex items-center gap-2 text-2xl font-semibold leading-none text-[#1D2939]">
                  3
                  <CheckCircle2 size={24} className="fill-[#12B76A] text-white shrink-0" />
                </p>
              </div>
              <div className="rounded-xl border border-lineMuted bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-[#344054]">Not Eligible</p>
                  <button type="button" onClick={() => setPspsSheetState({ isOpen: true, type: "not_eligible" })} className="text-sm font-semibold text-textColor underline underline-offset-2">View All</button>
                </div>
                <p className="mt-3 inline-flex items-center gap-2 text-2xl font-semibold leading-none text-[#1D2939]">
                  5
                  <X className="text-DangerRed" size={24} />
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-4 shrink-0 border-t border-lineMuted bg-pageColor pt-3">
        <div className="flex flex-col gap-2 sm:hidden">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={onBack} className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054]">Cancel</button>
            <button type="button" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-sm font-semibold text-white"><Download size={16} /> <span className="hidden sm:inline">Download Invoice</span><span className="sm:hidden">Download</span></button>
          </div>
        </div>

        <div className="hidden sm:flex sm:justify-end sm:gap-3">
          <button type="button" onClick={onBack} className="h-11 rounded-lg border border-[#D0D5DD] bg-white px-8 text-sm font-semibold text-[#344054]">Cancel</button>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-6 text-sm font-semibold text-white"><Download size={16} />Download Invoice</button>
        </div>
      </div>
    </div>
    <SideSheet
      isOpen={isTimelineSheetOpen}
      onClose={() => setIsTimelineSheetOpen(false)}
      title="Service Timeline"
      widthClass="w-[420px]"
      footer={
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setIsTimelineSheetOpen(false)}
            className="h-11 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-sm font-semibold text-white"
          >
            Got it
          </button>
          <button
            type="button"
            onClick={() => setIsTimelineSheetOpen(false)}
            className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-sm font-medium text-[#344054]"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="relative pl-10">
        <div className="absolute left-[7px] top-1 h-[148px] border-l border-dashed border-[#FECACA]" />
        {[
          ["02:10 PM", "Caregiver Checked in"],
          ["02:15 PM", "Service Started"],
          ["03:45 PM", "Service Completed"],
          ["03:48 PM", "Payment Processed"],
        ].map(([time, label]) => (
          <div key={`${time}-${label}`} className="relative mb-7 flex items-center gap-4 last:mb-0">
            <span className="absolute -left-10 top-1.5 size-3.5 rounded-full border-[1.5px] border-[#F04438] bg-white" />
            <span className="text-[16px] font-normal text-textColor">{time}</span>
            <span className="text-[16px] font-normal text-textColor">{label}</span>
          </div>
        ))}
      </div>
    </SideSheet>
    <PSPsSideSheet
      isOpen={pspsSheetState.isOpen}
      onClose={() => setPspsSheetState((prev) => ({ ...prev, isOpen: false }))}
      type={pspsSheetState.type}
    />
    </>
  );
};

export default IndividualServiceDetailsView;
