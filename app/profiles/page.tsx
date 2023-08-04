'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import React from 'react';
import { useRouter } from 'next/navigation';

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <div className="flex items-center h-full justify-center ">
      <div className=" flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching
        </h1>
        <div className=" flex items-center justify-center gap-8 mt-10">
          <div
            className=""
            onClick={() => {
              router.push('/');
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div
                className="w-44  h-44 
              rounded-md flex  items-center justify-center border-2 border-transparent group-hover:cursor-pointer
              group-hover:border-white
              overflow-hidden
              "
              >
                <img src="/images/default-blue.png" alt="profile" />
              </div>

              <span
                className="
              mt-4 text-gray-400 text-2xl text-center group-hover:text-white block
              "
              >
                {user?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
