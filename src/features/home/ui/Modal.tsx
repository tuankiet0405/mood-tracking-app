import React from "react";

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 ">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className=" relative z-10 w-full py-875 px-250 h-fit">
        <div className=" max-w-md sm:max-w-2xl mx-auto rounded-2xl background-auth  shadow-lg px-250 py-400 h-full max-h-[90dvh] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
