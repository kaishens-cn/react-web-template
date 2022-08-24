import '@/app.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = createRoot(document.getElementById('root')!);

const App = () => {
  return <div>77</div>;
};

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
