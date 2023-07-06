import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, goalReset } from '../features/goals/goalSlice'
import Header from '../components/Header'
import { toast } from 'react-toastify'
import { logout } from '../features/auth/authSlice'
import { getProfile } from '../features/profile/profileSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
    )
    const { userProfile } = useSelector(
      (state) => state.profile
      )
      
      useEffect(async() => {
        if (isError) {
          console.log(message)
        }
        if (!user) {
          navigate('/login')
        }
        if( user.isBlock){
          dispatch(logout())
          toast.error('User is blocked by admin')
        }
        
        dispatch(getGoals())
        await dispatch(getProfile())
    
    return () => {
      dispatch(goalReset())
    }
    
  }, [user,dispatch,isError,navigate,useSelector])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
              <Header />
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
