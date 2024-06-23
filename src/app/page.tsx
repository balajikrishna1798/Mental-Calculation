"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NumberGenerator from "@/components/NumberGenerator";
import { generateNumbers, generateMultipleNumbers } from "@/components/RandomGeneration";
import SidebarNav from "@/components/SidebarNav";
import { speakText } from "../utils/speech";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setMode, setNumbers } from "@/features/MentalSlice";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [isResult, setIsResult] = useState(false);

  const [result, setResult] = useState<number | string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { language, mode } = useAppSelector((state) => state.mental);
  const dispatch = useAppDispatch();

  const togglePopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const speakOrStop = () => {
    setIsPlaying(true);
    if (mode === 1) {
      const numbers = generateNumbers();
      
      dispatch(setNumbers(numbers));
      setCurrentRow(0);
      setShowResult(false);
      setResult(null);
      speakText(numbers[0], language);
    } else if (mode === 2 || mode === 3) {
      const multiNumbers = generateMultipleNumbers(mode);
      dispatch(setNumbers(multiNumbers));
      setCurrentRow(0);
      setShowResult(false);
      setResult(null);
      speakText(multiNumbers[0][0], language);
      speakText(multiNumbers[1][0], language);
      if (mode === 3) speakText(multiNumbers[2][0], language);
    }
  };

  return (
    <div>
      <Header />
      <div className="backgroundImageClass">
        {isPopupOpen && (
          <SidebarNav handleClose={handleClosePopup} isOpen={isPopupOpen} />
        )}
        <NumberGenerator
          result={result}
          setResult={setResult}
          setShowResult={setShowResult}
          currentRow={currentRow}
          setCurrentRow={setCurrentRow}
          generatedNumbers={useAppSelector((state) => state.mental.mode === 1 ? state.mental.numbers : state.mental.multiNumbers.slice(0, state.mental.mode))}
          isPlaying={isPlaying}
          isResult={isResult}
        />
        <Footer
          togglePopup={togglePopup}
          generatedNumbers={useAppSelector((state) => state.mental.mode === 1 ? state.mental.numbers : state.mental.multiNumbers.slice(0, state.mental.mode))}
          result={result}
          setResult={setResult}
          speakOrStop={speakOrStop}
          showResult={showResult}
          setShowResult={setShowResult}
          currentRow={currentRow}
          setCurrentRow={setCurrentRow}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          setIsResult={setIsResult}
        />
      </div>
    </div>
  );
}
