const GameBoard = (() => {
    const board = [];
    let lastMark = '';
    for(let i = 0; i<9; i++) {
        board.push('');
    }

    const displayMarks = (board) => {
        document.getElementById("square1").textContent = board[8];
        document.getElementById("square2").textContent = board[7];
        document.getElementById("square3").textContent = board[6];
        document.getElementById("square4").textContent = board[5];
        document.getElementById("square5").textContent = board[4];
        document.getElementById("square6").textContent = board[3];
        document.getElementById("square7").textContent = board[2];
        document.getElementById("square8").textContent = board[1];
        document.getElementById("square9").textContent = board[0];
    }

    const addMark = () => {
        const sq = document.querySelectorAll('.square');
        sq.forEach((square) => {
            square.addEventListener('click', ()=> {
                if(lastMark === '' || lastMark === 'O'){
                    board[square.dataset.key] = game.playerX.marker;
                    lastMark = 'X';
                } else {
                    board[square.dataset.key] = game.playerO.marker;
                    lastMark = 'O';
                }
                displayMarks(board);
            });
        });
    }

    const getBoard = () => board;
    return {
        getBoard,
        displayMarks,
        addMark,
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

    const getTurn = () => {

    };



    return {
        getTurn,
        playerO,
        playerX,
    };
})();



GameBoard.displayMarks(GameBoard.getBoard());

GameBoard.addMark();