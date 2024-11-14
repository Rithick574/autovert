import { GiHamburgerMenu } from "react-icons/gi";
import ThemeToggle from "../theme/theme-toggle";
import { useEffect, useRef, useState } from "react";
import profileImage from "../../assets/icons/empty-profile.webp";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/user.actions";

interface CategoryNavbarProps {
  toggleSidebar: () => void;
  categoryName: string;
}

const AdminNavbar: React.FC<CategoryNavbarProps> = ({
  toggleSidebar,
  categoryName,
}) => {
    const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className="w-full bg--400 dark:bg-dark-bg h-16 flex shadow-md z-50 top-0 left-0 dark:border-b  dark:border-neutral-700">
      <div className="w-[70%] h-full flex items-center p-6">
        <div
          className="xl:hidden w-7 h-7 flex justify-center items-center dark:text-neutral-300 rounded-md dark:border-neutral-700 border border-gray-100 cursor-pointer"
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu />
        </div>
        <h1 className="ml-7 font-bold text-xl w-max dark:text-white">
          {categoryName}
        </h1>
      </div>
      <div className="w-[50%] h-full flex justify-end items-center p-6 bg--400">
        <div className="flex items-center  md:w-[150px] w-[100px] justify-around">
          <ThemeToggle />
        </div>

        <div
          onClick={toggleDropdown}
          className="w-10 h-10 bg-neutral-700-400 rounded overflow-hidden shadow-md"
        >
          <img
            className="object-cover w-full h-full"
            src={profileImage}
            alt=""
          />
        </div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-4 mt-[150px] w-48 bg-neutral-100 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 rounded shadow-lg z-10"
          >
            <ul className="py-2 px-1">
              <li className="px-4 py-2 hover:bg-white text-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-700 rounded-md cursor-pointer"  onClick={handleLogout}>
                Log out
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminNavbar;
