import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/sidebar/sidebarAdmin";
import AdminNavbar from "../../components/navbars/AdminNavbar";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [totalUsers, _setTotalUsers] = useState(0);
  const [pendingUsers, _setPendingUsers] = useState(0);
  const [activeUsers, _setActiveUsers] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 1280;
      setIsSmallScreen(smallScreen);
      setIsSidebarOpen(!smallScreen);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <>
      <div className="relative dark:bg-neutral-900 dark:text-white z-0 h-screen">
        <div className="flex h-full">
          <div
            className={`bg--400 h-full border-r border-slate-200 dark:border-neutral-700 ${
              isSmallScreen ? (isSidebarOpen ? "w-16" : "w-0") : "w-16"
            } overflow-hidden z-50`}
          >
            <NavbarAdmin />
          </div>
          <div className="w-full h-full">
            <div
              className={`relative z-10 dark:bg-neutral-900 pl-0 ${
                isSidebarOpen && "pl-"
              }`}
            >
              <AdminNavbar
                toggleSidebar={toggleSidebar}
                categoryName={"Dashboard"}
              />
            </div>

            <div className="relative bg--500 h-[92.3vh] flex">
            <div className="bg--500 w-full h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[30%] bg--300 py-4 px-3">
                  <div className="bg-gradient from-blue-200 to-cyan-200 bg-blue-200 dark:bg-sky-700 dark:to-slate-700 dark:border dark:border-neutral-800 shadow-[inset_0px_0px_7px_0px_#D3D3D3] dark:shadow-none dark:text-gray-100 w-full h-full rounded-xl relative">
                    <div className="flex flex-col gap-2 pt-4 pl-4">
                      <h2 className="text-xl font-bold">Total Users</h2>
                      <p className="text-4xl font-bold">{totalUsers}</p>
                    </div>
                  </div>
                  <div className="bg-gradient from-blue-200 to-cyan-200 bg-blue-200 dark:bg-sky-700 dark:to-slate-700 dark:border dark:border-neutral-800 shadow-[inset_0px_0px_7px_0px_#D3D3D3] dark:shadow-none dark:text-gray-100 w-full h-full rounded-xl relative">
                    <div className="flex flex-col gap-2 pt-4 pl-4">
                      <h2 className="text-xl font-bold">Pending Users</h2>
                      <p className="text-4xl font-bold">{pendingUsers}</p>
                    </div>
                  </div>
                  <div className="bg-gradient from-blue-200 to-cyan-200 bg-blue-200 dark:bg-sky-700 dark:to-slate-700 dark:border dark:border-neutral-800 shadow-[inset_0px_0px_7px_0px_#D3D3D3] dark:shadow-none dark:text-gray-100 w-full h-full rounded-xl relative">
                    <div className="flex flex-col gap-2 pt-4 pl-4">
                      <h2 className="text-xl font-bold">Active Users</h2>
                      <p className="text-4xl font-bold">{activeUsers}</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
