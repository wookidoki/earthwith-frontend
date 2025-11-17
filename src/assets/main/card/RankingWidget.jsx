import React, { useState } from 'react'; // useState 추가
import { useNavigate } from 'react-router-dom';
import { Award, User, Zap } from 'lucide-react'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// 목업 데이터
const mockRankingData = [
  { rank: 1, name: 'user_green', points: '15,000 P', color: 'text-yellow-500' },
  { rank: 2, name: 'eco_master', points: '12,500 P', color: 'text-gray-400' },
  { rank: 3, name: 'earth_love', points: '11,200 P', color: 'text-orange-400' },
];

const RankingWidget = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // --- 슬라이드 1: 마이페이지 정보 UI ---
  const renderProfileInfo = () => (
    <div className="p-8 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-6 h-6 mr-2 text-emerald-500"/> 마이페이지
        </h3>
        {/* TODO: (AXIOS) 이 통계 데이터는 API를 통해 가져와야 합니다. */}
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-500 flex items-center"><Zap className="w-4 h-4 mr-1 text-emerald-600"/> 내 포인트</span>
            <span className="font-bold text-emerald-600 text-lg">1,250 P</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-500">내 지역 랭킹</span>
            <span className="font-bold text-gray-700">128 위</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-500">참여한 활동</span>
            <span className="font-bold text-gray-700">3 건</span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => navigate('/myprofile')}
        className="w-full mt-6 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-xl hover:bg-emerald-100 transition-all font-medium shadow-md"
      >
        자세히 보기
      </button>
    </div>
  );

  // --- 슬라이드 2: 지역 랭킹 UI ---
  const renderRankingInfo = () => (
    <div className="p-8 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">지역 랭킹 (서울 강남구)</h3>
        {/* TODO: (AXIOS) 이 랭킹 데이터는 API를 통해 가져와야 합니다. */}
        <div className="space-y-4">
          {mockRankingData.map((item) => (
            <div key={item.rank} className="flex items-center space-x-3 p-2 rounded-lg transition hover:bg-gray-50">
              <Award className={`w-5 h-5 ${item.color}`} />
              <span className="font-medium text-gray-700">{item.rank}. {item.name}</span>
              <span className="ml-auto text-sm text-gray-500">{item.points}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full mt-6 bg-gray-100 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium shadow-md">
        전체 랭킹 보기
      </button>
    </div>
  );

  // --- 로그인 상태 UI ---
  const renderLoginPrompt = () => (
    <div className="p-8 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">로그인 필요</h3>
        <p className="text-gray-600 mb-6">
          로그인하고 내 포인트와 지역 랭킹을 확인하세요.
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">지역 랭킹 (전국)</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="font-medium text-gray-700">1. 서울 강남구</span>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-700">2. 부산 해운대구</span>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-orange-400" />
            <span className="font-medium text-gray-700">3. 제주시</span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => navigate('/signup')}
        className="w-full mt-6 bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 transition-all font-medium shadow-lg shadow-emerald-200"
      >
        로그인 하러 가기
      </button>
    </div>
  );

  // --- 메인 렌더링 ---
  return (
    <div className="col-span-12 md:col-span-4 row-span-4 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden min-h-[400px]">
      {isLoggedIn ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          <SwiperSlide>{renderProfileInfo()}</SwiperSlide>
          <SwiperSlide>{renderRankingInfo()}</SwiperSlide>
        </Swiper>
      ) : (
        renderLoginPrompt()
      )}
    </div>
  );
};

export default RankingWidget;