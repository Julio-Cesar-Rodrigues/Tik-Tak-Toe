const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('[data-board]')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessageContainer = document.querySelector('[data-winning-message]')
const restartBtn = document.querySelector('[data-restart-button]')

let isCircleTurn

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

//começa o jogo com a marca X
const startGame = () => {
  isCircleTurn = false

  for (const cell of cellElements) {
    cell.classList.remove('circle')
    cell.classList.remove('x')
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  }

  setBoardHoverClass()
  winningMessageContainer.classList.remove('show-winning-message')
}

const endGame = isDraw => {
  if (isDraw) {
    winningMessageText.innerText = 'Empate'
  } else {
    winningMessageText.innerText = isCircleTurn ? 'O venceu' : 'x venceu'
  }

  winningMessageContainer.classList.add('show-winning-message')
}

//veririca se o currentPlayer esta em alguma winningCombination
const winCheck = currentPlayer => {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentPlayer)
    })
  })
}

const drawCheck = () => {
  return [...cellElements].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('circle')
  })
}

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd)
}

const setBoardHoverClass = () => {
  board.classList.remove('circle')
  board.classList.remove('x')

  if (isCircleTurn) {
    board.classList.add('circle')
  } else {
    board.classList.add('x')
  }
}

//verifica qual turno é
const swapTurns = () => {
  isCircleTurn = !isCircleTurn
  setBoardHoverClass()
}

const handleClick = e => {
  //coloca a marca X ou circle
  const cell = e.target
  const classToAdd = isCircleTurn ? 'circle' : 'x'
  placeMark(cell, classToAdd)

  const isWin = winCheck(classToAdd)

  const isDraw = drawCheck()
  if (isWin) {
    endGame(false)
  } else if (isDraw) {
    endGame(true)
  } else {
    swapTurns()
  }
}

startGame()

restartBtn.addEventListener('click', startGame)
