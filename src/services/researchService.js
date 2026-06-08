import axios from "axios";

const API_URL = "http://localhost:5000/api/research";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const researchService = {
  async getResearchTopics() {
    const res = await axios.get(API_URL, getAuthHeader());
    return res.data.topics.map((topic) => ({
      ...topic,
      id: topic._id,
    }));
  },

  async getResearchTopicById(id) {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeader());
    return {
      ...res.data.topic,
      id: res.data.topic._id,
    };
  },

  async addResearchTopic(topicData) {
    const res = await axios.post(API_URL, topicData, getAuthHeader());
    return {
      ...res.data.topic,
      id: res.data.topic._id,
    };
  },

  async updateResearchTopic(id, updates) {
    const res = await axios.put(`${API_URL}/${id}`, updates, getAuthHeader());
    return {
      ...res.data.topic,
      id: res.data.topic._id,
    };
  },

  async deleteResearchTopic(id) {
    await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return true;
  },
};
