import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      id="modalClose"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="custom-modal-box-1 relative z-10">
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
