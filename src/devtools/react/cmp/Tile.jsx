import React from 'react'

Tile.defaultProps = {
  width: "10px",
  height: "10px",
  color: "none",
}

function Tile (props) {
  return (
    <div
      className="tile"
      style={{
        width: props.w,
        height: props.h,
        backgroundColor: props.color
      }}
    >
    </div>
  )
}


export default Tile
