import React from 'react';
import "./main.css"
import {useStore} from "../zustand/store";
import {Link} from "react-router-dom";

const Header = () => {
    const { news } = useStore();

    const getKSTTime = (utcTime: string) => {
        const date = new Date(utcTime);
        date.setHours(date.getHours() + 9);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    };


    return (
        <header>
            <header>
                <div className="radar-bg">
                    <div className="radar-line"></div>
                </div>
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-icon"></span>
                        <Link className="title" to={"/"}>PoliticalRadar</Link>
                    </div>
                    <div className="subtitle">실시간 정치 뉴스 모니터링 및 분석</div>
                    <p className="update-time">
                        최근 업데이트: <br/>
                        <span id="updateTime">
        {news && (
            <>
                UTC : {news.time.toString().substring(0, 10) + " " + news.time.toString().substring(11, 16)}<br/>
                KST : {news && getKSTTime(news.time)}<br/>
                (30분 주기로 업데이트)
            </>
        )}
    </span>
                    </p>

                </div>
            </header>
        </header>
    );
};

export default Header;