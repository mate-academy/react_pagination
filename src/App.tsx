import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

export default App;
