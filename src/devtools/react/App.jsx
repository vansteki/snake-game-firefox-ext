import React, { useEffect, useState } from 'react'
import Tile from './cmp/Tile'
import StartBtn from './cmp/StartBtn'
import useCalcTile from './hooks/useCalcTile'

function initGame () {
  console.log('game start!')
}

function App () {
  // re-load game when screen resize for regenerate map
  window.onresize = function () {
    setTimeout(() => {
      setTest(document.body.offsetWidth)
    }, 100)
  }

  let [test, setTest] = useState(document.body.offsetWidth)

  useEffect(() => {
    console.log('effect!')
  }, [test])

  const { tileRowNumbers, tileColNumbers, tileWidth, tileHeight } = useCalcTile()

  const genMap = () => {
    let tiles = []
    for (let i = 0; i < tileRowNumbers * tileColNumbers; i++) {
      tiles.push(
        <Tile
          key={i}
          index={i}
          w={tileWidth}
          h={tileHeight}
        />
      )
    }
    return tiles
  }

  return (
    <>
      <StartBtn initGame={initGame} />
      <section className="flex justify-center items-center border-pink-500">
        <div id="map" className="flex flex-wrap w-screen justify-center">
          {
            genMap()
          }
        </div>
      </section>
    </>
  )
}

export default App
