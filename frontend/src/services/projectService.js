import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createProject = async (projectData, token) => {
    const response = await axios.post(`${API_URL}/projects`, projectData,{
        headers:{Authorization: `Bearer ${token}`}
    });

    return response.data;
}

export const getUserProjects = async(token)=>{
    const response = await axios.get(`${API_URL}/projects/my-projects`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return response.data;
}