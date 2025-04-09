import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza o título principal', () => {
  render(<App />);
  expect(screen.getByText('Gerenciador de Atividades')).toBeInTheDocument();
});