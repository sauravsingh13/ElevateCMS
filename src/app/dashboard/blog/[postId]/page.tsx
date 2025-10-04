// File: /src/app/dashboard/blog/[postId]/page.tsx
import { notFound } from "next/navigation";
import { type Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

interface BlogPageParams {
  postId: string;
}

export default async function BlogPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const { postId } = resolvedParams;
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(
    `${baseUrl}/api/blog/${postId}`
  );
  if (!res.ok) return notFound();

  const html = await res.text();

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose max-w-4xl mx-auto p-4 bg-white rounded shadow"
    />
  );
}
