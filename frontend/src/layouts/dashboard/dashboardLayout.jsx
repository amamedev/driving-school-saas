import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1">
        {/* HEADER */}
        <Header />

        {/* PAGE CONTENT (OUTLET) */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
