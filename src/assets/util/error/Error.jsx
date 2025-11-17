import React from 'react';
import { TriangleAlert, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center bg-white p-10 sm:p-12 rounded-xl shadow-2xl max-w-lg w-full">
        <TriangleAlert className="w-16 h-16 mx-auto text-red-500 mb-6" />
        
        <h1 className="text-6xl font-extrabold text-gray-900 mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">페이지를 찾을 수 없습니다.</h2>
        
        <p className="text-gray-500 mb-8">
          죄송합니다. 요청하신 페이지가 삭제되었거나, 주소가 변경되었을 수 있습니다.
        </p>

        <Link
          to="/main"
          className="inline-flex items-center bg-emerald-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-105"
        >
          <Home className="w-5 h-5 mr-2" />
          메인 화면으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;