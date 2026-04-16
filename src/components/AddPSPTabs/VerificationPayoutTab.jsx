const inputClassName =
  "h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:border-gradientVia focus:outline-none focus:ring-1 focus:ring-gradientVia";

const FileUploadRow = ({ label, required = true }) => (
  <div className="rounded-xl border border-[#EAECF0] p-3.5">
    <label className="mb-2 block text-xs font-medium text-[#344054]">
      {label} {required && <span className="text-redRejected">*</span>}
    </label>
    <div className="flex h-10 items-center rounded-lg border border-[#D0D5DD] overflow-hidden bg-white">
      <label className="shrink-0 cursor-pointer bg-[#F9FAFB] px-4 py-2 text-xs font-medium text-[#344054] border-r border-[#D0D5DD] hover:bg-[#F2F4F7] transition-colors">
        Choose File
        <input type="file" className="hidden" />
      </label>
      <span className="px-3 text-xs text-[#98A2B3] truncate">No file chosen</span>
    </div>
    <div className="mt-2 flex items-end justify-between gap-3">
      <div>
        <p className="text-xs text-[#667085]">Browse or Drag and drop your PDF, PNG, JPG, images here</p>
        <p className="text-xs text-[#667085]">Max File Size: 10 MB</p>
      </div>
      <button
        type="button"
        className="h-10 shrink-0 rounded-lg border border-[#D0D5DD] bg-white px-6 text-sm font-medium text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB]"
      >
        Upload
      </button>
    </div>
  </div>
);

const VerificationPayoutTab = () => {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
      {/* ── Left Column: Verification Documents ── */}
      <section className="overflow-hidden rounded-xl border border-line bg-white">
        <div className="border-b border-[#EAECF0] px-4 py-3.5">
          <h2 className="text-[20px] font-semibold text-[#1D2939]">Verification Documents</h2>
        </div>
        <div className="space-y-4 p-4">
          <FileUploadRow label="Government ID" />
          <FileUploadRow label="Address Proof" />
          <FileUploadRow label="Certifications (if applicable)" required={false} />
        </div>
      </section>

      {/* ── Right Column: Payout Information ── */}
      <section className="overflow-hidden rounded-xl border border-line bg-white">
        <div className="border-b border-[#EAECF0] px-4 py-3.5">
          <h2 className="text-[20px] font-semibold text-[#1D2939]">Payout Information</h2>
        </div>
        <div className="space-y-4 p-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#344054]">
              Account Holder Name <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="Enter account holder name" className={inputClassName} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#344054]">
              Bank Name <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="Enter bank name" className={inputClassName} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#344054]">
              Account Number <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="Enter account number" className={inputClassName} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#344054]">
              Routing Code <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="Enter bank routing code" className={inputClassName} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#344054]">
              Tax ID / PAN / Business Tax Number <span className="text-redRejected">*</span>
            </label>
            <input type="text" placeholder="Enter valid Tax ID / PAN / Business Tax Number" className={inputClassName} />
          </div>

          <div className="space-y-2 rounded-xl border border-[#EAECF0] p-3.5">
            <label className="block text-xs font-medium text-[#344054]">
              Void Cheque <span className="text-redRejected">*</span>
            </label>
            <div className="flex h-10 items-center rounded-lg border border-[#D0D5DD] overflow-hidden bg-white">
              <label className="shrink-0 cursor-pointer bg-[#F9FAFB] px-4 py-2 text-xs font-medium text-[#344054] border-r border-[#D0D5DD] hover:bg-[#F2F4F7] transition-colors">
                Choose File
                <input type="file" className="hidden" />
              </label>
              <span className="px-3 text-xs text-[#98A2B3] truncate">Upload void cheque</span>
            </div>
            <div className="mt-2 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-[#667085]">Browse or Drag and drop your PDF, PNG, JPG, images here</p>
                <p className="text-xs text-[#667085]">Max File Size: 10 MB</p>
              </div>
              <button
                type="button"
                className="h-10 shrink-0 rounded-lg border border-[#D0D5DD] bg-white px-6 text-sm font-medium text-[#344054] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB]"
              >
                Upload
              </button>
            </div>
            <p className="pt-1 text-sm text-[#475467]">
              Upload a void check to verify your bank account and ensure smooth payouts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerificationPayoutTab;
