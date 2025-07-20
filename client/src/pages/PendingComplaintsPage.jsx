import { useEffect } from "react";
import { useComplaints } from "../context/complaintsContext";
import { useNavigate } from "react-router-dom";

function PendingComplaintsPage() {
  const { complaints, getComplaints, updateComplaint } = useComplaints();
  const navigate = useNavigate();

  useEffect(() => {
    getComplaints();
  }, []);

  const pendingComplaints = complaints.filter(
    (c) => !c.status || c.status.toLowerCase() !== "resuelta"
  );

  const resolvedComplaints = complaints.filter(
    (c) => c.status && c.status.toLowerCase() === "resuelta"
  );

  const handleToggleStatus = async (complaint, newStatus) => {
    const confirm = window.confirm(
      `¿Marcar esta queja como "${newStatus}"?`
    );
    if (!confirm) return;

    try {
      const updatedComplaint = { ...complaint, status: newStatus };

      if (
        typeof updatedComplaint.cinema === "object" &&
        updatedComplaint.cinema._id
      ) {
        updatedComplaint.cinema = updatedComplaint.cinema._id;
      }

      await updateComplaint(complaint._id, updatedComplaint);
      await getComplaints(); // 🔄 Refrescar estado global

      alert(`Queja marcada como ${newStatus}`);
    } catch (error) {
      console.error(
        "❌ Error al actualizar estado:",
        error.message,
        error.response?.data || error
      );
      alert("Ocurrió un error al actualizar la queja.");
    }
  };

  return (
    <section className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Gestión de Resoluciones</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🟡 Columna de Pendientes */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400 text-center">
            Quejas Pendientes
          </h2>
          {pendingComplaints.length === 0 ? (
            <p className="text-slate-400 text-center">No hay quejas pendientes.</p>
          ) : (
            <div className="space-y-4">
              {pendingComplaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="bg-zinc-800 p-4 rounded-md shadow-md flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{complaint.title}</h3>
                    <p className="text-slate-400">{complaint.description}</p>
                    <p className="text-sm text-yellow-400 mt-1">
                      Estado: {complaint.status || "pendiente"}
                    </p>
                  </div>
                  <button
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    onClick={() => handleToggleStatus(complaint, "resuelta")}
                  >
                    Marcar como resuelta
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Columna de Resueltas */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center">
            Quejas Resueltas
          </h2>
          {resolvedComplaints.length === 0 ? (
            <p className="text-slate-400 text-center">No hay quejas resueltas.</p>
          ) : (
            <div className="space-y-4">
              {resolvedComplaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="bg-zinc-800 p-4 rounded-md shadow-md flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{complaint.title}</h3>
                    <p className="text-slate-400">{complaint.description}</p>
                    <p className="text-sm text-green-400 mt-1">
                      Estado: {complaint.status}
                    </p>
                  </div>
                  <button
                    className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                    onClick={() => handleToggleStatus(complaint, "pendiente")}
                  >
                    Reabrir queja
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-10 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded block mx-auto"
      >
        Volver al Dashboard
      </button>
    </section>
  );
}

export default PendingComplaintsPage;