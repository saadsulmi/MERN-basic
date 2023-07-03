import axios from "axios";

const API_URL = '/api/users/'

//get user profile
const getProfile = async (token)=>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        },
    }

    const response = await axios.get(API_URL+'profile',config)

    return response.data
}

const updateProfile = async (data,token)=>{
    const config ={
        headers :{
            Authorization :`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+'update',data,config)
  
    return response.data
}

const profileService = {
    getProfile,
    updateProfile
}

export default profileService