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

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return new NextResponse(JSON.stringify(randomMovies[0]), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 400,
    });
  }
};
