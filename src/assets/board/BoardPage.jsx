import React, { useState, useMemo, useEffect } from 'react'; // 1. useEffect 임포트
import { useNavigate } from 'react-router-dom'; // 2. onNavigate prop 대신 사용
import { useAuth } from "../auth/authContext/AuthorContext.jsx";
import {
  PlusSquare, Search, ChevronRight, Eye, Droplet, Sun, Car,
  ShoppingBag, Users, BookOpen
} from 'lucide-react';

// src/assets/board/BoardPage.jsx

// 임시 게시물 데이터 (A, B 카테고리 혼합)
const MOCK_POSTS_DATA = [
  { id: 1, title: '서울시, 친환경 에너지 보급 확대 정책 발표', category: '#A1 공공', date: '1일 전', views: 1204, icon: Sun, color: 'text-orange-500', img: 'https://placehold.co/600x400/f97316/white?text=에너지' },
  { id: 2, title: '겨울철 에너지 절약 캠페인 자원봉사자 모집', category: '#B2 모집', date: '2일 전', views: 876, icon: Users, color: 'text-blue-500', img: 'https://placehold.co/600x400/3b82f6/white?text=모집' },
  { id: 3, title: '전기차 보조금 개편안 상세 안내 (2026년)', category: '#A3 자동차', date: '2일 전', views: 2300, icon: Car, color: 'text-blue-600', img: 'https://placehold.co/600x400/2563eb/white?text=자동차' },
  { id: 4, title: '올바른 분리수거 가이드라인 v3.0 배포', category: '#B1 정보', date: '3일 전', views: 952, icon: Droplet, color: 'text-cyan-500', img: 'https://placehold.co/600x400/06b6d4/white?text=정보' },
  { id: 5, title: '‘용기내 챌린지’가 바꾼 우리 동네 가게들', category: '#A5 녹색소비', date: '4일 전', views: 1840, icon: ShoppingBag, color: 'text-green-500', img: 'https://placehold.co/600x400/22c55e/white?text=녹색소비' },
  { id: 6, title: '지역별 탄소중립포인트 우수 참여 사례집 배포', category: '#B1 정보', date: '5일 전', views: 730, icon: BookOpen, color: 'text-indigo-500', img: 'https://placehold.co/600x400/6366f1/white?text=정보' },
];

const parseCategoryTag = (categoryStr) => {
  if (!categoryStr) return '기타';
  const parts = categoryStr.split(' ');
  return parts.length > 1 ? parts[1] : categoryStr;
};

