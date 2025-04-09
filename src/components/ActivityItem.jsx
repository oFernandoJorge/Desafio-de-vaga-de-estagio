import React, { useState } from 'react';
import { useActivities } from '../context/ActivityContext';
import { Link } from 'react-router-dom';

const ActivityItem = ({ activity, onDragStart, onDragEnd }) => {
  const { updateActivity, deleteActivity } = useActivities();
  const [isEditing, setIsEditing] = useState(false);
  const [editedActivity, setEditedActivity] = useState({ ...activity });
  
  const today = new Date();
  const dueDate = new Date(activity.dueDate);
  const isOverdue = activity.dueDate && dueDate < today && !activity.completed;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedActivity(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateActivity(activity.id, {
      title: editedActivity.title,
      description: editedActivity.description,
      status: editedActivity.status,
      dueDate: editedActivity.dueDate
    });
    setIsEditing(false);
  };

  return (
    <div 
      className={`activity-item ${isOverdue ? 'overdue' : ''} ${activity.completed ? 'completed' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {isEditing ? (
        <form onSubmit={handleSave} className="edit-form">
          <div className="form-group">
            <label>Título*</label>
            <input
              type="text"
              name="title"
              value={editedActivity.title}
              onChange={handleEditChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="description"
              value={editedActivity.description}
              onChange={handleEditChange}
              rows="4"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={editedActivity.status}
                onChange={handleEditChange}
              >
                <option value="pending">Pendente</option>
                <option value="in-progress">Em Andamento</option>
                <option value="completed">Concluída</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Data Limite</label>
              <input
                type="date"
                name="dueDate"
                value={editedActivity.dueDate}
                onChange={handleEditChange}
              />
            </div>
          </div>
          
          <div className="edit-actions">
            <button type="submit" className="btn-save">Salvar</button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="activity-header">
            <h3>{activity.title}</h3>
            <span className={`status-badge ${activity.status}`}>
              {activity.status === 'pending' && 'Pendente'}
              {activity.status === 'in-progress' && 'Em Andamento'}
              {activity.status === 'completed' && 'Concluída'}
            </span>
          </div>
          
          {activity.description && (
            <p className="activity-description">{activity.description}</p>
          )}
          
          {activity.dueDate && (
            <p className="due-date">
              <strong>Prazo:</strong> {new Date(activity.dueDate).toLocaleDateString()}
              {isOverdue && <span className="overdue-label"> (Atrasada)</span>}
            </p>
          )}
          
          {activity.imageUrl && (
            <Link to={`/activity/${activity.id}`}>
              <img 
                src={activity.imageUrl} 
                alt="Visualização da atividade" 
                className="activity-thumbnail"
              />
            </Link>
          )}
          
          <div className="activity-actions">
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn-edit"
            >
              Editar
            </button>
            <button 
              onClick={() => deleteActivity(activity.id)} 
              className="btn-delete"
            >
              Excluir
            </button>
            <Link 
              to={`/activity/${activity.id}`} 
              className="btn-details"
            >
              Detalhes
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityItem;