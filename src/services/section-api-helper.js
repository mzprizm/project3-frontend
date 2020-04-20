import axios from "axios"

const api = axios.create({
    baseURL: "https://alyssa-presentations-timer.herokuapp.com/"
});



//create sections

export const findById = async (sectId)=>{
    const resp =await api.get(`sections/${sectId}`)
    return resp.data
}



export const createSect = async (presId, body) => {
    const resp = await api.post(`/sections/${presId}`, body);
    return resp.data
}

//update
export const updateSect = async (presId, sectId, body) => {
    const resp = await api.put(`/sections/${presId}/${sectId}`, body);
    return resp.data
}

//delete
export const deleteSect = async (presId, sectId) => {
    const resp = await api.delete(`/sections/${presId}/${sectId}`);
    return resp.data
};