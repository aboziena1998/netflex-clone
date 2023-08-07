import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  if (req.method !== 'GET')
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 405,
    });

  try {
    const session = await getServerSession(options);
    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!currentUser?.favouriteIds) {
      await prismadb?.user.update({
        where: {
          email: currentUser?.email,
        },
        data: {
          favouriteIds: { set: [] },
        },
      });
    }

    const favovriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favouriteIds || [],
        },
      },
    });

    return new NextResponse(JSON.stringify(favovriteMovies), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 400,
    });
  }
};
