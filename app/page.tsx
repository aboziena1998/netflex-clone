'use client';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavourites from '@/hooks/useFavorites';
import useMovieList from '@/hooks/useMovieList';

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  const { data: user } = useCurrentUser();

  console.log(movies);
  console.log(favourites);
  console.log(user);
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trinding Now" data={movies} />
        <MovieList title="My List" data={favourites} />
      </div>
    </>
  );
}
