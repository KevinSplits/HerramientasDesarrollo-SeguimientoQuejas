import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ComplaintSchema from "../schemas/complaint";
import { Button, Card, Input, Label } from "../components/ui";
import { Textarea } from "../components/ui/Textarea";
import { useComplaints } from "../context/complaintsContext";
import axios from "axios";

export function ComplaintFormPage() {
  const { createComplaint, getComplaint, updateComplaint } = useComplaints();
  const navigate = useNavigate();
  const params = useParams();
  const [cinemas, setCinemas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(ComplaintSchema),
  });

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setValue("category", newCategory);
    reset({
      ...getValues(),
      category: newCategory,
      cleaningArea: "",
      cleaningType: "",
      cleaningStaffPresent: "",
      attentionArea: "",
      staffBehavior: "",
      staffDescription: "",
      roomNumber: "",
      technicalIssue: "",
      movieInterrupted: "",
      productAffected: "",
      foodIssue: "",
      purchaseDate: "",
      purchaseLocation: "",
      transactionNumber: "",
      paymentIssue: "",
      infrastructureIssue: "",
      reportedToStaff: "",
      attachEvidence: "",
      securityIncident: "",
      securityIntervention: "",
      physicalRisk: "",
      platform: "",
      appIssue: "",
      appScreenshot: null,
    });
  };

  const onSubmit = async (data) => {
    try {
      // ✅ Imprimir sin causar error circular
      const { appScreenshot, ...safeData } = data;

      console.log("Datos antes de limpiar (sin archivo):", safeData);
      if (appScreenshot && appScreenshot.length > 0) {
        console.log("Archivo seleccionado:", appScreenshot[0].name);
      }

      const userId = localStorage.getItem("userId") || "demoUserId";
      const cleanData = { ...data, user: userId };

      Object.keys(cleanData).forEach((key) => {
        if (
          cleanData[key] === "" ||
          cleanData[key] === null ||
          cleanData[key] === undefined
        ) {
          delete cleanData[key];
        }
      });

      if (cleanData.purchaseDate) {
        const dateObj = new Date(cleanData.purchaseDate);
        if (isNaN(dateObj.getTime())) {
          delete cleanData.purchaseDate;
        } else {
          cleanData.purchaseDate = dateObj.toISOString();
        }
      }

      if (cleanData.appScreenshot instanceof File || cleanData.appScreenshot == null) {
        delete cleanData.appScreenshot;
      }

      console.log("Datos limpios para enviar:", cleanData);

      if (params.id) {
        await updateComplaint(params.id, cleanData);
      } else {
        await createComplaint(cleanData);
      }

      navigate("/complaints");
    } catch (error) {
      console.error("Error al enviar la queja:", error);
    }
  };

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/cinemas", {
          withCredentials: true,
        });
        setCinemas(res.data);
      } catch (err) {
        console.error("Error cargando cines:", err);
      }
    };
    fetchCinemas();
  }, []);

  useEffect(() => {
    const loadComplaint = async () => {
      if (params.id) {
        const complaint = await getComplaint(params.id);
        setValue("title", complaint.title);
        setValue("description", complaint.description);
        setValue("category", complaint.category);
        setValue("cinema", complaint.cinema._id);
        setSelectedCategory(complaint.category);
      }
    };
    loadComplaint();
  }, [params.id, getComplaint, setValue]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 py-10">
      <Card className="w-full max-w-lg p-6 shadow-md border border-slate-700 bg-slate-800 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input {...register("title", { required: true })} />
            {errors.title && (
              <p className="text-red-500 text-xs italic">Requerido</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea rows="3" {...register("description", { required: true })} />
            {errors.description && (
              <p className="text-red-500 text-xs italic">Requerido</p>
            )}
          </div>

          <div>
            <Label htmlFor="cinema">Cine</Label>
            <select
              {...register("cinema", { required: true })}
              className="w-full p-2 rounded-md bg-zinc-800 text-white"
            >
              <option value="">Selecciona un local</option>
              {cinemas.map((cinema) => (
                <option key={cinema._id} value={cinema._id}>
                  {cinema.name} – {cinema.city}
                </option>
              ))}
            </select>
            {errors.cinema && (
              <p className="text-red-500 text-xs italic">Selecciona un cine</p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Categoría</Label>
            <select
              {...register("category", { required: true })}
              className="w-full p-2 rounded-md bg-zinc-800 text-white"
              defaultValue=""
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              <option value="limpieza">🧼 Limpieza</option>
              <option value="atencion">🧍‍♂️ Atención del personal</option>
              <option value="fallas-tecnicas">🎬 Fallas técnicas en sala</option>
              <option value="alimentos-bebidas">🍿 Alimentos y bebidas</option>
              <option value="compra-entradas">💳 Compra de entradas</option>
              <option value="infraestructura">🛗 Infraestructura y accesibilidad física</option>
              <option value="seguridad">⚠️ Seguridad</option>
              <option value="fallas-app">📱 Fallas en la App / Web del cine</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs italic">Selecciona una categoría</p>
            )}
          </div>

          {/* Campos dinámicos según la categoría */}
          {selectedCategory === "limpieza" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cleaningArea">Área afectada</Label>
                <Input {...register("cleaningArea", { required: true })} />
                {errors.cleaningArea && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="cleaningType">Tipo de problema</Label>
                <Input {...register("cleaningType", { required: true })} />
                {errors.cleaningType && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="cleaningStaffPresent">
                  ¿Hubo personal de limpieza presente?
                </Label>
                <select
                  {...register("cleaningStaffPresent", { required: true })}
                  className="w-full p-2 rounded-md bg-zinc-800 text-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                {errors.cleaningStaffPresent && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === "atencion" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="attentionArea">¿En qué área ocurrió?</Label>
                <Input {...register("attentionArea", { required: true })} />
                {errors.attentionArea && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="staffBehavior">Tipo de actitud reportada</Label>
                <Input {...register("staffBehavior", { required: true })} />
                {errors.staffBehavior && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="staffDescription">Nombre o descripción del personal</Label>
                <Input {...register("staffDescription", { required: true })} />
                {errors.staffDescription && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === "fallas-tecnicas" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="roomNumber">Sala número</Label>
                <Input {...register("roomNumber", { required: true })} />
                {errors.roomNumber && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="technicalIssue">Tipo de falla</Label>
                <Input {...register("technicalIssue", { required: true })} />
                {errors.technicalIssue && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="movieInterrupted">¿Se interrumpió la película?</Label>
                <select
                  {...register("movieInterrupted", { required: true })}
                  className="w-full p-2 rounded-md bg-zinc-800 text-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                {errors.movieInterrupted && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === "alimentos-bebidas" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="productAffected">Producto afectado</Label>
                <Input {...register("productAffected", { required: true })} />
                {errors.productAffected && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="foodIssue">Problema detectado</Label>
                <Input {...register("foodIssue", { required: true })} />
                {errors.foodIssue && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="purchaseDate">Fecha/hora de compra</Label>
                <Input
                  {...register("purchaseDate", { required: true })}
                  type="datetime-local"
                />
                {errors.purchaseDate && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === "compra-entradas" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="purchaseLocation">¿Dónde compró la entrada?</Label>
                <Input {...register("purchaseLocation", { required: true })} />
                {errors.purchaseLocation && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="transactionNumber">Número de transacción</Label>
                <Input {...register("transactionNumber", { required: false })} />
              </div>
              <div>
                <Label htmlFor="paymentIssue">¿Se cobró el monto correctamente?</Label>
                <select
                  {...register("paymentIssue", { required: true })}
                  className="w-full p-2 rounded-md bg-zinc-800 text-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                {errors.paymentIssue && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === "infraestructura" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="infrastructureIssue">¿Qué tipo de problema detectó?</Label>
                <Textarea {...register("infrastructureIssue", { required: true })} />
                {errors.infrastructureIssue && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="reportedToStaff">¿Reportó el problema al personal?</Label>
                <select
                  {...register("reportedToStaff", { required: true })}
                  className="w-full p-2 rounded-md bg-zinc-800 text-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                  <option value="no-oportunidad">No tuve oportunidad</option>
                </select>
                {errors.reportedToStaff && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="attachEvidence">¿Desea adjuntar evidencia?</Label>
                <select
                  {...register("attachEvidence", { required: true })}
                  className="w-full p-2 rounded-md bg-zinc-800 text-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                {errors.attachEvidence && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === "seguridad" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="securityIncident">Tipo de incidente</Label>
                <Input {...register("securityIncident", { required: true })} />
                {errors.securityIncident && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="securityIntervention">¿Intervino personal de seguridad?</Label>
                <select
                  {...register("securityIntervention", { required: true })}
                  className="w-full p-2 rounded-md bg-zinc-800 text-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                {errors.securityIntervention && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="physicalRisk">¿Hubo riesgo físico?</Label>
                <select
                  {...register("physicalRisk", { required: true })}
                  className="w-full p-2 rounded-md bg-zinc-800 text-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                {errors.physicalRisk && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === "fallas-app" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="platform">Plataforma</Label>
                <select
                  {...register("platform", { required: true })}
                  className="w-full p-2 rounded-md bg-zinc-800 text-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="android">Android</option>
                  <option value="ios">iOS</option>
                  <option value="web">Web</option>
                </select>
                {errors.platform && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="appIssue">Problema técnico</Label>
                <Textarea {...register("appIssue", { required: true })} />
                {errors.appIssue && (
                  <p className="text-red-500 text-xs italic">Requerido</p>
                )}
              </div>
              <div>
                <Label htmlFor="appScreenshot">Captura de pantalla del error</Label>
                <Input {...register("appScreenshot", { required: false })} type="file" />
              </div>
            </div>
          )}

          {/* Mostrar errores globales para debug */}
          {Object.keys(errors).length > 0 && (
            <pre className="bg-red-100 text-red-700 p-2 rounded my-2 whitespace-pre-wrap">
              {JSON.stringify(errors, null, 2)}
            </pre>
          )}

          {/* Botones */}
          <div className="flex justify-between mt-6 gap-x-4">
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex-1"
            >
              Enviar Queja
            </Button>

            <Button
              type="button"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex-1"
              onClick={() => {
                reset();
                setSelectedCategory("");
              }}
            >
              Reestablecer
            </Button>

            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1"
              onClick={() => {
                if (window.confirm("¿Estás seguro de que deseas cancelar la queja?")) {
                  navigate("/dashboard");
                }
              }}
            >
              Cancelar Queja
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}