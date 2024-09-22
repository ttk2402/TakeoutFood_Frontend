import React from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ id, title, url_image_category }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    navigate(`/danh-muc/${id}`);
  };

  return (
    <div
      className="w-40 flex flex-col items-center border-2 rounded p-1 bg-slate-100 cursor-pointer"
      onClick={() => handleCategoryClick(id)}
    >
      <div className="border-2 w-full mb-1.5 bg-green-500">
        <p className="text-lg font-bold text-center text-white">{title}</p>
      </div>
      <div>
        <img src={url_image_category} alt="" className="w-36 h-36" />
      </div>
    </div>
  );
};

export default Category;
