import { FaSignInAlt, FaSignOutAlt, FaUser,FaMastodon } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout,reset } from '../features/adminAuth/adminSlice'

function AdminHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.admin)

  const onLogout = () => {
    dispatch(adminLogout())
    dispatch(reset())
    navigate('/admin')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <FaMastodon style={{fontSize:'30px',color:'grey'}}/>
        </Link>
      </div>
      <div>
        <h1 style={{marginLeft:'120px',color:'grey'}} >Welcome Admin</h1>
      </div>
      <ul>
        {admin ? (
         <> 
           <li>
            <button className='btn' style={{background:'grey',border:'none'}} onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
         
         </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt />User Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default AdminHeader
