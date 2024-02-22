

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/Authcontext'
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider> {/* Wrap your App with AuthProvider */}
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
