import React from 'react';
import { Users, Eye } from 'lucide-react';
const GameCard = ({ game, thumbnail, onClick }) => {
    return (
        <div
            onClick={() => onClick(game)}
            className="bg-zinc-900 rounded-lg sm:rounded-xl overflow-hidden border border-zinc-800 hover:border-blue-500 transition-all cursor-pointer hover:scale-105 shadow-lg hover:shadow-blue-900/20"
        >
            <div className="relative h-32 sm:h-40 bg-zinc-800">
                <img
                    src={thumbnail || `https://via.placeholder.com/300x200?text=${encodeURIComponent(game.name)}`}
                    alt={game.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 line-clamp-1">{game.name}</h3>
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{game.playing || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{(game.placeVisits || 0).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GameCard;
