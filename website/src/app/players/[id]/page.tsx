'use client'

import { Player } from "@/type/player";
import { PageProps } from "@/type/pageid";

import { useEffect, useState } from "react";
import { GetPlayer } from "@/lib/getplayers";
import { use } from 'react';
import NotFoundScreen from "@/components/screens/404";
import TooManyRequestScreen from "@/components/screens/TooManyRequest";
import LoadingScreen from "@/components/screens/LoadingScreen";


export default function Home({params, } : { params: Promise<{ id: string }>}) {
  const [player,setPlayer] = useState<Player | null>(null);
  const [loadingPlayer,setLoadingPlayer] = useState(true);
  const [TooManyRequest,setTooManyRequest] =useState(false)

  const {id} = use(params)

  if (typeof id !== "string") {
    return <NotFoundScreen/>  
  }

  useEffect(()=>{
    const fetchPlayer = async ()=>{
      const Player = await GetPlayer(id)
      if (typeof Player === "number" ){
        setLoadingPlayer(false)
        setTooManyRequest(true)
        return
      }
      setPlayer(Player)
      setLoadingPlayer(false)
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

  if (loadingPlayer || !player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <LoadingScreen name="player"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              {player.first_name} {player.last_name}
            </h1>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-semibold text-lg">
              #{player.jersey_number} • {player.position}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Personal Info */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-8 bg-orange-400 rounded-full mr-3"></span>
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-300">Height:</span>
                    <span className="text-white font-semibold">{player.height}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-300">Weight:</span>
                    <span className="text-white font-semibold">{player.weight}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-300">College:</span>
                    <span className="text-white font-semibold">{player.college || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-300">Country:</span>
                    <span className="text-white font-semibold">{player.country}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
                  Draft Information
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-300">Draft Year:</span>
                    <span className="text-white font-semibold">{player.draft_year || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-300">Draft Round:</span>
                    <span className="text-white font-semibold">{player.draft_round || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-300">Draft Number:</span>
                    <span className="text-white font-semibold">{player.draft_number || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Team Info */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
                  Team Information
                </h2>
                {player.team && (
                  <a href={`/teams/${player.team.id}`} className="block hover:bg-white/5 rounded-xl p-4 transition-colors">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {player.team.name?.charAt(0) || "T"}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{player.team.full_name}</h3>
                      <p className="text-gray-300">{player.team.conference} Conference</p>
                      <p className="text-gray-300">{player.team.city}, {player.team.abbreviation}</p>
                    </div>
                  </a>
                )}
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                  Jersey Number
                </h2>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white text-5xl font-bold">
                      {player.jersey_number || "?"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <a 
              href="/players" 
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-lg border border-white/20 transition-all duration-300 hover:scale-105"
            >
              ← Back to Players
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
