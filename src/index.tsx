import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="/1" replace />} />
        <Route path=":pageNumber" element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
