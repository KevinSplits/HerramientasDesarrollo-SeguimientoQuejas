import axios from "./axios";
export const getComplaintsRequest = async () => axios.get("/complaints");
export const createComplaintRequest = async (complaint) => axios.post("/complaints", complaint);
export const updateComplaintRequest = async (id, complaint) => axios.put(`/complaints/${id}`, complaint, { withCredentials: true });
export const deleteComplaintRequest = async (id) => axios.delete(`/complaints/${id}`);
export const getComplaintRequest = async (id) => axios.get(`/complaints/${id}`);
