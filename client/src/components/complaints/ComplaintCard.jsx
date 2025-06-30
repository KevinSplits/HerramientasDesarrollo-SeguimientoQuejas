import { Card, Button } from "../ui";
import { Link } from "react-router-dom";

export function ComplaintCard({ complaint, onDelete }) {
  const formattedDate = complaint.date
    ? new Date(complaint.date).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Card>
      <header className="flex justify-between items-start">
        <h2 className="text-2xl font-bold">{complaint.title}</h2>
        <div className="flex gap-2">
          <Button asChild>
            <Link to={`/complaints/${complaint._id}`}>Editar</Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (window.confirm("¿Seguro que quieres eliminar esta queja?")) {
                onDelete(complaint._id);
              }
            }}
          >
            Eliminar
          </Button>
        </div>
      </header>

      <p className="text-slate-300 mt-2">{complaint.description}</p>

      {/* Categoría */}
      {complaint.category && (
        <p className="text-sm text-slate-400 mt-2">
          <span className="font-semibold">Categoría:</span> {complaint.category}
        </p>
      )}

      {/* Cine */}
      {complaint.cinema && (
        <p className="text-sm text-slate-400">
          <span className="font-semibold">Cine:</span>{" "}
          {typeof complaint.cinema === "object"
            ? complaint.cinema.name
            : complaint.cinema}
        </p>
      )}

      {/* Fecha */}
      {formattedDate && (
        <p className="text-sm text-slate-400 mt-2">
          <span className="font-semibold">Fecha:</span> {formattedDate}
        </p>
      )}
    </Card>
  );
}
