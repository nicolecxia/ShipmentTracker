import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCarriers = async () => {
  const response = await axios.get(`${API_BASE_URL}/carriers`);

  return response.data;
};