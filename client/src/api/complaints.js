import axios from "./axios";
export const getComplaintsRequest = async () => axios.get("/complaints");
export const createComplaintRequest = async (complaint) => axios.post("/complaints", complaint);
export const updateComplaintRequest = async (complaint) => axios.put(`/complaints/${complaint._id}`, complaint);
export const deleteComplaintRequest = async (id) => axios.delete(`/complaints/${id}`);
export const getComplaintRequest = async (id) => axios.get(`/complaints/${id}`);
