import React from 'react';
import { useActivities } from '../context/ActivityContext';
import StatusColumn from './StatusColumn';

const ActivityList = () => {
  const { activities } = useActivities();

  return (
    <div className="activity-board">
      <StatusColumn 
        status="pending" 
        title="Pendentes" 
        activities={activities.filter(a => a.status === 'pending')} 
      />
      <StatusColumn 
        status="in-progress" 
        title="Em Andamento" 
        activities={activities.filter(a => a.status === 'in-progress')} 
      />
      <StatusColumn 
        status="completed" 
        title="Concluídas" 
        activities={activities.filter(a => a.status === 'completed')} 
      />
    </div>
  );
};

export default ActivityList;