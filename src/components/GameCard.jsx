import React from 'react';
import { Users, Eye, Info } from 'lucide-react';

const GameCard = ({ game, thumbnail, onClick }) => {
    return (
        <div
            onClick={() => onClick(game)}
            className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-zinc-800 shadow-lg group cursor-pointer"
        >
            <div className="relative aspect-square">
                <img
                    src={thumbnail || "https://via.placeholder.com/150"}
                    alt={game.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-4 py-2 rounded-full font-bold flex items-center gap-2">
                        <Info size={20} />
                        Details
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg truncate mb-1 text-white" title={game.name}>{game.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{game.playing ? game.playing.toLocaleString() : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{game.placeVisits ? game.placeVisits.toLocaleString() : '0'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
