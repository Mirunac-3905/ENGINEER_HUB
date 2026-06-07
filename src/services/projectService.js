import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const projectService = {
  async getProjects() {
    const res = await axios.get(API_URL, getAuthHeader());
    return res.data.projects.map(project => ({
  ...project,
  id: project._id
}));
  },

  async addProject(projectData) {
    const res = await axios.post(
      API_URL,
      projectData,
      getAuthHeader()
    );

   return {
  ...res.data.project,
  id: res.data.project._id
};
  },

  async updateProject(id, updates) {
    const res = await axios.put(
      `${API_URL}/${id}`,
      updates,
      getAuthHeader()
    );

    return {
  ...res.data.project,
  id: res.data.project._id
};
  },

  async deleteProject(id) {
    await axios.delete(
      `${API_URL}/${id}`,
      getAuthHeader()
    );

    return true;
  },
};