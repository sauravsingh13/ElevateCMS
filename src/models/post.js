import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: false },
    author: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
