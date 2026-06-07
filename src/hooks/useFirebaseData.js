import { useState, useEffect } from 'react';
import { notesService, careerService } from '../firebase/services';
import { projectService } from "../services/projectService";
import { taskService } from "../services/taskService";
import { learningService } from "../services/learningService";
export const useFirebaseData = (dataType) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const setupRealtimeListener = () => {
      try {
        switch (dataType) {
          case "projects":
  projectService
    .getProjects()
    .then((projects) => {
      setData(projects);
      setLoading(false);
      setError(null);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });

  unsubscribe = () => {};
  break;
         case "tasks":
  taskService
    .getTasks()
    .then((tasks) => {
      setData(tasks);
      setLoading(false);
      setError(null);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });

  unsubscribe = () => {};
  break;
          case "learning":
  learningService
    .getTopics()
    .then((topics) => {
      setData(topics);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });

  unsubscribe = () => {};
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
  return await projectService.addProject(itemData);
        case 'tasks': {
  const newTask = await taskService.addTask(itemData);

  setData(prev => [...prev, newTask]);

  return newTask;
}
        case 'learning':
          return await learningService.addTopic(itemData);
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
      case 'projects': {
        const updatedProject =
          await projectService.updateProject(
            itemId,
            updates
          );

        setData(prev =>
          prev.map(project =>
            project.id === itemId
              ? updatedProject
              : project
          )
        );

        return updatedProject;
      }

      case 'tasks': {
  const updatedTask = await taskService.updateTask(itemId, updates);

  setData(prev =>
    prev.map(task =>
      task.id === itemId ? updatedTask : task
    )
  );

  return updatedTask;
}

      case "learning":
  return await learningService.updateTopic(
    itemId,
    updates
  );
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
  return await projectService.deleteProject(itemId);
       case 'tasks': {
  await taskService.deleteTask(itemId);

  setData(prev =>
    prev.filter(task => task.id !== itemId)
  );

  return true;
}
        case "learning":
  return await learningService.deleteTopic(
    itemId
  );
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