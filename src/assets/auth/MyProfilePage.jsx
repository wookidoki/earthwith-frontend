import React from 'react';
import { User, Leaf, Award, Activity, Settings, LogOut, LayoutDashboard } from 'lucide-react';

// App.jsx로부터 onLogout, isAdmin, onNavigateToAdmin 함수를 props로 받습니다.
const MyProfilePage = ({ onLogout, isAdmin, onNavigateToAdmin }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 pb-28">
      <div className="max-w-4xl mx-auto">
        
        {/* 프로필 헤더 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center border-4 border-white shadow-md">
            <User className="w-16 h-16 text-emerald-600" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">EcoWarrior123</h1>
            <p className="text-gray-500 mt-1">서울시 강남구</p>
            <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">1,250 P</div>
                <div className="text-xs text-gray-500">내 포인트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">128 위</div>
                <div className="text-xs text-gray-500">지역 랭킹</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">3 건</div>
                <div className="text-xs text-gray-500">참여 활동</div>
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout} // 로그아웃 함수 실행
            className="w-full md:w-auto md:ml-auto px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>로그아웃</span>
          </button>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 관리자 페이지 버튼 (관리자일 때만 보임) */}
          {isAdmin && (
            <div
              onClick={onNavigateToAdmin}
              className="bg-white rounded-2xl shadow-lg border-2 border-emerald-500 p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow cursor-pointer hover:bg-emerald-50"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-700">관리자 페이지</h3>
                <p className="text-sm text-gray-500">신고, 회원, 피드 관리</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">내 활동 내역</h3>
              <p className="text-sm text-gray-500">내가 작성한 피드와 댓글 보기</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">포인트 내역</h3>
              <p className="text-sm text-gray-500">적립/사용한 포인트 확인</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">참여중인 챌린지</h3>
              <p className="text-sm text-gray-500">진행중인 챌린지 목록 보기</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">계정 설정</h3>
              <p className="text-sm text-gray-500">프로필, 알림, 지역 설정</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProfilePage;