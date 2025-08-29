'use client'

import { useEffect, useState } from "react";
import TooManyRequestScreen from "@/components/screens/TooManyRequest";
import LoadingScreen from "@/components/screens/LoadingScreen";
import Pagination from "@/components/pagination";
import { Match } from "@/type/match";
import { GetAllMatchs } from "@/lib/getmatchs";
import MatchCard from "@/components/cards/matchcard";

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [matches,setMatches] = useState<Match[] | null>(null);
  const [loading,setLoading] = useState(true);
  const [tooMany,setTooMany] = useState(false);

  let page = 0
  if (searchParams?.cursor !== undefined){
    page = Number(searchParams.cursor)
  }
  const isValid = Number.isInteger(page);
  if(!isValid){
    return <LoadingScreen name="matches"/>
  }

  useEffect(()=>{
    const fetchMatches = async ()=>{
      const data = await GetAllMatchs(page)
      if (typeof data === "number"){
        setLoading(false)
        setTooMany(true)
        return
      }
      setMatches(data)
      setLoading(false)
    }
    fetchMatches()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            NBA Games
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Browse recent NBA games and results
          </p>
        </div>

        {loading ? (
          <LoadingScreen name="matches"/>
        ):(
          <>
            {tooMany ? (
              <TooManyRequestScreen/>
            ) : !matches || matches.length === 0 ? (
              <div className="text-center text-white">No games found.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {matches.map((match)=>(
                    <a key={match.id} href={`/matchs/${match.id}`} className="block group">
                      <div className="transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                        <MatchCard match={match} />
                      </div>
                    </a>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination currentPage={page} baseUrl="/matchs" />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
