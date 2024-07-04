import commonAPI from "./commonAPI";
import SERVER_URL from "./serverurl";

// register
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// login
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

// adding project

export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/project/add`,reqBody,reqHeader)
}

// Getting Home Projects
export const homeProjectAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/get-home-projects`,"")
}

// getting user projects
export const userProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)
}

// getting all projects
export const allProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,"",reqHeader)
}

// edit project
export const editProjectAPI = async(pid,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/project/${pid}/edit`,reqBody,reqHeader)
}

// remove project
export const removeProjectAPI = async (pid,reqHeader) =>{
    return await commonAPI("DELETE",`${SERVER_URL}/project/${pid}/remove`,{},reqHeader)
}

// user profile edit
export const editUserAPI = async(reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}