import Cinema from "../models/cinema.model.js";

// Obtener todos los cines
export const getCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.json(cinemas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un cine (cualquier usuario autenticado)
export const createCinema = async (req, res) => {
  try {
    const { name, address, city, phone } = req.body;
    const newCinema = new Cinema({ name, address, city, phone });
    await newCinema.save();
    res.json(newCinema);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar cine (cualquier usuario autenticado)
export const updateCinema = async (req, res) => {
  try {
    const { name, address, city, phone } = req.body;
    const updated = await Cinema.findByIdAndUpdate(
      req.params.id,
      { name, address, city, phone },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Cine no encontrado" });
    res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar cine (cualquier usuario autenticado)
export const deleteCinema = async (req, res) => {
  try {
    const deleted = await Cinema.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Cine no encontrado" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
