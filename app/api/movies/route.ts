import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';

export const GET = async (req: Request) => {
  if (req.method !== 'GET')
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 405,
    });

  try {
    const session = await getServerSession(options);

    const movies = await prismadb.movie.findMany();

    console.log(movies);

    return new NextResponse(JSON.stringify(movies), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 400,
    });
  }
};
