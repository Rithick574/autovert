import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commonRequest } from "../../common/api";
import { config } from "../../common/configurations";
import { getLocalStorageItem } from "../../lib/localStorageUtils";
import Loading from "../../components/common/Loading";

type FormDataType = {
  [key: string]: any;
};

const UserBoardingSteps: React.FC = () => {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const workflowID = getLocalStorageItem("workflowID");

  useEffect(() => {
    const getchFields = async () => {
      setLoading(true);
      try {
        const response = await commonRequest(
          "GET",
          `/onboarding/${workflowID}`,
          config
        );
        setSteps(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getchFields();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === "file" && files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("🚀 ~ file: UserBoardingSteps.tsx:62 ~ formattedSteps ~ step:", steps)
      const formattedSteps = steps.map((step) => {
        const stepFields = step.fields.map((field: any) => ({
          fieldName: field.name, 
          value: formData[field.name] || "",
        }));
      
        return {         
          stepName: step.title,        
          fields: stepFields,   
        };
      });
  
      const onboardingData = {
        workflowId: workflowID,
        steps: formattedSteps,       
      };
      console.log("🚀 ~ file: UserBoardingSteps.tsx:82 ~ handleNext ~ onboardingData:", onboardingData)
  
      try {
        const response = await commonRequest(
          "POST",
          "/onboarding",
          onboardingData,
          config
        );
        if (response.success) {
          navigate("/user/success");
        }
      } catch (error) {
        console.error("Error saving onboarding data:", error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentFields = steps[currentStep]?.fields || [];
  const title = steps[currentStep]?.title || "";

  return (
    <div className="lg:h-[665px] mx-auto p-14 bg-white dark:bg-neutral-900">
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <h2 className="text-2xl text-syncworks-blue font-bold mb-6 mt-8">
            {title}
          </h2>
          {currentFields.map((field: any, index: number) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                {field.name}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  {field.options.map((option: string, i: number) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  id={field.name}
                  onChange={handleChange}
                  required={field.required}
                  className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-6">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="bg-syncworks-blue hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              {currentStep < steps.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserBoardingSteps;
