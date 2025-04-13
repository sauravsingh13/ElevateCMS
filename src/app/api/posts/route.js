// app/api/posts/route.js
import dbConnect from "../../../utils/dbconnect";
import Post from '../../../models/post';
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

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// Optional: Explicitly define supported methods
export const dynamic = 'force-dynamic'; // If you need dynamic behavior