import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await dbConnect();
  const { email, password, isSignup, name } = await request.json();

  try {
    let user = await User.findOne({ email });

    if (isSignup) {
      if (user) return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ email, password: hashedPassword, name });

      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '1h',
      });

      return NextResponse.json({ message: 'User created', token, user: { email: user.email, name: user.name } });
    } else {
      if (!user || !(await bcrypt.compare(password, user.password)))
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '1h',
      });
      console.log(token)
      return NextResponse.json({ message: 'Login successful', token, user: { email: user.email, name: user.name } });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Logout successful. Please remove token from client.' });
}
