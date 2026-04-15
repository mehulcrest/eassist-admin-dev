import userProfile from "../../assets/userProfile.png";

const labelClass = "text-sm font-medium text-textColor";
const valueClass = "mt-[6px] text-base text-[#475467]";

const OverviewTab = ({ memberName, member }) => {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
          <section className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1D2939]">Personal Details</h2>
          </div>

          <div className="space-y-5 p-4">
            <div>
              <p className={labelClass}>Profile Photo</p>
              <div className="mt-[6px] flex items-start justify-between gap-4">
                <img
                  src={userProfile}
                  alt={memberName}
                  className="size-20 rounded-lg object-cover ring-1 ring-[#EAECF0]"
                />
                <div className="flex items-center gap-2 self-start">
                  <button
                    type="button"
                    className="inline-flex size-10 items-center justify-center rounded-md border border-[#D0D5DD] text-[#667085]"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.13707 1.13658C0.793252 1.4804 0.600098 1.94671 0.600098 2.43294V3.34961C0.600098 10.9433 6.75643 17.0996 14.3501 17.0996H15.2668C15.753 17.0996 16.2193 16.9065 16.5631 16.5626C16.9069 16.2188 17.1001 15.7525 17.1001 15.2663V12.2605C17.1001 12.0681 17.0396 11.8805 16.9271 11.7243C16.8145 11.5682 16.6557 11.4514 16.4731 11.3906L12.3545 10.0174C12.1452 9.94787 11.9178 9.95609 11.7141 10.0406C11.5104 10.1251 11.3439 10.2803 11.2453 10.4776L10.2095 12.5465C7.96502 11.5324 6.16731 9.73469 5.15318 7.49019L7.2221 6.45436C7.41941 6.35578 7.57456 6.18935 7.65909 5.98562C7.74361 5.78188 7.75184 5.5545 7.68226 5.34519L6.3091 1.22661C6.24833 1.04415 6.13171 0.885429 5.97576 0.772905C5.8198 0.660381 5.63241 0.599755 5.4401 0.599609H2.43343C1.9472 0.599609 1.48089 0.792764 1.13707 1.13658Z" stroke="#333333" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex size-10 items-center justify-center rounded-md border border-[#D0D5DD] text-[#667085]"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.4165 9.71389C6.4165 9.3342 6.72431 9.02637 7.104 9.02637H14.8957C15.2753 9.02637 15.5832 9.3342 15.5832 9.71389C15.5832 10.0936 15.2753 10.4014 14.8957 10.4014H7.104C6.72431 10.4014 6.4165 10.0936 6.4165 9.71389Z" fill="#323544"/>
                      <path d="M7.104 11.7764C6.72431 11.7764 6.4165 12.0842 6.4165 12.4639C6.4165 12.8436 6.72431 13.1514 7.104 13.1514H11.6873C12.067 13.1514 12.3748 12.8436 12.3748 12.4639C12.3748 12.0842 12.067 11.7764 11.6873 11.7764H7.104Z" fill="#323544"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.29152 11.0872C2.29152 6.27777 6.19038 2.37891 10.9998 2.37891C15.8093 2.37891 19.7082 6.27777 19.7082 11.0872C19.7082 15.8967 15.8093 19.7956 10.9998 19.7956H2.97902C2.70096 19.7956 2.45027 19.6281 2.34385 19.3712C2.23745 19.1143 2.29626 18.8186 2.49289 18.622L4.37511 16.7397C3.07647 15.2189 2.29152 13.2442 2.29152 11.0872ZM10.9998 3.75391C6.94977 3.75391 3.66652 7.03715 3.66652 11.0872C3.66652 13.1124 4.48658 14.9448 5.81441 16.2727C5.94334 16.4016 6.01577 16.5765 6.01577 16.7588C6.01577 16.9412 5.94334 17.1161 5.81441 17.245L4.63879 18.4206H10.9998C15.0499 18.4206 18.3332 15.1373 18.3332 11.0872C18.3332 7.03715 15.0499 3.75391 10.9998 3.75391Z" fill="#323544"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className={labelClass}>Full Name</p>
                <p className={valueClass}>{memberName}</p>
              </div>
              <div>
                <p className={labelClass}>Status</p>
                <div className="mt-[6px]">
                  <span className="inline-flex h-6 w-11 rounded-full bg-[#12B76A] p-0.5">
                    <span className="ml-auto size-5 rounded-full bg-white shadow-sm" />
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className={labelClass}>Phone</p>
                <p className={valueClass}>{member?.phone ?? "(416) 555-0123"}</p>
              </div>
              <div>
                <p className={labelClass}>Email</p>
                <p className={valueClass}>{member?.email ?? "margaret.t1@gmail.com"}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className={labelClass}>Gender</p>
                <p className={valueClass}>{member?.gender ?? "Female"}</p>
              </div>
              <div>
                <p className={labelClass}>Date of Birth</p>
                <p className={valueClass}>Nov 06, 1946 | 78 Years</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className={labelClass}>Lifetime Spend</p>
                <p className={valueClass}>$935.00</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={labelClass}>Total Services</p>
                  <p className={valueClass}>14</p>
                </div>
                <div>
                  <p className={labelClass}>Last Service Date</p>
                  <p className={valueClass}>Friday, Mar 12, 2026</p>
                </div>
              </div>
            </div>
          </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1D2939]">Home Address</h2>
          </div>
          <div className="space-y-4 p-4 text-base text-[#475467]">
            <div>
              <p className={labelClass}>Street Address</p>
              <p className={valueClass}>250 Front Street West</p>
            </div>
            <div>
              <p className={labelClass}>Country</p>
              <p className={valueClass}>Canada</p>
            </div>
            <div>
              <p className={labelClass}>Province (State)</p>
              <p className={valueClass}>Ontario</p>
            </div>
            <div>
              <p className={labelClass}>City</p>
              <p className={valueClass}>Toronto</p>
            </div>
            <div>
              <p className={labelClass}>Postal Code</p>
              <p className={valueClass}>M5V 3G5</p>
            </div>
          </div>
          </section>
        </div>

        <section className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1D2939]">Care Preferences</h2>
          </div>
          <div className="grid gap-4 p-4 text-base text-[#475467] md:grid-cols-2">
            <div>
              <p className={labelClass}>Preferred Language</p>
              <p className={valueClass}>English, Spanish</p>
            </div>
            <div>
              <p className={labelClass}>Mobility Level</p>
              <p className={valueClass}>Needs Walker</p>
            </div>
            <div>
              <p className={labelClass}>Pets</p>
              <p className={valueClass}>Yes</p>
            </div>
            <div>
              <p className={labelClass}>Religious / Cultural Preferences</p>
              <p className={valueClass}>Christian (Catholic), Prefers Sunday church visits</p>
            </div>
            <div>
              <p className={labelClass}>Medical Sensitivities</p>
              <div className="mt-[6px] flex flex-wrap gap-2">
                {["Mobility Issues", "Dementia", "Vision"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#EF444433] bg-[#FFF6F6] px-2 py-1 text-sm text-[#B42318]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className={labelClass}>Preferred Service Time</p>
              <div className="mt-[6px] flex flex-wrap gap-2">
                {["Morning", "Evening"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#EF444433] bg-[#FFF6F6] px-2 py-1 text-sm text-[#B42318]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className={labelClass}>Notes</p>
              <p className={valueClass}>Needs steady gait support during evening walks.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-4 shrink-0 border-t border-[#EAECF0] bg-pageColor pt-3">
        <div className="flex flex-col gap-2 sm:hidden">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-11 w-full rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-sm font-semibold text-white"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="hidden sm:flex sm:justify-end sm:gap-3">
          <button
            type="button"
            className="h-11 rounded-lg border border-[#D0D5DD] bg-white px-8 text-sm font-semibold text-[#344054]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-11 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-6 text-sm font-semibold text-white"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
