import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/SyncWorksLogo.svg";
import { useTheme } from "../../context/theme-provider";
import { FiActivity } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard,LuLayoutPanelTop } from "react-icons/lu";
import { GoWorkflow } from "react-icons/go";

const NavbarAdmin: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const [selectedIcon, setSelectedIcon] = useState<string>("");

  useEffect(() => {
    const mainPath = location.pathname.split("/").filter(Boolean)[0];

    if (mainPath) {
      setSelectedIcon(mainPath);
      localStorage.setItem("selectedIcon", mainPath);
    }
  }, [location.pathname]);

  useEffect(() => {
    const savedIcon = localStorage.getItem("selectedIcon");
    if (savedIcon) {
      setSelectedIcon(savedIcon);
    }
  }, []);

  const iconColor = (iconName: string) =>
    selectedIcon === iconName
      ? "#318CE7"
      : theme === "dark"
      ? "#989898"
      : "#505050";

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
    localStorage.setItem("selectedIcon", iconName);
  };

  return (
    <div className="dark:bg-dark-bg w-16 h-screen flex flex-col justify-center items-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="h-[10%] w-14 flex flex-col justify-center items-center">
        <Link to="/admin/dashboard">
          <div
            className="w-10 h-8 bg-contain hover:cursor-pointer"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
        </Link>
      </div>
      <div className="h-[90%] w-14 flex justify-center items-center">
        <ul className="gap-6 flex flex-col">
          <Link to="/admin/dashboard">
            <li
              onClick={() => handleIconClick("dashboard")}
              className="w-11 h-11 bg-contain flex justify-center items-center"
            >
              <LuLayoutDashboard color={iconColor("dashboard")} size={23} />
            </li>
          </Link>
          <Link to="/admin/workflow">
            <li
              onClick={() => handleIconClick("workflow")}
              className="w-11 h-11 bg-contain flex justify-center items-center"
            >
              <GoWorkflow color={iconColor("workflow")} size={23} />
            </li>
          </Link>
          <Link to="/admin/template">
            <li
              onClick={() => handleIconClick("template")}
              className="w-11 h-11 bg-contain flex justify-center items-center"
            >
              <LuLayoutPanelTop color={iconColor("template")} width={23} />
            </li>
          </Link>
          <Link to="/admin/dynamic-field">
            <li
              onClick={() => handleIconClick("dynamic-field")}
              className="w-11 h-11 bg-contain flex justify-center items-center"
            >
              <FiActivity color={iconColor("dynamic-field")} size={23} />
            </li>
          </Link>

          <Link to="">
            <li
              onClick={() => handleIconClick("settings")}
              className="w-11 h-11 bg-contain flex justify-center items-center"
            >
              <IoSettingsOutline color={iconColor("settings")} size={23} />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavbarAdmin;
