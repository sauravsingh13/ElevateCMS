import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbconnect';
import Post from '@/models/post';

export async function GET(req, context) {
  try {
    await dbConnect();

    const { postId } = await context.params;
    const post = await Post.findById(postId).lean();
    console.log('Post:', post);

    if (!post || !post.published) {
      return NextResponse.json({ error: 'Post not found or unpublished' }, { status: 404 });
    }

    return new Response(post.content, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
