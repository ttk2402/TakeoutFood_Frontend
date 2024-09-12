import React from "react";
import header from '../../assets/header.png'
const Header = () => {
  return (
    <div
      className="hero bg-base-200 w-full h-96"
      style={{
        backgroundImage:
          `url(${header})`,
      }}
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold"></h1>
          <p className="py-6">
           
          </p>
          {/* <button className="btn btn-primary">View Menu</button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
