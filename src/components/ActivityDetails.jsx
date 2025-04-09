import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useActivities } from '../context/ActivityContext';

const ActivityDetails = () => {
  const { id } = useParams();
  const { activities } = useActivities();
  const activity = activities.find(a => a.id === Number(id));

  if (!activity) {
    return (
      <div className="activity-details">
        <p>Atividade não encontrada!</p>
        <Link to="/" className="back-link">← Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div className="activity-details">
      <Link to="/" className="back-link">← Voltar para lista</Link>
      
      <div className="detail-header">
        <h2>{activity.title}</h2>
        <span className={`status-badge ${activity.status}`}>
          {activity.status === 'pending' && 'Pendente'}
          {activity.status === 'in-progress' && 'Em Andamento'}
          {activity.status === 'completed' && 'Concluída'}
        </span>
      </div>
      
      <div className="detail-content">
        <div className="detail-section">
          <h3>Descrição</h3>
          <p>{activity.description || 'Nenhuma descrição fornecida'}</p>
        </div>
        
        <div className="detail-section">
          <h3>Detalhes</h3>
          <p><strong>Criado em:</strong> {new Date(activity.createdAt).toLocaleDateString()}</p>
          {activity.dueDate && (
            <p><strong>Data limite:</strong> {new Date(activity.dueDate).toLocaleDateString()}</p>
          )}
        </div>
        
        {activity.imageUrl && (
          <div className="detail-section">
            <h3>Anexo</h3>
            <img 
              src={activity.imageUrl} 
              alt="Imagem da atividade" 
              className="detail-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetails;