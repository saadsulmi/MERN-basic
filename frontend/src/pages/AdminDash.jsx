import React, { useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import UserCard from '../components/UserCard'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers,reset } from '../features/users/userSlice'
import { toast } from 'react-toastify'

function AdminDash() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { admin } = useSelector((state) => state.admin)

    const { users, isLoading, isError, message } = useSelector(
      (state) => state.user
    )


    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(!admin){
            navigate('/admin')
        }
        dispatch(fetchUsers())


        return(()=>{
            dispatch(reset())
        })
    },[isError,navigate,message,dispatch,admin,admin])

  return (
    <div>
        <AdminHeader/>
      <h2>User List</h2>
      {users&&<section className='content'>
        {users.length > 0 ? (
          <div className='goals'>
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <h3>No Users Found</h3>
        )}
      </section>}
    </div>
  )
}

export default AdminDash
