'use client'

import { useEffect, useState, use } from "react";
import LoadingScreen from "@/components/screens/LoadingScreen";
import TooManyRequestScreen from "@/components/screens/TooManyRequest";
import NotFoundScreen from "@/components/screens/404";
import { Match } from "@/type/match";
import { GetLMatch } from "@/lib/getmatchs";

export default function Home({params, } : { params: Promise<{ id: string }>}) {
  const [match,setMatch] = useState<Match | null>(null);
  const [loading,setLoading] = useState(true);
  const [tooMany,setTooMany] = useState(false);

  const {id} = use(params)

  if (typeof id !== "string") {
    return <NotFoundScreen/>  
  }

  useEffect(()=>{
    const fetchMatch = async ()=>{
      const data = await GetLMatch(id)
      if (typeof data === "number" ){
        setLoading(false)
        setTooMany(true)
        return
      }
      setMatch(data)
      setLoading(false)
    }
    fetchMatch()
  },[])

  if (tooMany) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <TooManyRequestScreen/>;
        </div>
    )

  }

  if (loading || !match) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <LoadingScreen name="match"/>;
        </div>
    )

  }

  const home = match.home_team
  const away = match.visitor_team
  const date = match.date instanceof Date ? match.date : new Date(match.date)
  const isFinal = (match.status || '').toLowerCase().includes('final')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              {away.full_name} <span className="text-gray-300 font-normal">vs</span> {home.full_name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 text-gray-300">
              <span>{date.toLocaleString()}</span>
              <span className="hidden sm:inline">•</span>
              <span>Season {match.season}</span>
              <span className="hidden sm:inline">•</span>
              <span className={isFinal ? 'text-green-400' : 'text-orange-300'}>{match.status}</span>
            </div>
          </div>

          {/* Score Board */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-6 text-white">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold">{away.abbreviation}</div>
                <div className="text-sm text-gray-300">{away.full_name}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold">
                  {match.visitor_team_score}
                  <span className="text-gray-400 mx-3 text-3xl align-middle">-</span>
                  {match.home_team_score}
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  {match.postseason ? 'Postseason' : 'Regular Season'}
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-2xl font-bold">{home.abbreviation}</div>
                <div className="text-sm text-gray-300">{home.full_name}</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-6 bg-orange-400 rounded-full mr-3"></span>
                Game Details
              </h2>
              <div className="space-y-3 text-gray-200">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-300">Status</span>
                  <span className={isFinal ? 'text-green-400' : 'text-orange-300'}>{match.status}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-300">Period</span>
                  <span className="text-white font-semibold">{match.period}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-300">Time</span>
                  <span className="text-white font-semibold">{match.time || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Postseason</span>
                  <span className="text-white font-semibold">{match.postseason ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-6 bg-blue-400 rounded-full mr-3"></span>
                Teams
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <a href={`/teams/${away.id}`} className="block group h-full">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 group-hover:bg-white/20 group-hover:shadow-lg h-full min-h-[200px] flex flex-col justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl lg:text-3xl font-bold mb-2 text-orange-400">{away.abbreviation}</div>
                      <div className="text-base lg:text-lg font-semibold mb-1">{away.full_name}</div>
                      <div className="text-gray-300 text-sm">{away.city}</div>
                      <div className="text-gray-400 text-xs mt-2 bg-white/10 rounded-full px-3 py-1 inline-block border border-white/20">
                        {away.conference}
                      </div>
                    </div>
                  </div>
                </a>
                <a href={`/teams/${home.id}`} className="block group h-full">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 group-hover:bg-white/20 group-hover:shadow-lg h-full min-h-[200px] flex flex-col justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl lg:text-3xl font-bold mb-2 text-red-400">{home.abbreviation}</div>
                      <div className="text-base lg:text-lg font-semibold mb-1">{home.full_name}</div>
                      <div className="text-gray-300 text-sm">{home.city}</div>
                      <div className="text-gray-400 text-xs mt-2 bg-white/10 rounded-full px-3 py-1 inline-block border border-white/20">
                        {home.conference}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <a 
              href="/matchs" 
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-lg border border-white/20 transition-all duration-300 hover:scale-105"
            >
              ← Back to Games
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
