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
    const {
      title,
      description,
      category,
      cinema,
      cleaningArea,
      cleaningType,
      cleaningStaffPresent,
      attentionArea,
      staffBehavior,
      staffDescription,
      roomNumber,
      technicalIssue,
      movieInterrupted,
      productAffected,
      foodIssue,
      purchaseDate,
      purchaseLocation,
      transactionNumber,
      paymentIssue,
      infrastructureIssue,
      reportedToStaff,
      attachEvidence,
      securityIncident,
      securityIntervention,
      physicalRisk,
      platform,
      appIssue,
      appScreenshot,
    } = req.body;

    // Validar ObjectId del cine
    if (!mongoose.Types.ObjectId.isValid(cinema)) {
      return res.status(400).json({ message: "ID de cine inválido" });
    }

    // Verificar que el cine exista
    const existingCinema = await Cinema.findById(cinema);
    if (!existingCinema) {
      return res.status(404).json({ message: "Cine no encontrado" });
    }

    // Crear la nueva queja con los campos dinámicos
    const newComplaint = new Complaint({
      title,
      description,
      category,
      cinema,
      user: req.user.id,
      cleaningArea: category === "limpieza" ? cleaningArea : undefined,
      cleaningType: category === "limpieza" ? cleaningType : undefined,
      cleaningStaffPresent: category === "limpieza" ? cleaningStaffPresent : undefined,
      attentionArea: category === "atencion" ? attentionArea : undefined,
      staffBehavior: category === "atencion" ? staffBehavior : undefined,
      staffDescription: category === "atencion" ? staffDescription : undefined,
      roomNumber: category === "fallas-tecnicas" ? roomNumber : undefined,
      technicalIssue: category === "fallas-tecnicas" ? technicalIssue : undefined,
      movieInterrupted: category === "fallas-tecnicas" ? movieInterrupted : undefined,
      productAffected: category === "alimentos-bebidas" ? productAffected : undefined,
      foodIssue: category === "alimentos-bebidas" ? foodIssue : undefined,
      purchaseDate: category === "alimentos-bebidas" ? purchaseDate : undefined,
      purchaseLocation: category === "compra-entradas" ? purchaseLocation : undefined,
      transactionNumber: category === "compra-entradas" ? transactionNumber : undefined,
      paymentIssue: category === "compra-entradas" ? paymentIssue : undefined,
      infrastructureIssue: category === "infraestructura" ? infrastructureIssue : undefined,
      reportedToStaff: category === "infraestructura" ? reportedToStaff : undefined,
      attachEvidence: category === "infraestructura" ? attachEvidence : undefined,
      securityIncident: category === "seguridad" ? securityIncident : undefined,
      securityIntervention: category === "seguridad" ? securityIntervention : undefined,
      physicalRisk: category === "seguridad" ? physicalRisk : undefined,
      platform: category === "fallas-app" ? platform : undefined,
      appIssue: category === "fallas-app" ? appIssue : undefined,
      appScreenshot: category === "fallas-app" ? appScreenshot : undefined,
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
    if (!complaint) {
      return res.status(404).json({ message: "Queja no encontrada" });
    }
    res.json(complaint);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar una queja
export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      cinema,
      cleaningArea,
      cleaningType,
      cleaningStaffPresent,
      attentionArea,
      staffBehavior,
      staffDescription,
      roomNumber,
      technicalIssue,
      movieInterrupted,
      productAffected,
      foodIssue,
      purchaseDate,
      purchaseLocation,
      transactionNumber,
      paymentIssue,
      infrastructureIssue,
      reportedToStaff,
      attachEvidence,
      securityIncident,
      securityIntervention,
      physicalRisk,
      platform,
      appIssue,
      appScreenshot,
    } = req.body;

    // Validar ObjectId del cine
    if (!mongoose.Types.ObjectId.isValid(cinema)) {
      return res.status(400).json({ message: "ID de cine inválido" });
    }

    // Verificar que el cine exista
    const existingCinema = await Cinema.findById(cinema);
    if (!existingCinema) {
      return res.status(404).json({ message: "Cine no encontrado" });
    }

    // Actualizar la queja con los campos dinámicos
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        cinema,
        cleaningArea: category === "limpieza" ? cleaningArea : undefined,
        cleaningType: category === "limpieza" ? cleaningType : undefined,
        cleaningStaffPresent: category === "limpieza" ? cleaningStaffPresent : undefined,
        attentionArea: category === "atencion" ? attentionArea : undefined,
        staffBehavior: category === "atencion" ? staffBehavior : undefined,
        staffDescription: category === "atencion" ? staffDescription : undefined,
        roomNumber: category === "fallas-tecnicas" ? roomNumber : undefined,
        technicalIssue: category === "fallas-tecnicas" ? technicalIssue : undefined,
        movieInterrupted: category === "fallas-tecnicas" ? movieInterrupted : undefined,
        productAffected: category === "alimentos-bebidas" ? productAffected : undefined,
        foodIssue: category === "alimentos-bebidas" ? foodIssue : undefined,
        purchaseDate: category === "alimentos-bebidas" ? purchaseDate : undefined,
        purchaseLocation: category === "compra-entradas" ? purchaseLocation : undefined,
        transactionNumber: category === "compra-entradas" ? transactionNumber : undefined,
        paymentIssue: category === "compra-entradas" ? paymentIssue : undefined,
        infrastructureIssue: category === "infraestructura" ? infrastructureIssue : undefined,
        reportedToStaff: category === "infraestructura" ? reportedToStaff : undefined,
        attachEvidence: category === "infraestructura" ? attachEvidence : undefined,
        securityIncident: category === "seguridad" ? securityIncident : undefined,
        securityIntervention: category === "seguridad" ? securityIntervention : undefined,
        physicalRisk: category === "seguridad" ? physicalRisk : undefined,
        platform: category === "fallas-app" ? platform : undefined,
        appIssue: category === "fallas-app" ? appIssue : undefined,
        appScreenshot: category === "fallas-app" ? appScreenshot : undefined,
      },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Queja no encontrada" });
    }

    res.json(updatedComplaint);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar una queja
export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return res.status(404).json({ message: "Queja no encontrada" });
    }

    res.json({ message: "Queja eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
