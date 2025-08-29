'use client'

import { Player } from "@/type/player";

import { useEffect, useState } from "react";
import { GetPlayerByTeam } from "@/lib/getplayers";
import { use } from 'react';
import NotFoundScreen from "@/components/screens/404";
import TooManyRequestScreen from "@/components/screens/TooManyRequest";
import LoadingScreen from "@/components/screens/LoadingScreen";
import { Team } from "@/type/team";
import { GetTeam } from "@/lib/getteams";
import PlayerCard from "@/components/cards/playercards";


export default function Home({params, } : { params: Promise<{ id: string }>}) {
  const [team,setTeam] = useState<Team | null>(null);
  const [allPlayers,setallPlayers] = useState<Player[] | null>(null)
  const [loadingTeam,setLoadingTeam] = useState(true);
  const [TooManyRequest,setTooManyRequest] =useState(false)

  const {id} = use(params)

  if (typeof id !== "string") {
    return <NotFoundScreen/>  
  }

  useEffect(()=>{
    const fetchPlayer = async ()=>{
      const Team = await GetTeam(id)
      if (typeof Team === "number" ){
        setLoadingTeam(false)
        setTooManyRequest(true)
        return
      }
      setTeam(Team)
      const Players = await GetPlayerByTeam(id)
      if (typeof Players === "number" ){
        setLoadingTeam(false)
        setTooManyRequest(true)
        return
      }
      setTeam(Team)
      setallPlayers(Players)
      setLoadingTeam(false)
    }
    fetchPlayer()
  },[])

  if (TooManyRequest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <TooManyRequestScreen/>
      </div>
    )
  }

  if (loadingTeam || !team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <LoadingScreen name="team"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              {team.full_name}
            </h1>
          </div>

          {/* Team Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Team Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">City:</span>
                <span className="text-white font-semibold">{team.city}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">Conference:</span>
                <span className="text-white font-semibold">{team.conference}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">Abbreviation:</span>
                <span className="text-white font-semibold">{team.abbreviation}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-300">Team Name:</span>
                <span className="text-white font-semibold">{team.name}</span>
              </div>
            </div>
          </div>

          {/* Full-width Roster */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 w-full">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-orange-400 rounded-full mr-3"></span>
              Roster
            </h2>
            {allPlayers && allPlayers.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6">
                {allPlayers.map((player) => (
                  <a key={player.id} href={`/players/${player.id}`} className="block group w-full sm:w-auto sm:min-w-[280px] lg:min-w-[300px] xl:min-w-[250px]">
                    <div className="transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                      <PlayerCard player={player} />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-300">No players found for this team.</p>
            )}
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <a 
              href="/teams" 
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-lg border border-white/20 transition-all duration-300 hover:scale-105"
            >
              ← Back to Teams
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