const BoardPage = ({ pageFilter }) => { // 4. onNavigate, isAdmin prop 제거
  const navigate = useNavigate(); // 5. useNavigate 훅 사용
  const { isAdmin } = useAuth(); // 6. useAuth 훅으로 isAdmin 상태 가져오기

  const [allPostsData, setAllPostsData] = useState([]); // 7. 데이터 상태화
  const [loading, setLoading] = useState(true); // 8. 로딩 상태 추가

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // ⭐ 상세 페이지 이동 핸들러
  const handlePostClick = (postId) => {
    navigate(`/board-detail/${postId}`);
  };

  // 9. TODO: (AXIOS) 컴포넌트 마운트 시 API로 게시물 데이터 가져오기
  useEffect(() => {
    // API 호출 시뮬레이션
    setLoading(true);
    setTimeout(() => {
      setAllPostsData(MOCK_POSTS_DATA);
      setLoading(false);
    }, 500); // 0.5초 딜레이
    
  }, []); // 빈 배열: 마운트 시 1회 실행

  // --- 데이터 필터링 로직 (useMemo로 최적화) ---

  // 1. 고유 카테고리 목록 생성 (필터 버튼용)
  const uniqueCategories = useMemo(() => {
    const relevantPosts = allPostsData.filter(post => {
      if (pageFilter === 'ALL') return post.category.startsWith('#A') || post.category.startsWith('#B');
      if (pageFilter === 'A') return post.category.startsWith('#A');
      return false;
    });

    const categories = relevantPosts
      .map(post => parseCategoryTag(post.category))
      .filter((value, index, self) => self.indexOf(value) === index);
    return ['전체', ...categories.sort()];
  }, [pageFilter, allPostsData]); // 10. allPostsData 의존성 추가

  // 2. prop, 카테고리, 검색어에 따라 필터링된 게시물 데이터 생성
  const filteredPosts = useMemo(() => {
    const propFiltered = allPostsData.filter(post => {
      if (pageFilter === 'ALL') {
        return post.category.startsWith('#A') || post.category.startsWith('#B');
      }
      if (pageFilter === 'A') {
        return post.category.startsWith('#A');
      }
      return false;
    });

    const categoryFiltered = propFiltered.filter(post => {
      if (selectedCategory === '전체') return true;
      return parseCategoryTag(post.category) === selectedCategory;
    });

    const searchFiltered = categoryFiltered.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return searchFiltered;
  }, [pageFilter, selectedCategory, searchTerm, allPostsData]); // 11. allPostsData 의존성 추가

  const pageTitle = pageFilter === 'A' ? '관리자 게시물' : '전체 게시물';
  const pageDescription = pageFilter === 'A'
    ? '관리자가 등록한 주요 공지사항과 정보를 확인합니다.'
    : '모든 공공 및 관리자 게시물을 확인합니다.';

  const bentoPosts = filteredPosts.slice(0, 4);
  const listPosts = filteredPosts.slice(4);

  // 12. 로딩 중 UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-28 flex justify-center items-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* 헤더 (MainLayout으로 이동) */}
      <header className="bg-white sticky top-20 z-30 border-b border-gray-200"> {/* 13. top-20 (헤더 높이만큼) */}
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-gray-500 mt-1">{pageDescription}</p>
          </div>
          {/* 관리자일 때만 '새 글 작성' 버튼 표시 */}
          {isAdmin && (
            <button
              onClick={() => navigate('/admin-enroll')} // 14. onNavigate -> navigate (절대경로)
              className="flex items-center space-x-2 px-5 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30"
            >
              <PlusSquare className="w-5 h-5" />
              <span>새 글 작성</span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* --- 검색 및 필터 컨트롤 패널 --- */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 검색창 */}
            <div className="relative w-full md:flex-1">
              <input
                type="text"
                placeholder="게시물 제목 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {/* 카테고리 필터 */}
            <div className="w-full md:flex-1 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {uniqueCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 상단 벤토 그리드 */}
        {bentoPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* 첫 번째 (가장 큰) 게시물 */}
            <div 
              onClick={() => handlePostClick(bentoPosts[0].id)} // ⭐ 클릭 이벤트 연결
              className="md:col-span-1 md:row-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="relative w-full h-64 rounded-xl overflow-hidden mb-5">
                <img src={bentoPosts[0].img} alt={bentoPosts[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${bentoPosts[0].color.replace('text-', 'bg-').replace('500', '100')} ${bentoPosts[0].color}`}>
                  {bentoPosts[0].category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-emerald-600 transition-colors">
                {bentoPosts[0].title}
              </h2>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>{bentoPosts[0].date}</span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{bentoPosts[0].views}</span>
                </span>
              </div>
            </div>

            {/* 나머지 벤토 게시물 */}
            {bentoPosts.slice(1, 4).map((post) => (
              <div 
                key={post.id} 
                onClick={() => handlePostClick(post.id)} // ⭐ 클릭 이벤트 연결
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group flex items-start space-x-5"
              >
                <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <span className={`text-xs font-bold ${post.color}`}>{post.category}</span>
                    <h3 className="text-md font-bold text-gray-800 mt-1 mb-2 group-hover:text-emerald-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 space-x-3 mt-2">
                    <span>{post.date}</span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 하단 게시물 리스트 */}
        {listPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">최신 게시물</h2>
            <div className="space-y-6">
              {listPosts.map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => handlePostClick(post.id)} // ⭐ 클릭 이벤트 연결
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
                >
                  <div className="w-full md:w-48 h-32 md:h-full flex-shrink-0 rounded-xl overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-bold ${post.color}`}>{post.category}</span>
                    <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-6">
                      <span>{post.date}</span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 게시물 없음 메시지 */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700">게시물이 없습니다.</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm ? `'${searchTerm}'에 대한 검색 결과가 없습니다.` : '선택한 카테고리에 해당하는 게시물이 없습니다.'}
            </p>
          </div>
        )}

      </main>
    </div>
  );
};

export default BoardPage;