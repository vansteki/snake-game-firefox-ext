function genMap(mapEl: string) {
  const map = document.querySelector(mapEl) as HTMLElement;
  const tileSize: number = 20;
  // row number of each tile based on screen width
  const tileRowNumbers: number = Math.floor(document.body.offsetWidth / tileSize);

  // generate 1/5 of screen height of column tiles
  const tileColNumbers: number = Math.floor(window.screen.availHeight / (tileSize * 5));

  // width is move offset aka square of each line
  const moveWidth: number = Math.floor(document.body.offsetWidth / tileSize);

  for (let i = 1; i <= tileRowNumbers * tileColNumbers; i++) {
    const div: HTMLElement = document.createElement("div" as string, { class: "tile" } as ElementCreationOptions);
    div.style.width = tileSize + "px";
    div.style.height = tileSize + "px";
    map.appendChild(div);
  }
  return {
    map,
    moveWidth
  };
}

function randomApple(appleIndex: number, squares: NodeListOf<HTMLElement>, spawnRules?: boolean): void {
  const rules: boolean = spawnRules ||
    squares[appleIndex].classList.contains("snake");
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (rules);
  {
    //making sure apples don't appear on the snake
    squares[appleIndex].classList.add("apple");
  }
}

function randomPineApple(pineAppleIndex: number, squares: NodeListOf<HTMLElement>, spawnRules?: boolean): void {
  const rules: boolean = spawnRules ||
    squares[pineAppleIndex].classList.contains("snake") &&
    squares[pineAppleIndex].classList.contains("apple");
  do {
    pineAppleIndex = Math.floor(Math.random() * squares.length);
  } while (rules);
  {
    squares[pineAppleIndex].classList.add("pineapple");
  }
}

function initGame() {
  const { moveWidth } = genMap("#map");
  const squares = document.querySelectorAll(".tile div") as NodeListOf<HTMLElement>;
  const scoreDisplay = document.querySelector("span") as HTMLElement;
  const startBtn = document.querySelector(".start") as HTMLElement;
  const initialSpeed: number = 100;

  let currentIndex: number = 0; //so first div in our grid
  let appleIndex: number = 0; //so first div in our grid
  let pineAppleIndex: number = 0;
  let currentSnake: number[] = [2, 1, 0];
  let direction: number = 1;
  let score: number = 0;
  let appleSpeed: number = 0.9;
  let pineAppleSpeed: number = 0.5;
  let intervalTime: number = 0;
  let interval: number | NodeJS.Timer = 0;

  //to start, and restart the game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    squares.forEach(v => {
      v.classList.remove("pineapple");
      v.classList.remove("apple");
    });
    clearInterval(interval as number);
    score = 0;
    randomApple(appleIndex, squares);
    randomPineApple(pineAppleIndex, squares);
    direction = 1;
    scoreDisplay.innerText = score.toString();
    intervalTime = initialSpeed;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  //function that deals with ALL the ove outcomes of the Snake
  function moveOutcomes() {
    //deals with snake hitting border and snake hitting self
    if (squares[currentSnake[0] + direction] === undefined) {
      return clearInterval(interval as number); // prevent snake git bottom won't close game issue
    }
    if (
      (currentSnake[0] + moveWidth >= moveWidth * moveWidth && direction === moveWidth) || // bottom border collision
      (currentSnake[0] % moveWidth === moveWidth - 1 && direction === 1) || // right border collision
      (currentSnake[0] % moveWidth === 0 && direction === -1) || //if left border collision
      (currentSnake[0] - moveWidth < 0 && direction === -moveWidth) || // top border collision
      squares[currentSnake[0] + direction].classList.contains("snake") //if snake goes into itself
    ) {
      return clearInterval(interval as number); //this will clear the interval if any of the above happen
    }

    const tail: number | undefined = currentSnake.pop(); //removes last ite of the array and shows it
    squares[tail].classList.remove("snake"); //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head of the array

    //deals with snake getting apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
      whenEat("apple", 1, appleSpeed);
    } else if (squares[currentSnake[0]].classList.contains("pineapple")) {
      whenEat("pineapple", 10, pineAppleSpeed);
    }
    squares[currentSnake[0]].classList.add("snake");

    function whenEat(fruit: string, scoreAdded: number, speedAdded: number) {
      squares[currentSnake[0]].classList.remove(fruit);
      squares[tail].classList.add("snake");
      currentSnake.push(tail);

      if (fruit === "apple") {
        randomApple(appleIndex, squares);
      } else {
        randomPineApple(pineAppleIndex, squares);
      }

      score = score + scoreAdded;
      scoreDisplay.textContent = score.toString();
      clearInterval(interval as number);
      intervalTime = intervalTime * speedAdded;
      interval = setInterval(moveOutcomes, intervalTime);
    }
  }

  //assign functions to keycodes
  function control(e: KeyboardEvent) {
    squares[currentIndex].classList.remove("snake");

    if (e.code === "ArrowRight") {
      direction = 1;
    } else if (e.code === "ArrowUp") {
      direction = -moveWidth;
    } else if (e.code === "ArrowLeft") {
      direction = -1; // left
    } else if (e.code === "ArrowDown") {
      direction = +moveWidth;
    }

    if (e.code === "KeyQ") {
      startGame();
    }
  }

  // re-load game when screen resize for regenerate map
  window.onresize = function() {
    setTimeout(() => {
      location.reload();
    }, 100);
  };

  document.addEventListener("keydown", control);
  startBtn.addEventListener("click", startGame);
}

document.addEventListener("DOMContentLoaded", () => {
  initGame();
});
