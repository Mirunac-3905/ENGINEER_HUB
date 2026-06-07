import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const getAuthHeader = () => ({
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export const taskService = {
  async getTasks() {
    const res = await axios.get(
      API_URL,
      getAuthHeader()
    );

    return res.data.tasks.map(task => ({
      ...task,
      id: task._id,
    }));
  },

  async addTask(taskData) {
    const res = await axios.post(
      API_URL,
      taskData,
      getAuthHeader()
    );

    return {
      ...res.data.task,
      id: res.data.task._id,
    };
  },

  async updateTask(id, updates) {
    const res = await axios.put(
      `${API_URL}/${id}`,
      updates,
      getAuthHeader()
    );

    return {
      ...res.data.task,
      id: res.data.task._id,
    };
  },

  async deleteTask(id) {
    await axios.delete(
      `${API_URL}/${id}`,
      getAuthHeader()
    );

    return true;
  },
};