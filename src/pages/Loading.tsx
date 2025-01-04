import React, { useEffect, useState } from 'react';
import "./main.css"

const Loading: React.FC = () => {
    return (
        <div className="container">
            <div className="news-card animate-pulse">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-spin">
                        <div className="w-full h-full rounded-full border-4 border-t-accent-color border-r-transparent border-b-transparent border-l-transparent"></div>
                    </div>
                    <div className="text-lg text-gray-500">로딩중...</div>
                </div>
                <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
                <div className="h-24 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="space-y-2">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
}
export default Loading;