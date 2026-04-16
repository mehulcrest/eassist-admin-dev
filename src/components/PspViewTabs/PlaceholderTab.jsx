const PlaceholderTab = ({ title }) => (
  <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-[#E4E7EC] bg-white px-6 py-12 text-center">
    <p className="text-base font-semibold text-[#101828]">{title}</p>
    <p className="mt-2 max-w-md text-sm text-[#667085]">
      This section will be available in a future update.
    </p>
  </div>
);

export default PlaceholderTab;
