import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbconnect';
import User from '@/models/user';

export async function POST(request) {
  await dbConnect();
  const { email, password, isSignup } = await request.json();

  try {
    let user = await User.findOne({ email });

    if (isSignup) {
      if (user) return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      user = await User.create({ email, password });
      return NextResponse.json({ message: 'User created', user });
    } else {
      if (!user || user.password !== password)
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      return NextResponse.json({ message: 'Login successful', user });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
