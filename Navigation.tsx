import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type NavigationProps = {
  onPrev: () => void;
  onNext: () => void;
};

const Navigation: React.FC<NavigationProps> = ({ onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center bg-blue-800 text-white p-2 mx-5">
      <button
        onClick={onPrev}
        className="flex items-center space-x-1 bg-blue-700 px-3 py-1 rounded"
      >
        <FaChevronLeft />
        <span>Navigator</span>
      </button>
      <button
        onClick={onNext}
        className="flex items-center space-x-1 bg-blue-700 px-3 py-1 rounded"
      >
        <span>Next</span>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Navigation;
