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
} from "lucide-react";

const isMembersSectionPath = (pathname) =>
  pathname === "/members" ||
  pathname.startsWith("/members/") ||
  pathname.startsWith("/member/");

const Sidebar = () => {
  const { pathname } = useLocation();

  const primaryItems = [
    { label: "Dashboard", icon: LayoutGrid, to: "/", end: true },
    {
      label: "Members",
      icon: Users,
      to: "/members",
      isActiveOverride: isMembersSectionPath,
    },
    { label: "PSP Individuals", icon: UserRound },
    { label: "PSP Businesses", icon: Building2 },
    { label: "Jobs", icon: BriefcaseBusiness },
    { label: "Territories", icon: MapPinned },
    { label: "Payments", icon: WalletCards },
    { label: "Complaints", icon: MessageSquareWarning },
    { label: "System Settings", icon: Settings },
    { label: "Reports", icon: ReceiptText },
  ];

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[290px] flex-col overflow-y-auto border-r border-line bg-white px-5 pt-5 pb-6">
      <div className="mb-7 flex items-center gap-3">
        <img src={logoImage} alt="eAssist logo" className="w-[45px] h-[43px] rounded-lg object-contain" />
        <h1 className="text-3xl font-bold text-heading">eAssist</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {primaryItems.map((item) => (
          item.to ? (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
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
  );
};

export default Sidebar;