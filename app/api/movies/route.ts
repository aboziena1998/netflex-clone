import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export const GET = async (req: Request) => {
  if (req.method !== 'GET')
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 405,
    });

  try {
    const movies = await prismadb.movie.findMany();

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
