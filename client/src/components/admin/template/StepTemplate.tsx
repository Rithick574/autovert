import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { commonRequest } from "../../../common/api";
import { config } from "../../../common/configurations";
import Loading from "../../common/Loading";
import { RiFileAddFill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { IField } from "../../../constants/types/ITemlate";
import toast from "react-hot-toast";

const StepTemplate: React.FC = () => {
  const { stepId } = useParams<{ stepId?: string }>();
  const location = useLocation();
  const { workflowId, title } = location.state || {};
  console.log("🚀 ~ file: StepTemplate.tsx:16 ~ title:", title)
  const [fields, setFields] = useState<IField[]>([]);
  const [templateExists, setTemplateExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingField, setEditingField] = useState<IField | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");

  useEffect(() => {
    const fetchTemplate = async () => {
      setLoading(true);
      try {
        const response = await commonRequest(
          "GET",
          `/templates/${stepId}`,
          null,
          config
        );
        if (response.success && response.data.fields.length > 0) {
          setFields(response.data.fields || []);
          setTemplateExists(true);
          setStep(response.data.title || null);
        } else {
          setFields([]);
          setTemplateExists(false);
        }
      } catch (error) {
        console.error(error);
        setFields([]);
        setTemplateExists(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [stepId]);

  const handleAddField = () => {
    setEditingField({
      _id: "",
      name: "",
      type: "text",
      required: false,
      placeholder: "",
      description: "",
      options: [],
    });
    setModalMode("create");
    setShowModal(true);
  };

  const handleUpdateField = (field: IField) => {
    setEditingField(field);
    setModalMode("update");
    setShowModal(true);
  };

  const handleDeleteField = async (field: IField) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the field "${field.name}"?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await commonRequest(
        "DELETE",
        `/fields/${field._id}/${stepId}`,
        config
      );

      if (response.success) {
        toast.success("Field deleted successfully");
        setFields((prevFields) =>
          prevFields.filter((existingField) => existingField._id !== field._id)
        );
      } else {
        toast.error("Failed to delete field");
      }
    } catch (error) {
      console.error("API call error:", error);
      toast.error("An error occurred while deleting the field");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingField) {
      try {
        let response: any;
        if (modalMode === "create") {
          response = await commonRequest(
            "POST",
            "/fields",
            editingField,
            config
          );
          if (response.success) {
            toast.success("Field created successfully");
            setFields((prevFields) => [...prevFields, response.data[0]]);
          } else {
            toast.error("Failed to create field");
          }
        } else if (modalMode === "update") {
          response = await commonRequest(
            "POST",
            `/fields`,
            editingField,
            config
          );
          console.log("🚀 ~ file: StepTemplate.tsx:125 ~ handleSubmit ~ response:", response)
          if (response.success) {
            toast.success("Field updated successfully");
            setFields((prevFields) =>
              prevFields.map((field) =>
                field._id === editingField._id ? response.data : field
              )
            );
          } else {
            toast.error("No new fields to add");
          }
        }
      } catch (error) {
        console.error("API call error:", error);
      } finally {
        setShowModal(false);
      }
    }
  };

  const updateField = <T extends keyof IField>(key: T, value: IField[T]) => {
    setEditingField((prev) =>
      prev
        ? {
            ...prev,
            [key]: value,
          }
        : null
    );
  };

  const handleCreateTemplate = async () => {
    try {
      const fieldIds = fields.map((field) => field._id);
      const response = await commonRequest(
        "POST",
        "/templates",
        { stepId, fields: fieldIds, workflowId, title },
        config
      );
      if (response.success) {
        toast.success("Template created successfully");
        setTemplateExists(true);
      } else {
        toast.error("Failed to create template");
      }
    } catch (error) {
      console.error("API call error:", error);
      toast.error("An error occurred while creating the template");
    }
  };

  const handleUpdateTemplate = async () => {
    if (fields.length === 0) {
      toast.error("Please add new fields before updating the template.");
      return;
    }
    try {
      const response = await commonRequest(
        "POST",
        `/templates/${stepId}`,
        { fields: fields.map((field) => field._id) },
        config
      );
      if (response.success) {
        toast.success("Template updated with new fields!");
      } else {
        toast.error(response.data.message || "Failed to update template");
      }
        console.log("🚀 ~ file: StepTemplate.tsx:201 ~ handleUpdateTemplate ~ response:", response)
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("An error occurred while updating the template.");
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <section className="w-full dark:bg-dark-bg pt-7 px-3 flex flex-col items-center">
      <div className="w-full md:w-[900px] rounded-xl mt-9 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {templateExists
            ? `Fields for Template in Step`
            : `Create Fields for New Template : ${title}`}
          <span className="ml-2 text-sky-700 to-slate-700 dark:border border-neutral-800 shadow-[inset_0px_0px_7px_0px_#D3D3D3] dark:shadow-none">
            {step}
          </span>
        </h2>
        <div className="flex justify-end w-full mt-4 mb-4">
          <button
            onClick={handleAddField}
            className="bg-syncworks-blue text-white rounded-lg py-3 px-3"
          >
            <RiFileAddFill />
          </button>
        </div>
        <div className="grid gap-4 w-full">
          {fields.map((field) => (
            <div
              key={field._id}
              className="p-3 border mb-2 border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg dark:text-white">
                  {field.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Type: {field.type}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateField(field)}
                  className="bg-syncworks-blue text-white py-2 px-3 rounded-lg"
                >
                  <RxUpdate />
                </button>
                <button
                  onClick={() => handleDeleteField(field)}
                  className="dark:bg-neutral-900 bg-neutral-700 text-white py-2 px-3 rounded-lg"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
        {!templateExists && fields.length > 0 && (
          <button
            onClick={handleCreateTemplate}
            className="bg-green-600 text-white rounded-lg py-2 px-4 mt-4"
          >
            Create Template
          </button>
        )}
        {templateExists && fields.length > 0 && (
          <button
            onClick={handleUpdateTemplate}
            className="bg-blue-600 text-white rounded-lg py-2 px-4 mt-4"
          >
            Update Template with New Fields
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-[90%] md:w-[500px]">
            <h2 className="text-lg font-bold mb-4 dark:text-white">
              {modalMode === "create" ? "Add New Field" : "Update Field"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-white mb-2"
                  htmlFor="name"
                >
                  Field Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-600"
                  value={editingField?.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-white mb-2"
                  htmlFor="type"
                >
                  Field Type
                </label>
                <select
                  id="type"
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-600"
                  value={editingField?.type || ""}
                  onChange={(e) =>
                    updateField("type", e.target.value as IField["type"])
                  }
                  required
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="email">Email</option>
                  <option value="select">Select</option>
                  <option value="textarea">Textarea</option>
                  <option value="file">File</option>
                </select>
              </div>
              {editingField?.type === "select" && (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 dark:text-white mb-2"
                    htmlFor="options"
                  >
                    Options (comma-separated)
                  </label>
                  <input
                    id="options"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-600"
                    value={editingField?.options?.join(",") || ""}
                    onChange={(e) =>
                      updateField(
                        "options",
                        e.target.value.split(",").map((opt) => opt.trim())
                      )
                    }
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-white mb-2"
                  htmlFor="placeholder"
                >
                  Placeholder
                </label>
                <input
                  id="placeholder"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-600"
                  value={editingField?.placeholder || ""}
                  onChange={(e) => updateField("placeholder", e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-white mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-600"
                  value={editingField?.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>
              <div className="mb-4 flex items-center gap-2">
                <label className="block text-gray-700 dark:text-white mb-2">
                  Required
                </label>
                <input
                  type="checkbox"
                  checked={editingField?.required || false}
                  onChange={(e) => updateField("required", e.target.checked)}
                  className="w-4 h-4 mb-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  {modalMode === "create" ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default StepTemplate;
