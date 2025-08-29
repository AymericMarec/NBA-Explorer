'use client'

import { Player } from "@/type/player";
import { useEffect, useState } from "react";
import { GetAllPlayers, GetSearchPlayer } from "@/lib/getplayers";
import PlayerCard from "@/components/cards/playercards";
import Pagination from "@/components/pagination";
import NotFoundScreen from "@/components/screens/404";
import TooManyRequestScreen from "@/components/screens/TooManyRequest";
import LoadingScreen from "@/components/screens/LoadingScreen";
import SearchBar from "@/components/searchbar";
import NoPlayersFoundScreen from "@/components/screens/NoPlayersFound";

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [players,setPlayers] = useState<Player[] | null>(null);
  const [loadingPlayer,setLoadingPlayer] = useState(true);
  const [TooManyRequest,setTooManyRequest] =useState(false)

  //if any page is found in the url , show the first one
  var page = 0
  if (searchParams.cursor !== undefined){
    page = Number(searchParams.cursor)
  }
  const isValid = Number.isInteger(page);

  if(!isValid){
    return <NotFoundScreen/>
  }

  useEffect(()=>{
    fetchPlayer()
  },[])

  const fetchPlayer = async ()=>{
    let Allplayers:Player[] | 429
    if (searchParams.search === undefined){
      Allplayers = await GetAllPlayers(page)
    }else {
      Allplayers = await GetSearchPlayer(searchParams.search as string,page)
    }
    if (typeof Allplayers === "number" ){
      setLoadingPlayer(false)
      setTooManyRequest(true)
      return
    }
    setPlayers(Allplayers)
    setLoadingPlayer(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            NBA Players
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover the complete roster of NBA players with detailed statistics and information
          </p>
          
                     <SearchBar/>
        </div>
        
        {loadingPlayer ? (
            <LoadingScreen name="players"/>
        ):(
          <>
            {TooManyRequest ? (
                <TooManyRequestScreen/>
            ) : !players || players.length === 0 ? (
                <NoPlayersFoundScreen/>
            ) : (
              <>
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  {players.map((player)=>
                    <a key={player.id} href={`/players/${player.id}`} className="block group w-full sm:w-auto sm:min-w-[280px] lg:min-w-[300px] xl:min-w-[250px]">
                      <div className="transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                        <PlayerCard player={player} />
                      </div>
                    </a>
                  )}
                </div>

                {/* Pagination */}
                <Pagination currentPage={page} baseUrl="/players" />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
