'use server'

import { Team, TeamResponse } from "@/type/team"

export async function GetAllTeams(){
    const apiKey = process.env.API_KEY

    if (!apiKey) {
        throw new Error("API_KEY is not defined in environment variables")
    }

    const data = await fetch(`https://api.balldontlie.io/v1/teams`,{
        headers:{Authorization:apiKey}
    })
    //if too many requests
    if (data.status == 429) {
        return 429
    }

    const json:TeamResponse = await data.json()

    return json.data as Team[]
}

export async function GetTeam(id:string){
    const apiKey = process.env.API_KEY

    if (!apiKey) {
        throw new Error("API_KEY is not defined in environment variables")
    }

    const data = await fetch(`https://api.balldontlie.io/v1/teams/${id}`,{
        headers:{Authorization:apiKey}
    })

    //if too many requests
    if (data.status == 429) {
        return 429
    }
    const json:TeamResponse = await data.json()

    return json.data as Team
}
