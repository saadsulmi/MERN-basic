import axios from 'axios'

const API_URL = '/api/admin/'



// Login admin
const adminLogin = async (adminData) => {
  const response = await axios.post(API_URL , adminData)

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data))
  }

  return response.data
}

// Logout admin
const adminLogout = () => {
  localStorage.removeItem('admin')
}

const authService = {
  adminLogout,
  adminLogin,
}

export default authService
