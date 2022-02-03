import React, { useEffect, useState } from 'react'
import Tile from './cmp/Tile'
import StartBtn from './cmp/StartBtn'
import useCalcTile from './hooks/useCalcTile'

function initGame () {
  console.log('game start!')
}

function App () {

  // let [currentIndex, setCurrentIndex] = useState(0)
  let [direction, setDirection] = useState(1)
  let [currentSnake, setCurrentSnake] = useState([2,1,0])

  //assign functions to keycodes
  function control (e) {

    if (e.keyCode === 39) {
      direction = 1 // right
      console.log('keyboard: right')
      setCurrentSnake(prevState => {
        let newState = [].concat(prevState, [])
        newState.pop()
        newState.unshift(newState[0] + 1)
        return newState
      })
    } else if (e.keyCode === 38) {
      direction = -moveWidth // up
    } else if (e.keyCode === 37) {
      direction = -1 // left
    } else if (e.keyCode === 40) {
      direction = +moveWidth // down
    }

    if (e.keyCode === 81) {
      // startGame()
      window.location.reload()
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', control)
  }, [])

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
          currentSnake={currentSnake}
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
