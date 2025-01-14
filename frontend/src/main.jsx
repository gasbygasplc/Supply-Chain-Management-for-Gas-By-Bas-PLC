import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import GasContectProvider from './Context/GasContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GasContectProvider>
      <App/>
    </GasContectProvider>
  </BrowserRouter>,
)
