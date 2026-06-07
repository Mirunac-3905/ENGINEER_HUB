import axios from "axios";

const API_URL = "http://localhost:5000/api/learning";

const api = axios.create({
  baseURL: API_URL,
});

// Add auth header to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

export const learningService = {
  // TOPICS
  async getTopics() {
    const res = await api.get("/topics");
    return res.data.map(topic => ({
      ...topic,
      id: topic._id
    }));
  },

  async addTopic(data) {
    const res = await api.post("/topics", data);
    return {
      ...res.data,
      id: res.data._id
    };
  },

  async updateTopic(id, updates) {
    const res = await api.put(`/topics/${id}`, updates);
    return {
      ...res.data,
      id: res.data._id
    };
  },

  async deleteTopic(id) {
    await api.delete(`/topics/${id}`);
    return true;
  },

  // NOTES
  async getNotes(topicId) {
    const res = await api.get(`/topics/${topicId}/notes`);
    return res.data.map(note => ({
      ...note,
      id: note._id
    }));
  },

  async addNote(topicId, data) {
    const res = await api.post(`/topics/${topicId}/notes`, data);
    return {
      ...res.data,
      id: res.data._id
    };
  },

  async updateNote(noteId, updates) {
    const res = await api.put(`/notes/${noteId}`, updates);
    return {
      ...res.data,
      id: res.data._id
    };
  },

  async deleteNote(noteId) {
    await api.delete(`/notes/${noteId}`);
    return true;
  },

  // QUESTIONS
  async getQuestions(topicId) {
    const res = await api.get(`/topics/${topicId}/questions`);
    return res.data.map(q => ({
      ...q,
      id: q._id
    }));
  },

  async addQuestion(topicId, data) {
    const res = await api.post(`/topics/${topicId}/questions`, data);
    return {
      ...res.data,
      id: res.data._id
    };
  },

  async updateQuestion(questionId, updates) {
    const res = await api.put(`/questions/${questionId}`, updates);
    return {
      ...res.data,
      id: res.data._id
    };
  },

  async deleteQuestion(questionId) {
    await api.delete(`/questions/${questionId}`);
    return true;
  },

  // MISTAKES
  async getMistakes(topicId) {
    const res = await api.get(`/topics/${topicId}/mistakes`);
    return res.data.map(m => ({
      ...m,
      id: m._id
    }));
  },

  async addMistake(topicId, data) {
    const res = await api.post(`/topics/${topicId}/mistakes`, data);
    return {
      ...res.data,
      id: res.data._id
    };
  },

  async updateMistake(mistakeId, updates) {
    const res = await api.put(`/mistakes/${mistakeId}`, updates);
    return {
      ...res.data,
      id: res.data._id
    };
  },

  async deleteMistake(mistakeId) {
    await api.delete(`/mistakes/${mistakeId}`);
    return true;
  }
};