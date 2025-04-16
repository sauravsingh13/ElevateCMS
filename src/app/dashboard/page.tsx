"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostModal from "@/components/CreatePostModal";
import Header from "@/components/Header";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
    <Header title="Dashboard"  />
    <main className="p-6">
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
          <CreatePostModal
            newTitle={newTitle}
            // newTemplate={newTemplate}
            // setNewTitle={setNewTitle}
            setNewTemplate={setNewTemplate}
            onClose={() => setShowCreateModal(false)}
            // onCreate={(title: string, template: string) => {
            //   const newId = posts.length + 1;
            //   const newPost = { id: newId, title: title || `Untitled ${newId}`, status: "Draft", template };
            //   setPosts([...posts, newPost]);
            //   setShowCreateModal(false);
            //   setNewTitle("");
            //   setNewTemplate("");
            //   router.push(`/dashboard/edit/${newId}`);
            // }}
          />
        )}
      </section>
    </main>
    </div>
  );
}
