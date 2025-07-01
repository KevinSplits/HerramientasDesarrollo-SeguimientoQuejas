import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    cinema: { type: mongoose.Schema.Types.ObjectId, ref: "Cinema", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Campos dinámicos para "limpieza"
    cleaningArea: { type: String, trim: true },
    cleaningType: { type: String, trim: true },
    cleaningStaffPresent: { type: String, trim: true },
    // Campos dinámicos para "atencion"
    attentionArea: { type: String, trim: true },
    staffBehavior: { type: String, trim: true },
    staffDescription: { type: String, trim: true },
    // Campos dinámicos para "fallas-tecnicas"
    roomNumber: { type: String, trim: true },
    technicalIssue: { type: String, trim: true },
    movieInterrupted: { type: String, trim: true },
    // Campos dinámicos para "alimentos-bebidas"
    productAffected: { type: String, trim: true },
    foodIssue: { type: String, trim: true },
    purchaseDate: { type: Date },
    // Campos dinámicos para "compra-entradas"
    purchaseLocation: { type: String, trim: true },
    transactionNumber: { type: String, trim: true },
    paymentIssue: { type: String, trim: true },
    // Campos dinámicos para "infraestructura"
    infrastructureIssue: { type: String, trim: true },
    reportedToStaff: { type: String, trim: true },
    attachEvidence: { type: String, trim: true },
    // Campos dinámicos para "seguridad"
    securityIncident: { type: String, trim: true },
    securityIntervention: { type: String, trim: true },
    physicalRisk: { type: String, trim: true },
    // Campos dinámicos para "fallas-app"
    platform: { type: String, trim: true },
    appIssue: { type: String, trim: true },
    appScreenshot: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
