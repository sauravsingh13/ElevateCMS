import dbConnect from "@/utils/dbconnect";
import Post from '@/models/post';
import slugify from 'slugify';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/middleware/verifyToken';

export async function POST(request) {
  await dbConnect();

  try {
    const { userId, error } = await verifyToken(request);
    if (error) return NextResponse.json(error, { status: error.status });

    const data = await request.json();
    const {
      title,
      content,
      published,
      author,
      publishedAt,
      tags,
      images,
      type,
      likes,
      dislikes,
      thumbnail,
      commentsCount,
      views,
      comments
    } = data;

    const slug = slugify(title, { lower: true });

    const newPost = await Post.create({
      userID: userId,
      slug,
      title,
      content,
      published,
      author,
      publishedAt,
      tags,
      images,
      type,
      likes,
      dislikes,
      thumbnail,
      commentsCount,
      views,
      comments
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await dbConnect();

  try {
    const { userId, error } = await verifyToken(request);
    console.log(error)
    if (error) return NextResponse.json(error, { status: error.status });

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    let query = { userID: userId };

    if (slug) {
      query.slug = slug;
    } else if (id) {
      query._id = id;
    } else {
      // If no slug or id, return all posts
      const posts = await Post.find({ userID: userId }).sort({ createdAt: -1 });
      return NextResponse.json(posts);
    }

    const post = await Post.findOne(query);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch post(s)' }, { status: 500 });
  }
}

// New DELETE handler to delete a post
export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { userId, error, } = await verifyToken(request);
    if (error) return NextResponse.json(error, { status: error.status });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    const post = await Post.findOneAndDelete({ _id: id, userID: userId });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    return NextResponse.json({ message: 'Post deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

// New PUT handler to update a post
export async function PUT(request) {
  await dbConnect();
  try {
    const { userId, error } = await verifyToken(request);
    if (error) return NextResponse.json(error, { status: error.status });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Post ID is required" }, { status: 400 });

    const update = await request.json();

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, userID: userId },
      update,
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function PATCH(request) {
  return PUT(request);
}

// Optional: Explicitly define supported methods
export const dynamic = 'force-dynamic';