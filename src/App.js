import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import Register from './components/Register'
import UserInfoScreen from './screens/UserInfoScreen'
import Login from './components/Login'
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userInfo' element={<UserInfoScreen />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
