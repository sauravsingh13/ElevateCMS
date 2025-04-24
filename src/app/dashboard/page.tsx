"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostModal from "@/components/CreatePostModal";
import Header from "@/components/Header";
import Image from "next/image";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function Dashboard() {
  const [posts, setPosts] = useState<{
    _id: string;
    title: string;
    thumbnail?: string;
    published: boolean;
    type: string;
    likes: number;
    dislikes: number;
    views: number;
    publishedAt?: string;
  }[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTemplate, setNewTemplate] = useState("");
  const router = useRouter();

  const fetchPosts = async () => {
    const res = await fetch("/api/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.status === 401 || res.status === 403) {
      router.push('/');
      return;
    }

    const data = await res.json();
    if (Array.isArray(data)) {
      setPosts(data);
    } else {
      setPosts([]);
      console.error("Unexpected response format:", data);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/posts?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setPosts((prev) => prev.filter((post) => post._id !== id));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const name = typeof window !== "undefined" ? localStorage.getItem("name") || "" : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      <Header title="Dashboard" />
      <main className="p-6">
        <section className="max-w-7xl mx-auto mt-2 overflow-auto" style={{ height: "85vh" }}>
          <div className="flex justify-between items-center mb-6">
            {posts.length > 0 && (
              <h2 className="text-2xl font-semibold text-gray-800">Your Posts</h2>
            )}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              + Create New
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post._id} className="bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <Image
                  src={post.thumbnail || "/no-image.jpg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-1 px-4">{post.title}</h3>
                <div className="mt-2 flex justify-evenly gap-2 px-4">
                  <button
                    className="text-sm text-white bg-slate-700 hover:bg-slate-800 px-4 py-1.5 rounded-md"
                    onClick={() => router.push(`/dashboard/edit/${post._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-white bg-neutral-500 hover:bg-neutral-600 px-4 py-1.5 rounded-md"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-md flex items-center justify-between gap-2">
                    <span className={`${post.published ? "text-green-600" : "text-yellow-500"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <ThumbUpIcon fontSize="small" className="text-gray-500" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbDownIcon fontSize="small" className="text-gray-500" />
                        <span>{post.dislikes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <VisibilityIcon fontSize="small" className="text-gray-500" />
                        <span>{post.views}</span>
                      </div>
                  </div>
                  {post.published && (
                    <div>
                      <button
                        onClick={() => {
                          const blogLink = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/blog/${post._id}`;
                          navigator.clipboard.writeText(blogLink);
                          alert("Link copied to clipboard!");
                        }}
                        title="Copy blog link"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ContentCopyIcon fontSize="small" className="mr-1" />
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
                {post.publishedAt && (
                  <p className="text-sm text-gray-500">
                    Published: {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 text-center">
              <Image
                src="/logo.png"
                alt="ElevateCMS Logo"
                width={300}
                height={300}
                className="mb-4 opacity-40"
              />
              <p className="text-2xl md:text-3xl font-bold text-indigo-600 animate-bounce transition-all duration-500 ease-in-out">Generate your Gen AI-powered blog today!</p>
            </div>
          )}

          {showCreateModal && (
            <CreatePostModal
              newTitle={newTitle}
              setNewTemplate={setNewTemplate}
              onClose={() => setShowCreateModal(false)}
            />
          )}
        </section>
      </main>
    </div>
  );
}
