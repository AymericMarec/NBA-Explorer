import {Team} from "@/type/team";

export type Player = {
    id:number,
    first_name:string,
    last_name:string,
    position:string,
    height:string,
    weight:string,
    jersey_number:string,
    college:string,
    country:string,
    draft_year:string,
    draft_round:string,
    draft_number:string,
    team:Team
}

export type PlayersResponse = {
  data: Player[] | Player
  meta?: {
    total_pages: number
    current_page: number
    next_page: number | null
    per_page: number
    total_count: number
  }
}
