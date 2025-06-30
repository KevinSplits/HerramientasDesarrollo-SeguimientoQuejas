import { createContext, useContext, useState } from "react";
import {
  createCinemaRequest,
  deleteCinemaRequest,
  getCinemasRequest,
  getCinemaRequest,
  updateCinemaRequest,
} from "../api/cinemas";

const CinemaContext = createContext();

export const useCinemas = () => {
  const context = useContext(CinemaContext);
  if (!context) throw new Error("useCinemas must be used within a CinemaProvider");
  return context;
};

export function CinemaProvider({ children }) {
  const [cinemas, setCinemas] = useState([]);

  const getCinemas = async () => {
    const res = await getCinemasRequest();
    setCinemas(res.data);
  };

  const deleteCinema = async (id) => {
    try {
      const res = await deleteCinemaRequest(id);
      if (res.status === 204) setCinemas(cinemas.filter((cinema) => cinema._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createCinema = async (cinema) => {
    try {
      const res = await createCinemaRequest(cinema);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCinema = async (id) => {
    try {
      const res = await getCinemaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCinema = async (id, cinema) => {
    try {
      await updateCinemaRequest(id, cinema);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CinemaContext.Provider
      value={{
        cinemas,
        getCinemas,
        deleteCinema,
        createCinema,
        getCinema,
        updateCinema,
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
}
