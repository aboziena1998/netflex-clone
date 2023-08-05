import { NextResponse } from 'next/server';
import { without } from 'lodash';
import prismadb from '@/lib/prismadb';

import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';

// import { PrismaClient } from '@prisma/client';

// const prismadb = new PrismaClient();
const handler = async (req: Request) => {
  try {
    const session = await getServerSession(options);
    if (!session || !session.user)
      return new NextResponse(JSON.stringify({ message: 'Error' }), {
        status: 405,
      });

    const currentUser = await prismadb?.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });

    if (!currentUser) throw new Error('Invalid id');

    if (req.method === 'POST') {
      const { movieId } = await req.json();

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email as string,
        },
        data: {
          favouriteIds: {
            push: movieId,
          },
        },
      });

      return new NextResponse(JSON.stringify(user), {
        status: 200,
      });
    }

    if (req.method === 'DELETE') {
      const movieId: any = req.body;
      const updatedFavouriteIds = without(currentUser?.favouriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser?.email as string,
        },
        data: {
          favouriteIds: updatedFavouriteIds,
        },
      });
      return new NextResponse(JSON.stringify(updatedUser), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 405,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 400,
    });
  }
};

export { handler as DELETE, handler as POST };
