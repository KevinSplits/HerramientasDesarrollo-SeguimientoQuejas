import { Card, Button } from "../ui";

export function CinemaCard({ cinema, onEdit, onDelete }) {
  return (
    <Card>
      <header className="flex justify-between items-start gap-4">
        <h2 className="text-2xl font-bold max-w-full">
          Cine {cinema.name}
        </h2>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Editar
          </Button>
          <Button
            onClick={() => {
              if (window.confirm("¿Seguro que quieres eliminar este cine?")) {
                onDelete();
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white"
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