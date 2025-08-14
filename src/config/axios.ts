import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/account/9818306",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGRiMTQzNzZmOWQ4NzZkMGU2NWM2MWVhYmEzZTQ5MCIsIm5iZiI6MTYwNTEzNjM1NS4xOTUwMDAyLCJzdWIiOiI1ZmFjNmZlM2YyY2YyNTAwNDBhNDljMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZX0MNg7nRZejkQnT8DjSPKsk4AeZuB56rX9u1E2hEec",
  },
});
