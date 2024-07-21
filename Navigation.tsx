import React from "react";

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onPrev, onNext }) => {
  return (
    <div className="flex justify-between mx-5 my-1">
      <button
        onClick={onPrev}
        className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
        disabled={onPrev === undefined}
      >
        Previous
      </button>
      <button
        onClick={onNext}
        className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
        disabled={onNext === undefined}
      >
        Next
      </button>
    </div>
  );
};

export default Navigation;
