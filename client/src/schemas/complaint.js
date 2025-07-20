import { z } from "zod";

const ComplaintSchema = z.object({
  // Campos generales
  title: z.string({ required_error: "El título es obligatorio" }).min(1, "El título no puede estar vacío"),

  description: z.string({ required_error: "La descripción es obligatoria" }).min(1, "La descripción no puede estar vacía"),

  category: z.enum(
    [
      "limpieza",
      "atencion",
      "fallas-tecnicas",
      "alimentos-bebidas",
      "compra-entradas",
      "infraestructura",
      "seguridad",
      "fallas-app",
    ],
    { required_error: "Debe seleccionar una categoría" }
  ),

  status: z.enum(["pendiente", "en-progreso", "resuelta"]).optional().default("pendiente"),

  dateFiled: z.coerce.date().optional(), // convierte string a Date automáticamente, opcional

  cinema: z.string({ required_error: "Debe seleccionar un cine" }).min(1, "El ID del cine es obligatorio"),

  // User opcional en frontend, porque lo asigna backend al crear la queja
  user: z.string().optional(),

  // Campos dinámicos: limpieza
  cleaningArea: z.string().optional(),
  cleaningType: z.string().optional(),
  cleaningStaffPresent: z.string().optional(),

  // Campos dinámicos: atencion
  attentionArea: z.string().optional(),
  staffBehavior: z.string().optional(),
  staffDescription: z.string().optional(),

  // Campos dinámicos: fallas-tecnicas
  roomNumber: z.string().optional(),
  technicalIssue: z.string().optional(),
  movieInterrupted: z.string().optional(),

  // Campos dinámicos: alimentos-bebidas
  productAffected: z.string().optional(),
  foodIssue: z.string().optional(),

  // Campos dinámicos: compra-entradas
  // Manejo especial de purchaseDate para aceptar fecha vacía sin error
  purchaseDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      { message: "Fecha inválida" }
    )
    .transform((val) => (val ? new Date(val) : undefined)),

  purchaseLocation: z.string().optional(),
  transactionNumber: z.string().optional(),
  paymentIssue: z.string().optional(),

  // Campos dinámicos: infraestructura
  infrastructureIssue: z.string().optional(),
  infrastructureLocation: z.string().optional(),
  infrastructureUrgency: z.string().optional(),

  // Campos dinámicos: seguridad
  securityIncident: z.string().optional(),
  securityIntervention: z.string().optional(),
  physicalRisk: z.string().optional(),

  // Campos dinámicos: fallas-app
  platform: z.string().optional(),
  appIssue: z.string().optional(),
  appScreenshot: z.string().nullable().optional(),
});

export default ComplaintSchema;
