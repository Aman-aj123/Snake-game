// Intializing important variables
let direction = { x: 0, y: 0 };
let speed = 5.50;
let lastPaintTime = 0;
let snakeArr = [
     { x: 13, y: 16 }
];
let food = { x: 7, y: 14 };
let score = 0;

let inputDir = { x: 0, y: 0 };


// Main function 
const main = (ctime) => {
     window.requestAnimationFrame(main);
     if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
          return;
     };
     lastPaintTime = ctime;
     gameEngine();
};
window.requestAnimationFrame(main);





// isCollide function
function isCollide(snake) {
     for (let i = 1; i < snakeArr.length; i++) {
          if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
               return true;
          }
     }

     if (snake[0].x >= 17 || snake[0].x <= 0 || snake[0].y >= 17 || snake[0].y <= 0) {
          return true;
     }

     return false;
}




// gameEngine function 
function gameEngine() {

     // Updating the snakeArray and food
     if (isCollide(snakeArr)) {
          inputDir = { x: 0, y: 0 };
          alert("Game over..");
          snakeArr = [
               { x: 13, y: 16 }
          ];
          score = 0;
     }



     // If snake has eatten the food then increase the score and regenerate the food at another place
     if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
          snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

          let a = 2;
          let b = 16;
          food = { x: Math.round(Math.random() * 13), y: Math.round(Math.random() * 13) };
     };



     // Moving the snake
     for (let i = snakeArr.length - 2; i >= 0; i--) {
          snakeArr[i + 1] = { ...snakeArr[i] };
     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;





     // Displaying snake body
     const gameBoard = document.querySelector(".game-board");
     gameBoard.innerHTML = "";

     snakeArr.forEach((e, index) => {
          let snakeElement = document.createElement('div');
          snakeElement.classList.add('snake');
          snakeElement.style.gridRowStart = e.x;
          snakeElement.style.gridColumnStart = e.y;
          gameBoard.appendChild(snakeElement);
          if (index === 0) {
               snakeElement.classList.add("head");
               snakeElement.classList.remove('snake');
          } else {
               snakeElement.classList.add("snake");
               snakeElement.classList.remove('head');
          };
     });

     // Displaying snake food
     let snakeFood = document.createElement('div');
     snakeFood.classList.add('food');
     snakeFood.style.gridRowStart = food.x;
     snakeFood.style.gridColumnStart = food.y;
     gameBoard.appendChild(snakeFood);
};




// Main logic of the game 
window.addEventListener('keyup', (e) => {
     inputDir = { x: 0, y: 0 }; // inputDirection

     switch (e.key) {
          case "ArrowUp":
               inputDir.x = -1;
               inputDir.y = 0;
               break;
          case "ArrowDown":
               inputDir.x = 1;
               inputDir.y = 0;
               break;
          case "ArrowLeft":
               inputDir.x = 0;
               inputDir.y = -1;
               break;
          case "ArrowRight":
               inputDir.x = 0;
               inputDir.y = 1;
               break;
          default:
               break;
     };
}); 
