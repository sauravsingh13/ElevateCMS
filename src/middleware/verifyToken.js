import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function verifyToken(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return { error: { error: 'Unauthorized: Token missing' }, status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

    return { userId: decoded.userId };
  } catch (error) {
    return { error: { error: 'Unauthorized: Invalid token' }, status: 403 };
  }
}