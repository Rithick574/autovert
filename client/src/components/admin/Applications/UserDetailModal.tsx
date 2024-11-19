import { FC } from "react";
import { IUser } from "../../../constants/types/IAuth";

interface UserDetailModalProps {
  user: IUser;
  onClose: () => void;
}

const UserDetailModal: FC<UserDetailModalProps> = ({ user, onClose }) => {
  const isPdfLink = (value: string) => {
    return value?.startsWith("http") && value.endsWith(".pdf");
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-800 dark:text-dark-text p-6 rounded-lg shadow-lg w-[90%] max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="font-extrabold text-lg md:text-2xl lg:text-3xl mb-6 text-center">
          User Details
        </h2>

        <div className="mb-4">
          <p className="text-md">
            <strong>Name:</strong> {user.firstname}
          </p>
          <p className="text-md">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-md">
            <strong>Onboarding Date:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>

        <h3 className="text-lg font-bold mb-4">Onboarding Data:</h3>
        {user.onboardingData.length > 0 ? (
          user.onboardingData.map((onboarding, index) => (
            <div
              key={onboarding._id || index}
              className="mb-6 border-t pt-4 border-gray-300 dark:border-neutral-700"
            >
              <h4 className="text-md font-semibold mb-3 text-sky-700">
                Workflow ID: {onboarding.workflowId}
              </h4>
              {onboarding.steps.map((step) => (
                <div
                  key={step._id}
                  className="mb-4 p-4 border rounded-lg bg-gray-100 dark:bg-neutral-800"
                >
                  <h5 className="text-sm font-bold text-blue-600 mb-2">
                    Step: {step.stepName}
                  </h5>
                  {step.fields.length > 0 ? (
                    <ul className="ml-4 list-disc">
                      {step.fields.map((field) => (
                        <li key={field._id} className="text-sm">
                          <strong>{field.fieldName}:</strong>{" "}
                          {isPdfLink(field.value) ? (
                            <a
                              href={field.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 no-underline bg-"
                            >
                              View 
                            </a>
                          ) : (
                            field.value || "N/A"
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic">No fields available</p>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-sm italic">No onboarding data available.</p>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-700 text-white rounded-lg shadow-md hover:bg-sky-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
