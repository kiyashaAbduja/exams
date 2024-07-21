import React from "react";
import { FaFlag, FaCheckCircle } from "react-icons/fa";

type QuestionStatus = "Unseen" | "Incomplete" | "Seen";

type Question = {
  id: string;
  text: string;
  status: QuestionStatus;
};

type ReviewViewProps = {
  questions: Question[];
  onEndSection: () => void;
  onReviewAll: () => void;
  onReviewIncomplete: () => void;
  onReviewMarked: () => void;
};

const ReviewView: React.FC<ReviewViewProps> = ({
  questions,
  onEndSection,
  onReviewAll,
  onReviewIncomplete,
  onReviewMarked,
}) => {
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col p-4">
      <div className="bg-blue-800 text-white p-4 rounded-lg mb-4">
        <h1 className="text-lg font-semibold">
          Medical College Admission Test - Mark J
        </h1>
        <p>Test Id: 353712543 (Tutored, Untimed)</p>
        <p>QId: 402507 (4785251)</p>
        <p className="absolute right-4 top-4">Time: 00:00:10</p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Section Review</h2>
        <div className="p-4 bg-blue-100 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Instructions</h3>
          <p>
            The table below is a summary of your answers for this section. You
            can review your answers in four different ways using the features at
            the bottom of the section Review:
          </p>
          <ol className="list-decimal ml-6 mb-2">
            <li>
              Select <strong>Review All</strong> or the <strong>Alt + A</strong>{" "}
              keyboard shortcut to review all the questions and answers from the
              beginning, starting with Question 1.
            </li>
            <li>
              Select <strong>Review Incomplete</strong> or the{" "}
              <strong>Alt + I</strong> keyboard shortcut to review only the
              questions that are Incomplete or Unseen.
            </li>
            <li>
              Select <strong>Review Flagged</strong> or the{" "}
              <strong>Alt + R</strong> keyboard shortcut to review only the
              questions that are flagged for review.
            </li>
            <li>
              Select an individual question number to review a question of your
              choice. This will take you directly to the question. After you've
              reviewed the question, select <strong>Review Screen</strong> at
              the bottom of the question to return to the section Review.
            </li>
          </ol>
          <p>
            If you do not wish to review any of your answers, or you've finished
            reviewing your answers, select <strong>End Section</strong> or the{" "}
            <strong>Alt + E</strong> keyboard shortcut.
          </p>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2">Multiple Subjects</h3>
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="p-2">Question</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={question.id} className="border-t">
                  <td className="p-2">{question.text}</td>
                  <td
                    className={`p-2 ${
                      question.status === "Unseen"
                        ? "text-red-500"
                        : question.status === "Incomplete"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {question.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={onEndSection}
          >
            End Section
          </button>
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={onReviewAll}
            >
              <FaCheckCircle className="mr-2" /> Review All
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={onReviewIncomplete}
            >
              <FaCheckCircle className="mr-2" /> Review Incomplete
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={onReviewMarked}
            >
              <FaFlag className="mr-2" /> Review Marked
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewView;
