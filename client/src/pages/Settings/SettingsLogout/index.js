import React from "react";
import { useNavigate } from "react-router-dom";

const SettingsLogout = () => {
  const nav = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    nav("/login", { replace: true });
  };
  return (
    <div className="pt-10 flex flex-col space-y-8">
      <p className=" text-slate-50 text-lg">
        Are you sure you want to log out?
      </p>
      <button
        onClick={handleClick}
        className=" bg-nl-lightblue text-nl-darkblue text-2xl font-medium py-4 px-16 rounded-xl mx-auto hover:opacity-80"
      >
        Log Out
      </button>
    </div>
  );
};

export default SettingsLogout;
