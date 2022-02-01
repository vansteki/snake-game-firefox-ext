function useCalcTiles (tileSize = 20) {
  tileSize = 20
  // row number of each tile based on screen width
  const tileRowNumbers = Math.floor(document.body.offsetWidth / tileSize)
  // generate 1/5 of screen height of column tiles
  const tileColNumbers = Math.floor(window.screen.availHeight / (tileSize * 5))
  // width is move offset aka square of each line
  const moveWidth = Math.floor(document.body.offsetWidth / tileSize)

  return {
    tileRowNumbers,
    tileColNumbers,
    tileWidth: tileSize + 'px',
    tileHeight: tileSize + 'px'
  }
}

export default useCalcTiles
