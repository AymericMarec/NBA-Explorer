'use client'

import { useEffect, useState } from "react";
import TooManyRequestScreen from "@/components/screens/TooManyRequest";
import LoadingScreen from "@/components/screens/LoadingScreen";
import SearchBar from "@/components/searchbar";
import NoPlayersFoundScreen from "@/components/screens/NoPlayersFound";
import { Team } from "@/type/team";
import { GetAllTeams } from "@/lib/getteams";
import TeamCard from "@/components/cards/teamcards";

export default function Home() {
  const [teams,setTeams] = useState<Team[] | null>(null);
  const [loadingTeam,setLoadingTeam] = useState(true);
  const [TooManyRequest,setTooManyRequest] =useState(false)

  useEffect(()=>{
    fetchPlayer()
  },[])

  const fetchPlayer = async ()=>{
    let AllTeams = await GetAllTeams()
    if (typeof AllTeams === "number" ){
      setLoadingTeam(false)
      setTooManyRequest(true)
      return
    }
    console.log(AllTeams)
    setTeams(AllTeams)
    setLoadingTeam(false)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            NBA Teams
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover all NBA teams and their rosters
          </p>
          
        </div>
        
        {loadingTeam ? (
          <LoadingScreen name="teams"/>
        ):(
          <>
            {TooManyRequest ? (
              <TooManyRequestScreen/>
            ) : !teams || teams.length === 0 ? (
              <NoPlayersFoundScreen/>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12 items-stretch">
                  {teams.map((team)=>(
                    <a key={team.id} href={`/teams/${team.id}`} className="block group h-full">
                      <div className="h-full transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                        <TeamCard team={team} />
                      </div>
                    </a>
                  ))}
                </div>

              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
