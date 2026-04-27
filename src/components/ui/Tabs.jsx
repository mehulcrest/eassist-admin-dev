export function TabHeader({
  tabs,
  activeTab,
  onChange,
  className = "",
  containerClassName = "",
  itemClassName = "",
  activeItemClassName = "border-redRejected font-semibold text-redRejected",
  inactiveItemClassName = "border-transparent font-medium text-[#667085] hover:text-[#344054]",
  renderRight,
}) {
  return (
    <div
      className={`overflow-x-auto border-b border-[#EAECF0] px-4 py-3 scrollbar-none ${className}`}
    >
      <div className={`flex items-center justify-between gap-3 ${containerClassName}`}>
        <div className="flex min-w-max items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 pb-1 text-base transition-colors ${itemClassName} ${
                activeTab === tab.id ? activeItemClassName : inactiveItemClassName
              }`}
            >
              <span>{tab.label}</span>
              {tab.renderMeta ? tab.renderMeta() : null}
            </button>
          ))}
        </div>
        {renderRight ? renderRight() : null}
      </div>
    </div>
  );
}
