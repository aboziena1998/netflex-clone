'use client';
import useBillboard from '@/hooks/useBillboard';
import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayBtn from './PlayBtn';

interface Props {}

const Billboard = (props: Props) => {
  const { data } = useBillboard();
  return (
    <div className="relative h-[56.25vw] ">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
      ></video>
      <div className=" absolute top-[30%] md:top-[40%] ml-4 md:ml-16 ">
        <p className="text-white text-xl md:text-5xl h-full w-1/2 lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className=" text-white text-[8px] md:text-lg mt-3 md:mt-8 md:w-[80%] w-[90%] lg:w-1/2 drop-shadow-xl">
          {data?.description}
        </p>

        <div className="flex items-center mt-3 md:mt-4 gap-3">
          <PlayBtn movieId={data?.id} />
          <button className=" bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center gap-2 hover:bg-opacity-20 transition">
            <AiOutlineInfoCircle />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
