import { signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import WelcomingLayout from '@/components/WelcomingLayout';

export default async function Home() {
  const session = await getServerSession(options);

  // if (!session || !session.user?.email) {
  //   redirect('/auth');
  // }
  return <WelcomingLayout session={session} />;
}
