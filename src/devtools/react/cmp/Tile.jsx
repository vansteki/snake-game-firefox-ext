import React from 'react'

Tile.defaultProps = {
  width: '10px',
  height: '10px',
  index: 0,
  currentSnake: []
}

function Tile (props) {

  let color = null
  let { index, currentSnake } = props

  if (currentSnake.includes(index)) {
    console.log(currentSnake, index)
    color = 'dodgerblue'
  } else {
    color = null
  }

  return (
    <div
      className="tile"
      style={{
        width: props.w,
        height: props.h,
        backgroundColor: color
      }}
    >
    </div>
  )
}

export default Tile
