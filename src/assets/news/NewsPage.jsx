import React, { useState, useMemo } from 'react';
import {
  Search, Newspaper, Droplet, Zap, Car, Home, ShoppingBag, Eye, ArrowRight
} from 'lucide-react';

// 뉴스출력페이지 API 를통해서 가져올 예정 
//C:\Kdt_edu_leeseongwook\semi-project\src\assets\news\NewsPage.jsx


// --- 임시 뉴스 데이터 ---
// 'views' (조회수)를 추가하여 인기 뉴스를 시뮬레이션합니다.
const allNewsData = [
  // --- B 카테고리 (공공) ---
  { id: 1, type: 'bento', title: '겨울철 에너지 절약 캠페인 자원봉사자 모집', category: '#B2 모집', imageUrl: 'https://placehold.co/600x400/34d399/ffffff?text=Eco+Campaign', views: 1520 },
  { id: 2, title: '지역별 탄소중립포인트 우수 참여 사례집 배포', category: '#B1 정보', date: '3시간 전', imageUrl: 'https://placehold.co/400x300/67e8f9/333?text=Carbon+Point', views: 890 },
  { id: 3, title: '환경부, \'제3회 기후 위기 대응\' 홍보 공모전 개최', category: '#B3 홍보', date: '1일 전', views: 1100 },
  // --- A 카테고리 (관리자) ---
  { id: 4, type: 'bento', title: '에너지 캐시백 신청 방법 A to Z', category: '#A2 에너지', imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Energy+Cashback', views: 2300 },
  { id: 5, type: 'bento', title: '서울시, 하반기 친환경 마을버스 시범 운행', category: '#A3 자동차', imageUrl: 'https://placehold.co/600x400/60a5fa/ffffff?text=Eco+Bus', views: 1800 },
  { id: 6, title: '분리수거, 아직도 헷갈리나요? 완벽 가이드', category: '#A4 일상생활', date: '1시간 전', imageUrl: 'https://placehold.co/400x300/c4b5fd/333?text=Recycle+Guide', views: 350 },
  { id: 7, title: '‘용기내 챌린지’가 바꾼 우리 동네 가게들', category: '#A5 녹색소비', date: '8시간 전', views: 1760 },
  { id: 8, title: '공공기관 1회용품 사용 금지, 12월부터 시행', category: '#A1 공공', date: '2일 전', imageUrl: 'https://placehold.co/400x300/22d3ee/333?text=Zero+Waste', views: 1900 },
];


// 뉴스 페이지 컴포넌트
const NewsPage = () => {
  // --- 상태 관리 ---
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태

  // --- 데이터 필터링 로직 (useMemo로 최적화) ---

  // 1. 검색어에 따라 필터링된 뉴스 데이터 생성
  const filteredNews = useMemo(() => {
    // 검색어 필터
    const searchFiltered = allNewsData.filter(news =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return searchFiltered;
  }, [searchTerm]); // 검색어가 변경될 때만 재계산

  // 2. 필터링된 결과를 '주요 뉴스'와 '리스트 뉴스'로 분리
  const { featuredNews, listNews } = useMemo(() => {
    // 조회수(views) 기준으로 내림차순 정렬
    const sortedNews = [...filteredNews].sort((a, b) => b.views - a.views);
    
    // 가장 인기 있는 3개 항목을 주요 뉴스로 선정
    const featured = sortedNews.slice(0, 3);
    
    // 주요 뉴스에 포함되지 않은 나머지 뉴스를 리스트로 선정
    const list = sortedNews.slice(3);
    
    return { featuredNews: featured, listNews: list };
  }, [filteredNews]); // 필터링된 뉴스가 바뀔 때만 재계산

  // --- 페이지 제목 설정 ---
  const pageTitle = '환경 소식';
  const pageSubtitle = 'API에서 가져온 최신 환경 뉴스를 확인하세요.';

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="max-w-6xl mx-auto p-4 md:p-8">

        {/* 헤더 및 검색 */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-gray-500 mt-1">{pageSubtitle}</p>
          </div>
          <div className="relative mt-4 md:mt-0 w-full md:w-72">
            <input
              type="text"
              placeholder="뉴스 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* --- 벤토 그리드 (인기 뉴스) --- */}
        {/* 인기 뉴스가 있을 때만 이 섹션을 표시 */}
        {featuredNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[220px] mb-12">
            {/* 첫 번째 아이템 (가장 큰) */}
            <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer">
              <img src={featuredNews[0].imageUrl} alt={featuredNews[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => e.target.src = 'https://placehold.co/600x400/34d399/ffffff?text=Image+Error'} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                {/* 카테고리 태그 제거됨 */}
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {featuredNews[0].title}
                </h2>
              </div>
            </div>
            
            {/* 두 번째 아이템 */}
            {featuredNews.length > 1 && (
              <div className="rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer">
                <img src={featuredNews[1].imageUrl} alt={featuredNews[1].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => e.target.src = 'https://placehold.co/600x400/f59e0b/ffffff?text=Image+Error'} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h2 className="text-lg font-bold text-white leading-tight">
                    {featuredNews[1].title}
                  </h2>
                </div>
              </div>
            )}
            
            {/* 세 번째 아이템 */}
            {featuredNews.length > 2 && (
              <div className="rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer">
                <img src={featuredNews[2].imageUrl} alt={featuredNews[2].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => e.target.src = 'https://placehold.co/600x400/60a5fa/ffffff?text=Image+Error'} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h2 className="text-lg font-bold text-white leading-tight">
                    {featuredNews[2].title}
                  </h2>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- 일반 게시물 리스트 (최신 소식 또는 나머지) --- */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">최신 소식</h2>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {/* 검색 결과가 없는 경우 */}
              {filteredNews.length === 0 && (
                <li className="p-8 text-center text-gray-500">
                  {searchTerm ? `'${searchTerm}'에 대한 검색 결과가 없습니다.` : '표시할 뉴스가 없습니다.'}
                </li>
              )}

              {/* 리스트 뉴스가 없는 경우 (단, 인기 뉴스는 있는 경우) */}
              {featuredNews.length > 0 && listNews.length === 0 && (
                 <li className="p-8 text-center text-gray-500">
                  더 많은 뉴스가 없습니다.
                </li>
              )}
              
              {listNews.map((news) => {
                return (
                  <li key={news.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex space-x-4 items-center">
                      {/* 썸네일 (이미지 또는 아이콘) */}
                      <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-20 bg-gray-100 rounded-lg overflow-hidden">
                        {news.imageUrl ? (
                          <img 
                            src={news.imageUrl} 
                            alt={news.title} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { 
                              e.currentTarget.style.display = 'none';
                              // TODO: onError 시 대체 아이콘을 표시하는 로직
                            }}
                          />
                        ) : (
                          // 이미지가 없는 경우 기본 아이콘
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <Newspaper className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* 텍스트 컨텐츠 */}
                      <div className="flex-1 min-w-0">
                        {/* 카테고리 태그 제거됨 */}
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors mb-1">
                          {news.title}
                        </h3>
                        {news.date && (
                          <p className="text-sm text-gray-500 mt-1">{news.date}</p>
                        )}
                      </div>
                      
                      {/* 화살표 아이콘 */}
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsPage;