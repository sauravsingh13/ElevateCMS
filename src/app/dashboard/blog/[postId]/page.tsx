// File: /src/app/dashboard/blog/[postId]/page.tsx
import { notFound } from 'next/navigation';
import { type Metadata, ResolvingMetadata } from 'next';

interface BlogPageParams {
  postId: string;
}

export default async function BlogPage({ params }: { params: any }) {
    const resolvedParams = await params;
    const { postId } = resolvedParams;
      const res = await fetch(`/api/blog/${postId}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) return notFound();

  const html = await res.text();

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose max-w-4xl mx-auto p-4 bg-white rounded shadow"
    />
  );
}