import { useState } from "react";
import { getTrendingPeople, Person } from "../services";

export const useTrendingPeople = () => {
  const [trendingPeople, setTrendingPeople] = useState<Person[]>([]);
  const [isLoadingTrendingPeople, setIsLoadingTrendingPeople] = useState(true);
  const [page, setPage] = useState(5);

  const getInitialTrendingPeopleData = async () => {
    try {
      setIsLoadingTrendingPeople(true);
      const [page1, page2, page3, page4, page5] = await Promise.all([
        getTrendingPeople(),
        getTrendingPeople(2),
        getTrendingPeople(3),
        getTrendingPeople(4),
        getTrendingPeople(5),
      ]);

      setTrendingPeople([
        ...page1.data.results,
        ...page2.data.results,
        ...page3.data.results,
        ...page4.data.results,
        ...page5.data.results,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTrendingPeople(false);
    }
  };

  const updateToNextPage = () => setPage((prev) => prev + 1);

  const getNextPageTrendingSeries = async () => {
    try {
      setIsLoadingTrendingPeople(true);
      const response = await getTrendingPeople(page + 1);
      const data = [...trendingPeople, ...response.data.results];
      setTrendingPeople(data);
      updateToNextPage();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTrendingPeople(false);
    }
  };

  return {
    getNextPageTrendingSeries,
    getInitialTrendingPeopleData,
    trendingPeople,
    isLoadingTrendingPeople,
  };
};
