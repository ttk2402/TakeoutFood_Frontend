import React from "react";
import logo from "../../../assets/logo.png";

const Header = ({ title }) => {
  return (
    <header className="flex justify-between bg-white backdrop-blur-md border-y-2 border-gray-200">
      <div className="max-w-7xl py-4 pl-5 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold text-neutral-400">{title}</h1>
      </div>
      <div className="pr-5">
        <img src={logo} alt="" className="w-20" />
      </div>
    </header>
  );
};
export default Header;
