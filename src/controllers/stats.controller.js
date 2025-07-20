import Complaint from "../models/complaint.model.js";
import Cinema from "../models/cinema.model.js";
import mongoose from "mongoose";

export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total de quejas del usuario
    const totalQuejas = await Complaint.countDocuments({ user: userId });

    // Total de cines (se mantiene general, no filtrado por usuario)
    const totalCines = await Cinema.countDocuments();

    // Quejas resueltas y pendientes del usuario
    const resueltas = await Complaint.countDocuments({
      user: userId,
      status: "resuelta",
    });

    const pendientes = await Complaint.countDocuments({
      user: userId,
      $or: [
        { status: "pendiente" },
        { status: { $exists: false } }, // casos antiguos sin estado
      ],
    });

    // Quejas por cine del usuario
    const quejasPorCine = await Complaint.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "cinemas",
          localField: "cinema",
          foreignField: "_id",
          as: "cinemaData",
        },
      },
      { $unwind: "$cinemaData" },
      {
        $group: {
          _id: "$cinema",
          name: { $first: "$cinemaData.name" },
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    // Quejas por categoría del usuario
    const quejasPorCategoria = await Complaint.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },
        },
      },
    ]);

    // Mapeo de nombres más legibles
    const categoriasMap = {
      limpieza: "Limpieza",
      atencion: "Atención del personal",
      "fallas-tecnicas": "Fallas técnicas en sala",
      "alimentos-bebidas": "Alimentos y bebidas",
      "compra-entradas": "Compra de entradas",
      infraestructura: "Infraestructura y accesibilidad física",
      seguridad: "Seguridad",
      "fallas-app": "Fallas en la App / Web del cine",
    };

    const quejasPorCategoriaConNombres = quejasPorCategoria.map((cat) => ({
      name: categoriasMap[cat._id] || cat._id,
      total: cat.total,
      porcentaje: totalQuejas > 0 ? ((cat.total / totalQuejas) * 100).toFixed(2) : "0.00",
    }));

    // Devolver resultados
    res.json({
      totalQuejas,
      totalCines,
      quejasPorCine,
      quejasPorCategoria: quejasPorCategoriaConNombres,
      resueltas,
      pendientes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
};