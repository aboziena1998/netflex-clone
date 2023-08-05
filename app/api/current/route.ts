import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';
import prismadb from '@/lib/prismadb';

export async function GET(req: Request) {
  if (req.method !== 'GET')
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 405,
    });

  try {
    const session = await getServerSession(options);

    const currentUser = await prismadb?.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    return new NextResponse(JSON.stringify(currentUser), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Error' }), {
      status: 400,
    });
  }
}
