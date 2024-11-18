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
          SyncWorks
        </p>
      </div>
    </Link>
  );
};

export default ThriveLogo;
