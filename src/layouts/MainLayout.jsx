import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content — full width on mobile, offset by sidebar on lg+ */}
      <div className="h-screen min-w-0  lg:pl-[280px]">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="h-[calc(100vh-72px)] overflow-y-auto bg-pageColor p-4 sm:p-6">
          <div className="h-full min-h-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
