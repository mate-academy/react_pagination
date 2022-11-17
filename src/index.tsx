// import ReactDOM from 'react-dom';
// import { App } from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

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
      <Route path="/">
        <Route index element={<App />} />
        <Route path="/react_pagination/" element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
