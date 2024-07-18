import React, { useState } from "react";

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
};

const Question: React.FC<QuestionProps> = ({ question }) => {
  const [leftWidth, setLeftWidth] = useState(50); // Percentage

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

  return (
    <div className="p-4 flex flex-col md:flex-row">
      <div
        className="flex flex-col"
        style={{ width: `${leftWidth}%`, minHeight: "100px" }}
      >
        <div className="border-r pr-4">
          <p className="text-lg font-semibold mb-4">
            Explanation Questions 1 - 2 do not refer to a passage and are
            independent of each other.
          </p>
        </div>
      </div>
      <div
        className="cursor-col-resize bg-gray-400"
        style={{ width: "5px", minHeight: "100px" }}
        onMouseDown={handleMouseDown}
      />
      <div
        className="pl-4 flex-grow"
        style={{ width: `${100 - leftWidth}%`, minHeight: "100px" }}
      >
        <p className="text-lg font-semibold mb-4">Question {question.id}</p>
        <p className="mb-4">{question.text}</p>
        <div>
          {question.options.map((option) => (
            <label key={option.id} className="block mb-2">
              <input
                type="radio"
                name={`question_${question.id}`}
                value={option.id}
                className="mr-2"
              />
              {option.text}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
