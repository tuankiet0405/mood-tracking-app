import React from "react";

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 ">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full mt-875 px-250">
        <div className=" max-w-md rounded-2xl background-auth  shadow-lg px-250 py-400 ">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
