import React from "react";
const GridBackground = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-black text-white bg-grid-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_1000%,black)]"></div>
      {children}
    </div>
  );
};
export default GridBackground;
