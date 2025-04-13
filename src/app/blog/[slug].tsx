// pages/posts/[slug].js

import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function PostPage({ post }) {
  if (!post) {
    return <div className="p-10 text-center text-red-500">Post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <ReactMarkdown className="prose prose-lg">{post.content}</ReactMarkdown>
    </div>
  );
}

// SSR to fetch post from your own API
export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`);
    if (!res.ok) throw new Error('Post not found');

    const post = await res.json();
    return { props: { post } };
  } catch (err) {
    console.error(err);
    return { props: { post: null } };
  }
}
