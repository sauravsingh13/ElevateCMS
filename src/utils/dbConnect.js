// lib/dbConnect.js
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
console.log('Connecting to MongoDB...', MONGO_URI);
if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI in your .env.local');
}

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
