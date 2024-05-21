"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NumberGenerator from "@/components/NumberGenerator";
import { generateNumbers } from "@/components/RandomGeneration";
import SidebarNav from "@/components/SidebarNav";
import { speakText } from "../utils/speech";
import { useState } from "react";
import { useAppSelector } from "@/store/store";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState<string[]>([]);
  const [result, setResult] = useState<number | string | null>(null);
  const { language } = useAppSelector(
    (state) => state.mental
  );
  const togglePopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const speakOrStop = () => {
    const numbers = generateNumbers();
    setGeneratedNumbers(numbers);
    setCurrentRow(0);
    setShowResult(false);
    setResult(null);
    speakText(numbers[0], language);
  };
  
  return (
    <div>
      <Header />
      <div className="backgroundImageClass">
      {isPopupOpen && (
          <SidebarNav handleClose={handleClosePopup} isOpen={isPopupOpen} />
        )}   
       <NumberGenerator result={result} setResult={setResult} setShowResult={setShowResult} currentRow={currentRow} setCurrentRow={setCurrentRow} generatedNumbers={generatedNumbers}/>
        <Footer
           togglePopup={togglePopup}  generatedNumbers={generatedNumbers} result={result} setResult={setResult} speakOrStop={speakOrStop} showResult={showResult} setShowResult={setShowResult} currentRow={currentRow}
           setCurrentRow={setCurrentRow}/> 
          
           </div>
    </div>
  );
}
