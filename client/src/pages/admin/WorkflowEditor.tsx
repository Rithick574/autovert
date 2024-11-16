import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { commonRequest } from "../../common/api";
import { config } from "../../common/configurations";
import toast from "react-hot-toast";
import { initialSteps } from "../../constants/constants";

type Step = {
  _id: string;
  order: string | string;
  title: string;
};

const WorkflowEditor = () => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchWorkflowSteps = async () => {
      try {
        const response = await commonRequest(
          "GET",
          "/workflows/latest",
          null,
          config
        );
        if (!response.success) {
          throw new Error("Failed to fetch workflow steps");
        }
        const formattedSteps = response.data.steps.map((step: any) => ({
          ...step,
          order: step.order.toString(),
        }));
        setSteps(
          formattedSteps && formattedSteps.length > 0
            ? formattedSteps
            : initialSteps
        );
      } catch (error) {
        console.log(error);
        setSteps(initialSteps);
      }
    };
    fetchWorkflowSteps();
  }, []);

  const addStep = async () => {
    if (newTitle.trim() === "") {
      toast("Please fill the fields");
      return;
    }

    const newStep = {
      _id: (steps.length + 1).toString(),
      order: (steps.length + 1).toString(),
      title: newTitle,
    };

    setSteps((prevSteps) => [...prevSteps, newStep]);
    setNewTitle("");
  };

  const saveWorkflow = async () => {
    const updatedSteps = steps.map(({ _id, ...rest }, index) => ({
      ...rest,
      order: (index + 1),
    }));
    const workflowData = {
      description: "A workflow for onboarding new users",
      steps: updatedSteps,
    };

    try {
      const response = await commonRequest(
        "POST",
        "/workflows",
        workflowData,
        config
      );

      if (!response.response.data.success) {
        toast.error(response.response.data.message);
        return;
      }
      toast.success("Workflow created successfully!");
      setSteps(response.data.steps);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const removeStep = (_id: string) => {
    const updatedSteps = steps.filter((step) => step._id !== _id);
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
      order: (index + 1).toString(),
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
                placeholder="Step Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-slate-100 p-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500 w-96"
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
                  className="flex flex-wrap overflow-x-auto p-4 bg-gray-100 dark:bg-neutral-800 dark:shadow-[0px_0px_12px_0px_#000000] rounded-lg shadow-inner" 
                  style={{ gap: "18px" }} 
                >
                  {steps.map((step, index) => (
                    <Draggable
                      key={step._id}
                      draggableId={step._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white dark:bg-neutral-700 border dark:shadow-[0px_0px_12px_0px_#171717] dark:border-neutral-600 rounded-lg shadow-md p-4 flex-none relative w-full md:max-w-[250px] h-48 flex items-center justify-center"
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
                          }}
                        >
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <span className="bg-neutral-500 rounded-full w-10 h-10 flex items-center justify-center text-white">
                              {step.order}
                            </span>
                            <div className="text-xl dark:text-gray-300">
                              {step.title}
                            </div>
                          </div>
                          <button
                            onClick={() => removeStep(step._id)}
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
