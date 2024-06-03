"use client";
import React, { useState } from "react";
import EntriesList from "./EntriesList";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  
  return (
    <div id="accordion-collapse" data-accordion="collapse">
      <div
        id="accordion-collapse-body-1"
        className={`${
          isOpen ? "transition-max-height duration-1000 ease-in-out" : "hidden"
        }`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-gray-500 dark:text-gray-400 text-lg">
            History
            <span className="text-gray-500 text-sm">(last 20 entries)</span>
          </p>
          <EntriesList />
        </div>
      </div>
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className={`flex items-center justify-between w-full p-2 font-medium rtl:text-right bg-gray-300 text-gray-500 border border-b-0 ${
            isOpen ? "bg-gray-300" : ""
          } dark:hover:bg-gray-800 gap-3`}
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls="accordion-collapse-body-1"
          onClick={toggleAccordion}
        >
          <svg
            data-accordion-icon
            className={`w-3 h-3 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            } shrink-0 mx-auto`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1 5 5 9 1"
            />
          </svg>
        </button>
        
        
      </h2>
    </div>
  );
}
