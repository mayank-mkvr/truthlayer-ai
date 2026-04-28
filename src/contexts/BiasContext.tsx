import React, { createContext, useContext, useState, ReactNode } from "react";
import { BiasMetrics } from "../services/analyzerService";

interface BiasContextType {
  results: BiasMetrics | null;
  setResults: (results: BiasMetrics | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
}

const BiasContext = createContext<BiasContextType | undefined>(undefined);

export const BiasProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<BiasMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <BiasContext.Provider value={{ results, setResults, isAnalyzing, setIsAnalyzing }}>
      {children}
    </BiasContext.Provider>
  );
};

export const useBias = () => {
  const context = useContext(BiasContext);
  if (context === undefined) {
    throw new Error("useBias must be used within a BiasProvider");
  }
  return context;
};
