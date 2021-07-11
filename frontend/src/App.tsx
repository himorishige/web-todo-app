import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './components/routers';
import { ToastProvider } from './hooks/useToast';

const App: React.VFC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
