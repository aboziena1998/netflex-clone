'use client';
import { Session } from 'next-auth';
import React from 'react';
import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
interface Props {
  session: Session;
}
const WelcomingLayout = () => {
  const { data: user } = useCurrentUser();

  return (
    <div>
      <div className="flex items-center justify-center gap-4 ">
        <h1 className="font-bold text-center text-white text-2xl">
          Welcome
          <span className="font-extrabold text-lime-500 shadow-xl ">
            {user?.name}
          </span>
        </h1>
        <img
          src={user?.image}
          width={40}
          height={40}
          alt="Profile Pic"
          className="rounded-full"
        />
      </div>
      <button className="px-8 py-4 bg-white w-full" onClick={() => signOut()}>
        sign out
      </button>
    </div>
  );
};

export default WelcomingLayout;
