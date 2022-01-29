import React from 'react'

export default function Tile (props) {
  return (
    <div
      className="tile"
      style={{
        width: props.w,
        height: props.h
      }}
    >
    </div>
  )
}
