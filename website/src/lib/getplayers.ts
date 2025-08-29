'use server'

import { PlayersResponse,Player } from "@/type/player"

export async function GetAllPlayers(page:number){
    const apiKey = process.env.API_KEY

    if (!apiKey) {
        throw new Error("API_KEY is not defined in environment variables")
    }

    const data = await fetch(`https://api.balldontlie.io/v1/players?per_page=25&cursor=${page*25}`,{
        headers:{Authorization:apiKey}
    })
    //if too many requests
    if (data.status == 429) {
        return 429
    }

    const json:PlayersResponse = await data.json()

    return (json.data as Player[]) 
}

export async function GetPlayer(id:string){
    const apiKey = process.env.API_KEY

    if (!apiKey) {
        throw new Error("API_KEY is not defined in environment variables")
    }

    const data = await fetch(`https://api.balldontlie.io/v1/players/${id}`,{
        headers:{Authorization:apiKey}
    })

    //if too many requests
    if (data.status == 429) {
        return 429
    }
    const json:PlayersResponse = await data.json()

    return json.data as Player
}

export async function GetSearchPlayer(search:string,page:number){
    const apiKey = process.env.API_KEY

    if (!apiKey) {
        throw new Error("API_KEY is not defined in environment variables")
    }

    const data = await fetch(`https://api.balldontlie.io/v1/players?search=${search}&per_page=25&cursor=${page*25}`,{
        headers:{Authorization:apiKey}
    })

    //if too many requests
    if (data.status == 429) {
        return 429
    }
    const json:PlayersResponse = await data.json()

    return json.data as Player[]
}

export async function GetPlayerByTeam(TeamID:string){
    const apiKey = process.env.API_KEY

    if (!apiKey) {
        throw new Error("API_KEY is not defined in environment variables")
    }

    const data = await fetch(`https://api.balldontlie.io/v1/players??team_ids[]=${TeamID}&per_page=25`,{
        headers:{Authorization:apiKey}
    })

    //if too many requests
    if (data.status == 429) {
        return 429
    }
    const json:PlayersResponse = await data.json()

    return json.data as Player[]
}
