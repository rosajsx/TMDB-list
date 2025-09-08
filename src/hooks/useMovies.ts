import { useState } from "react";
import {
  getMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  Movie,
} from "../services";

type MoviesType =
  | "movie"
  | "popularMovies"
  | "topRatedMovies"
  | "trendingMovies"
  | "upcomingMovies";

const getMovieList = {
  movie: getMovies,
  popularMovies: getPopularMovies,
  topRatedMovies: getTopRatedMovies,
  trendingMovies: getTrendingMovies,
  upcomingMovies: getUpcomingMovies,
};

export const useMovies = (type: MoviesType) => {
  const [data, setData] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [page, setPage] = useState(5);

  const getData = getMovieList[type];

  const getInitialMovieData = async () => {
    try {
      setIsLoadingMovies(true);
      const [page1, page2, page3, page4, page5] = await Promise.all([
        getData(),
        getData(2),
        getData(3),
        getData(4),
        getData(5),
      ]);

      setData([
        ...page1.data.results,
        ...page2.data.results,
        ...page3.data.results,
        ...page4.data.results,
        ...page5.data.results,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMovies(false);
    }
  };

  const updateToNextPage = () => setPage((prev) => prev + 1);

  const getNextPageMovies = async () => {
    try {
      setIsLoadingMovies(true);
      const response = await getMovies(page + 1);
      const newData = [...data, ...response.data.results];
      setData(newData);
      updateToNextPage();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMovies(false);
    }
  };

  return {
    getNextPageMovies,
    getInitialMovieData,
    data,
    isLoadingMovies,
  };
};
