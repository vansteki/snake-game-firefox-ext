document.addEventListener('DOMContentLoaded', () => {
  const map = document.querySelector('#map')
  const tileSize = 20
  // row number of each tile based on screen width
  const tileRowNumbers = Math.floor((document.body.offsetWidth) / tileSize)
  // generate 1/5 of screen height of column tiles
  const tileColNumbers = Math.floor((window.screen.availHeight / (tileSize * 5)))
  // width is move offset aka square of each line
  const width = Math.floor((document.body.offsetWidth) / tileSize)

  for (let i = 1; i <= tileRowNumbers * tileColNumbers; i++) {
    const div = document.createElement('div', { 'class': 'tile' })
    div.style.width = tileSize + 'px'
    div.style.height = tileSize + 'px'
    map.appendChild(div)
  }

  const squares = document.querySelectorAll('.tile div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')
  const initialSpeed = 200

  let currentIndex = 0 //so first div in our grid
  let appleIndex = 0 //so first div in our grid
  let pineAppleIndex = 0
  let currentSnake = [2, 1, 0]
  let direction = 1
  let score = 0
  let appleSpeed = 0.9
  let pineAppleSpeed = 0.5
  let intervalTime = 0
  let interval = 0

  //to start, and restart the game
  function startGame () {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares.forEach(v => {
      v.classList.remove('pineapple')
      v.classList.remove('apple')
    })
    clearInterval(interval)
    score = 0
    randomApple()
    randomPineApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = initialSpeed
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }

  //function that deals with ALL the ove outcomes of the Snake
  function moveOutcomes () {
    //deals with snake hitting border and snake hitting self
    console.log(squares)
    if (
      (currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
      return clearInterval(interval) //this will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop() //removes last ite of the array and shows it
    squares[tail].classList.remove('snake') //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

    //deals with snake getting apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
      whenEat('apple', 1, appleSpeed)
    } else if (squares[currentSnake[0]].classList.contains('pineapple')) {
      whenEat('pineapple', 10, pineAppleSpeed)
    }
    squares[currentSnake[0]].classList.add('snake')

    function whenEat (fruit, scoreAdded, speedAdded) {
      squares[currentSnake[0]].classList.remove(fruit)
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      if (fruit === 'apple') {
        randomApple()
      } else {
        randomPineApple()
      }
      score = score + scoreAdded
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speedAdded
      interval = setInterval(moveOutcomes, intervalTime)
    }
  }

  //generate new apple once apple is eaten
  function randomApple () {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    { //making sure apples dont appear on the snake
      squares[appleIndex].classList.add('apple')
    }
  }

  function randomPineApple () {
    do {
      pineAppleIndex = Math.floor(Math.random() * squares.length)
    } while (
      squares[pineAppleIndex].classList.contains('snake') &&
      squares[pineAppleIndex].classList.contains('apple')
      )
    {
      squares[pineAppleIndex].classList.add('pineapple')
    }
  }

  //assign functions to keycodes
  function control (e) {
    squares[currentIndex].classList.remove('snake')

    if (e.keyCode === 39) {
      direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
    } else if (e.keyCode === 38) {
      direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1 // if we press left, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
    }

    if (e.keyCode === 81) {
      startGame()
    }
  }

  document.addEventListener('keydown', control)
  startBtn.addEventListener('click', startGame)
  window.onresize = function () {
    setTimeout(() => {
      location.reload()
    }, 100)
  }
})

