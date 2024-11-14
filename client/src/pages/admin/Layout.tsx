import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/sidebar/sidebarAdmin";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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
      <section className="relative dark:bg-neutral-900 dark:text-white z-0 h-screen">
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
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
