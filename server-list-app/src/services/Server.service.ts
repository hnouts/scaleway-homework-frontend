import axios from 'axios';
import Server from '../interfaces/Server';

export const getServers = async (): Promise<Server[]> => {
  const response = await axios.get('http://localhost:8000/servers');
  return response.data;
}

export const getServer = async (id: string): Promise<Server> => {
  const response = await axios.get(`http://localhost:8000/servers/${id}`);
  return response.data;
}
