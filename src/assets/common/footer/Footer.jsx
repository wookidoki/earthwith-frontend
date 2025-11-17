import React from 'react';
import { Leaf } from 'lucide-react';

// src/assets/common/footer/Footer.jsx
// (파일 경로가 주석에 명시되어 있어 해당 경로로 이동)

const Footer = () => {
  return (
    // 1. 네비게이션 바 공간 확보 (pb-28)
    <footer className="w-full bg-gray-100 border-t border-gray-200 mt-20 pb-28 md:pb-10"> 
      <div className="max-w-[1400px] mx-auto px-8 py-10 text-gray-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 및 소개 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-medium text-gray-900">어스윗</span>
            </div>
            <p className="text-sm">
              지속 가능한 미래를 위한 연결.
            </p>
          </div>
          
          {/* 바로가기 */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">바로가기</h3>
            <ul className="space-y-2 text-sm">
              {/* TODO: Link 컴포넌트로 변경 필요 */}
              <li><a href="/main" className="hover:text-emerald-600">메인</a></li>
              <li><a href="/feed" className="hover:text-emerald-600">커뮤니티</a></li>
              <li><a href="/news" className="hover:text-emerald-600">뉴스</a></li>
              <li><a href="/signup" className="hover:text-emerald-600">로그인</a></li>
            </ul>
          </div>

          {/* 정보 */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">정보</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-600">탄소중립포인트란?</a></li>
              <li><a href="#" className="hover:text-emerald-600">가입 안내</a></li>
              <li><a href="#" className="hover:text-emerald-600">운영정책</a></li>
              <li><a href="#" className="hover:text-emerald-600">개인정보처리방침</a></li>
            </ul>
          </div>

          {/* 고객센터 */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">고객센터</h3>
            <p className="text-sm">
              eco.connect@example.com
            </p>
            <p className="text-sm mt-1">
              (운영시간: 평일 10:00 - 18:00)
            </p>
          </div>
        </div>
        
        {/* 하단 카피라이트 */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-xs">
          <p>&copy; 2025 EcoConnect. All rights reserved.</p>
          <p className="mt-1">본 사이트는 포트폴리오 목적으로 제작되었으며, 실제 서비스가 아닙니다.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;