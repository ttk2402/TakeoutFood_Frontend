import React from "react";
import Category from "../Category/Category";

const CategoryList = () => {
  const categories = [
    {
      id: 1,
      title: "Hạt Tách Vỏ",
      url_image_category:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240606200257218.png",
    },
    {
      id: 2,
      title: "Trái Cây Sấy Dẻo",
      url_image_category:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240606200330687.png",
    },
    {
      id: 3,
      title: "Kẹo",
      url_image_category:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240606200013156.png",
    },
    {
      id: 4,
      title: "Khô Tẩm Vị",
      url_image_category:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240606200028453.png",
    },
    {
      id: 5,
      title: "Bánh Trung Thu",
      url_image_category:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240807141354671.png",
    },
  ];

  return (
    <div className="flex justify-around flex-wrap">
      {categories.map((category, index) => {
        return (
          <Category
            key={index}
            id={category.id}
            title={category.title}
            url_image_category={category.url_image_category}
          />
        );
      })}
    </div>
  );
};

export default CategoryList;
