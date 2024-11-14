import React, { useState } from "react";
import { Helmet } from "react-helmet";

const Dashboard: React.FC = () => {
  const [totalUsers, _setTotalUsers] = useState(0);
  const [pendingUsers, _setPendingUsers] = useState(0);
  const [activeUsers, _setActiveUsers] = useState(0);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
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
    </>
  );
};

export default Dashboard;
