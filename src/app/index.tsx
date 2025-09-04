import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { MovieList } from "../components/MovieList";
import { PeopleList } from "../components/PersonList";
import { TvShowList } from "../components/TvShowList";
import { useMovies } from "../hooks/useMovies";
import { useSeries } from "../hooks/useSeries";
import { useTrendingPeople } from "../hooks/useTrendingPeople";

const imageUrl = "https://image.tmdb.org/t/p/original";

export default function Index() {
  const {
    data: movies,
    isLoadingMovies,
    getInitialMovieData,
    getNextPageMovies,
  } = useMovies("movie");
  const {
    data: trendingMovies,
    isLoadingMovies: isLoadingTrendingMovies,
    getInitialMovieData: getInitialTrendingMovieData,
    getNextPageMovies: getNextPageTrendingMovies,
  } = useMovies("trendingMovies");
  const {
    data: popularMovies,
    isLoadingMovies: isLoadingPopularMovies,
    getInitialMovieData: getInitialPopularMoviesData,
    getNextPageMovies: getNextPagePopularMovies,
  } = useMovies("popularMovies");
  const {
    data: topRatedMovies,
    isLoadingMovies: isLoadingTopRatedMovies,
    getInitialMovieData: getInitialTopRatedMoviesData,
    getNextPageMovies: getNextPageTopRatedMovies,
  } = useMovies("topRatedMovies");
  const {
    data: upcomingMovies,
    isLoadingMovies: isLoadingUpcomingMovies,
    getInitialMovieData: getInitialUpcomingMoviesData,
    getNextPageMovies: getNextPageUpcomingMovies,
  } = useMovies("upcomingMovies");

  const {
    trendingPeople,
    isLoadingTrendingPeople,
    getInitialTrendingPeopleData,
    getNextPageTrendingSeries,
  } = useTrendingPeople();

  const [isPageLoading, setIsPageLoading] = useState(true);

  const { tvShows, isLoadingSeries, getInitialSerieData, getNextPageSeries } =
    useSeries();

  const handleGetData = useCallback(async () => {
    try {
      setIsPageLoading(true);
      await Promise.all([
        getInitialMovieData(),
        getInitialSerieData(),
        getInitialTrendingMovieData(),
        getInitialPopularMoviesData(),
        getInitialTopRatedMoviesData(),
        getInitialUpcomingMoviesData(),
        getInitialTrendingPeopleData(),
      ]);
      // const response = await Promise.all([
      //   getMovies(),
      //   getSeries(),
      //   getPopularMovies(),
      //   getTopRatedMovies(),
      //   getUpcomingMovies(),
      //   getTrendingMovies(),
      //   getTrendingPeople(),
      // ]);
      // setMovies(response[0].data.results);
      // setTvShows(response[1].data.results);
      // setPopularMovies(response[2].data.results);
      // setTopRatedMovies(response[3].data.results);
      // setUpcommingMovies(response[4].data.results);
      // setTrendingMovies(response[5].data.results);
      // setTrendingPeople(response[6].data.results);
    } catch (error) {
      console.log("deu erro ei");
      console.log("error", error);
    } finally {
      setIsPageLoading(false);
    }
  }, [
    getInitialMovieData,
    getInitialSerieData,
    getInitialTrendingMovieData,
    getInitialPopularMoviesData,
    getInitialUpcomingMoviesData,
    getInitialTopRatedMoviesData,
    getInitialTrendingPeopleData,
  ]);

  useFocusEffect(
    useCallback(() => {
      handleGetData();
    }, [])
  );

  console.log("render");

  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar barStyle="dark-content" />
      <Text className="text-4xl font-bold text-center  border-b border-b-gray-400 mx-4 py-4 ">
        Movie List
      </Text>
      {isPageLoading ? (
        <View className="flex-1  items-center justify-center gap-2">
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView className="p-4">
          <MovieList
            data={trendingMovies}
            title="Trending Movies"
            isLoading={isLoadingTrendingMovies}
            onEndCallback={getNextPageTrendingMovies}
          />
          <MovieList
            data={topRatedMovies}
            title="Top Rated Movies"
            isLoading={isLoadingTopRatedMovies}
            onEndCallback={getNextPageTopRatedMovies}
          />
          <MovieList
            data={popularMovies}
            title="Popular Movies"
            isLoading={isLoadingPopularMovies}
            onEndCallback={getNextPagePopularMovies}
          />
          <MovieList
            data={upcomingMovies}
            title="Upcoming Movies"
            isLoading={isLoadingUpcomingMovies}
            onEndCallback={getNextPageUpcomingMovies}
          />

          <MovieList
            data={movies}
            title="Movies"
            isLoading={isLoadingMovies}
            onEndCallback={getNextPageMovies}
          />

          <TvShowList
            data={tvShows}
            isLoading={isLoadingSeries}
            onEndCallback={getNextPageSeries}
          />
          <PeopleList
            data={trendingPeople}
            isLoading={isLoadingTrendingPeople}
            onEndCallback={getNextPageTrendingMovies}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
