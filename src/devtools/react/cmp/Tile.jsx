import React from 'react'

Tile.defaultProps = {
  width: '10px',
  height: '10px',
  index: 0,
  currentSnake: []
}

function Tile (props) {

  let color = 'none'
  let { index, currentSnake } = props

  if (currentSnake.includes(index)) {
    color = 'dodgerblue'
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
