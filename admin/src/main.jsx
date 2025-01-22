import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './Context/AdminContext.jsx'
import AppContextProvider from './Context/AppContext.jsx'
import OutletContextProvider from './Context/OutletContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <AdminContextProvider>

      <OutletContextProvider>

        <AppContextProvider>

          <App/>

        </AppContextProvider>

      </OutletContextProvider>

    </AdminContextProvider>
  
  </BrowserRouter>
)
