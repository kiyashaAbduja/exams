import React, { useState } from "react";
import SubjectsAndUnits from "./SubjectandUnits";

const CreateTest = () => {
  const [testMode, setTestMode] = useState("Tutor");
  const [questionMode, setQuestionMode] = useState("Standard");
  const [questionStatus, setQuestionStatus] = useState({
    unused: true,
    incorrect: false,
    marked: false,
    omitted: false,
    correct: false,
  });
  const [numQuestions, setNumQuestions] = useState(0);

  const handleStatusChange = (status) => {
    setQuestionStatus({
      ...questionStatus,
      [status]: !questionStatus[status],
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Test Mode</h2>
        <div className="flex items-center">
          <label className="mr-4">
            <input
              type="radio"
              value="Tutor"
              checked={testMode === "Tutor"}
              onChange={() => setTestMode("Tutor")}
            />
            Tutor
          </label>
          <label>
            <input
              type="radio"
              value="Timed"
              checked={testMode === "Timed"}
              onChange={() => setTestMode("Timed")}
            />
            Timed
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Question Mode</h2>
        <div className="flex items-center">
          <label className="mr-4">
            <input
              type="radio"
              value="Standard"
              checked={questionMode === "Standard"}
              onChange={() => setQuestionMode("Standard")}
            />
            Standard
          </label>
          <label>
            <input
              type="radio"
              value="Custom"
              checked={questionMode === "Custom"}
              onChange={() => setQuestionMode("Custom")}
            />
            Custom
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Question Status</h2>
        <div className="flex items-center">
          <label className="mr-4">
            <input
              type="checkbox"
              checked={questionStatus.unused}
              onChange={() => handleStatusChange("unused")}
            />
            Unused
          </label>
          <label className="mr-4">
            <input
              type="checkbox"
              checked={questionStatus.incorrect}
              onChange={() => handleStatusChange("incorrect")}
            />
            Incorrect
          </label>
          <label className="mr-4">
            <input
              type="checkbox"
              checked={questionStatus.marked}
              onChange={() => handleStatusChange("marked")}
            />
            Marked
          </label>
          <label className="mr-4">
            <input
              type="checkbox"
              checked={questionStatus.omitted}
              onChange={() => handleStatusChange("omitted")}
            />
            Omitted
          </label>
          <label>
            <input
              type="checkbox"
              checked={questionStatus.correct}
              onChange={() => handleStatusChange("correct")}
            />
            Correct
          </label>
        </div>
      </div>

      <SubjectsAndUnits />

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">No. of Questions</h2>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="border p-2 rounded"
        />
        <p>Max allowed per block: 40</p>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Test
      </button>
    </div>
  );
};

export default CreateTest;
