import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import FavouriteBtn from './FavouriteBtn';
import { useRouter } from 'next/navigation';
interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data.thumbnailUrl}
        alt={`${data.title} thumbnail`}
        className=" cursor-pointer object-cover transition duration-500 shadowxl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw] "
      />
      <div className=" opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          className="cursor-pointer object-cover transition duration-200 shadow-xl rounded-t-md w-full h-[12vw]"
          src={data.thumbnailUrl}
          alt=""
        />
        <div className="z-10 bg-zinc-800 p-1 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                router.push(`/watch/${data?.id}`);
              }}
              className=" cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300  "
            >
              <BsFillPlayFill size={30} />
            </button>
            <FavouriteBtn movieId={data?.id} />
          </div>
          <p className="text-green-400 font-semibold mt-4 ">
            <span className="text-white ">2023</span>
          </p>
          <div className="flex mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-xl">{data.duration}</p>
          </div>
          <div className="flex mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-xl">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
