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
import { db, auth } from './config';

// Projects Service
export const projectsService = {
  // Add a new project
  async addProject(projectData) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to add projects');
      }
      
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        userId: user.uid,
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to update projects');
      }
      
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to delete projects');
      }
      
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Get real-time projects
  getProjectsRealtime(callback) {
    const user = auth.currentUser;
    if (!user) {
      console.warn('User not authenticated, returning empty projects');
      callback([]);
      return () => {}; // Return empty unsubscribe function
    }
    
    const q = query(
      collection(db, 'projects'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, 
      (snapshot) => {
        const projects = [];
        snapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...doc.data() });
        });
        callback(projects);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        callback([]);
      }
    );
  }
};

// Tasks Service
export const tasksService = {
  async addTask(taskData) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to add tasks');
      }
      
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        userId: user.uid,
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to update tasks');
      }
      
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to delete tasks');
      }
      
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  getTasksRealtime(callback) {
    const user = auth.currentUser;
    if (!user) {
      console.warn('User not authenticated, returning empty tasks');
      callback([]);
      return () => {};
    }
    
    const q = query(
      collection(db, 'tasks'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, 
      (snapshot) => {
        const tasks = [];
        snapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });
        callback(tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        callback([]);
      }
    );
  }
};

// Learning Service
export const learningService = {
  async addLearningItem(itemData) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to add learning items');
      }
      
      const docRef = await addDoc(collection(db, 'learning'), {
        ...itemData,
        userId: user.uid,
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to update learning items');
      }
      
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to delete learning items');
      }
      
      await deleteDoc(doc(db, 'learning', itemId));
    } catch (error) {
      console.error('Error deleting learning item:', error);
      throw error;
    }
  },

  getLearningItemsRealtime(callback) {
    const user = auth.currentUser;
    if (!user) {
      console.warn('User not authenticated, returning empty learning items');
      callback([]);
      return () => {};
    }
    
    const q = query(
      collection(db, 'learning'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, 
      (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        callback(items);
      },
      (error) => {
        console.error('Error fetching learning items:', error);
        callback([]);
      }
    );
  }
};

// Notes Service
export const notesService = {
  async addNote(noteData) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to add notes');
      }
      
      const docRef = await addDoc(collection(db, 'notes'), {
        ...noteData,
        userId: user.uid,
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to update notes');
      }
      
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to delete notes');
      }
      
      await deleteDoc(doc(db, 'notes', noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  getNotesRealtime(callback) {
    const user = auth.currentUser;
    if (!user) {
      console.warn('User not authenticated, returning empty notes');
      callback([]);
      return () => {};
    }
    
    const q = query(
      collection(db, 'notes'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, 
      (snapshot) => {
        const notes = [];
        snapshot.forEach((doc) => {
          notes.push({ id: doc.id, ...doc.data() });
        });
        callback(notes);
      },
      (error) => {
        console.error('Error fetching notes:', error);
        callback([]);
      }
    );
  }
};

// Career Service
export const careerService = {
  async addCareerItem(itemData) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to add career items');
      }
      
      const docRef = await addDoc(collection(db, 'career'), {
        ...itemData,
        userId: user.uid,
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to update career items');
      }
      
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to delete career items');
      }
      
      await deleteDoc(doc(db, 'career', itemId));
    } catch (error) {
      console.error('Error deleting career item:', error);
      throw error;
    }
  },

  getCareerItemsRealtime(callback) {
    const user = auth.currentUser;
    if (!user) {
      console.warn('User not authenticated, returning empty career items');
      callback([]);
      return () => {};
    }
    
    const q = query(
      collection(db, 'career'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, 
      (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        callback(items);
      },
      (error) => {
        console.error('Error fetching career items:', error);
        callback([]);
      }
    );
  }
}; 