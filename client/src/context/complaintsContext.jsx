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
      const res = await createComplaintRequest(complaint);
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
      await updateComplaintRequest(id, complaint);
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
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}
