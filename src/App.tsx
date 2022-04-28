import React from 'react';
import './App.css';

import Router from './router/router';
import WalletContainer from './provider/WalletContainer';
import { AppProvider } from './components/context/app-context';

function App() {
  return (
    <div className="App overflow-hidden">
      <WalletContainer>
        <AppProvider>
          <Router/>
        </AppProvider>
      </WalletContainer>
    </div>
  );
}

export default App;
