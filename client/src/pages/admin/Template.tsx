import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../components/common/Loading";
import { commonRequest } from "../../common/api";
import { config } from "../../common/configurations";
import { useNavigate } from "react-router-dom";

const Template: React.FC = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workflowid, setWorkflowId] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await commonRequest(
          "GET",
          "/workflows/latest",
          null,
          config
        );
        if (!response.success) {
          throw new Error("Failed to fetch templates");
        }
        setSteps(response.data.steps || []);
        setWorkflowId(response.data._id);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleStepClick = async (step: any, workflowId: string) => {
    navigate(`/admin/template/${step._id}`, {
      state: { workflowId, title: step.title },
    });
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Templates | SyncWorks</title>
      </Helmet>
      <section className="w-full dark:bg-dark-bg pt-7 px-3 flex flex-col items-center">
        <div className="w-full md:w-[900px] rounded-xl mt-9 flex flex-col items-center">
          <div className="mt-4 bg-white dark:bg-neutral-900 flex flex-col items-center md:p-7 lg:p-8 rounded-lg">
            <h2 className="font-extrabold text-lg md:text-2xl lg:text-4xl text-center">
              Manage Your
              <span className="ml-2 text-sky-700 to-slate-700 dark:border border-neutral-800 shadow-[inset_0px_0px_7px_0px_#D3D3D3] dark:shadow-none">
                Templates
              </span>
            </h2>
            <h4 className="text-gray-400 text-sm dark:text-neutral-300 mt-3">
              Click the Template Box to proceed further
            </h4>
          </div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : steps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {steps.map((step: any) => (
                <div
                  key={step._id}
                  className="p-4 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 cursor-pointer min-h-[150px] flex flex-col justify-center shadow-lg"
                  onClick={() => handleStepClick(step, workflowid)}
                >
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    <span className="rounded-full bg-syncworks-blue p-1 text-white ">
                      Step {step.order}
                    </span>{" "}
                    {step.title}
                  </h2>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              No steps available
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Template;
