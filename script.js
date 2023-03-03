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
        for(let cell of board) {
            cell = ""
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
    return {
        mark,
        getName
    }
}


const game = (() => {
    const player1 = Player('X', 'Tom');
    const player2 = Player('O', "Computer")
    const player1Text = document.getElementById('player1')
    const player2Text = document.getElementById('player2')
    const player1Ind = document.getElementById('ply1ind')
    const player2Ind = document.getElementById('ply2ind')

    player1Ind.textContent = "✅"
    player2Ind.textContent = "❎"

    player1Text.textContent = player1.getName()
    player2Text.textContent = player2.getName()
    this.winner;
    this.currentPlayer = player1

    const cells = document.getElementsByClassName('cell')

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

    for(let cell of cells) [
        cell.addEventListener('click', () => {
            if(cell.textContent === "") {
                cell.textContent = currentPlayer.mark()
                gameBoard.updateBoard(currentPlayer.mark(), cell.dataset.cell)
                changePlayer()
            }
            
        })
    ]

    const endGame = (tie = "none") => {
        if(tie === "tie") {
            console.log('tie')
            return
        }

        console.log(currentPlayer.getName())
    }
    
    return {
        endGame
    }
    


})()


const overlay = (() => {
    const overlay = document.getElementById('overlay')

    const startScreen = () => {
        const title = document.createElement('h1')
        title.textContent = "Start Game"
        overlay.appendChild(title)

        const container = document.createElement('div')
        container.classList.add('container')
        const player1Name = document.createElement('div')
        player1Name.classList.add('name-container')
        const 


    }

    return {
        startScreen
    }
})()


overlay.startScreen()
