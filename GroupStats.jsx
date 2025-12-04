import React from 'react';
import { Users, Gamepad2, Eye, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}/20`}>
            <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
        <div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const GroupStats = ({ groupName, memberCount, games }) => {
    const totalVisits = games.reduce((acc, game) => acc + (game.placeVisits || 0), 0);
    const totalPlaying = games.reduce((acc, game) => acc + (game.playing || 0), 0);
    const totalGames = games.length;

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="text-blue-500" />
                {groupName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    label="Members"
                    value={memberCount.toLocaleString()}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={Gamepad2}
                    label="Total Games"
                    value={totalGames}
                    color="bg-green-500"
                />
                <StatCard
                    icon={Eye}
                    label="Total Visits"
                    value={totalVisits.toLocaleString()}
                    color="bg-purple-500"
                />
                <StatCard
                    icon={Activity}
                    label="Active Players"
                    value={totalPlaying.toLocaleString()}
                    color="bg-red-500"
                />
            </div>
        </div>
    );
};

export default GroupStats;
