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
    <Card className="w-full max-w-lg mx-auto p-4 shadow-md border border-slate-700 bg-slate-800 rounded-lg">
      <header className="flex flex-wrap justify-between items-start gap-4">
        <h2 className="text-2xl font-bold text-white">{complaint.title}</h2>
        <div className="flex gap-2">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            <Link to={`/complaints/${complaint._id}`}>Editar</Link>
          </Button>
          <Button
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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
          <span className="font-semibold text-white">Categoría:</span> {complaint.category}
        </p>
      )}

      {/* Campos dinámicos según la categoría */}
      {complaint.category === "limpieza" && (
        <>
          {complaint.cleaningArea && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Área afectada:</span> {complaint.cleaningArea}
            </p>
          )}
          {complaint.cleaningType && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Tipo de problema:</span> {complaint.cleaningType}
            </p>
          )}
          {complaint.cleaningStaffPresent && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">¿Hubo personal de limpieza presente?:</span>{" "}
              {complaint.cleaningStaffPresent === "si" ? "Sí" : "No"}
            </p>
          )}
        </>
      )}

      {complaint.category === "atencion" && (
        <>
          {complaint.attentionArea && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Área:</span> {complaint.attentionArea}
            </p>
          )}
          {complaint.staffBehavior && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Actitud reportada:</span> {complaint.staffBehavior}
            </p>
          )}
          {complaint.staffDescription && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Descripción del personal:</span> {complaint.staffDescription}
            </p>
          )}
        </>
      )}

      {complaint.category === "fallas-tecnicas" && (
        <>
          {complaint.roomNumber && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Sala número:</span> {complaint.roomNumber}
            </p>
          )}
          {complaint.technicalIssue && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Tipo de falla:</span> {complaint.technicalIssue}
            </p>
          )}
          {complaint.movieInterrupted && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">¿Se interrumpió la película?:</span>{" "}
              {complaint.movieInterrupted === "si" ? "Sí" : "No"}
            </p>
          )}
        </>
      )}

      {complaint.category === "alimentos-bebidas" && (
        <>
          {complaint.productAffected && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Producto afectado:</span> {complaint.productAffected}
            </p>
          )}
          {complaint.foodIssue && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Problema detectado:</span> {complaint.foodIssue}
            </p>
          )}
          {complaint.purchaseDate && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Fecha/hora de compra:</span> {complaint.purchaseDate}
            </p>
          )}
        </>
      )}

      {complaint.category === "compra-entradas" && (
        <>
          {complaint.purchaseLocation && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Lugar de compra:</span> {complaint.purchaseLocation}
            </p>
          )}
          {complaint.transactionNumber && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Número de transacción:</span> {complaint.transactionNumber}
            </p>
          )}
          {complaint.paymentIssue && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">¿Cobro correcto?:</span>{" "}
              {complaint.paymentIssue === "si" ? "Sí" : "No"}
            </p>
          )}
        </>
      )}

      {complaint.category === "infraestructura" && (
        <>
          {complaint.infrastructureIssue && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Problema detectado:</span> {complaint.infrastructureIssue}
            </p>
          )}
          {complaint.reportedToStaff && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">¿Reportado al personal?:</span>{" "}
              {complaint.reportedToStaff === "si" ? "Sí" : "No"}
            </p>
          )}
          {complaint.attachEvidence && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">¿Adjuntó evidencia?:</span>{" "}
              {complaint.attachEvidence === "si" ? "Sí" : "No"}
            </p>
          )}
        </>
      )}

      {complaint.category === "seguridad" && (
        <>
          {complaint.securityIncident && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Tipo de incidente:</span> {complaint.securityIncident}
            </p>
          )}
          {complaint.securityIntervention && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">¿Intervino seguridad?:</span>{" "}
              {complaint.securityIntervention === "si" ? "Sí" : "No"}
            </p>
          )}
          {complaint.physicalRisk && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">¿Hubo riesgo físico?:</span>{" "}
              {complaint.physicalRisk === "si" ? "Sí" : "No"}
            </p>
          )}
        </>
      )}

      {complaint.category === "fallas-app" && (
        <>
          {complaint.platform && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Plataforma:</span> {complaint.platform}
            </p>
          )}
          {complaint.appIssue && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Problema técnico:</span> {complaint.appIssue}
            </p>
          )}
          {complaint.appScreenshot && (
            <p className="text-sm text-slate-400 mt-2">
              <span className="font-semibold text-white">Captura de pantalla:</span> {complaint.appScreenshot}
            </p>
          )}
        </>
      )}

      {/* Cine */}
      {complaint.cinema && (
        <p className="text-sm text-slate-400 mt-2">
          <span className="font-semibold text-white">Cine:</span>{" "}
          {typeof complaint.cinema === "object" ? complaint.cinema.name : complaint.cinema}
        </p>
      )}

      {/* Fecha */}
      {formattedDate && (
        <p className="text-sm text-slate-400 mt-2">
          <span className="font-semibold text-white">Fecha:</span> {formattedDate}
        </p>
      )}
    </Card>
  );
}
