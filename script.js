const gameBoard = (() => {
    this.winStates = [[0,1,2], 
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [6,4,2]]
    this.board = ['', '', '', '', '', '', '', '', '']
    const updateBoard = (move, index) => {
        board[index] = move;
        checkWin(move);
    };

    const clearBoard = () => {
        for(let point of board) {
            point = ""
        }
    }

    const checkWin = (move) => {
        for(let wins of winStates) {
            if(board[wins[0]] === move && board[wins[1]] === move && board[wins[2]] === move)
            {
                game.endGame()
                return
            }
        }
        for(let cell of board) {
            if(cell === "")
            {
                return
            }
        }

        game.endGame('tie')
    }

    const print = () => console.log(this.board);

    return{
        updateBoard, 
        clearBoard
    };
})();

const Player = (symbol, name) => {
    const mark = () => symbol;
    const getName = () => name;
    const setName = (newName) => {name = newName};
    return {
        mark,
        getName,
        setName
    }
}


const game = (() => {
    const player1 = Player('X', 'Player 1');
    const player2 = Player('O', 'Player 2');

    const player1Text = document.getElementById('player1')
    const player2Text = document.getElementById('player2')
    const player1Ind = document.getElementById('ply1ind')
    const player2Ind = document.getElementById('ply2ind')
    const cells = document.getElementsByClassName('cell')
    

    player1Ind.textContent = "✅"
    player2Ind.textContent = "❎"

    player1Text.textContent = player1.getName()
    player2Text.textContent = player2.getName()
    let winner;
    let currentPlayer = player1

    for(let cell of cells) [
        cell.addEventListener('click', () => {
            if(cell.textContent === "") {
                cell.textContent = currentPlayer.mark()
                gameBoard.updateBoard(currentPlayer.mark(), cell.dataset.cell)
                changePlayer()
            }
            
        })
    ]
    const clearCells = () => {
        for(let cell of cells) {
            cell.textContent = ""
        }
    }

    

    const changePlayer = () => {
        if(currentPlayer === player1){
            currentPlayer = player2
            player2Ind.textContent = player1Ind.textContent
            player1Ind.textContent = "❎"
        } else {
            currentPlayer = player1;
            player1Ind.textContent = player2Ind.textContent
            player2Ind.textContent = "❎"
        }
    }

    

    const changePlayer1Name = (name) => {
        player1.setName(name)
        player1Text.textContent = player1.getName()
    }

    const changePlayer2Name = (name) => {
        player2.setName(name)
        player2Text.textContent = player2.getName()
    }

    const startGame = () => {

        gameBoard.clearBoard()
        clearCells()
        overlay.startScreen()
        

        

        

        

    }

    const endGame = (tie = "none") => {
        if(tie === "tie") {
            overlay.endScreen('tie')
            return
        }

        winner = currentPlayer
        overlay.endScreen(winner.name)
    }
    
    return {
        endGame,
        changePlayer1Name,
        changePlayer2Name,
        startGame
    }
    


})()


const overlay = (() => {

    const startScreen = () => {
        const startScreenOverlay = document.getElementById('start-game')
        const player1Name = document.getElementById('player1-name')
        const player2Name = document.getElementById('player2-name')
        const newGame = document.getElementById('new-game')

        newGame.addEventListener('click', (e) => {
            e.preventDefault()

            if(player1Name.value !== "") {
                game.changePlayer1Name(player1Name.value)
            }

            if(player2Name.value !== "") {
                game.changePlayer2Name(player2Name.value)
            }

            startScreenOverlay.style.display = "none"
        })
        startScreenOverlay.style.display = 'flex'



    }

    const endScreen = (winner) => {
        const gameOverOverlay = document.getElementById('game-over')
        gameOverOverlay.style.display = 'flex'
        const result = document.getElementById('result')
        const restartBtn = document.getElementById('restart')

        restartBtn.addEventListener('click', () => {
            gameOverOverlay.style.display = 'none'
            game.startGame()
        })
        if(winner === "tie") {
            result.textContent = 'Tie'
        }

        result.textContent = winner

    }

    return {
        startScreen,
        endScreen
    }
})()


game.startGame()
