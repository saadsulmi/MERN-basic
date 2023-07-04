import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { getProfile,reset } from '../features/profile/profileSlice';
import Header from '../components/Header';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth)
    const { userProfile, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.profile
      )
    console.log(userProfile);


    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(!user){
            navigate('/login')
        }

        dispatch(getProfile())

    },[user,navigate,isError])

    if(isLoading){
       return  <Spinner/>
    }
  return (
    <div>
      <Header />

      <h1>My Profile</h1>
    
   <div className="form">
        <div className='heading'>
                {userProfile && <img src={userProfile.image?userProfile.image:'https://cdn-icons-png.flaticon.com/512/666/666201.png'} alt="Profile Image" />}
                {userProfile && userProfile.name && <h4>NAME : {userProfile.name}</h4>}
                {userProfile && userProfile.email && <h4>Email: {userProfile.email}</h4>}
            </div>
            <div className="form-grop">
                <button style={{background:'green'}} className='btn btn-block' onClick={()=>navigate('/profileEdit')}>EDIT USER</button>
            </div>
   </div>
    
   
    </div>
  )
}

export default Profile
