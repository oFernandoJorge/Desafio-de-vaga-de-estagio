import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Converte imagem para Base64
  const getBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }, []);

  // Carrega atividades do localStorage
  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    try {
      const saved = JSON.parse(localStorage.getItem('activities')) || [];
      setActivities(saved);
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salva no localStorage
  const saveActivities = useCallback(async (updatedActivities) => {
    try {
      localStorage.setItem('activities', JSON.stringify(updatedActivities));
    } catch (error) {
      console.error("Erro ao salvar atividades:", error);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Adiciona nova atividade
  const addActivity = useCallback(async (activity) => {
    const imageBase64 = activity.image ? await getBase64(activity.image) : null;
    
    const newActivity = {
      ...activity,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: activity.status === 'completed',
      imageUrl: imageBase64
    };

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    await saveActivities(updatedActivities);
  }, [activities, saveActivities, getBase64]);

  // Atualiza atividade existente
  const updateActivity = useCallback(async (id, updatedData) => {
    setActivities(prevActivities => {
      const updatedActivities = prevActivities.map(activity => {
        if (activity.id === id) {
          return { 
            ...activity, 
            ...updatedData,
            completed: updatedData.status === 'completed' || activity.completed
          };
        }
        return activity;
      });
      saveActivities(updatedActivities);
      return updatedActivities;
    });
  }, [saveActivities]);

  // Remove atividade
  const deleteActivity = useCallback(async (id) => {
    setActivities(prevActivities => {
      const updatedActivities = prevActivities.filter(activity => activity.id !== id);
      saveActivities(updatedActivities);
      return updatedActivities;
    });
  }, [saveActivities]);

  // Muda status (drag-and-drop)
  const changeStatus = useCallback(async (id, newStatus) => {
    setActivities(prevActivities => {
      const updatedActivities = prevActivities.map(activity => {
        if (activity.id === id) {
          return { 
            ...activity, 
            status: newStatus,
            completed: newStatus === 'completed'
          };
        }
        return activity;
      });
      saveActivities(updatedActivities);
      return updatedActivities;
    });
  }, [saveActivities]);

  return (
    <ActivityContext.Provider value={{
      activities,
      isLoading,
      addActivity,
      updateActivity,
      deleteActivity,
      changeStatus
    }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => useContext(ActivityContext);