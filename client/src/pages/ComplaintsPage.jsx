import { useEffect } from "react";
import { useComplaints } from "../context/complaintsContext";
import { ComplaintCard } from "../components/complaints/ComplaintCard";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";

export function ComplaintsPage() {
  const { complaints, getComplaints, deleteComplaint } = useComplaints(); // <- Añadido deleteComplaint

  useEffect(() => {
    getComplaints();
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
          to="/add-complaint"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md"
        >
          Añadir Queja
        </Link>
      </div>

      {complaints.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl text-center">
              No hay quejas registradas aún
            </h1>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint._id}
              complaint={complaint}
              onDelete={deleteComplaint} // <- Pasa la función correctamente
            />
          ))}
        </div>
      )}
    </div>
  );
}
