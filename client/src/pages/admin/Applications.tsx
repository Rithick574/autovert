import React, { useEffect, useState } from "react";
import Table from "../../components/common/Table";
import { Helmet } from "react-helmet";
import { commonRequest } from "../../common/api";
import { config } from "../../common/configurations";
import Loading from "../../components/common/Loading";
import { GrOverview } from "react-icons/gr";
import { FcAcceptDatabase } from "react-icons/fc";
import { MdAutoDelete } from "react-icons/md";
import UserDetailModal from "../../components/admin/Applications/UserDetailModal";

const Applications: React.FC = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const fetchTemplates = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await commonRequest("GET", "/auth/applications", config);
      setTemplates(response.data);
    } catch (err) {
      setError("Failed to fetch templates");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const columns = [
    { label: "Name", accessor: "firstname" },
    { label: "Email", accessor: "email" },
    { label: "Date", accessor: "createdAt" },
  ];

  const handleViewUser = async (userId: string) => {
    setLoading(true);
    try {
      const response = await commonRequest(
        "GET",
        `/auth/applications/${userId}`,
        config
      );
      setSelectedUser(response.data);
      setIsUserModalVisible(true);
    } catch (err) {
      setError("Failed to fetch user details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderActions = (row: any) => (
    <div className="flex justify-center text-lg">
      <span
        className="cursor-pointer text-blue-500"
        onClick={() => handleViewUser(row._id)}
      >
        <GrOverview />
      </span>
      <span className="ml-2 cursor-pointer text-blue-500">
        <FcAcceptDatabase />
      </span>
      <span className="ml-2 cursor-pointer text-red-500">
        <MdAutoDelete />
      </span>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Application - SyncWorks</title>
      </Helmet>
      <div className="w-full flex justify-center items-center bg-white dark:bg-dark-bg dark:text-dark-text">
        <div className="w-full h-[80%] flex justify-center pb-4 items-center flex-col">
          <div className="mt-4 bg-white dark:bg-neutral-900 flex flex-col items-center md:p-7 lg:p-8 rounded-lg">
            <h2 className="font-extrabold text-lg md:text-2xl lg:text-4xl text-center">
              Manage Your
              <span className="ml-2 text-sky-700 to-slate-700 dark:border border-neutral-800 shadow-[inset_0px_0px_7px_0px_#D3D3D3] dark:shadow-none">
                Applications
              </span>
            </h2>
          </div>

          {loading ? (
            <p>
              <>
                <Loading />
              </>
            </p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Table
              data={templates}
              columns={columns}
              renderActions={renderActions}
            />
          )}
        </div>
      </div>
      {isUserModalVisible && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setIsUserModalVisible(false)}
        />
      )}
    </>
  );
};

export default Applications;
