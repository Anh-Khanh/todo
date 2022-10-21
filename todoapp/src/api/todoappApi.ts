import axiosClient from "./axiosClient";
import axios from "axios"

interface itodoapp {
  name?: string,
  categoryId?: string,
  startDate?: string,
  endDate?: string,
  createdAt?: string,
  updatedAt?: string,
  id?: number;
  title?: string,
  status?: string,
}
const todoappApi = {
  async getAll() {
    const response = await axiosClient.get("tasks");
    return response.data;
  },

  add(data: itodoapp) {
    const url = "http://localhost:3001/tasks";
    return axios.post(url, data);
  },

  update(data:itodoapp) {
    const url = `http://localhost:3001/tasks/${data.id}`;
    return axios.patch(url, data);
  },
    remove(id:string) {
      const url = `/tasks/${id}/`;
      return axiosClient.delete(url);
    },
};

export default todoappApi;
