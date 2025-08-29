'use server'

import { Match, MatchResponse } from "@/type/match"

export async function GetAllMatchs(page:number){
    const apiKey = process.env.API_KEY

    if (!apiKey) {
        throw new Error("API_KEY is not defined in environment variables")
    }

    const data = await fetch(`https://api.balldontlie.io/v1/games?per_page=25&cursor=${page*25}`,{
        headers:{Authorization:apiKey}
    })
    //if too many requests
    if (data.status == 429) {
        return 429
    }

    const json:MatchResponse = await data.json()
    const allmatches = json.data as Match[]
    const matchesDate = allmatches.map((m): Match => ({
        ...m,
        date: new Date(m.date),
        datetime: new Date(m.datetime)
    }))
    return matchesDate
}

export async function GetLMatch(id:string){
    const apiKey = process.env.API_KEY

    if (!apiKey) {
        throw new Error("API_KEY is not defined in environment variables")
    }

    const data = await fetch(`https://api.balldontlie.io/v1/games/${id}`,{
        headers:{Authorization:apiKey}
    })

    //if too many requests
    if (data.status == 429) {
        return 429
    }
    const json:MatchResponse = await data.json()
    const match = json.data as Match
    const matchDate: Match = {
        ...match,
        date: new Date(match.date),
        datetime: new Date(match.datetime),
    };
    return matchDate
}
