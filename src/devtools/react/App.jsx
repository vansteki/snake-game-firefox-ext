import React, { useEffect, useState } from 'react'
import Tile from './cmp/Tile'
import StartBtn from './cmp/StartBtn'

function genMap () {
  let tiles = []

  const tileSize = 20
  // row number of each tile based on screen width
  const tileRowNumbers = Math.floor(document.body.offsetWidth / tileSize)
  // generate 1/5 of screen height of column tiles
  const tileColNumbers = Math.floor(window.screen.availHeight / (tileSize * 5))
  // width is move offset aka square of each line
  const moveWidth = Math.floor(document.body.offsetWidth / tileSize)

  for (let i = 1; i <= tileRowNumbers * tileColNumbers; i++) {
    // const div = document.createElement('div', { class: 'tile' })
    // div.style.width = tileSize + 'px'
    // div.style.height = tileSize + 'px'

    tiles.push(
      <Tile
        key={i}
        w={tileSize + 'px'}
        h={tileSize + 'px'}
      />
    )
  }
  return tiles
}

function initGame () {
  console.log('game start!')
}

function App () {
  return (
    <>
      <StartBtn initGame={initGame} />
      <section className="flex justify-center items-center border-pink-500">
        <div id="map" className="flex flex-wrap w-screen justify-center">
          {genMap()}
        </div>
      </section>
    </>
  )
}

export default App
