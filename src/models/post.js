import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: false },
    author: { type: String },
    publishedAt: { type: Date },
    tags: [{ type: String }],
    images: { type: String },
    type: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    thumbnail: { type: String },
    commentsCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
