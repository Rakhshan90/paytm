import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import { RecoilRoot } from 'recoil'
import ProtectedRoutes from './components/navigation/ProtectedRoutes'
import UpdateProfile from './pages/UpdateProfile'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<RecoilRoot> <Signup /> </RecoilRoot>} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/' element={<ProtectedRoutes> <Dashboard /> </ProtectedRoutes>} />
        <Route path='/send/:to' element={<ProtectedRoutes> <SendMoney /> </ProtectedRoutes>} />
        <Route path='/update-profile' element={<ProtectedRoutes> <UpdateProfile /> </ProtectedRoutes>} />
      </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
