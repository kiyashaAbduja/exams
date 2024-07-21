import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";

type Option = {
  id: string;
  text: string;
};

type QuestionProps = {
  question: {
    id: string;
    text: string;
    options: Option[];
  };
  fontSize: number;
};

const Question: React.FC<QuestionProps> = ({ question, fontSize }) => {
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftColumnRef.current && rightColumnRef.current) {
      leftColumnRef.current.style.fontSize = `${fontSize}px`;
      rightColumnRef.current.style.fontSize = `${fontSize}px`;
    }
  }, [fontSize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = leftWidth;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth =
        startWidth + ((e.clientX - startX) / window.innerWidth) * 100;
      if (newWidth >= 20 && newWidth <= 80) {
        setLeftWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col md:flex-row h-full">
      <div
        className="flex flex-col overflow-auto"
        ref={leftColumnRef}
        style={{
          width: `${leftWidth}%`,
          fontSize: `${fontSize}px`,
          maxHeight: "100%",
          overflowY: "auto",
          userSelect: "none",
        }}
      >
        <div
          className="border-r pr-4 h-full overflow-auto p-4"
          style={{
            maxHeight: "100%",
            overflowY: "auto",
            fontSize: fontSize ? `${fontSize}px` : "15pt",
            userSelect: "none",
          }}
        >
          <p className="font-semibold mb-4">Explanation content goes here...</p>
        </div>
      </div>
      <div
        className="cursor-col-resize bg-gray-400"
        style={{ width: "1px" }}
        onMouseDown={handleMouseDown}
      />
      <div
        className="pl-4 flex-grow h-full overflow-auto"
        ref={rightColumnRef}
        style={{
          width: `${100 - leftWidth}%`,
          fontSize: fontSize ? `${fontSize}px` : "15pt",
          maxHeight: "100%",
          overflowY: "auto",
          userSelect: "none",
        }}
      >
        {submitted ? (
          <div className="result-view">
            <p className="font-semibold mb-4">Question {question.id}</p>
            <p className="mb-4">{question.text}</p>
            <div>
              {question.options.map((option) => (
                <label key={option.id} className="block mb-2 relative">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={option.id}
                    className="hidden"
                    checked={selectedOption === option.id}
                    readOnly
                  />
                  <div
                    className={`custom-radio ${
                      selectedOption === option.id ? "selected" : ""
                    }`}
                  >
                    {selectedOption === option.id && (
                      <FaCheckCircle className="text-blue-600" />
                    )}
                  </div>
                  <span className="ml-6">{option.text}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-green-600">Correct</p>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-4">
                  <FaCheckCircle className="inline mr-1" />
                  42% Answered correctly
                </span>
                <span className="text-sm text-gray-600 mr-4">
                  <FaCheckCircle className="inline mr-1" />
                  40 secs Time Spent
                </span>
                <span className="text-sm text-gray-600">
                  <FaCheckCircle className="inline mr-1" />
                  2024 Version
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-semibold mb-4">Question {question.id}</p>
            <p className="mb-4">{question.text}</p>
            <div>
              {question.options.map((option) => (
                <label key={option.id} className="block mb-2 relative">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={option.id}
                    className="hidden"
                    onChange={() => handleOptionChange(option.id)}
                    checked={selectedOption === option.id}
                  />
                  <div
                    className={`custom-radio ${
                      selectedOption === option.id ? "selected" : ""
                    }`}
                  >
                    {selectedOption === option.id && (
                      <FaCheckCircle className="text-blue-600" />
                    )}
                  </div>
                  <span className="ml-6">{option.text}</span>
                </label>
              ))}
            </div>
            <div>
              <button
                className="bg-blue-600 text-white px-4 mt-4"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
  