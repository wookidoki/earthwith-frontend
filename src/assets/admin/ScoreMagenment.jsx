import React, { useState } from 'react';
import { CheckSquare, ArrowUp, ArrowDown, Settings, Zap, List } from 'lucide-react';

const initialPendingPosts = [
  { id: 1, author: '김환경', title: '플로깅 챌린지 성공 인증!', content: '쓰레기 5kg 주웠어요.', type: 'FEED', date: '2025-11-16', score: null },
  { id: 2, author: '에코맨', title: '친환경 세제 사용 후기', content: '거품도 잘나고 좋아요.', type: 'BOARD', date: '2025-11-17', score: null },
  { id: 3, author: '제로웨이스트', title: '대나무 칫솔 구매', content: '플라스틱 대신 대나무!', type: 'FEED', date: '2025-11-17', score: null },
  { id: 4, author: '나들이', title: '숲속 캠핑 후기', content: '자연과 함께하는 시간', type: 'BOARD', date: '2025-11-17', score: null },
];

const ScoreButton = ({ postId, handleScoreGrant }) => {
  const scores = [10, 20, 30, 40, 50];
  return (
    <div className="flex space-x-1 flex-wrap">
      {scores.map(score => (
        <button
          key={score}
          onClick={() => handleScoreGrant(postId, score)}
          className="text-xs bg-emerald-100 text-emerald-700 py-1 px-2 rounded-md hover:bg-emerald-200 transition mb-1"
          title={`+${score}점 부여`}
        >
          +{score}점
        </button>
      ))}
    </div>
  );
};

const TypeBadge = ({ type }) => (
  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
    type === 'FEED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }`}>
    {type === 'FEED' ? '피드 (Y)' : '게시판 (N)'}
  </span>
);

const PendingVerification = () => {
  const [posts, setPosts] = useState(initialPendingPosts);
  const [selectedType, setSelectedType] = useState('ALL'); // ALL, FEED, BOARD
  const [expandedId, setExpandedId] = useState(null);

  // 필터링된 게시글 목록
  const filteredPosts = posts.filter(post => 
    selectedType === 'ALL' || post.type === selectedType
  );

  // 게시글 속성 변경 (FEED <-> BOARD)
  const handleTypeChange = (postId, currentType) => {
    const newType = currentType === 'FEED' ? 'BOARD' : 'FEED';
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, type: newType } : post
    ));
    console.log(`게시글 ${postId} 속성 변경: ${newType}`);
  };

  // 점수 부여
  const handleScoreGrant = (postId, score) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, score: score } : post
    ));
    // 실제로는 점수 부여 후 목록에서 제외하는 로직이 일반적입니다.
    // setPosts(posts.filter(post => post.id !== postId)); 
    console.log(`게시글 ${postId} 작성자에게 ${score}점 부여.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-6xl mx-auto py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4 flex items-center">
            <CheckSquare className="w-7 h-7 mr-2 text-orange-500" /> 인증 대기 및 포인트 부여
          </h1>
          <p className="text-gray-500 mt-2">
            사용자 게시글을 확인하고 속성을 변경하거나 활동 점수를 부여합니다.
          </p>
        </header>

        {/* 필터 영역 */}
        <div className="flex space-x-2 mb-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
          <button 
            onClick={() => setSelectedType('ALL')}
            className={`py-2 px-4 rounded-lg font-semibold transition ${selectedType === 'ALL' ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            전체 ({posts.length})
          </button>
          <button 
            onClick={() => setSelectedType('FEED')}
            className={`py-2 px-4 rounded-lg font-semibold transition ${selectedType === 'FEED' ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            피드 (Y)
          </button>
          <button 
            onClick={() => setSelectedType('BOARD')}
            className={`py-2 px-4 rounded-lg font-semibold transition ${selectedType === 'BOARD' ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            공공게시판 (N)
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-50">
              <tr>
                {['ID', '작성자', '제목', '속성', '작성일', '상세/관리'].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <React.Fragment key={post.id}>
                  <tr className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.author}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{post.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TypeBadge type={post.type} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                        className="text-orange-600 hover:text-orange-800 transition"
                      >
                        {expandedId === post.id ? '상세 닫기' : '상세 보기'}
                        {expandedId === post.id ? <ArrowUp className="w-4 h-4 inline ml-1"/> : <ArrowDown className="w-4 h-4 inline ml-1"/>}
                      </button>
                    </td>
                  </tr>
                  {/* 상세 정보 및 액션 패널 */}
                  {expandedId === post.id && (
                    <tr className="bg-orange-50/50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* 게시글 내용 */}
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">게시글 내용:</h4>
                            <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border max-h-40 overflow-y-auto">{post.content}</p>
                          </div>
                          {/* 관리 액션 */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-700 flex items-center">
                              <Zap className="w-4 h-4 mr-1 text-emerald-500" /> 포인트 부여 (현재 점수: {post.score || 0}점)
                            </h4>
                            <ScoreButton postId={post.id} handleScoreGrant={handleScoreGrant} />

                            <h4 className="font-semibold text-gray-700 flex items-center pt-2 border-t">
                              <Settings className="w-4 h-4 mr-1 text-orange-500" /> 속성 변경 (현재: {post.type})
                            </h4>
                            <div className='flex space-x-2'>
                              <button
                                onClick={() => handleTypeChange(post.id, post.type)}
                                className="text-sm bg-blue-100 text-blue-700 py-1 px-3 rounded-md hover:bg-blue-200 transition"
                              >
                                {post.type === 'FEED' ? '게시판(N)으로 변경' : '피드(Y)로 변경'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    선택된 필터에 해당하는 게시물이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingVerification;