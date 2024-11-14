import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "../../components/reactflow/nodes";
import { initialEdges, edgeTypes } from "../../components/reactflow/edges";

interface Step {
  id: string;
  type: string;
  label: string;
}

const Workflow: React.FC = () => {
  const [workflowName, setWorkflowName] = useState<string>("");
  const [workflowType, setWorkflowType] = useState<string>("sequential");
  const [steps, setSteps] = useState<Step[]>([]);

  const handleWorkflowNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkflowName(e.target.value);
  };

  const handleWorkflowTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWorkflowType(e.target.value);
  };

  const handleAddStep = () => {
    const newStep: Step = {
      id: `step-${steps.length + 1}`,
      type: "default",
      label: `Step ${steps.length + 1}`,
    };
    setSteps((prevSteps) => [...prevSteps, newStep]);
  };

  const handleCreateWorkflow = async () => {
    const newWorkflow = {
      name: workflowName,
      type: workflowType,
      steps: steps,
    };

    try {
      await axios.post("/api/workflows/create", newWorkflow);
      alert("Workflow created successfully!");
    } catch (error) {
      console.error("Error creating workflow", error);
      alert("Error creating workflow!");
    }
  };

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Workflow</h1>

      <div className="mb-4">
        <label
          htmlFor="workflowName"
          className="block text-sm font-medium text-gray-700"
        >
          Workflow Name
        </label>
        <input
          type="text"
          id="workflowName"
          name="workflowName"
          value={workflowName}
          onChange={handleWorkflowNameChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter workflow name"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="workflowType"
          className="block text-sm font-medium text-gray-700"
        >
          Workflow Type
        </label>
        <select
          id="workflowType"
          name="workflowType"
          value={workflowType}
          onChange={handleWorkflowTypeChange}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="sequential">Sequential</option>
          <option value="parallel">Parallel</option>
          <option value="conditional">Conditional</option>
        </select>
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddStep}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Step
        </button>
      </div>

      <div className="bg-gray-100 p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Steps</h2>
        <div style={{ height: "400px", width: "100%" }}>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={handleCreateWorkflow}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Create Workflow
        </button>
      </div>
    </div>
  );
};

export default Workflow;
