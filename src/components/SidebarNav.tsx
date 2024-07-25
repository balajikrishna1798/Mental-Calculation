import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  resetSettings,
} from "@/features/MentalSlice";
import { RootState } from "@/store/store";

export default function SidebarNav({
  handleClose,
  isOpen,
  setIsPlaying,
  setTime
}: {
  handleClose: () => void;
  isOpen: boolean;
  setIsPlaying,
  setTime
}) {
  const dispatch = useDispatch();
  const {
    isHandsFree,
    timeOutMs,
    modeofoperation,
    language,
    mode: multiWindow,
    numberofrows,
    numberofdigitsfrom,
    numberofdigitsto,
    isMultiwindow,
  } = useSelector((state: RootState) => state.mental);

  const handleSettingChange = (changeAction) => {
    dispatch(resetSettings());
    dispatch(changeAction);
    setIsPlaying(false);
    setTime(0);
  };

  const handleDigitsFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value);
    handleSettingChange(setNumberofdigitsfrom(newValue));
    if (numberofdigitsto < newValue) {
      handleSettingChange(setNumberofdigitsto(newValue));
    }
  };

  const handleDigitsToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value);
    handleSettingChange(setNumberofdigitsto(newValue));
    if (numberofdigitsto > newValue) {
      handleSettingChange(setNumberofdigitsfrom(newValue));
    }
  };

  const handleSetisMultiwindow = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSettingChange(setIsMultiWindow(e.target.checked));
    if (!isMultiwindow) {
      handleSettingChange(setMultiwindow(2));
      handleSettingChange(setModeofOperation("Addition and Subtraction"));
    } else {
      handleSettingChange(setMultiwindow(1));
    }
  };

  const handleHandsFree = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSettingChange(setHandsFree(e.target.checked));
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
        isOpen && !isClosing ? "slide_from_left":"slide_from_right" } bg-gray-900 text-white overflow-y-auto`}
    >
      <div className="w-80 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Settings</h2>
          <button onClick={closeSidebar} className="text-3xl">
            ×
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Mode of Operation</h3>
          <select
            value={modeofoperation}
            onChange={(e) => handleSettingChange(setModeofOperation(e.target.value))}
            className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="Addition">Addition</option>
            <option value="Subtraction" disabled={isMultiwindow}>Subtraction</option>
            <option value="Multiplication" disabled={isMultiwindow}>
              Multiplication
            </option>
            <option value="Division" disabled={isMultiwindow}>
              Division
            </option>
            <option value="Addition and Subtraction">
              Addition and Subtraction
            </option>
          </select>
        </div>

        <div className="mt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isHandsFree}
              onChange={handleHandsFree}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer rounded"
            />
            <span className="text-base">Enable Handsfree</span>
          </label>

          <label className="flex items-center gap-3 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={isMultiwindow}
              onChange={handleSetisMultiwindow}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer rounded"
            />
            <span className="text-base">Enable Multi-Window</span>
          </label>

          {isMultiwindow && (
            <div className="mt-4">
              <label htmlFor="numberofwindows" className="block mb-2 text-base">
                Number of Windows
              </label>
              <select
                id="numberofwindows"
                value={multiWindow}
                onChange={(e) => handleSettingChange(setMultiwindow(parseInt(e.target.value)))}
                className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
              >
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Number</h3>
            {["Multiplication", "Division"].includes(modeofoperation) ? (
              <div>
                <label htmlFor="firstDigit" className="block mb-2 text-base">
                  First Number
                </label>
                <select
                  id="firstDigit"
                  value={numberofdigitsfrom}
                  onChange={(e) => handleSettingChange(setNumberofdigitsfrom(parseInt(e.target.value)))}
                  className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>

                <label htmlFor="secondNumber" className="block mb-2 text-base">
                  Second Number
                </label>
                <select
                  id="secondNumber"
                  value={numberofdigitsto}
                  onChange={(e) => handleSettingChange(setNumberofdigitsto(parseInt(e.target.value)))}
                  className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label htmlFor="numberDigitsFrom" className="block mb-2 text-base">
                  Number of digits from
                </label>
                <select
                  id="numberDigitsFrom"
                  value={numberofdigitsfrom}
                  onChange={handleDigitsFromChange}
                  className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>

                <label htmlFor="numberDigitsTo" className="block mb-2 text-base">
                  Number of digits to
                </label>
                <select
                  id="numberDigitsTo"
                  value={numberofdigitsto}
                  onChange={handleDigitsToChange}
                  className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-4">
              <label htmlFor="numberRows" className="block mb-2 text-base">
                Number of rows
              </label>
              <select
                id="numberofrows"
                value={numberofrows}
                onChange={(e) => handleSettingChange(setNumberofrows(parseInt(e.target.value)))}
                className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
              >
                {Array.from({ length: 45 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Time</h3>
            <div>
              <label htmlFor="flashMs" className="block mb-2 text-base">
                Flash (ms)
              </label>
              <input
                id="flashMs"
                type="number"
                value={timeOutMs}
                onChange={(e) => handleSettingChange(setTimeOutMs(parseInt(e.target.value)))}
                className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Text To Speech</h3>
            <select
              id="voiceLanguage"
              value={language}
              onChange={(e) => handleSettingChange(setLanguage(e.target.value))}
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="en-US">English (US)</option>
              <option value="nb-NO">Norwegian (NO)</option>
            </select>
          </div>

          <div className="mt-5 text-right">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-all duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
