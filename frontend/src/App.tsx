import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './components/routers';

const App: React.VFC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
