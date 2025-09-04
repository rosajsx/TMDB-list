import { useState } from "react";
import { getSeries, TVShow } from "../services";

export const useSeries = () => {
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [isLoadingSeries, setIsLoadingSeries] = useState(true);
  const [page, setPage] = useState(5);

  const getInitialSerieData = async () => {
    try {
      setIsLoadingSeries(true);
      const [page1, page2, page3, page4, page5] = await Promise.all([
        getSeries(),
        getSeries(2),
        getSeries(3),
        getSeries(4),
        getSeries(5),
      ]);

      setTvShows([
        ...page1.data.results,
        ...page2.data.results,
        ...page3.data.results,
        ...page4.data.results,
        ...page5.data.results,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSeries(false);
    }
  };

  const updateToNextPage = () => setPage((prev) => prev + 1);

  const getNextPageSeries = async () => {
    try {
      setIsLoadingSeries(true);
      const response = await getSeries(page + 1);
      const data = [...tvShows, ...response.data.results];
      setTvShows(data);
      updateToNextPage();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSeries(false);
    }
  };

  return {
    getNextPageSeries,
    getInitialSerieData,
    tvShows,
    isLoadingSeries,
  };
};
