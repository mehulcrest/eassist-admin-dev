import { NavLink, useLocation } from "react-router-dom";
import logoImage from "../assets/logo.png";
import {
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  LayoutGrid,
  MapPinned,
  Settings,
  Users,
  UserRound,
  ReceiptText,
  WalletCards,
  MessageSquareWarning,
  X,
} from "lucide-react";

const isMembersSectionPath = (pathname) =>
  pathname === "/members" ||
  pathname.startsWith("/members/") ||
  pathname.startsWith("/member/");

  const isJobsSectionPath = (pathname) =>
  pathname === "/jobs" || pathname.startsWith("/job/");

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const primaryItems = [
    { label: "Dashboard", icon: LayoutGrid, to: "/", end: true },
    {
      label: "Members",
      icon: Users,
      to: "/members",
      isActiveOverride: isMembersSectionPath,
    },
    { label: "PSP Individuals", icon: UserRound, to: "/psp-individuals" },
    { label: "PSP Businesses", icon: Building2, to: "/psp-businesses" },
    { 
      label: "Jobs", 
      icon: BriefcaseBusiness, 
      to: "/jobs",
      isActiveOverride: isJobsSectionPath 
    },
    { label: "Territories", icon: MapPinned },
    { label: "Payments", icon: WalletCards },
    { label: "Complaints", icon: MessageSquareWarning },
    { label: "System Settings", icon: Settings },
    { label: "Reports", icon: ReceiptText },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-30 flex h-screen w-[290px] flex-col border-r border-line bg-white px-5 pt-5 pb-6 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo + close — pinned at top, never scrolls */}
        <div className="mb-7 shrink-0 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="eAssist logo" className="w-[45px] h-[43px] rounded-lg object-contain" />
            <h1 className="text-3xl font-bold text-heading">eAssist</h1>
          </div>
          <button onClick={onClose} className="lg:hidden p-1">
            <X size={24} />
          </button>
        </div>

        {/* Nav list — scrolls when items overflow */}
        <nav className="flex flex-1 min-h-0 overflow-y-auto flex-col gap-2 pb-2">
          {primaryItems.map((item) => (
            item.to ? (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => {
                  const active =
                    typeof item.isActiveOverride === "function"
                      ? item.isActiveOverride(pathname)
                      : isActive;
                  return active
                    ? "block rounded-10 bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-4 py-2 text-base font-medium text-white no-underline"
                    : "block rounded-10 px-4 py-2 text-base font-normal text-body no-underline";
                }}
              >
                <span className="flex items-center gap-2">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </span>
              </NavLink>
            ) : (
              <button
                key={item.label}
                type="button"
                className="cursor-default rounded-10 px-4 py-2 text-left text-base font-normal text-body"
              >
                <span className="flex items-center gap-2">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </span>
              </button>
            )
          ))}
        </nav>

        <div className="mt-auto px-4 pt-5">
          <p className="mb-2 text-xs tracking-section text-textColor/80">OTHERS</p>
          <button
            type="button"
            className="w-full cursor-default rounded-10 px-0 py-1 text-left text-base font-normal text-textColor"
          >
            <span className="flex items-center gap-2">
              <CircleHelp size={18} className="text-textColor" />
              <span>Help &amp; Support</span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;