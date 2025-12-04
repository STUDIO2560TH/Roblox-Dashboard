import React from 'react';
import { TrendingUp, Users, Gamepad2, Eye, Activity } from 'lucide-react';
const StatCard = ({ icon: Icon, label, value, gradient }) => (
    <div className={`${gradient} p-4 sm:p-6 rounded-xl shadow-lg relative overflow-hidden`}>
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/20 p-1.5 sm:p-2 rounded-lg">
            <TrendingUp className="text-white" size={16} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <Icon className="text-white" size={20} />
            </div>
            <p className="text-white/90 text-xs sm:text-sm font-medium mb-1">{label}</p>
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold">{value}</p>
        </div>
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
        <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 sm:p-3 rounded-xl shadow-lg">
                    <TrendingUp className="text-white" size={20} />
                </div>
                <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Overall Statistics</h2>
                    <p className="text-xs sm:text-sm text-gray-400">Combined metrics across all groups</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatCard
                    icon={Users}
                    label="Total Members"
                    value={totalMembers.toLocaleString()}
                    gradient="bg-gradient-to-br from-blue-600 to-blue-800"
                />
                <StatCard
                    icon={Gamepad2}
                    label="Total Games"
                    value={totalGames}
                    gradient="bg-gradient-to-br from-green-600 to-green-800"
                />
                <StatCard
                    icon={Eye}
                    label="Total Visits"
                    value={totalVisits.toLocaleString()}
                    gradient="bg-gradient-to-br from-purple-600 to-purple-800"
                />
                <StatCard
                    icon={Activity}
                    label="Active Players"
                    value={totalPlaying.toLocaleString()}
                    gradient="bg-gradient-to-br from-red-600 to-red-800"
                />
            </div>
        </div>
    );
};
export default OverallStats;
