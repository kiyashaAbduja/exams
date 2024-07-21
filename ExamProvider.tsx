// src/contexts/ExamContext.tsx
import React, { createContext, useContext, useState } from "react";

type ExamContextType = {
  leftWidth: number;
  fontSize: number;
  theme: string;
  setLeftWidth: (width: number) => void;
  setFontSize: (size: number) => void;
  setTheme: (theme: string) => void;
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC = ({ children }: any) => {
  const [leftWidth, setLeftWidth] = useState(50);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("white");

  return (
    <ExamContext.Provider
      value={{
        leftWidth,
        fontSize,
        theme,
        setLeftWidth,
        setFontSize,
        setTheme,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExamContext = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error("useExamContext must be used within an ExamProvider");
  }
  return context;
};
