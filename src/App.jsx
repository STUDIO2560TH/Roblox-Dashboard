import React, { useEffect, useState } from 'react';
import { fetchGroupGames, fetchGameDetails, fetchThumbnails, fetchGroupDetails, fetchGameVotes } from './services/roblox.js';
import GameCard from './components/GameCard';
import GroupStats from './components/GroupStats';
import GameDetailsModal from './components/GameDetailsModal';
import OverallStats from './components/OverallStats';
import { LayoutGrid } from 'lucide-react';

const GROUPS = [
    { id: '35507841', name: 'Gn Studios ∞' },
    { id: '6443807', name: 'Nearo' }
];

function App() {
    const [games, setGames] = useState({});
    const [thumbnails, setThumbnails] = useState({});
    const [groupDetails, setGroupDetails] = useState({});
    const [votes, setVotes] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const gamesData = {};
            const detailsData = {};
            const allUniverseIds = [];

            for (const group of GROUPS) {
                // Fetch Games
                const groupGames = await fetchGroupGames(group.id);
                gamesData[group.id] = groupGames;
                groupGames.forEach(g => allUniverseIds.push(g.id));

                // Fetch Group Details
                const details = await fetchGroupDetails(group.id);
                detailsData[group.id] = details;
            }

            // Fetch thumbnails
            const thumbData = await fetchThumbnails(allUniverseIds);
            const thumbMap = {};
            thumbData.forEach(t => {
                thumbMap[t.targetId] = t.imageUrl;
            });
            setThumbnails(thumbMap);

            // Fetch game details (playing counts)
            const details = await fetchGameDetails(allUniverseIds);
            if (details.length) {
                details.forEach(d => {
                    for (const gid in gamesData) {
                        const gameIndex = gamesData[gid].findIndex(g => g.id === d.id);
                        if (gameIndex !== -1) {
                            gamesData[gid][gameIndex] = { ...gamesData[gid][gameIndex], playing: d.playing, created: d.created, updated: d.updated };
                        }
                    }
                });
            }

            // Fetch Votes
            const votesData = await fetchGameVotes(allUniverseIds);
            setVotes(votesData);

            setGames(gamesData);
            setGroupDetails(detailsData);
            setLoading(false);
        };

        loadData();
    }, []);

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white p-8 font-sans">
            <header className="mb-12 flex items-center gap-4 border-b border-zinc-800 pb-6">
                <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-900/20">
                    <LayoutGrid size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Roblox Dashboard</h1>
                    <p className="text-gray-400">Tracking games for Gn Studios & Nearo</p>
                </div>
            </header>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="space-y-16">
                    <OverallStats groupsData={games} groupDetails={groupDetails} />

                    {GROUPS.map(group => (
                        <section key={group.id}>
                            <GroupStats
                                groupName={group.name}
                                memberCount={groupDetails[group.id]?.memberCount || 0}
                                games={games[group.id] || []}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {games[group.id]?.map(game => (
                                    <GameCard
                                        key={game.id}
                                        game={game}
                                        thumbnail={thumbnails[game.id]}
                                        onClick={setSelectedGame}
                                    />
                                ))}
                                {(!games[group.id] || games[group.id].length === 0) && (
                                    <p className="text-gray-500 italic">No games found.</p>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            )}

            <GameDetailsModal
                game={selectedGame}
                votes={selectedGame ? votes[selectedGame.id] : null}
                onClose={() => setSelectedGame(null)}
            />
        </div>
    );
}

export default App;

