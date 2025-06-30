import { Card, ButtonLink, Button } from "../ui"; // IMPORTAR Card, ButtonLink y Button
import { Link } from "react-router-dom";

export function CinemaCard({ cinema, onDelete }) {
  return (
    <Card>
      <header className="flex justify-between items-start">
        <h2 className="text-2xl font-bold">Cine {cinema.name}</h2>
        <div className="flex gap-2">
          <ButtonLink to={`/cinemas/${cinema._id}`}>Editar</ButtonLink>
          <Button
            onClick={() => {
              if (window.confirm("¿Seguro que quieres eliminar este cine?")) {
                onDelete(cinema._id);
              }
            }}
          >
            Eliminar
          </Button>
        </div>
      </header>

      <div className="mt-2 space-y-1">
        <p className="text-slate-300">
          <span className="font-semibold">Dirección:</span> {cinema.address}
        </p>
        <p className="text-slate-300">
          <span className="font-semibold">Ciudad:</span> {cinema.city}
        </p>
        {cinema.phone && (
          <p className="text-slate-300">
            <span className="font-semibold">Teléfono:</span> {cinema.phone}
          </p>
        )}
      </div>
    </Card>
  );
}
