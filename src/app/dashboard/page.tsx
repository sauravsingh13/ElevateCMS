"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Welcome Post", status: "Published" },
    { id: 2, title: "Draft Idea", status: "Draft" },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTemplate, setNewTemplate] = useState("");
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6">
      <header className="flex justify-between items-center max-w-7xl mx-auto bg-white/70 backdrop-blur px-6 py-4 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button className="text-sm bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition">
          Logout
        </button>
      </header>

      <section className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Posts</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-md shadow-sm transition"
          >
            + Create New
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/95 backdrop-blur border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
              <p className={`mt-2 text-sm font-medium ${post.status === "Published" ? "text-green-600" : "text-yellow-500"}`}>
                {post.status}
              </p>
              <div className="mt-4 flex gap-2">
                <button className="text-sm text-white bg-slate-700 hover:bg-slate-800 px-4 py-1.5 rounded-md">Edit</button>
                <button className="text-sm text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded-md">Publish</button>
                <button className="text-sm text-white bg-neutral-500 hover:bg-neutral-600 px-4 py-1.5 rounded-md">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/30">
            <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl p-6 shadow-xl w-full max-w-md animate-fade-in">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Create New Post</h2>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                type="text"
                placeholder="Post Title"
                className="w-full mb-4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newTemplate}
                onChange={(e) => setNewTemplate(e.target.value)}
                className="w-full mb-4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Template</option>
                <option value="blog">Blog Template</option>
                <option value="doc">Documentation Template</option>
                <option value="custom">Custom Layout</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-sm text-gray-500 hover:text-blue-600 transition underline"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const newId = posts.length + 1;
                    const newPost = { id: newId, title: newTitle || `Untitled ${newId}`, status: "Draft", template: newTemplate };
                    setPosts([...posts, newPost]);
                    setShowCreateModal(false);
                    setNewTitle("");
                    setNewTemplate("");
                    router.push(`/dashboard/edit/${newId}`);
                  }} 
                  className="text-sm bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-md shadow-sm transition"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
