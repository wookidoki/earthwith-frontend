import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

// src/assets/board/BoardDetail.jsx

const BoardDetail = () => {
    // 페이지 이동이 되는지 테스트하기 위해 훅은 유지합니다.
    const { id } = useParams(); // URL 파라미터에서 게시물 ID를 가져옵니다.
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <main className="max-w-4xl mx-auto py-10 bg-white rounded-xl shadow-2xl p-8">

                {/* 뒤로 가기 버튼 */}
                <header className="mb-8 border-b pb-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-emerald-600 font-medium transition"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> 목록으로 돌아가기
                    </button>
                </header>

                <div className="text-center py-20">
                    <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-6" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">
                        페이지 로드 성공!
                    </h1>
                    <p className="text-xl text-gray-600">
                        라우팅이 정상적으로 작동하고 있습니다.
                    </p>
                    <p className="text-lg text-gray-500 mt-2">
                        게시물 ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{id}</span>
                    </p>
                    <p className="mt-8 text-sm text-red-500">
                        * 이 페이지가 보인다면, 이전 오류는 이 컴포넌트 내부의 복잡한 로직이나 상태 문제 때문입니다.
                    </p>
                </div>
                
            </main>
        </div>
    );
};

export default BoardDetail;