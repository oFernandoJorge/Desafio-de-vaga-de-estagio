import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ActivityProvider } from './context/ActivityContext';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import ActivityDetails from './components/ActivityDetails';
import './styles/App.css';

function App() {
  return (
    <ActivityProvider>
      <BrowserRouter>
        <div className="app-container">
          <h1>Gerenciador de Atividades</h1>
          <Routes>
            <Route path="/" element={
              <>
                <ActivityForm />
                <ActivityList />
              </>
            } />
            <Route path="/activity/:id" element={<ActivityDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ActivityProvider>
  );
}

export default App;