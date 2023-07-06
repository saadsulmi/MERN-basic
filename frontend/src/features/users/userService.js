import axios from "axios";

const API_URL = '/api/admin'

const fetchUsers = async (token)=>{
    const config = {
        headers :{
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)
    console.log(response.data);
    return response.data;
}

const blockUser=async (userId,token) =>{
    const config ={
        headers :{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL,userId,config);
    console.log(response.data);
    
    return response.data
}

const userService={
    fetchUsers,
    blockUser
}

export default userService