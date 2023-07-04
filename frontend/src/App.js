import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminHeader from './components/AdminHeader'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import firebase from './firebase/config';
import { FirebaseContext } from './app/firebaseContext'
import AdminLogin from './pages/AdminLogin'
import AdminDash from './pages/AdminDash'

function App() {
  return (
    <>
      <Router>
        <div className='container'>

            <FirebaseContext.Provider value={{firebase}}>
          <Routes>
            <Route path='/'>
              <Route index element={<Dashboard />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='profile' element={<Profile />} />
              <Route path='profileEdit' element={<EditProfile/>} />
            </Route>
            <Route path='/admin/'>
              <Route index element={<AdminLogin />} />
              <Route path='dash' element={<AdminDash/>} />
            </Route>
            <Route path='*' element={<h1>Page Not Found</h1>} />
            
          </Routes>
            </FirebaseContext.Provider>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
