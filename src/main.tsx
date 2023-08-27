import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from "react-router-dom";

// import { SmartAccountProvider  } from './contexts/SmartAccountAcontext'
// import { Web3AuthProvider } from './contexts/SocialLoginContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <Toaster position='top-center' reverseOrder={false} />
    <Router>
      <App />
    </Router>
  </Provider>
  </React.StrictMode>,
)