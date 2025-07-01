import axios from "./axios";

export const getCinemasRequest = async () => axios.get("/cinemas", { withCredentials: true });
export const createCinemaRequest = async (cinema) => axios.post("/cinemas", cinema, { withCredentials: true });
export const updateCinemaRequest = async (id, cinema) =>
  axios.put(`/cinemas/${id}`, cinema, { withCredentials: true });
export const deleteCinemaRequest = async (id) => axios.delete(`/cinemas/${id}`, { withCredentials: true });
export const getCinemaRequest = async (id) => axios.get(`/cinemas/${id}`, { withCredentials: true });
