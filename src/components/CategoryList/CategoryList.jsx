import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Category from "../Category/Category";
import { StoreContext } from "../Context/StoreContext";

const CategoryList = () => {
  const { categories } = useContext(StoreContext);

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
