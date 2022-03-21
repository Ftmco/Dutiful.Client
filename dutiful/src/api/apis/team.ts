import { apiCall } from ".."
import { ApiResponse } from "../models/api.model";
import { Team } from "../models/team.model";

const axios = apiCall;

export const getTeams = (): Promise<ApiResponse> => {
    return new Promise(async (resolve, rejcet) => {
        try {
            const request = await axios.get("/team/GetTeams")
            const response = await request.data
            resolve(response as ApiResponse)
        }
        catch (e) {
            rejcet(e)
        }
    })
}

export const upsert = (team: Team): Promise<ApiResponse> => {
    return new Promise(async (relove, reject) => {
        try {
            const request = await axios.post("/team/Upsert", team)
            const response = await request.data
            relove(response as ApiResponse)
        } catch (e) {
            reject(e)
        }
    })
}

export const deleteTeam = (token: string): Promise<ApiResponse> => {
    return new Promise(async (reslove, reject) => {
        try {
            const request = await axios.get(`team/delete?token=${token}`)
            const response = await request.data
            reslove(response as ApiResponse)
        } catch (e) {
            reject(e)
        }
    })
}