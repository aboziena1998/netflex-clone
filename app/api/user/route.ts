import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import prismadb from '@/lib/prismadb';

interface ReqBody {
  name: string;
  email: string;
  image: string;
}

// const prismadb = new PrismaClient();

export const POST = async (req: Request) => {
  if (req.method !== 'POST')
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 405,
    });
  try {
    const { email, image, name } = (await req.json()) as ReqBody;
    const userExisted = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (userExisted)
      return new NextResponse(
        JSON.stringify({ message: 'already got this email' }),
        {
          status: 402,
        }
      );

    const newUser = await prismadb.user.create({
      data: {
        name,
        email,
        image,
        favouriteIds: [],
        emailVerified: new Date(),
      },
    });

    return new NextResponse(JSON.stringify({ newUser }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({ status: 'error', message: error }),
      { status: 500 }
    );
  }
};
