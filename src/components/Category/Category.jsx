import React from "react";

const Category = ({ id, title, url_image_category }) => {
  return (
    <div className="card bg-base-100 w-48 shadow-xl bg-slate-100">
      <div className="card-body p-2.5">
        <span className="card-title justify-center text-xl">{title}</span>
      </div>
      <figure>
        <img src={url_image_category} alt="" />
      </figure>
    </div>
  );
};

export default Category;
