import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Label } from "../components/ui";
import { Textarea } from "../components/ui/Textarea";
import { useComplaints } from "../context/complaintsContext";
import axios from "axios";

export function ComplaintFormPage() {
  const { createComplaint, getComplaint, updateComplaint } = useComplaints();
  const navigate = useNavigate();
  const params = useParams();
  const [cinemas, setCinemas] = useState([]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (params.id) {
      await updateComplaint(params.id, data);
    } else {
      await createComplaint(data);
    }
    navigate("/complaints");
  };

  // Cargar cines
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

  // Cargar queja (si es edición)
  useEffect(() => {
    const loadComplaint = async () => {
      if (params.id) {
        const complaint = await getComplaint(params.id);
        setValue("title", complaint.title);
        setValue("description", complaint.description);
        setValue("category", complaint.category);
        setValue("cinema", complaint.cinema._id); // Usar ._id para cinema
      }
    };
    loadComplaint();
  }, [params.id, getComplaint, setValue]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <Label htmlFor="category">Categoría</Label>
          <select
            {...register("category", { required: true })}
            className="w-full p-2 rounded-md bg-zinc-800 text-white"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            <option value="limpieza">Limpieza</option>
            <option value="atencion">Atención</option>
            <option value="precio">Precio</option>
            <option value="infraestructura">Infraestructura</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs italic">Selecciona una categoría</p>
          )}
        </div>

        <div>
          <Label htmlFor="cinema">Cine</Label>
          <select
            {...register("cinema", { required: true })}
            className="w-full p-2 rounded-md bg-zinc-800 text-white"
          >
            <option value="">Selecciona un cine</option>
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

        <Button>Enviar Queja</Button>
      </form>
    </Card>
  );
}
