import axios from "axios";

const url = "http://localhost:3001/properties";

export const getallProperties = async (id) => {
  id = id || "";
 

  return await axios.get(`${url}/${id}`);
};

export const addProperty = async (prop) => {
  return await axios.post(url, prop);
};

export const editProperty = async (id, prop) => {
  return await axios.put(`${url}/${id}`, prop);
};

export const deleteProperty = async (id) => {
  return await axios.delete(`${url}/${id}`);
};