import React, { useState } from "react";
import { commonRequest } from "../../../common/api";
import { config } from "../../../common/configurations";

interface CreateTemplateProps {
  onTemplateCreated: (newTemplate: {
    id: string;
    title: string;
    content: string;
  }) => void;
  onClose: () => void;
}

const CreateTemplate: React.FC<CreateTemplateProps> = ({
  onTemplateCreated,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await commonRequest(
        "POST",
        "/templates",
        { title, content },
        config
      );
      const newTemplate = { id: response.data.id, title, content };
      onTemplateCreated(newTemplate);
      setTitle("");
      setContent("");
      onClose();
    } catch (error) {
      setError("Error creating template, please try again.");
      console.error("Error creating template:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        
        {/* Modal Container */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 relative w-[90%] md:w-[500px] z-60">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
          >
            &times;
          </button>
          
          {/* Modal Content */}
          <div className="flex flex-col justify-center items-center text-center mb-4">
            <h1 className="mb-2 font-extrabold text-2xl lg:text-3xl dark:text-dark-text">
              Create a New Template
            </h1>
            <h4 className="text-gray-400 text-sm dark:text-neutral-300">
              Fill in the details below to create a new template.
            </h4>
          </div>
          <div className="flex flex-col justify-center items-center">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Template Title"
                required
                className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Template Content"
                required
                className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-syncworks-blue text-white font-semibold p-2 rounded-lg hover:opacity-95 disabled:opacity-80 mt-4"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    Processing
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxvYWRlci1waW53aGVlbCI+PHBhdGggZD0iTTIyIDEyYTEgMSAwIDAgMS0xMCAwIDEgMSAwIDAgMC0xMCAwIi8+PHBhdGggZD0iTTcgMjAuN2ExIDEgMCAxIDEgNS04LjcgMSAxIDAgMSAwIDUtOC42Ii8+PHBhdGggZD0iTTcgMy4zYTEgMSAwIDEgMSA1IDguNiAxIDEgMCAxIDAgNSA4LjYiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg=="
                      className="w-5 animate-spin"
                    />
                  </span>
                ) : (
                  "Create Template"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTemplate;
