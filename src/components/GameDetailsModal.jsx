import React from 'react';
import { X, ThumbsUp, ThumbsDown, Calendar, Clock } from 'lucide-react';

const GameDetailsModal = ({ game, votes, onClose }) => {
    if (!game) return null;

    const upVotes = votes?.upVotes || 0;
    const downVotes = votes?.downVotes || 0;
    const totalVotes = upVotes + downVotes;
    const likeRatio = totalVotes > 0 ? Math.round((upVotes / totalVotes) * 100) : 0;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-800 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="relative h-64">
                    <img
                        src={`https://tr.rbxcdn.com/30DAY-GameIcon-${game.rootPlace?.id}-150x150-PNG`} // Fallback/Placeholder logic handled in parent or here
                        alt={game.name}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-3xl font-bold mb-2">{game.name}</h2>
                        <div className="flex items-center gap-4">
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                                {likeRatio}% Likes
                            </span>
                            <span className="text-gray-300 text-sm">
                                {totalVotes.toLocaleString()} Votes
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-800/50 p-4 rounded-xl flex items-center gap-3">
                            <ThumbsUp className="text-green-500" />
                            <div>
                                <p className="text-sm text-gray-400">Upvotes</p>
                                <p className="text-lg font-bold">{upVotes.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="bg-zinc-800/50 p-4 rounded-xl flex items-center gap-3">
                            <ThumbsDown className="text-red-500" />
                            <div>
                                <p className="text-sm text-gray-400">Downvotes</p>
                                <p className="text-lg font-bold">{downVotes.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-3">Description</h3>
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {game.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400 border-t border-zinc-800 pt-6">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            Created: {new Date(game.created).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            Updated: {new Date(game.updated).toLocaleDateString()}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <a
                            href={`https://www.roblox.com/games/${game.rootPlace?.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                            Play on Roblox
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetailsModal;
