import axios from 'axios';
import Server from '../interfaces/Server';

export const getServers = async (): Promise<Server[] | null> => {
  try {
  const response = await axios.get('http://localhost:8000/servers');
  return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getServer = async (id: string): Promise<Server | null> => {
  try {
  const response = await axios.get(`http://localhost:8000/servers/${id}`);
  return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
