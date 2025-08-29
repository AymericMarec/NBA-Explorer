import { Match } from "@/type/match";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const home = match.home_team;
  const away = match.visitor_team;
  const date = match.date instanceof Date ? match.date : new Date(match.date);
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="text-center">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
          {away.abbreviation} <span className="text-gray-300 font-normal mx-2">vs</span> {home.abbreviation}
        </h3>
        <p className="text-lg text-gray-300">
          {date.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
