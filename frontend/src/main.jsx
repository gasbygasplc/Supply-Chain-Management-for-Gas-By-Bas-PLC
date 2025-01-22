import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import GasContectProvider from './Context/GasContext.jsx'
import OutletContextProvider from './Context/OutletContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>

    <GasContectProvider>

      <OutletContextProvider>

        <App/>

      </OutletContextProvider>

    </GasContectProvider>

  </BrowserRouter>,

)
