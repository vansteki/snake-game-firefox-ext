import React from 'react'

export default (props) => {
  return (
    <>
      <div className="flex justify-center items-center mt-2">
        <button
          className="start focus:outline-none border-green-500 border-2 rounded-sm p-4 text-green-400 focus:decoration-0"
          onClick={props?.initGame}
        >
          Start / Restart
        </button>
      </div>
    </>
  )
}
