'use client';
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavourites from '@/hooks/useFavorites';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

import React from 'react';

interface FavouriteBtnProps {
  movieId: string;
}

const FavouriteBtn: React.FC<FavouriteBtnProps> = ({ movieId }) => {
  const { mutate: mutateFovourites } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(movieId);
  }, [movieId, currentUser]);

  const toggleFavourites = useCallback(async () => {
    let res;

    try {
      if (isFavourite) {
        console.log(isFavourite);
        res = await axios.delete('/api/favorite', { data: { movieId } });
      } else {
        res = await axios.post('/api/favorite', { movieId });
      }

      const updatedFavouriteIds = res?.data?.favouriteIds;

      mutate({
        ...currentUser,
        favouriteIds: updatedFavouriteIds,
      });

      mutateFovourites();
    } catch (error) {
      console.log(error);
    }
  }, [movieId, isFavourite, currentUser, mutate, mutateFovourites]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <button
      onClick={toggleFavourites}
      className=" cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex  justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </button>
  );
};

export default FavouriteBtn;
