import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// Projects Service
export const projectsService = {
  // Add a new project
  async addProject(projectData) {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  },

  // Update a project
  async updateProject(projectId, updates) {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete a project
  async deleteProject(projectId) {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Get real-time projects
  getProjectsRealtime(callback) {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const projects = [];
      snapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      callback(projects);
    });
  }
};

// Tasks Service
export const tasksService = {
  async addTask(taskData) {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  async updateTask(taskId, updates) {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async deleteTask(taskId) {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  getTasksRealtime(callback) {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const tasks = [];
      snapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      callback(tasks);
    });
  }
};

// Learning Service
export const learningService = {
  async addLearningItem(itemData) {
    try {
      const docRef = await addDoc(collection(db, 'learning'), {
        ...itemData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding learning item:', error);
      throw error;
    }
  },

  async updateLearningItem(itemId, updates) {
    try {
      const itemRef = doc(db, 'learning', itemId);
      await updateDoc(itemRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating learning item:', error);
      throw error;
    }
  },

  async deleteLearningItem(itemId) {
    try {
      await deleteDoc(doc(db, 'learning', itemId));
    } catch (error) {
      console.error('Error deleting learning item:', error);
      throw error;
    }
  },

  getLearningItemsRealtime(callback) {
    const q = query(collection(db, 'learning'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      callback(items);
    });
  }
};

// Notes Service
export const notesService = {
  async addNote(noteData) {
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        ...noteData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  async updateNote(noteId, updates) {
    try {
      const noteRef = doc(db, 'notes', noteId);
      await updateDoc(noteRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  async deleteNote(noteId) {
    try {
      await deleteDoc(doc(db, 'notes', noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  getNotesRealtime(callback) {
    const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const notes = [];
      snapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      callback(notes);
    });
  }
};

// Career Service
export const careerService = {
  async addCareerItem(itemData) {
    try {
      const docRef = await addDoc(collection(db, 'career'), {
        ...itemData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding career item:', error);
      throw error;
    }
  },

  async updateCareerItem(itemId, updates) {
    try {
      const itemRef = doc(db, 'career', itemId);
      await updateDoc(itemRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating career item:', error);
      throw error;
    }
  },

  async deleteCareerItem(itemId) {
    try {
      await deleteDoc(doc(db, 'career', itemId));
    } catch (error) {
      console.error('Error deleting career item:', error);
      throw error;
    }
  },

  getCareerItemsRealtime(callback) {
    const q = query(collection(db, 'career'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      callback(items);
    });
  }
}; 