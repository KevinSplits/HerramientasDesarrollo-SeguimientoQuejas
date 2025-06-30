import { useEffect } from "react";
import { useCinemas } from "../context/cinemasContext";
import { CinemaCard } from "../components/cinemas/CinemaCard";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";

export function CinemasPage() {
  const { cinemas, getCinemas } = useCinemas();

  useEffect(() => {
    getCinemas();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Link
          to="/dashboard"
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Volver al Dashboard
        </Link>

        <Link
          to="/add-cinema"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md"
        >
          Añadir Cine
        </Link>
      </div>

      {cinemas.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl text-center">
              No hay cines aún, por favor añade uno nuevo
            </h1>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {cinemas.map((cinema) => (
            <CinemaCard cinema={cinema} key={cinema._id} />
          ))}
        </div>
      )}
    </div>
  );
}
