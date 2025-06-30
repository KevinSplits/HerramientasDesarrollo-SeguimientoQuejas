import axios from "./axios";
export const getCinemasRequest = async () => axios.get("/cinemas");
export const createCinemaRequest = async (cinema) => axios.post("/cinemas", cinema);
export const updateCinemaRequest = async (cinema) => axios.put(`/cinemas/${cinema._id}`, cinema);
export const deleteCinemaRequest = async (id) => axios.delete(`/cinemas/${id}`);
export const getCinemaRequest = async (id) => axios.get(`/cinemas/${id}`);
