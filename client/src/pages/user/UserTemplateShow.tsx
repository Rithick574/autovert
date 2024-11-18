import React, { useEffect, useState } from "react";
import { Timeline } from "../../components/ui/timeline";
import { commonRequest } from "../../common/api";
import { config } from "../../common/configurations";
import Loading from "../../components/common/Loading";
import { useLocation } from "react-router-dom";
import { setLocalStorageItem } from "../../lib/localStorageUtils";

const UserTemplateShow: React.FC = () => {
  const [workflow, setWorkflow] = useState<any>(null);
  const location = useLocation();
  const { userId } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const response = await commonRequest(
          "GET",
          "/onboarding/active-latest",
          config
        );
        setWorkflow(response.data.steps);
        setLocalStorageItem("workflowID", response.data._id);
        setLocalStorageItem("userId", userId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load workflow"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, []);

  const data = workflow
    ? workflow.map((step: any) => ({
        title: step.title,
        content: (
          <div>
            <p className="text-neutral-800 dark:text-syncworks-blue text-xs md:text-sm font-medium mb-8">
              Step Order: {step.order}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <img
                  key={num}
                  src={`https://assets.aceternity.com/templates/startup-${num}.webp`}
                  alt={`startup template ${num}`}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
              ))}
            </div>
          </div>
        ),
      }))
    : [];

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full">
          <Timeline data={data} />
        </div>
      )}
    </div>
  );
};

export default UserTemplateShow;
