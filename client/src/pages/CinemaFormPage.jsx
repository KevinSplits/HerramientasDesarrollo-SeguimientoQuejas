import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
        const cinema = await getCinema(params.id);
        setValue("name", cinema.name);
        setValue("address", cinema.address);
        setValue("city", cinema.city);
        setValue("phone", cinema.phone);
      }
    };
    loadCinema();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="name">Nombre del Cine</Label>
        <Input {...register("name", { required: true })} />
        {errors.name && <p className="text-red-500 text-xs italic">Requerido</p>}

        <Label htmlFor="address">Dirección</Label>
        <Input {...register("address", { required: true })} />

        <Label htmlFor="city">Ciudad</Label>
        <Input {...register("city", { required: true })} />

        <Label htmlFor="phone">Teléfono</Label>
        <Input {...register("phone", { required: true })} />

        <Button>Guardar</Button>
      </form>
    </Card>
  );
}
