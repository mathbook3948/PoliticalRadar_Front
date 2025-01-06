import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";

interface AdminOnlyProps {
    children: React.ReactNode;
}

const API_URL = 'https://politicalradar-api.xyz';
// const API_URL = 'http://localhost:8000';

const AdminOnly: React.FC<AdminOnlyProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem('admin_token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await axios.get(API_URL + '/admin/check', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    sessionStorage.removeItem('admin_token');
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                setIsAuthenticated(false);
                sessionStorage.removeItem('admin_token');
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        // Loading state
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '2rem' }}>
                <div className="news-card">
                    <div className="issue">Loading...</div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="container">
                <div className="news-card">
                    <div className="issue" style={{ color: 'var(--secondary-color)' }}>
                        접근 권한이 없습니다
                    </div>
                    <div className="importance">
                        이 페이지는 관리자만 접근할 수 있습니다. 관리자 로그인이 필요합니다.
                    </div>
                    <button
                        onClick={() => window.location.href = '/admin/login'}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }}
                    >
                        로그인 페이지로 이동
                    </button>
                </div>
            </div>
        );
    }

    // Authorized state
    return <>{children}</>;
};

export default AdminOnly;