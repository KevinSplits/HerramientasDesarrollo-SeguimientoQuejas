import Cinema from "../models/cinema.model.js";

// Obtener todos los cines
export const getCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find(); // Busca todos los cines
    res.json(cinemas); // Devuelve los cines como JSON
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Maneja errores
  }
};

// Crear un cine
export const createCinema = async (req, res) => {
  try {
    const { name, address, city, phone } = req.body; // Extrae los datos del cuerpo
    const newCinema = new Cinema({ name, address, city, phone }); // Crea un nuevo cine
    await newCinema.save(); // Guarda el cine en la base de datos
    res.status(201).json(newCinema); // Devuelve el cine creado con un código 201
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Maneja errores
  }
};

// Actualizar un cine
export const updateCinema = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del cine desde los parámetros
    const { name, address, city, phone } = req.body; // Extrae los datos del cuerpo
    const updatedCinema = await Cinema.findByIdAndUpdate(
      id,
      { name, address, city, phone }, // Datos a actualizar
      { new: true } // Devuelve el documento actualizado
    );
    if (!updatedCinema) {
      return res.status(404).json({ message: "Cine no encontrado" }); // Si no existe, devuelve 404
    }
    res.json(updatedCinema); // Devuelve el cine actualizado como JSON
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Maneja errores
  }
};

// Eliminar un cine
export const deleteCinema = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del cine desde los parámetros
    const deletedCinema = await Cinema.findByIdAndDelete(id); // Elimina el cine
    if (!deletedCinema) {
      return res.status(404).json({ message: "Cine no encontrado" }); // Si no existe, devuelve 404
    }
    res.sendStatus(204); // Devuelve 204 si se elimina correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Maneja errores
  }
};