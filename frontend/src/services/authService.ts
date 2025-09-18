import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_AUTH;

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${ API_URL }/login`, { username, password });

  return response.data; 
};

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${ API_URL }/register`, { username, password });
  
  return response.data;
};
