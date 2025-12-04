import React from 'react';
import { TrendingUp, Users, Gamepad2, Eye, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, gradient }) => (
    <div className={`${gradient} p-6 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm`}>
        <div className="flex items-center justify-between mb-3">
            <Icon className="text-white" size={28} />
            <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
                <TrendingUp className="text-white" size={20} />
            </div>
        </div>
        <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
    </div>
);

const OverallStats = ({ groupsData, groupDetails }) => {
    let totalMembers = 0;
    let totalGames = 0;
    let totalVisits = 0;
    let totalPlaying = 0;

    Object.keys(groupsData).forEach(groupId => {
        const games = groupsData[groupId] || [];
        totalGames += games.length;
        totalVisits += games.reduce((acc, game) => acc + (game.placeVisits || 0), 0);
        totalPlaying += games.reduce((acc, game) => acc + (game.playing || 0), 0);
        totalMembers += groupDetails[groupId]?.memberCount || 0;
    });

    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-xl shadow-lg">
                    <TrendingUp size={28} className="text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Overall Statistics
                    </h2>
                    <p className="text-gray-400 text-sm">Combined metrics across all groups</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Users}
                    label="Total Members"
                    value={totalMembers.toLocaleString()}
                    color="bg-blue-500"
                    gradient="bg-gradient-to-br from-blue-600 to-blue-800"
                />
                <StatCard
                    icon={Gamepad2}
                    label="Total Games"
                    value={totalGames}
                    color="bg-green-500"
                    gradient="bg-gradient-to-br from-green-600 to-green-800"
                />
                <StatCard
                    icon={Eye}
                    label="Total Visits"
                    value={totalVisits.toLocaleString()}
                    color="bg-purple-500"
                    gradient="bg-gradient-to-br from-purple-600 to-purple-800"
                />
                <StatCard
                    icon={Activity}
                    label="Active Players"
                    value={totalPlaying.toLocaleString()}
                    color="bg-red-500"
                    gradient="bg-gradient-to-br from-red-600 to-red-800"
                />
            </div>
        </div>
    );
};

export default OverallStats;
