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

    const players = () => {
        const playerXName = document.getElementById('player-one').value;
        const playerOName = document.getElementById('player-two').value;
        const playerX = createPlayer(playerXName, 'X');
        const playerO = createPlayer(playerOName, 'O');


        return {
            playerX,
            playerO,
        }
    }

    let currentPlayer = players().playerX;

    let endedGame = false;

    const changePlayer = () => {
        checkWin(gameBoard.getBoard());
        if (!endedGame) {
            if (currentPlayer.marker === players().playerX.marker) {
                currentPlayer = players().playerO;
                displayGameStatus(currentPlayer.name + '\'s turn.');
            } else {
                currentPlayer = players().playerX;
                displayGameStatus(currentPlayer.name + '\'s turn.');
            }
        }
    }


    const possibleWinning = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    const checkWin = (board) => {
        possibleWinning.forEach((item) => {
            if(board[item[0]] === currentPlayer.marker &&
                board[item[1]] === currentPlayer.marker &&
                board[item[2]] === currentPlayer.marker){
                displayGameStatus(currentPlayer.name + " has won! Congratulations!");
                console.log("won");
                endedGame = true;
            }
            if(!board.includes('') && !endedGame){
                  displayGameStatus("It's a tie! Start a new game");
                  endedGame = true;
            }
        })
    }

    const displayGameStatus = (message) => {
        const display = document.getElementById('display-score');
        display.textContent = message;
    }

    const addMark = (board) => {
        const sq = document.querySelectorAll('.square');
        sq.forEach((square) => {
            square.addEventListener('click', () => {
                if(!endedGame) {
                    if (board[square.dataset.key] === '') { // checks if empty spot to make mark
                        board[square.dataset.key] = currentPlayer.marker;
                        changePlayer();
                        console.log(board);
                        gameBoard.displayMarks(board);
                    }
                }
            });
        });

    }
    const startNewGame = () => {
        currentPlayer = players().playerX;
        displayGameStatus(currentPlayer.name + "'s turn.");
        endedGame = false;
        gameBoard.changeGameBoardVisibility();
        gameBoard.refreshBoard();
        if(!endedGame){
            addMark(gameBoard.getBoard());
        }
        gameBoard.displayMarks(gameBoard.getBoard());
    }

    const startButton = () => {
        const button = document.getElementById('start-button');
        button.addEventListener('click', () => {
            startNewGame();
        });
    }

    return {
        startButton,
    };
})();

game.startButton();
