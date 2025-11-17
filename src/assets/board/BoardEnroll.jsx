import React, { useState } from 'react';
import { Upload, Image, Type, AlignLeft, Save, X, ChevronLeft } from 'lucide-react';

// 관리자 , 일반유저 에 따라 다른 콘텐츠 등록 페이지
// src\assets\board\BoardEnroll.jsx

const AdminEnroll = ({ onNavigate, isAdmin }) => { // isAdmin prop 추가
  const [preview, setPreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleImageChange = (e) => {
    // ... (미리보기 로직)
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  // 카테고리 목록
  const adminCategories = [
    { id: '#A1', label: '공공' },
    { id: '#A2', label: '에너지' },
    { id: '#A3', label: '자동차' },
    { id: '#A4', label: '일상생활' },
    { id: '#A5', label: '녹색소비' },
  ];
  
  const publicCategories = [
    { id: '#B1', label: '정보' },
    { id: '#B2', label: '모집' },
    { id: '#B3', label: '홍보' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
             <button 
              onClick={() => onNavigate('admin')} // 관리자 게시물 목록으로 돌아가기
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">콘텐츠 업로드</h1>
              <p className="text-gray-500 text-sm mt-1">새로운 공공 소식이나 캠페인을 등록하세요.</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => onNavigate('admin')}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-100 bg-white transition-colors"
            >
              취소
            </button>
            <button className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-md shadow-emerald-200 flex items-center">
              <Save className="w-4 h-4 mr-2" /> 게시하기
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* 왼쪽: 입력 폼 */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* 제목 입력 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                <Type className="w-4 h-4 mr-2 text-emerald-500" /> 제목
              </label>
              <input 
                type="text" 
                className="w-full text-xl font-bold border-b border-gray-200 py-2 focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-300"
                placeholder="여기에 제목을 입력하세요"
              />
            </div>

            {/* 내용 입력 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-[400px] flex flex-col">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                <AlignLeft className="w-4 h-4 mr-2 text-emerald-500" /> 내용
              </label>
              <textarea 
                className="w-full flex-1 resize-none border-none focus:ring-0 text-gray-700 leading-relaxed placeholder-gray-300"
                placeholder="내용을 자유롭게 작성해주세요..."
              ></textarea>
          </div>
          </div>

          {/* 오른쪽: 설정 및 이미지 */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* 썸네일 업로드 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                <Image className="w-4 h-4 mr-2 text-emerald-500" /> 대표 이미지
              </label>
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-emerald-400 hover:text-emerald-500 transition-all cursor-pointer bg-gray-50">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-xs">클릭하여 이미지 업로드</span>
              </div>
            </div>

            {/* 카테고리 설정 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* 관리자 카테고리 (조건부 렌더링) */}
              {isAdmin && (
                <>
                  <label className="block text-sm font-bold text-gray-700 mb-4">#A 관리자 게시물</label>
                  <div className="space-y-2">
                    {adminCategories.map((cat) => (
                      <label key={cat.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input 
                          type="radio" 
                          name="category" 
                          value={cat.id} 
                          checked={selectedCategory === cat.id}
                          onChange={handleCategoryChange}
                          className="text-emerald-600 focus:ring-emerald-500" 
                        />
                        <span className="text-gray-700 text-sm">{cat.label} ({cat.id})</span>
                      </label>
                    ))}
                  </div>
                  <hr className="my-6 border-gray-200" />
              nbsp; </>
              )}

              <label className="block text-sm font-bold text-gray-700 mb-4">#B 공공 게시물</label>
              <div className="space-y-2">
                {publicCategories.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category" 
                      value={cat.id} 
                      checked={selectedCategory === cat.id}
                      onChange={handleCategoryChange}
                      className="text-emerald-600 focus:ring-emerald-500" 
                    />
                    <span className="text-gray-700 text-sm">{cat.label} ({cat.id})</span>
                  </label>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEnroll;