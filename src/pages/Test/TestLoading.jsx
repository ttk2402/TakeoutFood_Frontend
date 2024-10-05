import React, { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

const TestLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
  
      // Mô phỏng một quá trình xử lý (ví dụ: gọi API)
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Giả sử 3 giây để hoàn thành
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Nhấn để xử lý
        </button>
  
        {/* Hiển thị LoadingOverlay khi isLoading là true */}
        <LoadingOverlay loading={isLoading} />
      </div>
    );
};

export default TestLoading;
