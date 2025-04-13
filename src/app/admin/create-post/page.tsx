// src/components/CreatePost.jsx
"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const postData = { title, content };
    console.log('Submitting:', postData);
    // Add your API call here
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 mb-4 rounded"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div data-color-mode="light">
          <MDEditor value={content || ''} onChange={(value: string | undefined) => setContent(value || '')} />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
