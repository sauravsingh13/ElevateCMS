"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Editor from "@/components/Editor";

export default function EditPostPage() {
  const params = useParams();
  const id = params?.id;
  const [title, setTitle] = useState(`Post Title ${id}`);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts?id=${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const post = await res.json();
        setTitle(post.title);
        setContent(post.content);
        setStatus(post.published ? "Published" : "Draft");
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    };
    if (id) fetchPost();
  }, [id]);

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-100">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <Editor content={content} title={title} id={Array.isArray(id) ? id[0] : id || ""}/>

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