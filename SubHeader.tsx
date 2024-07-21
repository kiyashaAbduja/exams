import React, { useState, useEffect, useRef } from "react";
import {
  FaHighlighter,
  FaStrikethrough,
  FaCommentAlt,
  FaFlag,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import "./modal.css";

interface SubHeaderProps {
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onChangeTheme: (color: string) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  onIncreaseFontSize,
  onDecreaseFontSize,
  onChangeTheme,
}) => {
  const [showHighlightDropdown, setShowHighlightDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const highlightDropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleHighlightDropdown = () => {
    setShowHighlightDropdown(!showHighlightDropdown);
  };

  const highlightText = (color: string) => {
    document.execCommand("hiliteColor", false, color);
  };

  const removeHighlight = () => {
    document.execCommand("hiliteColor", false, "transparent");
  };

  const toggleStrikethrough = () => {
    document.execCommand("strikeThrough", false, "");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleFeedbackModal = () => {
    setShowFeedbackModal(!showFeedbackModal);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        highlightDropdownRef.current &&
        !highlightDropdownRef.current.contains(event.target as Node)
      ) {
        setShowHighlightDropdown(false);
      }

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-between items-center bg-blue-600 text-white p-2 mx-5">
        <div className="flex items-center space-x-4">
          <div className="relative" ref={highlightDropdownRef}>
            <button
              onClick={toggleHighlightDropdown}
              className="flex items-center space-x-1"
            >
              <FaHighlighter />
              <IoMdArrowDropdown />
              <span>Highlight</span>
            </button>
            {showHighlightDropdown && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg">
                <button
                  onClick={() => highlightText("yellow")}
                  className="flex items-center p-2 space-x-2 hover:bg-gray-200"
                >
                  <span className="bg-yellow-300 w-4 h-4 block"></span>
                  <span>Yellow</span>
                </button>
                <button
                  onClick={() => highlightText("cyan")}
                  className="flex items-center p-2 space-x-2 hover:bg-gray-200"
                >
                  <span className="bg-cyan-300 w-4 h-4 block"></span>
                  <span>Cyan</span>
                </button>
                <button
                  onClick={() => highlightText("green")}
                  className="flex items-center p-2 space-x-2 hover:bg-gray-200"
                >
                  <span className="bg-green-300 w-4 h-4 block"></span>
                  <span>Green</span>
                </button>
                <button
                  onClick={removeHighlight}
                  className="flex items-center p-2 space-x-2 hover:bg-gray-200"
                >
                  <span className="bg-transparent w-4 h-4 block border border-gray-300"></span>
                  <span>Remove Highlight</span>
                </button>
              </div>
            )}
          </div>
          <button
            onClick={toggleStrikethrough}
            className="flex items-center space-x-1"
          >
            <FaStrikethrough />
            <span>Strikethrough</span>
          </button>
          <button
            onClick={toggleFeedbackModal}
            className="flex items-center space-x-1"
          >
            <FaCommentAlt />
            <span>Feedback</span>
          </button>
        </div>
        <button className="flex items-center space-x-1">
          <FaFlag />
          <span>Flag for Review</span>
        </button>
        <button onClick={toggleSidebar}>
          <IoSettingsOutline />
        </button>
      </div>

      {showSidebar && (
        <div
          className="fixed right-0 top-0 w-64 h-screen bg-white shadow-lg p-4 sidebar"
          ref={sidebarRef}
        >
          <button className="close-sidebar" onClick={toggleSidebar}>
            ✕
          </button>
          <h2 className="text-xl mb-4">Settings</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="nightMode" />
              <label htmlFor="nightMode">Night Mode</label>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="fontSize">Font Size</label>
              <button onClick={onDecreaseFontSize}>-</button>
              <button onClick={onIncreaseFontSize}>+</button>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="colorTheme">Color Theme</label>
              <button
                className="bg-black w-7 h-7 rounded-full"
                onClick={() => onChangeTheme("black")}
              ></button>
              <button
                className="bg-white border w-7 h-7 rounded-full"
                onClick={() => onChangeTheme("white")}
              ></button>
              <button
                className="bg-[#fbf0da] w-7 h-7 rounded-full"
                onClick={() => onChangeTheme("cream")}
              ></button>
            </div>
          </div>
        </div>
      )}

      {showFeedbackModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 transform transition-transform duration-300 popup">
            <h2 className="text-2xl mb-4">Feedback</h2>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows={4}
              placeholder="Enter your feedback..."
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={toggleFeedbackModal}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubHeader;
