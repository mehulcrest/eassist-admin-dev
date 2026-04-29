import { ArrowLeft, Download, Printer, Share2, Star, CheckCircle2, Clock3, MapPin } from "lucide-react";
import SideSheet from "../SideSheet";
import userProfile from "../../assets/userProfile.png";

const InfoRow = ({ label, name, avatarSrc }) => (
  <div className="border-t border-[#EAECF0] pt-3">
    <p className="text-lg font-semibold text-[#000000]">{label}</p>
    <div className="mt-2 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img src={avatarSrc} alt={name} className="size-10 rounded-lg object-cover" />
        <span className="text-base font-normal text-secondaryTextColor underline underline-offset-2">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className="inline-flex size-8 items-center justify-center text-textColor">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="37" height="37" rx="7.5" fill="white"/>
            <rect x="0.5" y="0.5" width="37" height="37" rx="7.5" stroke="#E8E8E8"/>
            <path d="M11.287 11.287C10.9432 11.6308 10.75 12.0971 10.75 12.5833V13.5C10.75 21.0937 16.9063 27.25 24.5 27.25H25.4167C25.9029 27.25 26.3692 27.0568 26.713 26.713C27.0568 26.3692 27.25 25.9029 27.25 25.4167V22.4109C27.25 22.2184 27.1895 22.0308 27.077 21.8747C26.9644 21.7186 26.8056 21.6018 26.623 21.541L22.5044 20.1678C22.2951 20.0983 22.0677 20.1065 21.864 20.191C21.6603 20.2755 21.4938 20.4307 21.3953 20.628L20.3594 22.6969C18.1149 21.6828 16.3172 19.8851 15.3031 17.6406L17.372 16.6048C17.5693 16.5062 17.7245 16.3397 17.809 16.136C17.8935 15.9323 17.9017 15.7049 17.8322 15.4956L16.459 11.377C16.3982 11.1945 16.2816 11.0358 16.1257 10.9233C15.9697 10.8108 15.7823 10.7501 15.59 10.75H12.5833C12.0971 10.75 11.6308 10.9432 11.287 11.287Z" stroke="#333333" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button type="button" className="inline-flex size-8 items-center justify-center text-textColor">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="37" height="37" rx="7.5" fill="white"/>
            <rect x="0.5" y="0.5" width="37" height="37" rx="7.5" stroke="#E8E8E8"/>
            <path d="M14.416 17.7129C14.416 17.3332 14.7238 17.0254 15.1035 17.0254H22.8952C23.2748 17.0254 23.5827 17.3332 23.5827 17.7129C23.5827 18.0926 23.2748 18.4004 22.8952 18.4004H15.1035C14.7238 18.4004 14.416 18.0926 14.416 17.7129Z" fill="#323544"/>
            <path d="M15.1035 19.7754C14.7238 19.7754 14.416 20.0832 14.416 20.4629C14.416 20.8426 14.7238 21.1504 15.1035 21.1504H19.6868C20.0665 21.1504 20.3743 20.8426 20.3743 20.4629C20.3743 20.0832 20.0665 19.7754 19.6868 19.7754H15.1035Z" fill="#323544"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.291 19.0872C10.291 14.2778 14.1899 10.3789 18.9993 10.3789C23.8088 10.3789 27.7077 14.2778 27.7077 19.0872C27.7077 23.8967 23.8088 27.7956 18.9993 27.7956H10.9785C10.7005 27.7956 10.4498 27.6281 10.3434 27.3712C10.237 27.1143 10.2958 26.8186 10.4924 26.622L12.3746 24.7397C11.076 23.2189 10.291 21.2442 10.291 19.0872ZM18.9993 11.7539C14.9493 11.7539 11.666 15.0371 11.666 19.0872C11.666 21.1124 12.4861 22.9448 13.8139 24.2727C13.9429 24.4016 14.0153 24.5765 14.0153 24.7588C14.0153 24.9412 13.9429 25.1161 13.8139 25.245L12.6383 26.4206H18.9993C23.0495 26.4206 26.3327 23.1373 26.3327 19.0872C26.3327 15.0371 23.0495 11.7539 18.9993 11.7539Z" fill="#323544"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const AssignJobsDetailView = ({ isOpen, onClose, job }) => {
  const selectedJob = job ?? {
    id: "",
    job: "",
    member: "",
  };

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="In Progress Job"
      widthClass="w-[430px]"
      footer={
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="h-10 flex-1 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-4 text-sm font-semibold text-white"
          >
            Got It
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 flex-1 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-textColor"
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="space-y-4 text-textColor">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-sm text-textColor">Job ID</p>
            <p className="mt-1 font-normal text-secondaryTextColor">{selectedJob.id}</p>
          </div>
          <div>
            <p className="text-sm text-textColor">Check-In Time</p>
            <p className="mt-1 font-normal text-secondaryTextColor">02:51 PM</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white py-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-textColor">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="#13ABD5"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9753 5.28401C13.1276 5.33189 13.2606 5.42709 13.355 5.55578C13.4494 5.68446 13.5003 5.8399 13.5003 5.99951V9.74951H16.5003C16.6375 9.74945 16.7721 9.78702 16.8894 9.85813C17.0067 9.92924 17.1023 10.0312 17.1657 10.1528C17.2291 10.2745 17.258 10.4112 17.2491 10.5481C17.2402 10.685 17.1939 10.8168 17.1153 10.9293L11.8653 18.4293C11.774 18.5602 11.6432 18.6585 11.4921 18.71C11.341 18.7614 11.1774 18.7633 11.0251 18.7154C10.8728 18.6674 10.7398 18.5722 10.6455 18.4434C10.5511 18.3147 10.5002 18.1591 10.5003 17.9995V14.2495H7.50033C7.36314 14.2496 7.22857 14.212 7.11125 14.1409C6.99393 14.0698 6.89836 13.9679 6.83494 13.8462C6.77152 13.7246 6.74269 13.5878 6.75157 13.4509C6.76046 13.314 6.80672 13.1822 6.88533 13.0698L12.1353 5.56976C12.2268 5.4391 12.3576 5.34102 12.5087 5.28977C12.6597 5.23851 12.8232 5.23676 12.9753 5.28476V5.28401Z" fill="white"/>
            </svg>

            Live Job Status
          </span>
          <span className="inline-flex rounded-full bg-[#DFF3FF] px-2.5 py-1 text-xs font-semibold text-[#007AFF]">
            In Progress
          </span>
        </div>

        <div className="rounded-xl bg-[#007AFF1A] p-3">
          <p className="text-base font-semibold text-[#111111]">{selectedJob.job}</p>
          <div className="mt-2 space-y-1.5 text-sm text-textColor flex flex-col gap-0.5">
            <p className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-textColor" />
              123 AhStreet, Apt 4B
            </p>
            <p className="inline-flex items-center gap-1.5">
              <Clock3 size={14} className="text-textColor" />
              02:00 PM (2 hrs)
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-[#007AFF12] px-3 py-2">
            <span className="text-base font-semibold text-textColor">Job Duration</span>
            <span className="inline-flex items-center gap-2 text-base font-semibold text-textColor">
              <Clock3 size={14} className="text-textColor" />
              00:12:41
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3" cy="3" r="3" fill="#3CAE5C"/>
                  </svg>
              <span className="rounded text-sm font-semibold text-[#2E90FA]">Live
              </span>
            </span>
          </div>
        </div>

        <InfoRow label="Member Information" name={selectedJob.member} avatarSrc={userProfile} />
        <InfoRow label="PSP Information" name="Margaret Thompson" avatarSrc={userProfile} />

        <div className="border-t border-[#EAECF0] pt-3">
          <p className="text-base font-semibold text-[#000000]">Add-ons & notes</p>
          <div className="space-y-4">
          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-textColor">Store(s)</p>
              <p className="mt-1">2</p>
            </div>
            <div>
              <p className="text-xs text-textColor">Estimated Job Time</p>
              <p className="mt-1">1.5 hrs</p>
            </div>
          </div>
          <div className="mt-3 text-sm">
            <p className="font-medium">Add-ons</p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-textColor">
              <li>Heavy Lifting Support (+$10)</li>
              <li>In-Home Unpacking Assistance (+$15)</li>
            </ul>
          </div>
          <div className="mt-3 text-sm">
            <p className="font-medium">Caregiver Notes</p>
            <p className="mt-1 text-textColor">Please get organic vegetables if available.</p>
          </div>
          </div>
        </div>
      </div>
    </SideSheet>
  );
};

export const AssignedJobDetailPage = ({ job, onBack }) => {
  const selectedJob = job ?? {
    id: "J001",
    job: "Grocery Trip Assistance",
    member: "Margaret Thompson",
    status: "Completed",
    date: "Mar 12, 2026",
    duration: "1.5 hr",
    time: "02:15 PM - 03:45 PM",
    earning: "$130.50",
    rating: "4.5",
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        <div className="grid gap-4 xl:grid-cols-[2fr_1.2fr]">
          <section className="overflow-hidden rounded-xl border border-line bg-white">
            <div className="flex items-center gap-2 border-b border-[#EAECF0] px-4 py-3">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex size-8 items-center justify-center rounded-md text-[#344054] hover:bg-[#F2F4F7]"
              >
                <ArrowLeft size={18} />
              </button>
              <h3 className="text-2xl font-semibold text-[#1D2939]">Job Details</h3>
            </div>
            <div className="space-y-5 p-4">
              <div className="grid gap-5 sm:grid-cols-2">
                <div><p className="text-sm font-medium text-[#344054]">Job Name</p><p className="mt-1 text-sm text-[#667085]">{selectedJob.job}</p></div>
                <div><p className="text-sm font-medium text-[#344054]">Job ID</p><p className="mt-1 text-sm text-[#667085]">{selectedJob.id}</p></div>
                <div>
                  <p className="text-sm font-medium text-[#344054]">Member</p>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm text-[#667085]">
                    <img src={userProfile} alt={selectedJob.member} className="size-6 rounded-full object-cover" />
                    <span className="underline underline-offset-2">{selectedJob.member}</span>
                  </p>
                </div>
                <div><p className="text-sm font-medium text-[#344054]">Location</p><p className="mt-1 text-sm text-[#667085]">123 Oak Street, Apt 4B</p></div>
                <div><p className="text-sm font-medium text-[#344054]">Date</p><p className="mt-1 text-sm text-[#667085]">Friday, {selectedJob.date}</p></div>
                <div><p className="text-sm font-medium text-[#344054]">Time</p><p className="mt-1 text-sm text-[#667085] underline underline-offset-2">{selectedJob.time}</p></div>
              </div>

              <div>
                <p className="text-sm font-medium text-[#344054]">Total Service Time</p>
                <p className="mt-1 inline-flex rounded bg-[#F2F4F7] px-2 py-0.5 text-xs text-[#344054]">{selectedJob.duration}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-[#344054]">Service Status</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-[#ECFDF3] px-2 py-0.5 text-xs font-medium text-greenVerified">Completed</span>
                  <span className="text-sm text-[#475467]">No issue were reported in this service</span>
                </div>
              </div>

              <div className="border-t border-[#EAECF0] pt-4">
                <p className="text-lg font-semibold text-[#1D2939]">Add-ons & notes</p>
                <div className="mt-3 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-[#344054]">Store(s)</p>
                    <p className="mt-1 text-sm text-[#475467]">2</p>
                    <p className="mt-3 text-sm font-medium text-[#344054]">Add-ons</p>
                    <ul className="mt-1 space-y-1 text-sm text-[#475467]">
                      <li>- Heavy Lifting Support (+$10)</li>
                      <li>- In-Home Unpacking Assistance (+$15)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#344054]">Caregiver Notes</p>
                    <p className="mt-1 text-sm text-[#475467]">Please get organic vegetables if available.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#EAECF0] pt-4">
                <p className="text-lg font-semibold text-[#1D2939]">Rating & Reviews</p>
                <p className="mt-3 text-sm font-medium text-[#344054]">Rating</p>
                <div className="mt-1 inline-flex items-center gap-1 text-sm text-[#475467]">
                  <span>{selectedJob.rating}</span>
                  <Star size={14} className="fill-[#FDB022] text-[#FDB022]" />
                </div>
                <p className="mt-3 text-sm font-medium text-[#344054]">Review</p>
                <p className="mt-1 text-sm text-[#475467]">
                  Maria is wonderful! <br /> Very patient and caring, Highly recommend, excellent service. Always on time and very Professional.I will defiantly book her for my next requirement and service
                </p>
              </div>

              <div className="border-t border-[#EAECF0] pt-4">
                <p className="text-lg font-semibold text-[#1D2939]">Complain & Notes</p>
                <div className="mt-4 flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-[#EAECF0] bg-white px-4 py-6 text-center">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29 16.75V4.5C29 3.57174 28.6313 2.6815 27.9749 2.02513C27.3185 1.36875 26.4283 1 25.5 1H4.5C3.57174 1 2.6815 1.36875 2.02513 2.02513C1.36875 2.6815 1 3.57174 1 4.5V16.75M29 16.75V25.5C29 26.4283 28.6313 27.3185 27.9749 27.9749C27.3185 28.6313 26.4283 29 25.5 29H4.5C3.57174 29 2.6815 28.6313 2.02513 27.9749C1.36875 27.3185 1 26.4283 1 25.5V16.75M29 16.75H24.4745C24.0104 16.7501 23.5654 16.9345 23.2373 17.2628L19.0128 21.4872C18.6846 21.8155 18.2396 21.9999 17.7755 22H12.2245C11.7604 21.9999 11.3154 21.8155 10.9872 21.4872L6.76275 17.2628C6.43464 16.9345 5.98959 16.7501 5.5255 16.75H1" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="mt-3 text-base font-semibold text-[#1D2939]">No Complain & Notes related to this Job</p>
                  <p className="mt-1 text-sm text-[#667085]">If there any complain about the Job, will display here</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-line bg-white">
              <div className="border-b border-[#EAECF0] px-4 py-3">
                <h4 className="text-lg leading-none font-semibold text-[#1D2939]">Payment Information</h4>
              </div>
              <div className="space-y-4 px-4 py-4 text-sm text-[#667085]">
                <div>
                  <p className="font-medium text-[#344054]">Payment By</p>
                  <div className="mt-1 inline-flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-[2px] leading-none">
                      <span className="font-extrabold tracking-[-0.02em] text-[#00A6E7]">VI</span>
                      <span className="font-extrabold tracking-[-0.02em] text-[#1A1F71]">SA</span>
                    </span>
                    <span>Visa •••• 4242</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[#344054]">Payment Date</p>
                  <p className="mt-1">Thu, Mar 12 2026 at 03:48 PM</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-line bg-white">
              <div className="flex items-center justify-between border-b border-[#EAECF0] px-4 py-3">
                <h4 className="text-lg leading-none font-semibold text-[#1D2939]">Invoice</h4>
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded-lg border border-[#EAECF0] p-2 text-[#667085]"><Printer size={16} /></button>
                  <button type="button" className="rounded-lg border border-[#EAECF0] p-2 text-[#667085]"><Share2 size={16} /></button>
                  <button type="button" className="rounded-lg border border-[#EAECF0] p-2 text-[#667085]"><Download size={16} /></button>
                </div>
              </div>
              <div className="space-y-6 px-4 py-4 text-sm text-[#344054]">
                <p className="font-semibold text-[#1D2939]">Invoice ID: <span className="font-normal">#EA-001234</span></p>
                <p className="-mt-4 text-sm text-[#667085]">Charges for provider time & platform services</p>
                <div className="rounded-xl bg-[#F6F6F6A6] p-3 space-y-1.5">
                  <p className="flex justify-between"><span>Service Cost (2.5 hrs x $20.00 / hr )</span><span>$50.00</span></p>
                  <p className="flex justify-between"><span>Travel Expense (0.6 km)</span><span>$15.00</span></p>
                  <p className="flex justify-between"><span>Add-ons</span><span>$25.00</span></p>
                  <p className="flex justify-between"><span>Platform Fee(10%)</span><span>$9.00</span></p>
                  <p className="flex justify-between"><span>Taxes</span><span>$4.50</span></p>
                  <p className="mt-2 flex justify-between border-t border-[#EAECF0] pt-2 font-semibold">
                    <span>Service Fees Total:</span><span className="text-redRejected">$103.50</span>
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold leading-none text-[#1D2939]">Reimbursable Expenses</p>
                  <p className="mt-1 text-sm text-[#667085]">Purchases made by provider for Member</p>
                  <div className="mt-3 rounded-xl bg-[#F6F6F6A6] p-3 space-y-1.5">
                    <p className="flex justify-between"><span>Groceries Purchased</span><span>$27.00</span></p>
                    <p className="mt-2 flex justify-between border-t border-[#EAECF0] pt-2 font-semibold">
                      <span>Expenses Total:</span><span className="text-redRejected">$27.00</span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-lg font-semibold leading-none text-[#1D2939]">Payment Summary</p>
                  <div className="mt-3 rounded-xl bg-[#F6F6F6A6] p-3 space-y-1.5">
                    <p className="flex justify-between"><span>Service Fees Total:</span><span>$103.50</span></p>
                    <p className="flex justify-between"><span>Expenses Total:</span><span>$27.00</span></p>
                    <p className="mt-2 flex justify-between border-t border-[#EAECF0] pt-2 text-base font-semibold">
                      <span className="text-redRejected">Total Paid:</span><span className="text-redRejected">$130.50</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-4 shrink-0 border-t border-[#EAECF0] bg-pageColor pt-3">
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="h-11 rounded-lg border border-[#D0D5DD] bg-white px-8 text-sm font-semibold text-[#344054]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-6 text-sm font-semibold text-white"
          >
            <Download size={16} />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignJobsDetailView;
