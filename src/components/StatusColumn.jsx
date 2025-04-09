import React, { useState } from 'react';
import ActivityItem from './ActivityItem';
import { useActivities } from '../context/ActivityContext';

const StatusColumn = ({ status, title, activities }) => {
  const { changeStatus } = useActivities();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHighlighted(true);
  };

  const handleDragLeave = () => {
    setIsHighlighted(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHighlighted(false);
    const activityId = parseInt(e.dataTransfer.getData('activityId'));
    changeStatus(activityId, status);
  };

  return (
    <div 
      className={`status-column ${isHighlighted ? 'highlight' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3>{title} <span>({activities.length})</span></h3>
      <div className="activities-container">
        {activities.map(activity => (
          <ActivityItem 
            key={activity.id} 
            activity={activity} 
            onDragStart={(e) => {
              e.dataTransfer.setData('activityId', activity.id);
              e.currentTarget.classList.add('dragging');
            }}
            onDragEnd={(e) => {
              e.currentTarget.classList.remove('dragging');
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusColumn;