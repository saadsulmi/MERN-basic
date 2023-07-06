import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfile, updateProfile,reset } from '../features/profile/profileSlice';
import Spinner from '../components/Spinner';
import { FirebaseContext } from '../app/firebaseContext';
import Header from '../components/Header';

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {firebase} = useContext(FirebaseContext)
   const [newimage,setImage]=useState(null)

    const {user} = useSelector(state=>state.auth)
    const { userProfile, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.profile
      )
    console.log(userProfile);
    const [formData,setFormData] = useState({
        name:userProfile&&userProfile.name?userProfile.name:'',
        email:userProfile&&userProfile.email?userProfile.email:'',
        image:userProfile&&userProfile.image?userProfile.image:null
    })
    const { name, email, image } = formData

    useEffect(async()=>{
        if(isError){
            toast.error(message)
        }
        if(!user){
            navigate('/login')
        }

        await dispatch(getProfile())

        return(
          dispatch(reset())
        )

    },[user,navigate,dispatch,message,isError])

    if(isLoading){
       return  <Spinner/>
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
      



      const handleSubmit= async(e)=>{
        e.preventDefault();
        const myUrl = ''
        try {
          const date = new Date()
          console.log("im herer");
           if(newimage){
             await firebase.storage().ref(`/image/${newimage.name}`).put(newimage)
              .then(({ ref }) => {
                ref.getDownloadURL().then(async (url )=> {
                  await dispatch(updateProfile({
                    name: formData.name,
                    email: formData.email,
                    image: url,
                  }));
                })
              })
           }else{
            await dispatch(updateProfile({
              name: formData.name,
              email: formData.email,
              image : formData.image
            }));
           }


         
          console.log('whats up'+myUrl);
          navigate('/profile')
        } catch (error) {
          toast.error('Error uploading File')
        }
      }


  return (
    <div>
              <Header />
    <h1>Edit Profile</h1>
    
  
    <div className="form">
            <form>
            <div className='heading'>
                
                {formData && <img src={formData.image&&newimage?URL.createObjectURL(newimage):(formData.image?formData.image:'https://cdn-icons-png.flaticon.com/512/666/666201.png')} alt="Profile Image" />}
                  <div className='form-group'>
                      <input
                          type='text'
                          className='form-control'
                          id='name'
                          name='name'
                          value={name}
                          placeholder='Please Enter a Name'
                          onChange={onChange}
                          required
                      />
                  </div>
                  <div className='form-group'>
                        <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange}
                        required
                        />
                  </div>
                  <div style={{marginBottom:'-20px'}} className='form-group'>
                        <input
                        type='file'
                        className='form-control'
                        id='image'
                        name='image'
                        onChange={(e)=>setImage(e.target.files[0])}
                        />
                  </div>
                            
                </div>
                <button style={{background:'green',marginBottom:'30px'}} className='btn btn-block' onClick={handleSubmit} >UPDATE USER</button>
           
            </form>
    </div>
  
 
  </div>
  )
}

export default EditProfile
