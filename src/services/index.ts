import { axiosInstance } from "../config/axios";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // formato ISO: "YYYY-MM-DD"
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface TVShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export type Person = {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: "person";
  popularity: number;
  gender: number; // geralmente: 0 = não especificado, 1 = feminino, 2 = masculino
  known_for_department: string | null;
  profile_path: string;
};

export async function getMovies(page = 1) {
  return axiosInstance.get<{ results: Movie[] }>("/discover/movie", {
    params: {
      append_to_response: "images",
      page,
    },
  });
}

export async function getPopularMovies(page = 1) {
  return axiosInstance.get<{ results: Movie[] }>("/movie/popular", {
    params: {
      page,
    },
  });
}
export async function getTopRatedMovies(page = 1) {
  return axiosInstance.get<{ results: Movie[] }>("/movie/top_rated", {
    params: {
      page,
    },
  });
}
export async function getUpcomingMovies(page = 1) {
  return axiosInstance.get<{ results: Movie[] }>("/movie/upcoming", {
    params: {
      page,
    },
  });
}

export async function getTrendingMovies(page = 1) {
  return axiosInstance.get<{ results: Movie[] }>("/trending/movie/week", {
    params: {
      page,
    },
  });
}

export async function getTrendingPeople(page = 1) {
  return axiosInstance.get<{ results: Person[] }>("/trending/person/week", {
    params: {
      page,
    },
  });
}

export async function getSeries(page = 1) {
  return axiosInstance.get<{ results: TVShow[] }>("/discover/tv", {
    params: {
      page,
      append_to_response: "images",
    },
  });
}
