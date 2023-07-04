import { useDispatch } from 'react-redux'
import { blockUser} from '../features/users/userSlice'
import { useEffect } from 'react'

function UserCard({ user }) {
  useEffect(()=>{
    
  })
  const dispatch = useDispatch()
  let id = {id:user._id}
  

  return (
    <div className='goal'>
      <img className='gImage' src={user.image?user.image:'https://cdn-icons-png.flaticon.com/512/666/666201.png'} alt="" />
      <div><p style={{fontSize:'0.8em'}}>{new Date(user.createdAt).toLocaleString('en-US')}</p></div>

      <h2>{user.name}</h2>
      <button onClick={() => dispatch(blockUser(id))} className={user.isBlock?'blockUser':'unblockUser'}>
       {user.isBlock?'unblock':'block'}
      </button>
      <h3 style={{marginTop:'-15px'}}>{user.email}</h3>

    </div>
  )
}

export default UserCard
