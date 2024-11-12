import React from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "../../context/theme-provider";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2  mr-[-10px] md:mr-3">
      <button
        onClick={toggleTheme}
        className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 focus:outline-none"
      >
        {theme === "dark" ? (
          <div className="flex items-center justify-center w-10 h-10  rounded-full transition-all duration-300 ease-in-out">
            <MoonIcon size={23} className="text-white" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-10 h-10  rounded-full transition-all duration-300 ease-in-out">
            <SunIcon size={22} className="text-neutral-600" />
          </div>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
