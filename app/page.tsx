'use client';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useMovieList from '@/hooks/useMovieList';

export default function Home() {
  const { data: movies = [] } = useMovieList();

  console.log(movies);
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trinding Now" data={movies} />
      </div>
    </>
  );
}
