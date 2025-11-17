import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, Home, PlusSquare, User, Newspaper, Building2 
} from 'lucide-react';
import { useAuth } from '../../auth/authContext/AuthorContext';

// src/assets/common/Navigator.jsx
const Navigator = () => {
  const { isLoggedIn } = useAuth(); // 2. Context에서 로그인 상태 가져오기
  const location = useLocation();

  // 3. MainLayout에 의해 렌더링되므로, 독립 페이지(랜딩,로그인 등)에선
   // 이 컴포넌트 자체가 렌더링되지 않습니다. 따라서 hiddenPaths 로직 제거.

  const getButtonClass = (path) => {
    // 4. (수정) /admin 또는 /admin-filtered일 때 해당 아이콘만 활성화
    const baseNav = path.split('-')[0]; // '/admin-filtered' -> '/admin'
    const currentBaseNav = location.pathname.split('-')[0];

    if (path === '/admin' && location.pathname === '/admin-filtered') {
      return "text-gray-400 hover:text-gray-600";
    }
    if (path === '/admin-filtered' && location.pathname === '/admin') {
      return "text-gray-400 hover:text-gray-600";
    }
  
    return location.pathname === path
      ? "text-emerald-600" // 활성
      : "text-gray-400 hover:text-gray-600"; // 비활성
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white/50 z-50 flex items-center space-x-6 md:space-x-8">
      
      {/* 5. 모든 버튼을 <Link>로 변경 */}
      <Link to="/main" className={`${getButtonClass("/main")} transition-colors`}>
        <LayoutGrid className="w-6 h-6" />
      </Link>
      
      <Link to="/feed" className={`${getButtonClass("/feed")} transition-colors`}>
        <Home className="w-6 h-6" />
      </Link>
      
      <Link to="/news" className={`${getButtonClass("/news")} transition-colors`}>
        <Newspaper className="w-6 h-6" />
      </Link>
      
      {/* (A+B) 전체 게시물 */}
      <Link to="/board" className={`${getButtonClass("/board")} transition-colors`}>
        <Building2 className="w-6 h-6" />
      </Link>
      
      {/* (A) 관리자 게시물 */}
      <Link to="/board-filtered" className={`${getButtonClass("/board-filtered")} transition-colors`}>
        <PlusSquare className="w-6 h-6" />
      </Link>
      
      <Link 
        to={isLoggedIn ? "/myprofile" : "/signup"}
        className={`${getButtonClass(isLoggedIn ? "/myprofile" : "/signup")} transition-colors`}
      >
        <User className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default Navigator;