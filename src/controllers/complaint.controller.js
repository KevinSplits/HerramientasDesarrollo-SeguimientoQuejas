import Complaint from "../models/complaint.model.js";
import Cinema from "../models/cinema.model.js";
import mongoose from "mongoose";

// Obtener todas las quejas del usuario autenticado
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).populate("cinema");
    res.json(complaints);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear nueva queja
export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, cinema } = req.body;

    // Validar ObjectId del cine
    if (!mongoose.Types.ObjectId.isValid(cinema)) {
      return res.status(400).json({ message: "ID de cine inválido" });
    }

    // Verificar que el cine exista
    const existingCinema = await Cinema.findById(cinema);
    if (!existingCinema) {
      return res.status(404).json({ message: "Cine no encontrado" });
    }

    const newComplaint = new Complaint({
      title,
      description,
      category,
      cinema,
      user: req.user.id,
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Ver una queja individual
export const getComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate("cinema");
    if (!complaint) return res.status(404).json({ message: "Queja no encontrada" });

    if (complaint.user.toString() !== req.user.id)
      return res.status(403).json({ message: "No autorizado" });

    return res.json(complaint);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar cualquier campo de una queja (sin verificar rol)
export const updateComplaint = async (req, res) => {
  try {
    const { cinema } = req.body;

    // Si se actualiza el cine, validar
    if (cinema) {
      if (!mongoose.Types.ObjectId.isValid(cinema)) {
        return res.status(400).json({ message: "ID de cine inválido" });
      }

      const existingCinema = await Cinema.findById(cinema);
      if (!existingCinema) {
        return res.status(404).json({ message: "Cine no encontrado" });
      }
    }

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Queja no encontrada" });

    res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar una queja (solo propietario puede eliminar)
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Queja no encontrada" });

    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "No autorizado para eliminar esta queja" });
    }

    await complaint.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
