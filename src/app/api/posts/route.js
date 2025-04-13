// app/api/posts/route.js
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();

  try {
    const { title, content } = await request.json();
    const slug = slugify(title, { lower: true });
    const newPost = await Post.create({ title, content, slug });
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// Optional: Explicitly define supported methods
export const dynamic = 'force-dynamic'; // If you need dynamic behavior