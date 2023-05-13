import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AuthProvider from './context/AuthProvider';
import * as serviceWorker from './serviceWorker';
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//      <AuthProvider>
//    <App />
//      </AuthProvider>
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <App />
  </AuthProvider>
);
serviceWorker.unregister();