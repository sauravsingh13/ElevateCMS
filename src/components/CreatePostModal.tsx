import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoopIcon from '@mui/icons-material/Loop';

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  title: string;
  content: string;
}

interface Props {
  newTitle: string;
  setNewTemplate: (template: string) => void;
  onClose: () => void;
}

export default function CreatePostModal({
  newTitle,
  setNewTemplate,
  onClose,
}: Props) {
  const [newTemplateType, setNewTemplateType] = useState<string>("");
  const [title, setTitle] = useState<string>(newTitle);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleProceed = async () => {
    try {
      const res = await fetch(`/api/templates?type=${newTemplateType}`);
      const data = await res.json();

      const blankTemplate: Template = {
        id: "blank",
        name: "Blank",
        title: "Blank Document",
        thumbnail: "/template-images/blank-thumb.jpg",
        content: "<div><h1>Start writing...</h1><p></p></div>",
      };

      setTemplates([blankTemplate, ...data]);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/30">
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <LoopIcon className="animate-spin text-indigo-600" style={{ fontSize: 48 }} />
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl p-6 shadow-xl w-full max-w-5xl animate-fade-in">
          {!templates.length ? (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Create New Post</h2>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Post Title"
                className="w-full mb-4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newTemplateType}
                onChange={(e) => setNewTemplateType(e.target.value)}
                className="w-full mb-4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Template</option>
                <option value="blog">Blog Template</option>
                <option value="doc">Documentation Template</option>
                <option value="custom">Custom Layout</option>
              </select>
              <div className="flex justify-end gap-3">
                <button onClick={onClose} className="text-sm text-gray-500 hover:text-blue-600 transition underline">Cancel</button>
                <button onClick={handleProceed} className="text-sm bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-md shadow-sm transition">Proceed</button>
              </div>
            </>
          ) : (
            <div className="flex gap-6">
              <div className="w-1/3 max-h-[60vh] overflow-y-auto pr-2 space-y-2">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => setNewTemplateType(tpl.id)}
                    className={`border rounded p-2 cursor-pointer transition hover:shadow-sm ${tpl.id === newTemplateType ? "border-blue-500" : "border-gray-300"}`}
                  >
                    <img src={tpl.thumbnail} alt={tpl.title} className="w-full h-28 object-cover rounded mb-1" />
                    <p className="text-sm font-medium text-gray-700">{tpl.title}</p>
                  </div>
                ))}
              </div>
              <div className="w-2/3 max-h-[60vh] overflow-y-auto bg-white rounded border p-4 shadow-inner">
                {templates.find((tpl) => tpl.id === newTemplateType)?.content ? (
                  <div dangerouslySetInnerHTML={{ __html: templates.find((tpl) => tpl.id === newTemplateType)?.content || "" }} />
                ) : (
                  <p className="text-sm text-gray-500">Select a template to preview</p>
                )}
              </div>
            </div>
          )}

          {templates.length > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setShowAIPrompt(true)}
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-sm transition"
              >
                Generate with AI
              </button>
              <button
                onClick={() => setTemplates([])}
                className="text-sm text-gray-500 hover:text-blue-600 transition underline"
              >
                ← Back
              </button>
              <button
                onClick={async () => {
                  try {
                    const selected = templates.find((tpl) => tpl.id === newTemplateType);
                    const res = await fetch('/api/posts', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                      body: JSON.stringify({
                        title,
                        type: newTemplateType,
                        content: selected?.content || "",
                        thumbnail: selected?.thumbnail || "",
                        published: false,
                      }),
                    });

                    const post = await res.json();
                    if (post._id) {
                      router.push(`/dashboard/edit/${post._id}`);
                      onClose();
                    }
                  } catch (err) {
                    console.error("Failed to create post:", err);
                  }
                }}
                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md shadow-sm transition"
              >
                Create
              </button>
            </div>
          )}
        </div>
      )}
      
      {showAIPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Describe Your Template</h2>
            <p className="text-sm text-gray-500 mb-4">We'll use this to generate a starting point for your post.</p>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAIPrompt(e.target.value)}
              rows={4}
              placeholder="Example: A professional blog layout with sidebar for travel stories..."
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAIPrompt(false)}
                className="text-sm text-gray-500 hover:text-blue-600 transition underline"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setLoading(true);
                  const res = await fetch('/api/genai', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ prompt: aiPrompt }),
                  });
                  const aiTemplate = await res.json();
                  setTemplates(prev => [aiTemplate, ...prev]);
                  setNewTemplateType(aiTemplate.id);
                  setShowAIPrompt(false);
                  setLoading(false);
                }}
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-sm transition"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
