import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, LogOut, Settings, User, Info } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userProfile from "../assets/userProfile.png";
import { AUTH_TOKEN_KEY } from "../constants/auth";

const Navbar = ({ onMenuClick }) => {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = {
    name: "Robert Brown",
    role: "Admin",
    email: "robert.brown@eassist.com",
    avatar: userProfile,
  };

  const pageTitleMap = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/members": "Members",
    "/psp-individuals": "PSP Individuals",
    "/jobs": "Jobs",
  };

  const pageTitle = pageTitleMap[pathname] || "Dashboard";
  const isAddMemberPage = pathname === "/members/new";
  const isMemberProfilePage = pathname.startsWith("/member/");
  const isAddPSPPage = pathname === "/psp-individuals/new";
  const isPSPProfilePage =
    pathname.startsWith("/psp-individuals/") && pathname !== "/psp-individuals/new";
  const memberName = state?.member?.name ?? "Member Profile";
  const pspName = state?.psp?.name ?? "PSP Profile";

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsDropdownOpen(false);
    navigate("/login", { replace: true });
  };



  return (
    <header className="sticky top-0 z-20 flex min-h-[72px] items-center gap-3 border-b border-[#EAECF0] bg-white px-4 sm:gap-4 sm:px-6">
      {/* Hamburger — visible only on mobile/tablet */}
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-[#667085] hover:bg-[#F2F4F7] lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu size={22} />
      </button>

      {isAddMemberPage ? (
        <div className="shrink-0 text-base sm:text-lg">
          <Link to="/members" className="font-medium text-[#667085] underline">
            Members
          </Link>
          <span className="px-1 text-[#667085]">|</span>
          <span className="font-semibold text-[#101828]">Add New</span>
        </div>
      ) : isMemberProfilePage ? (
        <div className="min-w-0 flex-1 text-base sm:text-lg">
          <Link to="/members" className="font-medium text-[#667085] underline">
            Members
          </Link>
          <span className="px-1 text-[#667085]">|</span>
          <span className="truncate font-semibold text-[#101828]">{memberName}</span>
        </div>
      ) : isAddPSPPage ? (
        <div className="shrink-0 text-base sm:text-lg">
          <Link to="/psp-individuals" className="font-medium text-[#667085] underline">
            PSP Individuals
          </Link>
          <span className="px-1 text-[#667085]">|</span>
          <span className="font-semibold text-[#101828]">Add New</span>
        </div>
      ) : isPSPProfilePage ? (
        <div className="min-w-0 flex-1 text-base sm:text-lg">
          <Link to="/psp-individuals" className="font-medium text-[#667085] underline">
            PSP Individuals
          </Link>
          <span className="px-1 text-[#667085]">|</span>
          <span className="truncate font-semibold text-[#101828]">{pspName}</span>
        </div>
      ) : (
        <h2 className="shrink-0 text-lg font-semibold text-[#101828] sm:text-xl">
          {pageTitle}
        </h2>
      )}

      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center"
          aria-label="Notifications"
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" fill="white" />
            <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" stroke="#E4E7EC" />
            <circle cx="37" cy="7" r="5" fill="#FD853A" stroke="white" strokeWidth="2" />
            <path d="M23.25 28.9587C23.6642 28.9587 24 29.2945 24 29.7087C23.9998 30.1228 23.6641 30.4587 23.25 30.4587H20.75C20.3359 30.4587 20.0002 30.1228 20 29.7087C20 29.2945 20.3358 28.9587 20.75 28.9587H23.25ZM22 13.5427C22.4142 13.5427 22.75 13.8785 22.75 14.2927V14.8367C25.9173 15.2079 28.375 17.9007 28.375 21.1677V26.4587H28.666C29.0802 26.4587 29.4159 26.7946 29.416 27.2087C29.416 27.623 29.0802 27.9587 28.666 27.9587H27.6445C27.638 27.9589 27.6315 27.9597 27.625 27.9597H16.375C16.3685 27.9597 16.362 27.9589 16.3555 27.9587H15.333C14.9189 27.9586 14.583 27.6228 14.583 27.2087C14.5831 26.7947 14.919 26.4589 15.333 26.4587H15.625V21.1677C15.625 17.9007 18.0827 15.2079 21.25 14.8367V14.2927C21.25 13.8785 21.5858 13.5427 22 13.5427ZM22 16.2927C19.3076 16.2927 17.125 18.4753 17.125 21.1677V26.4587H26.875V21.1677C26.875 18.4753 24.6924 16.2927 22 16.2927Z" fill="#667085" />
          </svg>
        </button>

        {/* User profile dropdown container */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-xl px-1 py-1 hover:bg-[#F9FAFB] transition-colors sm:px-3 sm:py-1.5"
          >
            <div className="h-9 w-9 overflow-hidden rounded-xl border border-textColor/10 sm:h-10 sm:w-10">
              <img src={user.avatar} alt="User profile" className="h-full w-full object-cover" />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-[#101828]">{user.name}</p>
              <p className="text-xs font-medium text-[#667085]">{user.role}</p>
            </div>
            <ChevronDown className={`hidden text-[#667085] transition-transform duration-200 sm:block ${isDropdownOpen ? "rotate-180" : ""}`} size={16} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-[240px] origin-top-right overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-lg animate-in fade-in zoom-in duration-200">
              {/* Header */}
              <div className="bg-[#F9FAFB] px-4 py-3">
                <p className="text-sm font-bold text-[#101828]">{user.name}</p>
                <p className="mt-0.5 truncate text-xs font-medium text-[#667085]">{user.email}</p>
              </div>

              {/* Links */}
              <div className="p-1">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#F2F4F7] transition-colors"
                >
                  <User size={18} className="text-[#667085]" />
                  Edit profile
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#F2F4F7] transition-colors"
                >
                  <Settings size={18} className="text-[#667085]" />
                  Account settings
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#F2F4F7] transition-colors"
                >
                  <Info size={18} className="text-[#667085]" />
                  Support
                </button>
              </div>

              {/* Separator & Sign Out */}
              <div className="border-t border-[#EAECF0] p-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#F04438] hover:bg-[#FEF3F2] transition-colors"
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
