document.addEventListener('DOMContentLoaded', () => {
console.log("helo") 
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startbtn = document.querySelector('#start-button')
  const width = 10
  let nexRandom = 0
  let timerId
  let score = 0

//The Tetrominoes
 const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  //selecionar aleatoriamente um tetromino e sua primeira rotação
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]
  //desenhando os Tetromino

  function draw() {
    current.forEach(index => {
      
      squares[currentPosition + index].classList.add('tetromino')
    })
  }
  draw()

  //tirar o tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
}

  //faça o Tetromino descer a cada segundo
 // timerId = setInterval(moveDown, 1000)

  //atribuir funções aos códigos-chaves
  function control(e) {
    console.log(e)
    if(e.keyCode === 37) {
      console.log(e)
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

  //função mover para baixo 
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freezer()
  }

  //função de congelamento
  function freezer() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      //começar uma nova queda de tetronimo
      random = nexRandom
      nexRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
    }
  

  //mova o tetromino para a esquerda, a menos que esteja na borda ou haja um bloqueio
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1
    }

    draw()
  }

  //mova o tetrominopara a direita, a menos que esteja na borda ou haja um bloqueio
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

    if(!isAtRightEdge) currentPosition +=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }

    draw()
  }

  function rotate(){
    undraw()
    currentRotation ++
    if (currentRotation == current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  const upNextTetrominoes = [
  [1, displayWidth+1 , displayWidth *2+1, 2],
  [0,displayWidth, displayWidth+1, displayWidth*2+1],
  [1,displayWidth, displayWidth+1,displayWidth+2],
  [0,1,displayWidth,displayWidth +1],
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]

  ]

  function displayShape(){
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    upNextTetrominoes[nexRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }

  startbtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
    }else{
      draw()
      timerId = setInterval(moveDown, 1000)
      nexRandom = Math.floor(Math.random()*theTetrominoes.length)
      displayShape()
    }

  })

  function  addScore( ){
    for (var i = 0; i < 199; i += width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if (row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
        })
        const squaresRemoved = squares.splice(i,width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  function gameOver(){
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'end'
      clearInterval(timerId)
    }
  }


})