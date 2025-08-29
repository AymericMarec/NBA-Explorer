import { Team } from "@/type/team";

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-3 hover:shadow-md transition-all duration-300 border border-white/20 h-full min-h-[120px] flex flex-col items-center justify-center text-center">
      <h3 className="text-base font-semibold text-white">
        {team.full_name}
      </h3>
      <p className="text-xs text-gray-300 mt-1">{team.city} • {team.conference}</p>
    </div>
  );
}
