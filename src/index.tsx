import ReactDOM from 'react-dom';
import { App } from './App';
import { PageProvider } from './PageContext/PageContext';

ReactDOM.render(
  <PageProvider>
    <App />
  </PageProvider>,
  document.getElementById('root'),
);
