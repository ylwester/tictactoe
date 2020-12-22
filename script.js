const GameBoard = (() => {
    const board = [];
    for(let i = 0; i<9; i++) {
        board.push('');
    }

    const displayMarks = (board) => {
        const querySquare = document.querySelectorAll('.square');
        querySquare.forEach((square) => {
            square.textContent = board[square.dataset.key];
        });
    }

    const getBoard = () => board;
    return {
        getBoard,
        displayMarks,
    }
})();

const createPlayer = (name, marker) => {
    return {
        name,
        marker,
    }
}



const game = (() => {
    const playerX = createPlayer("Player 1", 'X');
    const playerO = createPlayer("Player 2", 'O');

    let currentPlayer = playerX;

    let endedGame = false;

    const changePlayer = () => {
        if (currentPlayer === playerX) {
            currentPlayer = playerO;
        } else {
            currentPlayer = playerX;
        }
    }

    const possibleWinning = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,7],
        [0,4,8],
        [2,4,6],
    ];

    const checkWin = (board) => {
        possibleWinning.forEach((item) => {
            if(board[item[0]] === currentPlayer.marker &&
                board[item[1]] === currentPlayer.marker &&
                board[item[2]] === currentPlayer.marker){
                console.log(currentPlayer.name + " has won.");
                endedGame = true;

            }
        })
    }

    const addMark = (board) => {
        const sq = document.querySelectorAll('.square');
        sq.forEach((square) => {
            square.addEventListener('click', () => {
                if(!endedGame) {
                    if (board[square.dataset.key] === '') { // checks if empty spot to make mark
                        if (currentPlayer.marker === 'O') {
                            board[square.dataset.key] = game.playerX.marker;
                            changePlayer();
                        } else {
                            board[square.dataset.key] = game.playerO.marker;
                            changePlayer();
                        }
                        GameBoard.displayMarks(board);
                        checkWin(board);
                    }
                }
            });
        });

    }

    const newGame = () => {
        game.addMark(GameBoard.getBoard());
    }

    return {
        playerO,
        playerX,
        addMark,
        checkWin,
        newGame,
    };
})();

game.newGame();

GameBoard.displayMarks(GameBoard.getBoard());
