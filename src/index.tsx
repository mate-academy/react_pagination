import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/react_pagination/" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
