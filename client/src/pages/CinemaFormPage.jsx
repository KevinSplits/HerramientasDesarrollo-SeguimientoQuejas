import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Label } from "../components/ui";
import { useCinemas } from "../context/cinemasContext";

export function CinemaFormPage() {
  const { createCinema, getCinema, updateCinema } = useCinemas();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadCinema = async () => {
      if (params.id) {
        const cinema = await getCinema(params.id);
        if (cinema) {
          reset({
            name: cinema.name || "",
            address: cinema.address || "",
            city: cinema.city || "",
            phone: cinema.phone || "",
          });
        }
      } else {
        reset({
          name: "",
          address: "",
          city: "",
          phone: "",
        });
      }
      setLoading(false);
    };
    loadCinema();
    // eslint-disable-next-line
  }, [params.id, getCinema, reset]);

  const onSubmit = async (data) => {
    if (params.id) {
      await updateCinema(params.id, data);
    } else {
      await createCinema(data);
    }
    navigate("/cinemas");
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <Link
          to="/dashboard"
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Volver al Dashboard
        </Link>
      </div>
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
