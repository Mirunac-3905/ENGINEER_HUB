import { useState, useEffect } from 'react';
import { projectsService, tasksService, learningService, notesService, careerService } from '../firebase/services';

export const useFirebaseData = (dataType) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const setupRealtimeListener = () => {
      try {
        switch (dataType) {
          case 'projects':
            unsubscribe = projectsService.getProjectsRealtime((projects) => {
              setData(projects);
              setLoading(false);
              setError(null);
            });
            break;
          case 'tasks':
            unsubscribe = tasksService.getTasksRealtime((tasks) => {
              setData(tasks);
              setLoading(false);
              setError(null);
            });
            break;
          case 'learning':
            unsubscribe = learningService.getLearningItemsRealtime((items) => {
              setData(items);
              setLoading(false);
              setError(null);
            });
            break;
          case 'notes':
            unsubscribe = notesService.getNotesRealtime((notes) => {
              setData(notes);
              setLoading(false);
              setError(null);
            });
            break;
          case 'career':
            unsubscribe = careerService.getCareerItemsRealtime((items) => {
              setData(items);
              setLoading(false);
              setError(null);
            });
            break;
          default:
            setError(new Error(`Unknown data type: ${dataType}`));
            setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    setupRealtimeListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dataType]);

  const addItem = async (itemData) => {
    try {
      setError(null);
      switch (dataType) {
        case 'projects':
          return await projectsService.addProject(itemData);
        case 'tasks':
          return await tasksService.addTask(itemData);
        case 'learning':
          return await learningService.addLearningItem(itemData);
        case 'notes':
          return await notesService.addNote(itemData);
        case 'career':
          return await careerService.addCareerItem(itemData);
        default:
          throw new Error(`Unknown data type: ${dataType}`);
      }
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateItem = async (itemId, updates) => {
    try {
      setError(null);
      switch (dataType) {
        case 'projects':
          return await projectsService.updateProject(itemId, updates);
        case 'tasks':
          return await tasksService.updateTask(itemId, updates);
        case 'learning':
          return await learningService.updateLearningItem(itemId, updates);
        case 'notes':
          return await notesService.updateNote(itemId, updates);
        case 'career':
          return await careerService.updateCareerItem(itemId, updates);
        default:
          throw new Error(`Unknown data type: ${dataType}`);
      }
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteItem = async (itemId) => {
    try {
      setError(null);
      switch (dataType) {
        case 'projects':
          return await projectsService.deleteProject(itemId);
        case 'tasks':
          return await tasksService.deleteTask(itemId);
        case 'learning':
          return await learningService.deleteLearningItem(itemId);
        case 'notes':
          return await notesService.deleteNote(itemId);
        case 'career':
          return await careerService.deleteCareerItem(itemId);
        default:
          throw new Error(`Unknown data type: ${dataType}`);
      }
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem
  };
}; 