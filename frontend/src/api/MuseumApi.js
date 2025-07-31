import axiosInstance from "./AxiosInstance"; 

const MUSEUMS_ENDPOINT = "/museums";

export const getMuseums = () => {
  return axiosInstance.get(MUSEUMS_ENDPOINT);
};

export const getMuseumById = (id) => {
  return axiosInstance.get(`${MUSEUMS_ENDPOINT}/${id}`);
};

export const createMuseum = (museumData) => {
  return axiosInstance.post(MUSEUMS_ENDPOINT, museumData);
};

export const updateMuseum = (id, museumData) => {
  return axiosInstance.put(`${MUSEUMS_ENDPOINT}/${id}`, museumData);
};

export const deleteMuseum = (id) => {
  return axiosInstance.delete(`${MUSEUMS_ENDPOINT}/${id}`);
};
