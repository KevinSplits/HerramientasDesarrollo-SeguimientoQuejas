import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Label } from "../components/ui";
import { useCinemas } from "../context/cinemasContext";

export function CinemaFormPage() {
  const { createCinema, getCinema, updateCinema } = useCinemas();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (params.id) {
      await updateCinema(params.id, data);
    } else {
      await createCinema(data);
    }
    navigate("/cinemas");
  };

  useEffect(() => {
    const loadCinema = async () => {
      if (params.id) {
        try {
          const cinema = await getCinema(params.id);
          if (cinema) {
            setValue("name", cinema.name);
            setValue("address", cinema.address);
            setValue("city", cinema.city);
            setValue("phone", cinema.phone);
          } else {
            console.error("No se encontró el cine con el ID proporcionado.");
          }
        } catch (error) {
          console.error("Error al cargar el cine:", error);
        }
      }
    };
    loadCinema();
  }, [params.id, getCinema, setValue]);

  return (
    <div className="flex flex-col">
  {/* Botón en la esquina superior izquierda */}
  <div className="p-4">
    <Link
      to="/dashboard"
      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md"
    >
      Volver al Dashboard
    </Link>
  </div>

  {/* Contenido principal */}
  <div className="flex-1 flex items-center justify-center">
    <Card className="w-full max-w-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Label htmlFor="name">Nombre del Cine</Label>
        <Input {...register("name", { required: true })} />
        {errors.name && <p className="text-red-500 text-xs italic">Requerido</p>}

        <Label htmlFor="address">Dirección</Label>
        <Input {...register("address", { required: true })} />

        <Label htmlFor="city">Ciudad</Label>
        <Input {...register("city", { required: true })} />

        <Label htmlFor="phone">Teléfono</Label>
        <Input {...register("phone", { required: true })} />

        <Button
          type="submit"
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </Button>
      </form>
    </Card>
  </div>
</div>
  );
}
