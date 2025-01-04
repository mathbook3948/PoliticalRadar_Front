import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import './css/analysis_report.css';

interface KeywordData {
    text: string;
    size: number;
}

interface TrendData {
    month: string;
    articles: number;
    issues: number;
}

interface PolicyData {
    name: string;
    value: number;
}

interface KeywordFrequency {
    name: string;
    count: number;
}

const AnalysisReport: React.FC = () => {
    // 더미 데이터 - 키워드 빈도수
    const keywordData: KeywordFrequency[] = [
        { name: '정책발표', count: 245 },
        { name: '국회회의', count: 189 },
        { name: '예산안', count: 167 },
        { name: '민생대책', count: 156 },
        { name: '법안처리', count: 134 }
    ];

    // 더미 데이터 - 월간 뉴스 트렌드
    const trendData: TrendData[] = [
        { month: '2024-01', articles: 1250, issues: 45 },
        { month: '2024-02', articles: 1420, issues: 52 },
        { month: '2024-03', articles: 1680, issues: 63 },
        { month: '2024-04', articles: 1520, issues: 58 }
    ];

    // 더미 데이터 - 정책 분야별 분포
    const policyData: PolicyData[] = [
        { name: '경제', value: 35 },
        { name: '복지', value: 25 },
        { name: '외교', value: 20 },
        { name: '환경', value: 15 },
        { name: '교육', value: 5 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    // 더미 데이터 - 주요 키워드 클라우드
    const keywords: KeywordData[] = [
        { text: '정책발표', size: 40 },
        { text: '국회회의', size: 35 },
        { text: '예산안', size: 30 },
        { text: '민생대책', size: 25 },
        { text: '법안처리', size: 20 }
    ];

    // 커스텀 툴팁 컴포넌트
    const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{`${label}`}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-8">
            {/* 헤더 섹션 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#1a237e] mb-2">정치 뉴스 분석 리포트</h1>
                <p className="text-gray-600">최근 한달간의 정치 뉴스 분석 및 트렌드</p>
            </div>

            {/* 주요 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">총 분석 기사</h3>
                    <p className="text-3xl font-bold text-[#1a237e]">5,870</p>
                    <p className="text-sm text-gray-500">전월 대비 +12%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">주요 이슈</h3>
                    <p className="text-3xl font-bold text-[#1a237e]">218</p>
                    <p className="text-sm text-gray-500">전월 대비 +8%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">키워드 발굴</h3>
                    <p className="text-3xl font-bold text-[#1a237e]">1,245</p>
                    <p className="text-sm text-gray-500">전월 대비 +15%</p>
                </div>
            </div>

            {/* 트렌드 그래프 */}
            <div className="chart-container">
                <h2 className="chart-title">월간 뉴스 트렌드</h2>
                <div className="chart-content">
                    <ResponsiveContainer>
                        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="articles" stroke="#1a237e" name="기사 수" />
                            <Line yAxisId="right" type="monotone" dataKey="issues" stroke="#304ffe" name="이슈 수" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 키워드 분석 및 정책 분포 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* 정책 분야별 분포 */}
                <div className="chart-container">
                    <h2 className="chart-title">정책 분야별 분포</h2>
                    <div className="chart-content">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={policyData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={true}
                                    label={({ name, value }) => `${name} ${value}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {policyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 주요 이슈 요약 */}
            <div className="chart-container">
                <h2 className="chart-title">주요 이슈 요약</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">1. 새로운 경제 정책 발표</h3>
                        <p className="text-gray-600">정부가 새로운 경제 활성화 대책을 발표하며, 일자리 창출과 물가안정에 초점을 맞춘 정책 제시</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">2. 복지 예산 증액 논의</h3>
                        <p className="text-gray-600">내년도 복지 예산 증액을 둘러싼 여야 간 논의가 활발히 진행 중</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">3. 국제 협력 강화</h3>
                        <p className="text-gray-600">주요 외교 정상회담을 통한 국제 협력 강화 방안 모색</p>
                    </div>
                </div>
            </div>

            {/* 전망 및 시사점 */}
            <div className="chart-container">
                <h2 className="chart-title">최근 한 달간의 이슈 요약</h2>
                <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4">
                        최근 한 달간의 정치 뉴스 분석 결과, 경제 활성화와 복지 정책에 대한 관심이 높아지고 있으며,
                        특히 일자리 창출과 물가안정 관련 정책이 주요 화두로 떠오르고 있
                        특히 일자리 창출과 물가안정 관련 정책이 주요 화두로 떠오르고 있습니다.
                    </p>
                    <p className="text-gray-600">
                        향후 국제 협력 강화와 환경 정책에 대한 논의가 더욱 활발해질 것으로 전망되며,
                        이에 따른 정책적 변화와 대응이 필요할 것으로 분석됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AnalysisReport;