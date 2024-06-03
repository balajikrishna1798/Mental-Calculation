import React from 'react'

const DisplayNumbers = ({children}) => {
  return (
    <div className="flex justify-center font-bold text-5xl md:text-8xl lg:text-8xl text-white min-screen">
{children} </div>
  )
}

export default DisplayNumbers