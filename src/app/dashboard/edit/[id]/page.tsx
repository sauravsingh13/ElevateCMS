"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Editor from "@/components/Editor";
import Header from "@/components/Header";

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
    <main className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100 w-full">
      <Header title="Editor"  />
        <div className="w-full mt-10">
          <Editor content={content} title={title} id={Array.isArray(id) ? id[0] : id || ""}/>
      </div>
    </main>
  );
}