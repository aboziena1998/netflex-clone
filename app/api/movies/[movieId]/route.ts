import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prismadb = new PrismaClient();

export const GET = async (req: Request) => {
  if (req.method !== 'GET')
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 405,
    });

  try {
    const movieId = req.url.slice(req.url.lastIndexOf('/') + 1) as string;

    if (typeof movieId !== 'string') {
      throw new Error('Invalid ID');
    }
    if (!movieId) throw new Error('Invalid ID');

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) throw new Error('Invalid ID');
    return new NextResponse(JSON.stringify(movie), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), {
      status: 400,
    });
  }
};
