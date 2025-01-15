import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

export const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
