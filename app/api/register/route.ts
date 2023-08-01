import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prismadb = new PrismaClient();

export async function POST(req: Request) {
  console.log('here');
  if (req.method !== 'POST') {
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 405,
    });
  }
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: 'Email taken' }), {
        status: 402,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: 'error', message: error }),
      { status: 500 }
    );
  }
}
