import React from 'react';
import { TrendingUp, Users, Zap, Clock } from 'lucide-react';

const mockStats = [
  { icon: Users, title: '총 회원 수', value: '12,500명', trend: '+15% (이번 달)', color: 'bg-blue-100 text-blue-600' },
  { icon: Zap, title: '누적 포인트 지급', value: '8,900,000 P', trend: '+120,000 P (오늘)', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Clock, title: '일일 활성 사용자', value: '3,100명', trend: '평균 대비 +3%', color: 'bg-yellow-100 text-yellow-600' },
  { icon: TrendingUp, title: '신규 게시물 수', value: '1,450건', trend: '-5% (어제 대비)', color: 'bg-red-100 text-red-600' },
];

const StatCard = ({ icon: Icon, title, value, trend, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
    <div className={`flex items-center justify-between mb-4 ${color} p-2 rounded-lg`}>
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <Icon className={`w-6 h-6 ${color.split(' ')[1]}`} />
    </div>
    <p className="text-3xl font-extrabold text-gray-900 mb-1">{value}</p>
    <p className={`text-sm font-semibold ${color.split(' ')[1]}`}>
      {trend}
    </p>
  </div>
);

const StatisticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-7xl mx-auto py-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 flex items-center">
            <TrendingUp className="w-7 h-7 mr-2 text-blue-500" /> 서비스 통계 대시보드
          </h1>
          <p className="text-gray-500 mt-2">
            서비스의 핵심 성과 지표(KPI)와 사용자 활동 추이를 확인합니다.
          </p>
        </header>

        {/* 핵심 지표 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </section>

        {/* 차트 영역 */}
        <section className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">월별 신규 가입자 추이</h2>
            <div className="h-80 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
              {/* 실제로는 여기에 차트 라이브러리 (Recharts 또는 D3)를 사용하여 그래프를 표시합니다. */}
              [월별 신규 가입자 추이 그래프 Placeholder]
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">활동 유형별 게시물 비중</h2>
            <div className="h-80 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
              {/* 실제로는 여기에 파이/도넛 차트를 표시합니다. */}
              [활동 유형별 게시물 비중 차트 Placeholder]
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default StatisticsPage;