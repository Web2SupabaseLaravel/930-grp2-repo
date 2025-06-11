import React from 'react';

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#702A46] text-white px-4 py-2 rounded-md w-full hover:bg-[#5a2238] transition"
    >
      {children}
    </button>
  );
};

export default Button;
