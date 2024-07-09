import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextAPICart from './Context/ContextAPICart.jsx'
import TokenAuth from './Context/TokenAuth.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextAPICart>
      <TokenAuth>
        <App />
      </TokenAuth>
    </ContextAPICart>
  </React.StrictMode>,
)
