import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        id="modalClose"
      ></div>
      <div className="relative z-10 mx-5 w-full max-w-screen-md rounded-lg bg-neutral-100 px-5 shadow-lg dark:bg-neutral-400">
        <button
          htmlFor="modalClose"
          onClick={onClose}
          className="absolute right-0 top-0 m-4 text-4xl text-rose-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
