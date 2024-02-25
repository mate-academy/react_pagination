import { HashRouter } from 'react-router-dom';
import { Query } from './pages/query';

export const App = () => {
  return (
    <HashRouter basename="/">
      <Query />
    </HashRouter>
  );
};

export default App;
