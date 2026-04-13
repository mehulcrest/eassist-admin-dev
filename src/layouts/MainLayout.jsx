import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <div className="min-h-screen min-w-0 pl-[290px]">
        <Navbar />
        <div className="h-[calc(100vh-72px)] overflow-hidden bg-pageColor p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;