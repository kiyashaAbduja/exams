import React, { useState } from "react";
import ExamHeader from "./component/Examheader";
import SubHeader from "./component/SubHeader";
import Question from "./component/Question";
import Navigation from "./component/Navigation";
import { FaPause } from "react-icons/fa";

type Option = {
  id: string;
  text: string;
};

type Question = {
  id: string;
  text: string;
  options: Option[];
};

const mockQuestions: Question[] = [
  {
    id: "1",
    text: "Researchers have identified a set of factors associated with an increased risk of developing chronic obstructive pulmonary disease, including low birth weight, respiratory infections before age 2, low socioeconomic status in childhood, adolescent smoking, and occupational exposure to airborne irritants as an adult. This finding best reflects:",
    options: [
      { id: "a", text: "A. the sick role theory approach." },
      { id: "b", text: "B. the illness experience perspective." },
      { id: "c", text: "C. the social construction of chronic disease." },
      { id: "d", text: "D. the life course approach to illness." },
    ],
  },
  {
    id: "2",
    text: "Which of the following best describes the approach used in the research mentioned above?",
    options: [
      { id: "a", text: "A. A qualitative approach" },
      { id: "b", text: "B. A quantitative approach" },
      { id: "c", text: "C. A mixed-methods approach" },
      { id: "d", text: "D. A case study approach" },
    ],
  },
];

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-blue-800 flex flex-col">
      <ExamHeader />
      <SubHeader />
      <div className="flex justify-center bg-gray-300 mx-5">
        <button className="bg-gray-200 text-black px-2 py-1 rounded flex items-center">
          <FaPause className="mr-1" /> Pause
        </button>
      </div>
      <div className="flex-grow p-4 bg-gray-100 mx-5">
        <div
          contentEditable
          suppressContentEditableWarning
          className="border p-4 bg-white"
        >
          <Question question={questions[currentQuestionIndex]} />
        </div>
      </div>
      <Navigation onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
};

export default App;
