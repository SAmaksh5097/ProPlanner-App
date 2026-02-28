import axios from "axios";
const API_URL = "http://localhost:5000/projects";

export const createProject = async (projectData, token) => {
    const response = await axios.post(API_URL, projectData,{
        headers:{Authorization: `Bearer ${token}`}
    });

    return response.data;
}

export const getUserProjects = async(token)=>{
    const response = await axios.get(API_URL,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return response.data;
}