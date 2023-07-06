import React from 'react'
import { useState, useEffect } from 'react'
import { FaAtlassian } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminLogin , reset } from '../features/adminAuth/adminSlice'
import Spinner from '../components/Spinner'
import AdminHeader from '../components/AdminHeader'

function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      })
    
      const { email, password } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const { admin, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.admin
      )
    
      useEffect(async() => {

        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || admin) {
          navigate('/admin/dash')
        }

        return(
          dispatch(reset())
        )
      }, [admin, isError, isSuccess, message, navigate, dispatch])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          email,
          password,
        }
    
        dispatch(adminLogin(userData))
      }
    
      if (isLoading) {
        return <Spinner />
      }
    
      return (
        <>
         <AdminHeader/>
          <section className='heading'>
            <h1>
              <FaAtlassian /> Admin
            </h1>
            <p>Login as Admin</p>
          </section>
    
          <section className='form'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
              </div>
    
              <div className='form-group'>
                <button type='submit' className='btn btn-block'>
                  Submit
                </button>
              </div>
            </form>
          </section>
        </>
      )
}

export default AdminLogin
