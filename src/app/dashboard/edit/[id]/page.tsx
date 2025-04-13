"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Editor from "@/components/Editor";

export default function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState(`Post Title ${id}`);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-100">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <Editor />

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setStatus("Draft")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-sm transition"
            >
              Save as Draft
            </button>
            <button
              onClick={() => setStatus("Published")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md text-sm transition"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}