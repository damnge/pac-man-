// all constant variables

const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const startBtn = document.getElementById('start-btn')
const restartBtn = document.getElementById('restart-btn')
const highestScoreDisplay = document.getElementById('highest-score')
const scoreFromLocalStorage = localStorage.getItem("highestPacmanScore")

// basic variables that change during the game

let squares = []
let score = 0
let pacDots = 0
let gamePaused = true;

// display the highest score saved in local storage

highestScoreDisplay.textContent = scoreFromLocalStorage


// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,1,2,2,2,2,1,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//create board
function createBoard() {
    //for loop 
    for (let i = 0; i < layout.length; i++) {
        //create a square 
        const square = document.createElement('div')
        //put square in grid 
        grid.appendChild(square)
        //put square in squares array
        squares.push(square)
        // creat different elements on the board according to the layout numbers
        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
        
    }
}
createBoard()

// down - 40
// up key - 38
// left - 37
// right - 39

function startGame() {
    // if the game is paused and the button start will be clicked ghosts start to move and player can control the pacman
    // button change name from "start" to "pause" ,boolean gamePaused set to false;
    if(gamePaused){
      moveAllGhosts()
      document.addEventListener('keyup', control)
      gamePaused = false;
      startBtn.innerHTML = "Pause"
    // if the game not is paused and the button pause will be clicked ghosts stop to move and player can't control the pacman
    // button change name from "pause" to "start" ,boolean gamePaused set to true;
    } else if(!gamePaused){
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', control)
      gamePaused = true;
      startBtn.innerHTML = "Start"
    }
  }

//starting position of pacman 
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')


// control function created with swich method that alow pacman to move up, down, left and right
// pacman can not move through the gird div where wall is created also he can not go in to the ghost lair
function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman','pacman-down', 'pacman-up', 'pacman-right', 'pacman-left')
    switch(e.keyCode) {
        case 40:
        if (
            !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            pacmanCurrentIndex + width < width * width
            ) 
            pacmanCurrentIndex += width
            squares[pacmanCurrentIndex].classList.add('pacman-down')
        
        break
        case 38:
        if (
            !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >=0
            ) 
            pacmanCurrentIndex -= width
            squares[pacmanCurrentIndex].classList.add('pacman-up')
        break
        case 37: 
        if( 
            !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            pacmanCurrentIndex % width !==0
            ) 
            pacmanCurrentIndex -=1
            squares[pacmanCurrentIndex].classList.add('pacman-left')
            // if pacman uses the tunnel he will endup on the other side of the board
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
                squares[364].classList.remove('pacman-left')
            }
        break
        case 39:
        if(
            !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
            pacmanCurrentIndex % width < width -1
            ) 
            pacmanCurrentIndex +=1
            squares[pacmanCurrentIndex].classList.add('pacman-right')
                 // if pacman uses the tunnel he will endup on the other side of the board
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
                squares[391].classList.remove('pacman-right')
            }
        break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
}

// function for the pacman eating pacdots. if the pacman is at the div where is a pac dot class, pac dot will be removed and score will rise
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        pacDots ++
        score++
        scoreDisplay.innerHTML = score
        // if the score of the player is higher than the highest score saved in local storage it will be updated with new record
        if(scoreFromLocalStorage < score) {
            highestScoreDisplay.textContent = score
            localStorage.setItem("highestPacmanScore", score)
        }
    }
}

function powerPelletEaten() {
    //if square pacman is in contains a power pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        //remove power pellet class
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        //add a score of 10
        score +=10
        //change each of the four ghosts to isScared
        ghosts.forEach(ghost => ghost.isScared = true)
        //use setTimeout to unscare ghosts after 10 seconds   
        setTimeout(unScareGhosts, 10000)    
    }
}
// run for each on all the ghosts and set isScared to false
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// class for the ghost object with all the variables
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}
// created ghost from the class constructor
const ghosts = [
    new Ghost('blinky', 348, 325),
    new Ghost('pinky', 376, 375),
    new Ghost('inky', 351, 425),
    new Ghost('clyde', 379, 450)
]

//draw ghosts onto my grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move all  the ghosts
function moveAllGhosts() { ghosts.forEach(ghost => moveGhost(ghost))}


// function to run the ghost randomly
function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
        //if the next square does NOT contain a wall and does not contain a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
                //remove any ghost
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        // //add direction to current Index
        ghost.currentIndex += direction
        // //add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className)  
        squares[ghost.currentIndex].classList.add('ghost')  
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared 
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        
        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman', 'pacman-down', 'pacman-up', 'pacman-left', 'pacman-right')) {
            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
            //add a score of 100
            score +=300
            scoreDisplay.innerHTML = score;
            if(scoreFromLocalStorage < score) {
                highestScoreDisplay.textContent = score
                localStorage.setItem("highestPacmanScore", score)
            }
            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion  
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
    }, ghost.speed )
}

//check for game over
function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
     ) {
     //for each ghost - we need to stop it moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove eventlistener from our control function
    document.removeEventListener('keyup', control)
    squares[pacmanCurrentIndex].classList.remove('pacman','pacman-down', 'pacman-up', 'pacman-right', 'pacman-left')
    //tell user the game is over   
    alert('You have lost!')
    restartGame()
     }
}

//check for win
function checkForWin() {
    if (pacDots === 234) {
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove the eventListener for the control function
        document.removeEventListener('keyup', control)
        squares[pacmanCurrentIndex].classList.remove('pacman','pacman-down', 'pacman-up', 'pacman-right', 'pacman-left')
        //tell our user we have won
        alert('You have won!')
        restartGame()
    }
}

function restartGame() {
        ghosts.forEach(ghost => {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion  
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            clearInterval(ghost.timerId)
        })
        squares[pacmanCurrentIndex].classList.remove('pacman','pacman-down', 'pacman-up', 'pacman-right', 'pacman-left')
        pacmanCurrentIndex = 490
        squares[pacmanCurrentIndex].classList.add('pacman')
        score = 0
        pacDots = 0
        scoreDisplay.innerHTML = score;
        gamePaused = true
        document.removeEventListener('keyup', control)
        startBtn.innerHTML = "Start"
        createBoard()
}


startBtn.addEventListener('click', startGame)
restartBtn.addEventListener('click', restartGame)
