'use client';
import Billboard from '@/components/Billboard';
import InfoModal from '@/components/InfoModal';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavourites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';
import useMovieList from '@/hooks/useMovieList';

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  const { data: user } = useCurrentUser();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trinding Now" data={movies} />
        <MovieList title="My List" data={favourites} />
      </div>
    </>
  );
}
