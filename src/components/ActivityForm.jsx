import React, { useState } from 'react';
import { useActivities } from '../context/ActivityContext';

const ActivityForm = () => {
  const { addActivity, isLoading } = useActivities();
  const [activity, setActivity] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
    image: null
  });
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5242880) {
      alert('A imagem deve ser menor que 5MB');
      return;
    }

    setActivity(prev => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activity.title.trim()) {
      alert('O título é obrigatório');
      return;
    }

    await addActivity(activity);
    setActivity({
      title: '',
      description: '',
      status: 'pending',
      dueDate: '',
      image: null
    });
    setPreview('');
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <h2>Adicionar Nova Atividade</h2>
      
      <div className="form-group">
        <label htmlFor="title">Título*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={activity.title}
          onChange={handleChange}
          required
          placeholder="Digite o título"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={activity.description}
          onChange={handleChange}
          rows="4"
          placeholder="Descreva a atividade"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={activity.status}
            onChange={handleChange}
          >
            <option value="pending">Pendente</option>
            <option value="in-progress">Em Andamento</option>
            <option value="completed">Concluída</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Data Limite</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={activity.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagem (Opcional, máx. 5MB)</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />
          </div>
        )}
      </div>

      <button type="submit" disabled={isLoading} className="btn-primary">
        {isLoading ? 'Salvando...' : 'Adicionar Atividade'}
      </button>
    </form>
  );
};

export default ActivityForm;