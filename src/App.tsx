import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
