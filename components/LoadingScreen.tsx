import React from "react";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen bg-black/70 z-50 absolute top-0 left-0 ct">
      {/* <span className="loading loading-ring text-white w-[80px]"></span> */}
      <span className="animate-ping absolute inline-flex h-[80px] w-[80px] rounded-full border border-sky-400 opacity-75"></span>
      <span className="animate-ping absolute inline-flex h-[60px] w-[60px] rounded-full border border-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-6 w-6 border-sky-500 border-2 animate-ping"></span>
    </div>
  );
};

export default LoadingScreen;
