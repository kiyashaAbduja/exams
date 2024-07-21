import React from "react";
import { FaPause } from "react-icons/fa";

const ExamHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-blue-800 text-white p-2 mx-5 ">
      <div className="flex items-center">
        <span className="font-bold">
          Medical College Admission Test - Mark J
        </span>
      </div>
      <div className="flex items-center flex-col space-x-4">
        <p>Test Id: 353324937 (Untutored, Untimed) </p>
        <p>Qld: 401763 (4785251)</p>
      </div>
      <div className="flex items-center flex-col">
        <span className="mr-4">Time: 00:00:18</span>
        <span>1 of 2</span>
      </div>
    </div>
  );
};

export default ExamHeader;
