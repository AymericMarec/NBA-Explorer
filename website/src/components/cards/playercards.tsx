import { Player } from "@/type/player";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm p-2 hover:shadow-md transition-all duration-300 border border-white/20 h-full min-h-[88px] flex items-center justify-center text-center">
      <h3 className="text-sm font-medium text-white">
        {player.first_name} {player.last_name}
      </h3>
    </div>
  );
}
