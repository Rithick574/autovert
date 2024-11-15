import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { commonRequest } from "../../common/api";
import { config } from "../../common/configurations";
import toast from "react-hot-toast";
import { initialSteps } from "../../constants/constants";

const WorkflowEditor = () => {
  const [steps, setSteps] = useState(initialSteps);
  const [newStepName, setNewStepName] = useState("");
  const [newStepType, setNewStepType] = useState("");

  useEffect(() => {
    const fetchWorkflowSteps = async () => {
      try {
        const response = await commonRequest(
          "GET",
          "/workflows/latest",
          null,
          config
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workflow steps");
        }
        const data = await response.json();
        setSteps(data.steps);
        if (data.steps && data.steps.length > 0) {
          setSteps(data.steps);
        } else {
          setSteps(initialSteps);
        }
      } catch (error) {
        console.log(error);
        setSteps(initialSteps);
      }
    };
    fetchWorkflowSteps();
  }, []);

  const addStep = async () => {
    if (newStepName.trim() === "" || newStepType.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const newStep = {
      id: (steps.length + 1).toString(),
      stepName: (steps.length + 1).toString(),
      stepType: newStepType,
    };

    setSteps((prevSteps) => [...prevSteps, newStep]);
    setNewStepName("");
    setNewStepType("");
  };

  const saveWorkflow = async () => {
    const updatedSteps = steps.map((step, index) => ({
      ...step,
      stepName: (index + 1).toString(),
    }));
    const workflowData = {
      name: "Integrated_System",
      description: "Description of the workflow",
      steps: updatedSteps,
    };

    try {
      const response = await commonRequest(
        "POST",
        "/workflows",
        JSON.stringify(workflowData),
        config
      );

      if (!response.ok) {
        toast("Failed to create workflow");
        throw new Error("Failed to create workflow");
      }

      const savedWorkflow = await response.json();
      if (savedWorkflow) {
        toast("Workflow created successfully!");
      }
      setSteps(initialSteps);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const removeStep = (id: string) => {
    const updatedSteps = steps.filter((step) => step.id !== id);
    const reorderedSteps = updatedSteps.map((step, index) => ({
      ...step,
      stepName: (index + 1).toString(),
    }));
    setSteps(reorderedSteps);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedSteps = Array.from(steps);
    const [removed] = reorderedSteps.splice(result.source.index, 1);
    reorderedSteps.splice(result.destination.index, 0, removed);
    const updatedSteps = reorderedSteps.map((step, index) => ({
      ...step,
      stepName: (index + 1).toString(),
    }));

    setSteps(updatedSteps);
  };

  return (
    <div className="w-full pt-3 px-3 flex justify-center items-center bg-white dark:bg-dark-bg dark:text-dark-text mt-16">
      <div className="w-full h-[80%] flex justify-center pb-4 items-center flex-col">
        <div className="bg-white dark:bg-neutral-900 flex flex-col items-center md:p-7 lg:p-9 rounded-xl shadow-md">
          <h2 className="mb-6 md:mb-10 font-extrabold text-lg md:text-2xl lg:text-4xl text-center">
            Drag and Drop to Edit the Latest
            <span className="ml-2 text-sky-700 to-slate-700 dark:border border-neutral-800 shadow-[inset_0px_0px_7px_0px_#D3D3D3] dark:shadow-none">
              Workflow
            </span>
          </h2>
          <div className="flex flex-col mb-4 p-2 md:p1">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Step Name"
                value={newStepName}
                onChange={(e) => setNewStepName(e.target.value)}
                className="bg-slate-100 p-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Step Type"
                value={newStepType}
                onChange={(e) => setNewStepType(e.target.value)}
                className="bg-slate-100 p-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
              />
              <button
                onClick={addStep}
                className="bg-sky-600 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200 w-full md:w-auto"
              >
                Add Step
              </button>
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-wrap overflow-x-auto p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-inner"
                >
                  {steps.map((step, index) => (
                    <Draggable
                      key={step.id}
                      draggableId={step.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white dark:bg-neutral-700 border dark:border-neutral-600 rounded-lg shadow-md p-4 flex-none relative w-full md:max-w-[250px] h-48 flex items-center justify-center"
                          style={{
                            ...provided.draggableProps.style,
                            minWidth: "200px",
                            width: "100%",
                            maxWidth: "240px",
                            height: "200px",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "10px",
                          }}
                        >
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <span className="bg-neutral-500 rounded-full w-10 h-10 flex items-center justify-center text-white">
                              {step.stepName}
                            </span>
                            <div className="text-xl dark:text-gray-300">
                              {step.stepType}
                            </div>
                          </div>
                          <button
                            onClick={() => removeStep(step.id)}
                            className="relative bottom-20 left-2 bg-blue-600 text-white rounded-full p-1"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  <div>{provided.placeholder}</div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button
            onClick={saveWorkflow}
            className="mt-4 bg-sky-600 to-slate-700 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200 w-full md:w-auto"
          >
            Save Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;
