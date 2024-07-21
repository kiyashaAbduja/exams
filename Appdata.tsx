import React, { useState, useEffect } from "react";
import ExamHeader from "./component/Examheader";
import SubHeader from "./component/SubHeader";
import Question from "./component/Question";
import Navigation from "./component/Navigation";
import { FaPause } from "react-icons/fa";

type Option = {
  id: string;
  text: string;
};

type QuestionType = {
  id: string;
  text: string;
  options: Option[];
};

const mockQuestions: QuestionType[] = [
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
  const [questions, setQuestions] = useState<QuestionType[]>(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [theme, setTheme] = useState("white");
  const [editableContent, setEditableContent] = useState<string>("");

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const increaseFontSize = () => {
    setFontSize((prev) => prev + 2);
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => (prev > 10 ? prev - 2 : prev));
  };

  const changeTheme = (color: string) => {
    setTheme(color);
  };

  const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
    setEditableContent((event.target as HTMLDivElement).innerHTML);
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "c" || event.key === "v")
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className={min-h-screen flex flex-col bg-blue-800}>
      <ExamHeader />
      <SubHeader
        onIncreaseFontSize={increaseFontSize}
        onDecreaseFontSize={decreaseFontSize}
        onChangeTheme={changeTheme}
      />
      <div className="flex justify-center bg-gray-300 mx-5 ">
        <button className="bg-gray-200 text-black px-2 py-1 rounded flex items-center">
          <FaPause className="mr-1" /> Pause
        </button>
      </div>
      <div
        className="flex-grow  mx-5 flex"
        style={{
          backgroundColor: theme === "cream" ? "#fbf0da" : theme,
          color: theme === "black" ? "white" : "black",
          height: "calc(100vh - 300px)",
        }}
      >
        <div
          id="editable-content"
          contentEditable
          suppressContentEditableWarning
          className="w-full flex focus:border-none focus:outline-none"
          style={{
            fontSize: ${fontSize}px,
            color: theme === "black" ? "white" : "black",
            backgroundColor: theme === "cream" ? "#fbf0da" : theme,
          }}
          onInput={handleContentChange}
        >
          <Question
            question={questions[currentQuestionIndex]}
            fontSize={fontSize}
          />
        </div>
      </div>
      <Navigation onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
};

export default App;