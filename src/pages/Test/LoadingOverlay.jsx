import React from "react";
import HashLoader from "react-spinners/HashLoader";

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex flex-col items-center justify-center z-50">
      <HashLoader color="#397185" loading size={55} speedMultiplier={2} />
      <p className="mt-4 text-black font-bold">Đang tải dữ liệu...</p>
    </div>
  );
};

export default LoadingOverlay;
