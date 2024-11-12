import React from "react";
import { Link } from "react-router-dom";
import SyncWorksLogo from "../../assets/icons/SyncWorksLogo.svg";

const ThriveLogo: React.FC = () => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <div
          className="md:w-10 md:h-10 w-8 h-8 mr-1"
          style={{
            backgroundImage: `url(${SyncWorksLogo})`,
            backgroundSize: "cover",
          }}
        ></div>
        <p className="md:text-2xl text-xl font-extrabold relative dark:text-white ">
          <span className="md:w-[6.5px] md:left-[41.2px] md:top-[7px] rounded-full md:h-[6.5px] w-[6.5px] left-[33.7px] top-[4.9px] h-[6.5px]  bg-blue-500 absolute" />
          SyncWorks
        </p>
      </div>
    </Link>
  );
};

export default ThriveLogo;
