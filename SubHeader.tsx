import React, { useState, useEffect } from "react";
import {
  FaHighlighter,
  FaStrikethrough,
  FaCommentAlt,
  FaFlag,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const SubHeader: React.FC = () => {
  const [showHighlightDropdown, setShowHighlightDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // Add state for sidebar

  useEffect(() => {
    // Load content from localStorage on component mount
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
      document.getElementById("editable-content")!.innerHTML = savedContent;
    }
  }, []);

  const toggleHighlightDropdown = () => {
    setShowHighlightDropdown(!showHighlightDropdown);
  };

  const highlightText = (color: string) => {
    document.execCommand("hiliteColor", false, color);
    saveContent();
    setShowHighlightDropdown(false);
  };

  const removeHighlight = () => {
    document.execCommand("hiliteColor", false, "transparent");
    saveContent();
    setShowHighlightDropdown(false);
  };

  const toggleStrikethrough = () => {
    document.execCommand("strikeThrough", false, "");
    saveContent();
  };

  const saveContent = () => {
    const updatedContent =
      document.getElementById("editable-content")?.innerHTML || "";
    localStorage.setItem("content", updatedContent);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); // Toggle sidebar visibility
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center bg-blue-600 text-white p-2 mx-5">
        <div className="flex items-center space-x-4">
          <div className="relative">
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
                  onClick={removeHighlight}
                  className="flex items-center p-2 space-x-2 hover:bg-gray-200"
                >
                  <span>Remove Highlight</span>
                </button>
              </div>
            )}
          </div>
          <button
            className="flex items-center space-x-1"
            onClick={toggleStrikethrough}
          >
            <FaStrikethrough />
            <span>Strikethrough</span>
          </button>
          <button className="flex items-center space-x-1">
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

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed right-0 top-0 w-64 h-screen bg-white shadow-lg p-4">
          <h2 className="text-xl mb-4">Settings</h2>
          {/* Sidebar content */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="nightMode" />
              <label htmlFor="nightMode">Night Mode</label>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="fontSize">Font Size</label>
              <input type="range" id="fontSize" min="10" max="30" />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="colorTheme">Color Theme</label>
              <select id="colorTheme">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            {/* Add more settings options as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubHeader;
