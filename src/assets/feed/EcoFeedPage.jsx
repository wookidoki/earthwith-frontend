import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. onNavigate prop 대신 사용
import {
  Heart, MessageCircle, Send, Bookmark, Search, Users,
  ArrowRight, PlusSquare, Hash, Activity, ThumbsUp
} from 'lucide-react';
import { useAuth } from '../auth/authContext/AuthorContext.jsx';
import axios from 'axios'; // 윤기

//C:\Kdt_edu_leeseongwook\semi-project\src\assets\auth\authContext\AuthorContext.jsx









// src/assets/feed/EcoFeedPage.jsx
const EcoFeedPage = () => {
  const navigate = useNavigate(); // 3. useNavigate 훅 사용
  const { currentUser } = useAuth(); // 4. 현재 로그인한 유저 정보 (댓글 작성 시 사용)

  const [filter, setFilter] = useState('all'); // 'all', 'popular', 'recruit'
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState([]);
const [lastBoardNo, setLastBoardNo] = useState(null); // fetchOffset용
const [hasMore, setHasMore] = useState(true);
const LIMIT = 3;
const [todayParticipants, setTodayParticipants] = useState(0);

// 윤기 useState 오늘의 새글
const [todayPost, setTodayPost] = useState(0);

const mapDtoToPost = (dto) => {

  const categoryLabel = `#${dto.boardCategory} ${dto.categoryName}`;

  return {
    id: dto.boardNo,
    category: categoryLabel,
    title: dto.boardTitle,
    content: dto.boardContent,
    imageUrl: dto.attachmentPath ? `http://localhost:8081${dto.attachmentPath}` : null,

    boardCategory: dto.boardCategory, // 참여모집 'C' 게시글만 조회하기용 

    memberId: dto.memberId,
    regionName: dto.regionName,
    regDate: dto.regDate,

    tags: [ `#${dto.categoryName}`], //임시태그
    likes: dto.likeCount ?? 0,
    comments: 0,
    participants: 0,
    maxParticipants: 0,
    isLiked: false,
    isCommentOpen: false,
    commentsList: [],
    newCommentText: '',
  };
};

const fetchFeeds = async (reset = false) => {
  if (loading) return;
  if (!reset && !hasMore) return;

  try {
    setLoading(true);

    const params = {
      category: filter === 'recruit' ? 'C2' : 'C',      // C1~C5 전체
      limit: LIMIT,
    };

    if (!reset && lastBoardNo !== null) {
      params.fetchOffset = lastBoardNo;
    }

    const res = await axios.get('http://localhost:8081/api/boards/feed', {
      params,
    });

    const dtoList = res.data; // 배열
    const newPosts = dtoList.map(mapDtoToPost);

    setFeedData(prev =>
      reset ? newPosts : [...prev, ...newPosts]
    );

    // 더 가져올 게 없으면 hasMore=false
    if (newPosts.length < LIMIT) {
      setHasMore(false);
    }

    // 다음 fetchOffset용 boardNo 저장
    if (dtoList.length > 0) {
      const lastDto = dtoList[dtoList.length - 1];
      setLastBoardNo(lastDto.boardNo);
    }
  } catch (e) {
    console.error('피드 조회 실패:', e);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  // 맨 처음 로딩 시 0페이지 역할
  setHasMore(true);
  setLastBoardNo(null);
  fetchFeeds(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [filter]);

// ⭐⭐⭐ 오늘의 참여자 수 로딩 useEffect (여기다가 넣으면 됨)
  useEffect(() => {
    const todayParticipants = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8081/api/boards/stats/today',
          { params: { category: 'C2' } }
        );
        setTodayParticipants(res.data.todayParticipants);
      } catch (e) {
        console.error('오늘 참여자 수 조회 실패:', e);
      }
    };

    todayParticipants();
  }, []);

  useEffect(() => {
    const todayPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/boards/stats/todayPost`,
          { params : { category: 'C%' } }
        );
        console.log('todayPost 응답:', res.data);
        setTodayPost(res.data.todayPost);
      } catch (e) {
        console.error('오늘 새글 수 조회 실패:', e);
      }
    };
    
    todayPost();
  }, []);

  // 임시 피드 데이터 (초기 상태)
  /*
  const initialFeedData = [
    {
      id: 1,
      category: '#C2 참여',
      title: '주말 한강공원 플로깅 참여자 모집!',
      content: '이번 주 토요일 오후 2시, 여의도 한강공원에서 함께 쓰레기를 주우실 분들을 모집합니다. 가벼운 마음으로 참여해주세요!',
      imageUrl: 'https://placehold.co/600x400/a0e9b0/333?text=Plogging+Event',
      tags: ['#플로깅', '#한강공원', '#자원봉사'],
      likes: 128,
      comments: 1, 
      participants: 22,
      maxParticipants: 50,
      isLiked: false, 
      isCommentOpen: false,
      commentsList: [ 
        { id: 'c1-1', user: '에코프렌드', text: '저도 참여하고 싶어요!' }
      ],
      newCommentText: '',
    },
    // ... (다른 피드 데이터)
    {
      id: 2,
      category: '#C1 인증',
      title: '오늘부터 텀블러 사용 1일차',
      content: '회사에서 일회용컵 대신 텀블러를 사용하기 시작했습니다. 작은 실천이지만 뿌듯하네요!',
      imageUrl: 'https://placehold.co/600x600/b0c4de/333?text=My+Tumbler',
      tags: ['#텀블러인증', '#제로웨이스트'],
      likes: 245,
      comments: 0,
      isLiked: false,
      isCommentOpen: false,
      commentsList: [],
      newCommentText: '',
    },
  ];
*/


  // TODO: (AXIOS) useEffect(() => { ... }, []) - 컴포넌트 마운트 시 피드 목록(initialFeedData)을 API로 가져옵니다.
  //const [feedData, setFeedData] = useState(initialFeedData);

  // --- 이벤트 핸들러 ---

  // 좋아요 토글 핸들러
  const handleLikeToggle = async (postId) => {
    // TODO: (AXIOS) 백엔드 API 호출 (좋아요 상태 전송)
    // 예: await api.post(`/api/feed/${postId}/like`);
    if (!currentUser) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    setFeedData(prevFeed =>
      prevFeed.map(post => {
        if (post.id === postId) {
          const newLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
          return { ...post, isLiked: !post.isLiked, likes: newLikes };
        }
        return post;
      })
    );

    try {

      const response = await axios.post(
        `http://localhost:8081/api/boards/${postId}/like`,
        {
          memberId: currentUser.memberId,
        }
      );

      const { isLiked, likeCount } = response.data;

      setFeedData(prevFeed => 
        prevFeed.map(post => 
          post.id === postId 
          ? { ...post, isLiked, likes: likeCount } 
          : post 
        )
      );
    } catch (e) {
      console.error('좋아요 실패:', e);

      setFeedData(prevFeed =>
      prevFeed.map(post => {
        if (post.id === postId) {
          const newLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
          return { ...post, isLiked: !post.isLiked, likes: newLikes };
        }
        return post;
      })
    );
    alert('좋아요 처리 중 오류가 발생했습니다.');
  }

  };

  // 댓글창 토글 핸들러
  const handleCommentToggle = (postId) => {
    setFeedData(prevFeed =>
      prevFeed.map(post =>
        post.id === postId ? { ...post, isCommentOpen: !post.isCommentOpen } : post
      )
    );
  };

  // 새 댓글 입력 핸들러
  const handleNewCommentChange = (postId, text) => {
    setFeedData(prevFeed =>
      prevFeed.map(post =>
        post.id === postId ? { ...post, newCommentText: text } : post
      )
    );
  };

  // 새 댓글 등록 핸들러
  const handleCommentSubmit = (postId) => {
    const post = feedData.find(p => p.id === postId);
    if (!post || post.newCommentText.trim() === '') return;

    // TODO: (AXIOS) 백엔드 API 호출 (새 댓글 전송)
    // 예: const newCommentData = await api.post(`/api/feed/${postId}/comment`, { text: post.newCommentText });
    // const newComment = newCommentData.data;

    // 프론트엔드 임시 처리
    const newComment = {
      id: `c${Date.now()}`,
      user: currentUser?.name || '익명', // 5. useAuth에서 가져온 유저 이름 사용
      text: post.newCommentText,
    };

    setFeedData(prevFeed =>
      prevFeed.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            commentsList: [...p.commentsList, newComment], 
            comments: p.comments + 1,
            newCommentText: '', 
          };
        }
        return p;
      })
    );
  };

  // --- 무한 스크롤 ---
  useEffect(() => {
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // 바닥에서 200px 남았을 때
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 200;

    if (isNearBottom && !loading && hasMore) {
      // ✅ 더미 setTimeout 대신 실제 API 호출
      fetchFeeds(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [loading, hasMore, lastBoardNo]); // 6. filter 변경 시 effect 재실행 (필터링된 상태에서 스크롤 시)

  // 필터링된 데이터 (이제 state인 feedData를 사용)
  const filteredFeed = feedData.filter(post => {
    if (filter === 'popular') return post.likes >= 2;
    if (filter === 'recruit') return post.boardCategory === 'C2';
    return true; // 'all'
  });

  const getCategoryStyle = (category) => {
    switch (category) {
      case '#C1 인증': return 'bg-blue-100 text-blue-800';
      case '#C2 참여': return 'bg-emerald-100 text-emerald-800';
      case '#C3 후기': return 'bg-purple-100 text-purple-800';
      case '#C4 자유': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubNavStyle = (navFilter) => {
    return filter === navFilter
      ? 'border-emerald-500 text-emerald-600 font-bold'
      : 'border-transparent text-gray-500 hover:text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* 상단 네비게이션 (Header)은 MainLayout.jsx로 이동했습니다.
        이 페이지는 MainLayout의 <Outlet />에 렌더링됩니다.
      */}

      {/* 실시간 우리지역 활동 */}
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">실시간 우리지역 활동</h2>
          {/* TODO: (AXIOS) 이 통계 데이터는 API를 통해 가져와야 합니다. */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* 인기 태그 */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-3">
                <Hash className="w-5 h-5" />
                <span className="text-sm font-medium">인기 태그</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">#플로깅</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">#텀블러인증</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">#제로웨이스트</span>
              </div>
            </div>
            {/* 참여 현황 */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-3">
                <Activity className="w-5 h-5" />
                <span className="text-sm font-medium">참여 현황</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">오늘의 새글</span>
                  <span className="text-sm font-bold text-emerald-600">{todayPost} 건</span>
                </div>
                  <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">오늘의 참여</span>
                  <span className="text-sm font-bold text-emerald-600">{todayParticipants} 명</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 글쓰기 버튼 (우측 하단 고정) */}
      <button
        onClick={() => navigate('/user-enroll')} // 7. onNavigate -> navigate (절대경로)
        className="fixed bottom-28 right-6 md:right-10 z-40 flex items-center space-x-2 bg-emerald-600 text-white px-5 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-xl"
      >
        <PlusSquare className="w-5 h-5" />
        <span className="hidden md:inline">글쓰기</span>
      </button>

      {/* 서브 네비게이션 (필터) - 스크롤에 따라 상단에 고정 */}
      <div className="sticky top-20 bg-white/80 backdrop-blur-md z-30 border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-3 text-center text-sm border-b-2 transition-all ${getSubNavStyle('all')}`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('popular')}
            className={`flex-1 py-3 text-center text-sm border-b-2 transition-all ${getSubNavStyle('popular')}`}
          >
            인기글
          </button>
          <button
            onClick={() => setFilter('recruit')}
            className={`flex-1 py-3 text-center text-sm border-b-2 transition-all ${getSubNavStyle('recruit')}`}
          >
            참여모집
          </button>
        </div>
      </div>
      
      {/* 피드 목록 */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {filteredFeed.map((post) => (
          <article key={post.id} className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 overflow-hidden">
            <div className="p-5">
              {/* 카테고리 */}
              <div className="mb-3">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${getCategoryStyle(post.category)}`}>
                  {post.category.substring(3)}
                </span>
                <div className="flex">
                <div className="text-base text-gray-700 mb-1">
                  {post.memberId}  
                  </div>
                  <div className="text-xs text-gray-700 mb-1">
                  {post.regionName}
                  </div>
                  <div className="text-xs text-gray-700 mb-1">
                  {post.regDate}
                  </div>
                  </div>
              </div>

              {/* 텍스트 영역 */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
            </div>

            {/* 이미지 영역 */}
            {console.log('imageUrl:', post.imageUrl)}
            {post.imageUrl && (
              <div className="w-full bg-gray-200">
                <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover rounded-xl" />
              </div>
            )}

            <div className="p-5">
              {/* 태그 영역 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-emerald-600 font-medium cursor-pointer hover:underline">
                    {tag}
                  </span>
                ))}
              </div>
                
                

              {/* 하단 버튼 영역 */}
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                {/* 왼쪽: 공유, 북마크 */}
                <div className="flex space-x-5">
                  <button className="flex items-center space-x-1.5 text-gray-500 hover:text-emerald-600 transition-colors">
                    <Send className="w-5 h-5" />
                    <span className="text-sm font-medium">공유</span>
                  </button>
                  <button className="flex items-center space-x-1.5 text-gray-500 hover:text-emerald-600 transition-colors">
                    <Bookmark className="w-5 h-5" />
                    <span className="text-sm font-medium">북마크</span>
                  </button>
                </div>
                
                {/* 오른쪽: 좋아요, 댓글 */}
                <div className="flex space-x-5">
                  <button
                    onClick={() => handleLikeToggle(post.id)}
                    className={`flex items-center space-x-1.5 transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button
                    onClick={() => handleCommentToggle(post.id)}
                    className={`flex items-center space-x-1.5 transition-colors ${
                      post.isCommentOpen ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 댓글 섹션 (조건부 렌더링) */}
            {post.isCommentOpen && (
              <div className="border-t border-gray-200 px-5 py-4 bg-gray-50/50">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">댓글 ({post.comments})</h4>
                
                {/* 댓글 목록 */}
                <div className="space-y-3 max-h-48 overflow-y-auto mb-4 pr-2">
                  {post.commentsList.length === 0 ? (
                    <p className="text-sm text-gray-500">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
                  ) : (
                    post.commentsList.map(comment => (
                      <div key={comment.id} className="flex space-x-2">
                        <span className="font-bold text-sm text-gray-900 flex-shrink-0">{comment.user}</span>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* 댓글 입력창 */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <input
                    type="text"
                    placeholder="댓글을 입력하세요..."
                    value={post.newCommentText}
                    onChange={(e) => handleNewCommentChange(post.id, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                    disabled={post.newCommentText.trim() === ''}
                  >
                    등록
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </main>

      {/* 로딩 인디케이터 */}
      {loading && (
        <div className="text-center py-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="text-sm text-gray-600 mt-2">더 많은 피드를 불러오는 중...</p>
        </div>
      )}
    </div>
  );
};

export default EcoFeedPage;