import {
  setHandsFree,
    setIsMultiWindow,
    setLanguage,
    setModeofOperation,
    setMultiwindow,
    setNumberofdigitsfrom,
    setNumberofdigitsto,
    setNumberofrows,
    setTimeOutMs,
  } from "@/features/MentalSlice";
  import { RootState } from "@/store/store";
  import React, { Fragment, useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  
  export default function SidebarNav({
    handleClose,
    isOpen,
  }: {
    handleClose: () => void;
    isOpen: boolean;
  }) {
    const isHandsFree = useSelector((state: RootState) => state.mental.isHandsFree);
    const dispatch = useDispatch();
    const timeOutMs = useSelector((state: RootState) => state.mental.timeOutMs);

    const modeofoperation = useSelector(
      (state: RootState) => state.mental.modeofoperation
    );
  
    const language = useSelector((state: RootState) => state.mental.language);
    const multiWindow = useSelector(
      (state: RootState) => state.mental.mode
    );
    console.log(multiWindow,"multiWindow");

    const numberofrows = useSelector(
      (state: RootState) => state.mental.numberofrows
    );
  
    const numberofdigitsfrom = useSelector(
      (state: RootState) => state.mental.numberofdigitsfrom
    );
  
    const numberofdigitsto = useSelector(
      (state: RootState) => state.mental.numberofdigitsto
    );
    const isMultiWindow = useSelector(
      (state: RootState) => state.mental.isMultiwindow
    );
    const modeOfOperationChange = (e) => {
      dispatch(setModeofOperation(e.target.value));
      dispatch(setNumberofrows(2));
    };
    const handleDigitsFromChange = (e) => {
      const newValue = parseInt(e.target.value);
      dispatch(setNumberofdigitsfrom(newValue));
  
      if (numberofdigitsto < newValue) {
        dispatch(setNumberofdigitsto(newValue));
      }
    };
  
    const handleDigitsToChange = (e) => {
      const newValue = parseInt(e.target.value);
      dispatch(setNumberofdigitsto(parseInt(e.target.value)));
      if (numberofdigitsto > newValue) {
        dispatch(setNumberofdigitsfrom(newValue));
      }
    };
  
    const handleSetIsMultiWindow = async (e) => {
      
      await dispatch(setIsMultiWindow(e.target.checked));
      if(!isMultiWindow){
      dispatch(setMultiwindow(2))
      }
      else{
        dispatch(setMultiwindow(1))
      }
    };

    const handlehandsFree = (e) => {
      dispatch(setHandsFree(e.target.checked));
      if (e.target.checked) {
        dispatch(setModeofOperation("Addition"));
      }
    };

    const [isClosing, setIsClosing] = useState(false);

    const closeSidebar = () => {
      setIsClosing(true);
      setTimeout(() => {
        handleClose();
        setIsClosing(false);
      }, 300); 
    };
    return (
      <div
      className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
        isOpen && !isClosing ? "slide_from_left" : "slide_from_right"
      } bg-gray-800 overflow-y-auto`}
    >
        {isOpen && (
          <div className="w-80 p-5 text-white">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Settings</h2>
              <button onClick={closeSidebar} className="text-2xl">
                ×
              </button>
            </div>
  
            <div>
              <h3 className="text-lg mb-2">Mode of Operation</h3>
              <select
                value={modeofoperation}
                onChange={(e) => modeOfOperationChange(e)}
                className="w-full p-2 bg-white text-black rounded"
                id="modeofoperation"
              >
                <option value="Addition">Addition</option>
                <option value="Subtraction" disabled={isMultiWindow}>
                  Subtractions
                </option>
                <option value="Multiplication" disabled={isMultiWindow}>
                  Multiplication
                </option>
                <option value="Division" disabled={isMultiWindow}>
                  Division
                </option>
                <option value="Addition and Subtraction" disabled={isMultiWindow}>
                  Addition and Subtraction
                </option>
              </select>
            </div>


            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={isHandsFree}
                onChange={(e) => handlehandsFree(e)}
                className="h-5 w-5 cursor-pointer"
              />
              Enable Handsfree
            </label>
  
            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={isMultiWindow}
                onChange={(e) => handleSetIsMultiWindow(e)}
                className="h-5 w-5 cursor-pointer"
              />
              Enable Multi-Window
            </label>
  
            {isMultiWindow && (
              <Fragment>
                <label htmlFor="numberofwindows" className="block my-2">
                  Number of Windows
                </label>
                <select
                  id="numberofwindows"
                  value={multiWindow}
                  onChange={(e) =>
                    dispatch(setMultiwindow(parseInt(e.target.value)))
                  }
                  className="w-full p-2 bg-white text-black rounded mb-3"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </Fragment>
            )}
  
            <div className="mt-4">
              <h3 className="text-lg mb-2">Number</h3>
  
              {modeofoperation == "Multiplication" ||
              modeofoperation == "Division" ? (
                <div>
                  <label htmlFor="firstDigit" className="block mb-1">
                    First Number
                  </label>
                  <select
                    id="firstDigit"
                    value={numberofdigitsfrom}
                    onChange={(e) =>
                      dispatch(setNumberofdigitsfrom(parseInt(e.target.value)))
                    }
                    className="w-full p-2 bg-white text-black rounded mb-3"
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
  
                  <label htmlFor="secondNumber" className="block mb-1">
                    Second Number
                  </label>
                  <select
                    id="secondNumber"
                    value={numberofdigitsto}
                    onChange={(e) =>
                      dispatch(setNumberofdigitsto(parseInt(e.target.value)))
                    }
                    className="w-full p-2 bg-white text-black rounded mb-3"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label htmlFor="numberDigitsFrom" className="block mb-1">
                    Number of digits from
                  </label>
                  <select
                    id="numberDigitsFrom"
                    value={numberofdigitsfrom}
                    onChange={handleDigitsFromChange}
                    className="w-full p-2 bg-white text-black rounded mb-3"
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
  
                  <label htmlFor="numberDigitsTo" className="block mb-1">
                    Number of digits to
                  </label>
                  <select
                    id="numberDigitsTo"
                    value={numberofdigitsto}
                    onChange={handleDigitsToChange}
                    className="w-full p-2 bg-white text-black rounded mb-3"
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
  
              <div>
                <label htmlFor="numberRows" className="block mb-1">
                  Number of rows
                </label>
                <select
                  id="numberofrows"
                  value={numberofrows}
                  onChange={(e) =>
                    dispatch(setNumberofrows(parseInt(e.target.value)))
                  }
                  className="w-full p-2 bg-white text-black rounded"
                >
                  {Array.from({ length: 40 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            {/* Time Settings */}
            <div className="mt-4">
              <h3 className="text-lg mb-2">Time</h3>
              <div>
                <label htmlFor="flashMs" className="block mb-1">
                  Flash (ms)
                </label>
                <input
                  id="flashMs"
                  type="number"
                  value={timeOutMs}
                  onChange={(e) =>
                    dispatch(setTimeOutMs(parseInt(e.target.value)))
                  }
                  className="w-full p-2 bg-white text-black rounded mb-3"
                />
              </div>
            </div>
  
            {/* Text To Speech */}
            <div className="mt-4">
              <h3 className="text-lg mb-2">Text To Speech</h3>
              <select
                id="voiceLanguage"
                value={language}
                onChange={(e) => dispatch(setLanguage(e.target.value))}
                className="w-full p-2 bg-white text-black rounded"
              >
                <option value="en-US">English (US)</option>
                <option value="nb-NO">Norwegian (N0)</option>
              </select>
            </div>
  
            {/* Close button */}
            <div className="mt-5 text-right">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
