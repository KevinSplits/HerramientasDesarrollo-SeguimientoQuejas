import { createContext, useContext, useState } from "react";
import {
  createComplaintRequest,
  deleteComplaintRequest,
  getComplaintsRequest,
  getComplaintRequest,
  updateComplaintRequest,
} from "../api/complaints";

const ComplaintContext = createContext();

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) throw new Error("useComplaints must be used within a ComplaintProvider");
  return context;
};

export function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    const res = await getComplaintsRequest();
    setComplaints(res.data);
  };

  const getUserComplaints = async () => {
    try {
      const res = await getComplaintsRequest();
      console.log("✅ Quejas recibidas del backend:", res.data);

      const userId = localStorage.getItem("userId");
      console.log("🧠 ID del usuario logeado (localStorage):", userId);

      const userComplaints = res.data.filter((c) => {
        const complaintUserId = typeof c.user === "string" ? c.user : c.user?._id;
        console.log("🔍 Comparando:", complaintUserId, "===", userId);
        return complaintUserId === userId;
      });

      console.log("📦 Quejas filtradas:", userComplaints);

      return userComplaints;
    } catch (error) {
      console.error("❌ Error en getUserComplaints:", error);
      return [];
    }
  };

  const deleteComplaint = async (id) => {
    try {
      const res = await deleteComplaintRequest(id);
      if (res.status === 204) setComplaints(complaints.filter((c) => c._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createComplaint = async (complaint) => {
    try {
      // Aquí preprocesas los datos recibidos
      const userId = localStorage.getItem("userId") || "demoUserId";
      const cleanData = { ...complaint, user: userId };

      // Limpiar campos vacíos o inválidos
      Object.keys(cleanData).forEach((key) => {
        if (
          cleanData[key] === "" ||
          cleanData[key] === null ||
          cleanData[key] === undefined
        ) {
          delete cleanData[key];
        }
      });

      // Manejar purchaseDate
      if (cleanData.purchaseDate) {
        const d = new Date(cleanData.purchaseDate);
        if (isNaN(d.getTime())) {
          delete cleanData.purchaseDate;
        } else {
          cleanData.purchaseDate = d.toISOString();
        }
      }

      // Manejar appScreenshot si es un File o null
      if (cleanData.appScreenshot instanceof File || cleanData.appScreenshot == null) {
        delete cleanData.appScreenshot;
      }

      const res = await createComplaintRequest(cleanData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  const getComplaint = async (id) => {
    try {
      const res = await getComplaintRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateComplaint = async (id, complaint) => {
    try {
      const data = { ...complaint };

      // ✅ Si 'cinema' es un objeto, lo reemplazamos por su ID
      if (data.cinema && typeof data.cinema === "object" && data.cinema._id) {
        data.cinema = data.cinema._id;
      }

      const res = await updateComplaintRequest(id, data);
      // Actualiza el array global de complaints
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? res.data : c))
      );

      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        getComplaints,
        deleteComplaint,
        createComplaint,
        getComplaint,
        updateComplaint,
        getUserComplaints,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}