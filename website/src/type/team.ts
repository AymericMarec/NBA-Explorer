export type Team = {
    id:number,
    conference:string,
    city:string,
    name:string,
    full_name:string,
    abbreviation:string
}

export type TeamResponse = {
  data: Team[] | Team
}
