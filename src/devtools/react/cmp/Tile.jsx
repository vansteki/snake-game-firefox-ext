import React from 'react'

Tile.defaultProps = {
  width: '10px',
  height: '10px',
  index: 0,
  currentSnake: []
}

function Tile (props) {

  let { index, currentSnake } = props
  let color = currentSnake.includes(index) ? 'dodgerblue' : null

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
