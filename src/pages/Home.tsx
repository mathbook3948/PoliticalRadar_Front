import React, {useEffect, useState} from "react";
import "./main.css"
import axios from "axios";
import {useStore} from "../zustand/store"
import Loading from "./Loading";

const API_URL = "https://politicalradar-api.xyz"


const Home : React.FC = () => {
    const { news, setNews } = useStore()

    useEffect(() => {
        getNews()
    }, [])

    const getNews = async () => {
        try {
            const response = await axios.get(API_URL+"/news", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
                }
            })


            setNews(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    if(!news) {
        return (
            <Loading/>
        )
    }

    return (
        <div className="container">
            {news && (
                <div className="news-card">
                    <div className="issue">{news.issue}</div>
                    <span className="keyword">{news.keyword}</span>
                    <p className="importance">
                        {news.importance}
                    </p>
                    <h3 className="effects-title">주요 영향</h3>
                    <ul className="effects-list">
                        <li className="effect-item">{news.effects[0]}</li>
                        <li className="effect-item">{news.effects[1]}</li>
                        <li className="effect-item">{news.effects[2]}</li>
                    </ul>
                    <div className="ai-analysis-note">
                        <svg className="ai-icon" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M9 4.58V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v.58a8 8 0 0 1 1.92 1.11l.5-.29a2 2 0 0 1 2.74.73l1 1.74a2 2 0 0 1-.73 2.73l-.5.29a8.06 8.06 0 0 1 0 2.22l.5.29a2 2 0 0 1 .73 2.73l-1 1.74a2 2 0 0 1-2.74.73l-.5-.29A8 8 0 0 1 15 19.42V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.58a8 8 0 0 1-1.92-1.11l-.5.29a2 2 0 0 1-2.74-.73l-1-1.74a2 2 0 0 1 .73-2.73l.5-.29a8.06 8.06 0 0 1 0-2.22l-.5-.29a2 2 0 0 1-.73-2.73l1-1.74a2 2 0 0 1 2.74-.73l.5.29A8 8 0 0 1 9 4.58zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                        </svg>
                        <span className="ai-note-text">AI 분석 결과로, 정보에 오류가 있을 수 있습니다</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;