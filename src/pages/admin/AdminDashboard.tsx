import React, {useEffect, useState} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import "../css/admindashboard.css"
import axios from "axios";


// 차단된 사용자 더미 데이터
const initialBlockedUsers = [
    { id: 1, ip: '123.45.67.89', reason: '스팸 게시', blockedAt: '2024-01-05 14:30' },
    { id: 2, ip: '98.76.54.32', reason: '불법 콘텐츠', blockedAt: '2024-01-04 09:15' },
];

interface Dashboard_Response {
    daily_visits : [
        { date: string, users: number, newUsers: number, pageViews: number }
    ]
}

const API_URL = 'https://politicalradar-api.xyz';
// const API_URL = 'http://localhost:8000';

const AdminDashboard: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<Dashboard_Response | null>(null);
    const [blockedUsers, setBlockedUsers] = useState(initialBlockedUsers);
    const [newBlockIp, setNewBlockIp] = useState('');
    const [blockReason, setBlockReason] = useState('');
    const [selectedLogType, setSelectedLogType] = useState('access');
    const [dateRange, setDateRange] = useState({
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        get_visitors()
    },[])

    const get_visitors = async () => {
        try {
            const response = await axios.get(API_URL+"/admin/dashboard", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    Authorization: `Bearer ${sessionStorage.getItem('admin_token')}`
                }
            })
            console.log(response.data)
            setDashboardData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // IP 차단 처리
    const handleBlockUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBlockIp || !blockReason) return;

        const newBlockedUser = {
            id: blockedUsers.length + 1,
            ip: newBlockIp,
            reason: blockReason,
            blockedAt: new Date().toLocaleString()
        };

        setBlockedUsers([...blockedUsers, newBlockedUser]);
        setNewBlockIp('');
        setBlockReason('');
    };

    // 차단 해제 처리
    const handleUnblock = (id: number) => {
        setBlockedUsers(blockedUsers.filter(user => user.id !== id));
    };

    // 로그 다운로드 처리
    const handleDownloadLogs = () => {
        // 실제 구현시에는 API 호출하여 로그 파일 다운로드
        console.log('Downloading logs:', {
            type: selectedLogType,
            dateRange
        });
        alert('로그 다운로드가 시작됩니다.');
    };

    const calculateUserGrowth = (visits: Dashboard_Response['daily_visits']) => {
        if (!visits || visits.length < 2) return { percentage: 0, isPositive: true };

        const currentUsers = visits[visits.length - 1].users;
        const previousUsers = visits[visits.length - 2].users;

        if (previousUsers === 0) return { percentage: 0, isPositive: true };

        const growthRate = ((currentUsers - previousUsers) / previousUsers) * 100;
        return {
            percentage: Math.abs(growthRate).toFixed(1),
            isPositive: growthRate >= 0
        };
    };

    return (
        <div className="dashboard-container">
            {/* 헤더 */}
            <div className="dashboard-header">
                <h1>관리자 대시보드</h1>
                <p>시스템 모니터링 및 관리</p>
            </div>

            {/* 주요 지표 카드 */}
            <div className="stats-grid">
                <div className="stats-card">
                    <h3>오늘 방문자</h3>
                    {dashboardData && dashboardData.daily_visits && dashboardData.daily_visits.length > 0 ? (
                        <>
                            <p className="stats-number">
                                {dashboardData.daily_visits[dashboardData.daily_visits.length - 1].users}
                            </p>
                            {(() => {
                                const growth = calculateUserGrowth(dashboardData.daily_visits);
                                return (
                                    <span className={`stats-trend ${growth.isPositive ? 'positive' : 'negative'}`}>
                                        {growth.isPositive ? '+' : '-'}{growth.percentage}%
                                        {growth.isPositive ? ' ▲' : ' ▼'}
                                    </span>
                                );
                            })()}
                        </>
                    ) : (
                        <p className="stats-number">No data available</p>
                    )}
                </div>
                <div className="stats-card">
                    <h3>평균 체류시간</h3>
                    <p className="stats-number">4m 32s</p>
                    <span className="stats-trend negative">-1.8% ▼</span>
                </div>
                <div className="stats-card">
                    <h3>페이지뷰</h3>
                    <p className="stats-number">6,500</p>
                    <span className="stats-trend positive">+3.1% ▲</span>
                </div>
                <div className="stats-card">
                    <h3>차단된 IP</h3>
                    <p className="stats-number">{blockedUsers.length}</p>
                    <span className="stats-trend">활성 차단</span>
                </div>
            </div>

            {/* 방문자 트렌드 차트 */}
            <div className="chart-card">
                <h2>방문자 트렌드</h2>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={dashboardData?.daily_visits}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="var(--primary-color)"
                                name="총 방문자"
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="newUsers"
                                stroke="var(--secondary-color)"
                                name="신규 방문자"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 사용자 차단 관리 */}
            <div className="management-section">
                <h2>IP 차단 관리</h2>
                <form onSubmit={handleBlockUser} className="block-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="차단할 IP 주소"
                            value={newBlockIp}
                            onChange={(e) => setNewBlockIp(e.target.value)}
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="차단 사유"
                            value={blockReason}
                            onChange={(e) => setBlockReason(e.target.value)}
                            className="form-input"
                        />
                        <button type="submit" className="btn-block">IP 차단</button>
                    </div>
                </form>

                <div className="blocked-users-list">
                    <h3>차단된 IP 목록</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>IP 주소</th>
                            <th>차단 사유</th>
                            <th>차단 시각</th>
                            <th>작업</th>
                        </tr>
                        </thead>
                        <tbody>
                        {blockedUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.ip}</td>
                                <td>{user.reason}</td>
                                <td>{user.blockedAt}</td>
                                <td>
                                    <button
                                        onClick={() => handleUnblock(user.id)}
                                        className="btn-unblock"
                                    >
                                        차단 해제
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 로그 다운로드 */}
            <div className="management-section">
                <h2>로그 다운로드</h2>
                <div className="log-download-form">
                    <div className="form-group">
                        <select
                            value={selectedLogType}
                            onChange={(e) => setSelectedLogType(e.target.value)}
                            className="form-select"
                        >
                            <option value="access">접근 로그</option>
                            <option value="error">에러 로그</option>
                            <option value="admin">관리자 작업 로그</option>
                        </select>
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                            className="form-input"
                        />
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                            className="form-input"
                        />
                        <button
                            onClick={handleDownloadLogs}
                            className="btn-download"
                        >
                            로그 다운로드
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;