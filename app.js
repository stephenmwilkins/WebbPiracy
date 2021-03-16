

// https://cloud.maptiler.com/customize/?_gl=1*1u12jxp*_ga*MTU1ODkzNzQwNC4xNjE1OTA3MTc0*_ga_K4SXYBF4HT*MTYxNTkwNzE3NC4xLjAuMTYxNTkwNzE3NS41OQ..&_ga=2.124587662.544722165.1615907175-1558937404.1615907174#toner/3.28/26.25/-78.71


document.addEventListener('DOMContentLoaded', () => {

  const scoreDisplay = document.getElementById('score')
  const width = 28
  // const width = 10
  let score = 0
  const grid = document.querySelector('.grid')
  const layout = [
    3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,
    3,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,3,
    3,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,1,1,1,1,1,1,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,1,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,4,4,4,1,1,4,4,4,4,4,1,1,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,4,4,4,1,1,1,4,4,1,4,4,4,1,4,1,4,4,4,4,4,4,4,3,
    3,4,4,4,4,4,4,4,4,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,4,4,4,4,4,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,3,
    3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,1,1,1,1,1,4,4,4,4,3,
    3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,4,4,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,3
  ]
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const squares = []

  //create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      //add layout to the board
      if(layout[i] === 0) {
        squares[i].classList.add('pac-dot')
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall')
      } else if (layout[i] === 3) {
        squares[i].classList.add('sea-wall')
      }

      if (i===389) {
        squares[i].classList.add('home')
      }

    }
  }
  createBoard()


  //create Characters
  //draw pacman onto the board
  let pacmanCurrentIndex = 29
  squares[pacmanCurrentIndex].classList.add('pac-man')
  //get the coordinates of pacman on the grid with X and Y axis
  // function getCoordinates(index) {
  //   return [index % width, Math.floor(index / width)]
  // }

  // console.log(getCoordinates(pacmanCurrentIndex))

  //move pacman
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
      case 37:
        if(
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex -1].classList.contains('sea-wall') &&
          !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
          )
        pacmanCurrentIndex -= 1
        if (squares[pacmanCurrentIndex -1] === squares[363]) {
          pacmanCurrentIndex = 391
        }
        break
      case 38:
        if(
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex -width].classList.contains('sea-wall') &&
          !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
          )
        pacmanCurrentIndex -= width
        break
      case 39:
        if(
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex +1].classList.contains('sea-wall') &&
          !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
        )
        pacmanCurrentIndex += 1
        if (squares[pacmanCurrentIndex +1] === squares[392]) {
          pacmanCurrentIndex = 364
        }
        break
      case 40:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex +width].classList.contains('sea-wall') &&
          !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
        )
        pacmanCurrentIndex += width
        break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')

    console.log(pacmanCurrentIndex);

    win()
    checkForGameOver()
    checkForWin()
  }
  document.addEventListener('keyup', movePacman)



  //what happens when you eat a power-pellet
  function win() {
    if (pacmanCurrentIndex === 389) {
      setTimeout(function(){ alert("You have WON!"); }, 500)
    }
  }





  //create ghosts using Constructors
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

  //all my ghosts
  ghosts = [
    new Ghost('pirate', 300, 250),
    new Ghost('pirate', 301, 400),
    new Ghost('pirate', 302, 300),
    new Ghost('pirate', 303, 500)
    ]

  //draw my ghosts onto the grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
    })

  //move the Ghosts randomly
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) {
    const directions =  [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
      //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
      if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('sea-wall') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
          //remove the ghosts classes
          squares[ghost.currentIndex].classList.remove(ghost.className)
          squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
          //move into that space
          ghost.currentIndex += direction
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      //if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      //if the ghost is currently scared and pacman is on it
      if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score +=100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
    checkForGameOver()
    }, ghost.speed)
  }

  //check for a game over
  function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("Game Over"); }, 500)
    }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (score === 274) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("You have WON!"); }, 500)
    }
  }
})
