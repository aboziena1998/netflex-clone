'use client';
import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface Props {}

const Movie = ({ params }: { params: { movieId: string } }) => {
  const { movieId } = params;
  const { data } = useMovie(movieId as string);
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-black">
      <nav className=" fixed w-full p-4 z-10 flex items-center  gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.push('/')}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-xl lg:text-3xl font-bold">
          <span className="font-light">Watching</span>
          {data?.title}
        </p>
      </nav>

      <video
        autoPlay
        controls
        src={data?.videoUrl}
        className="h-full w-full"
      ></video>
    </div>
  );
};

export default Movie;
