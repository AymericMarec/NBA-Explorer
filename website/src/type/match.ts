import { Team } from "./team";

export type Match = {
  id: number
  date: Date
  datetime: Date
  season: number
  status: string
  period: number
  time: string
  postseason: boolean
  home_team_score: number
  visitor_team_score: number
  home_team: Team
  visitor_team: Team
}

export type MatchResponse = {
  data: Match[] | Match
}


