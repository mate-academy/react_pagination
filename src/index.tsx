// import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// ReactDOM.render(<App />, document.getElementById('root'));
// createRoot(document.getElementById('root')) as HTMLElement.render(<App />);

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(<App />);
