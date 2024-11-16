import React, { useEffect, useState } from "react";
import Table from "../../components/common/Table";
import { Helmet } from "react-helmet";
import { commonRequest } from "../../common/api";
import { config } from "../../common/configurations";
import CreateTemplate from "../../components/admin/template/CreateTemplate";
import Loading from "../../components/common/Loading";

const Applications: React.FC = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchTemplates = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await commonRequest("GET", "/templates", null, config);
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

  //   const handleCreateTemplate = () => {
  //     setShowModal(true);
  //   };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const columns = [
    { label: "Name", accessor: "title" },
    { label: "Status", accessor: "createdAt" },
    { label: "Date", accessor: "version" },
    { label: "Last Modified", accessor: "updatedAt" }
  ];

  const renderActions = () => (
    <>
      <span className="cursor-pointer text-blue-500">View</span>
      <span className="ml-2 cursor-pointer text-red-500">Delete</span>
    </>
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
          {/* <div className="flex justify-end w-full md:w-[80%] mt-4 mb-4">
            <button
              className="bg-syncworks-blue text-white rounded-lg px-2 py-2 mr-3"
              onClick={handleCreateTemplate}
            >
              Create Template
            </button>
          </div> */}

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
      {showModal && (
        <CreateTemplate
          onClose={handleCloseModal}
          onTemplateCreated={fetchTemplates}
        />
      )}
    </>
  );
};

export default Applications;
