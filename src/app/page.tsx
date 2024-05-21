"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NumberGenerator from "@/components/NumberGenerator";
import SidebarNav from "@/components/SidebarNav";
import { useState } from "react";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div>
      <Header />
      <div className="backgroundImageClass">
      {isPopupOpen && (
          <SidebarNav handleClose={handleClosePopup} isOpen={isPopupOpen} />
        )}   
       
        <Footer
           togglePopup={togglePopup} /> 
           
           </div>
    </div>
  );
}
