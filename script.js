const gameBoard = (() => {
    const divGameBoard = document.getElementById('gameboard');
    divGameBoard.style.visibility = 'hidden';

    const board = [];

    const displayMarks = (board) => {
        const querySquare = document.querySelectorAll('.square');
        querySquare.forEach((square) => {
            square.textContent = board[square.dataset.key];
        });
    }

    const getBoard = () => board;

    const changeGameBoardVisibility = () => {
        if(divGameBoard.style.visibility === 'hidden'){
            divGameBoard.style.visibility = 'visible';
        }
    }

    const refreshBoard = () => {
        board.length = 0;
        for(let i = 0; i<9; i++) {
            board.push('');
        }
    }

    return {
        getBoard,
        displayMarks,
        changeGameBoardVisibility,
        refreshBoard,
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
                        gameBoard.displayMarks(board);
                        checkWin(board);
                    }
                }
            });
        });

    }
    const startNewGame = () => {
        endedGame = false;
        gameBoard.changeGameBoardVisibility();
        gameBoard.refreshBoard();
        addMark(gameBoard.getBoard());
        gameBoard.displayMarks(gameBoard.getBoard());
    }

    const startButton = () => {
        const button = document.getElementById('start-button');
        button.addEventListener('click', () => {
            startNewGame();
        });
    }

    return {
        playerO,
        playerX,
        startButton,
    };
})();

game.startButton();
