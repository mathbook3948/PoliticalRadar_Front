import React, {useEffect, useState} from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {useStore} from "../zustand/store";
import axios from "axios";

interface Keyword {
    name: string;
    value: number;
}

const API_URL = "https://politicalradar-api.xyz"
// const API_URL = "http://localhost:8000"

const KeywordChart = () => {
    const [keywords, setKeywords] = useState<Keyword[]>([]);

    useEffect(() => {
        getKeywords()
    }, [])

    const getKeywords = async () => {
        try {
            const response = await axios.get(API_URL+"/keywords", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
                }
            })

            if(response.status === 200) {
                setKeywords(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="news-card">
                <div className="issue">최근 1일간 키워드 차트</div>
                <div style={{ width: '100%', height: '500px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={[...keywords].sort((a, b) => b.value - a.value)}
                            margin={{
                                top: 30,
                                right: 30,
                                left: 20,
                                bottom: 30
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(0,0,0,0.1)"
                            />
                            <XAxis
                                dataKey="name"
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                tick={{ fill: 'var(--text-primary)', fontSize: 12 }}
                            />
                            <YAxis
                                tick={{ fill: 'var(--text-primary)', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--card-color)',
                                    border: '1px solid var(--accent-color)',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Legend
                                wrapperStyle={{
                                    paddingTop: '20px'
                                }}
                            />
                            <Bar
                                dataKey="value"
                                fill="var(--accent-color)"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="ai-analysis-note">
                    <span className="ai-note-text">* 키워드 빈도수 분석 결과입니다.</span>
                </div>
            </div>
        </div>
    );
};

export default KeywordChart;