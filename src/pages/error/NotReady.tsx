import React from "react";
import "../css/notready.css";

const NotReady: React.FC = () => {
    return (
        <div className="not-ready-container">
            <div className="not-ready-card">
                <svg className="not-ready-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <h2 className="not-ready-text">구현 예정입니다</h2>
                <p className="not-ready-description">현재 준비 중인 페이지입니다. 곧 찾아뵙겠습니다.</p>
                <button className="not-ready-btn">홈으로 돌아가기</button>
            </div>
        </div>
    );
}

export default NotReady;