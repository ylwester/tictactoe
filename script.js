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
        const playerXname = document.getElementById('player-one').value;
        const playerOname = document.getElementById('player-two').value;
        const playerX = createPlayer(playerXname, 'X');
        const playerO = createPlayer(playerOname, 'O');


        return {
            playerX,
            playerO,
        }
    }

    let currentPlayer = players().playerX;

    let endedGame = false;

    const changePlayer = () => {
        if (currentPlayer.marker === players().playerX.marker) {
            currentPlayer = players().playerO;
        } else {
            currentPlayer = players().playerX;
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
                displayGameStatus(currentPlayer.name + " has won! Congratulations!");
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
                console.log(currentPlayer.marker);
                if(!endedGame) {
                    displayGameStatus(currentPlayer.name + '\'s turn.');
                    if (board[square.dataset.key] === '') { // checks if empty spot to make mark
                        if (currentPlayer.marker === 'O') {
                            changePlayer();
                            board[square.dataset.key] = currentPlayer.marker;
                        } else {
                            changePlayer();
                            board[square.dataset.key] = currentPlayer.marker;
                        }
                        gameBoard.displayMarks(board);
                        checkWin(board);
                    }
                }
            });
        });

    }
    const startNewGame = () => {
        players();
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
        startButton,
    };
})();

game.startButton();
