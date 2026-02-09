import React from 'react';
import Skeleton from './Skeleton';

const DashboardSkeleton = () => {
    return (
        <div className="space-y-8 sm:space-y-12 animate-fade-in">
            {/* Overall Stats Skeleton */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <div>
                        <Skeleton className="w-48 h-6 mb-2" />
                        <Skeleton className="w-32 h-3" />
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg relative overflow-hidden border border-zinc-800/50">
                            <Skeleton className="w-6 h-6 mb-2 bg-gray-700/50" />
                            <Skeleton className="w-24 h-3 mb-2 bg-gray-700/50" />
                            <Skeleton className="w-16 h-8 bg-gray-700/50" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Groups Skeleton */}
            {[...Array(2)].map((_, groupIndex) => (
                <section key={groupIndex}>
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <Skeleton className="w-48 h-8" />
                            <div className="flex gap-4">
                                <Skeleton className="w-20 h-5" />
                                <Skeleton className="w-20 h-5" />
                                <Skeleton className="w-20 h-5" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="aspect-[2/3] bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg border border-zinc-800/50 relative">
                                <Skeleton className="absolute inset-0 w-full h-full bg-gray-800" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                    <Skeleton className="w-3/4 h-5 mb-2 bg-gray-600" />
                                    <div className="flex gap-2">
                                        <Skeleton className="w-1/3 h-3 bg-gray-600" />
                                        <Skeleton className="w-1/3 h-3 bg-gray-600" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default DashboardSkeleton;
