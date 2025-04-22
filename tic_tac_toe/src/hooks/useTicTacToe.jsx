import { useState } from 'react'

const useTicTacToe = (size) => {
    const initialBoard = () => new Array(size * size).fill(null);

    const [board, setBoard] = useState(initialBoard);
    // if you want X always to be 1st... keep it true... else false... or random
    const [isXNext, setIsXNext] = useState(Math.random() > 0.5);

    const WINNING_PATTERNS = getWinningPatterns(size);

    function getWinningPatterns(size) {
        let rows = [];
        let columns = [];
        for (let row = 0; row < size; row++) {
            let rowArr = [];
            let colsArr = [];
            for (let col = 0; col < size; col++) {
                rowArr.push(row * size + col);
                colsArr.push(col * size + row);
            }
            rows.push(rowArr);
            columns.push(colsArr);
        }

        let diagonal1 = [];
        let diagonal2 = [];
        for (let i = 0; i < size; i++) {
            diagonal1.push(i * size + i);
            diagonal2.push((i + 1) * (size - 1));
        }

        return [...rows, ...columns, diagonal1, diagonal2];
    }

    const calculateWinner = (currentBoard) => {
        for (let i = 0; i < WINNING_PATTERNS.length; i++) {
            const [a, b, c] = WINNING_PATTERNS[i];

            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a];
            }

        }
        // setHighlightedCells(winPattern);
        return null;
    }

    const handleClick = (index) => {
        // check winner
        const winner = calculateWinner(board);
        // if there is a winner or there is something inside this cell.... do nothing
        if (winner || board[index])
            return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        // board got changed
        setBoard(newBoard);
        // changing turns
        setIsXNext(x => !x);
    }

    const getStatusMessage = () => {
        const winner = calculateWinner(board);
        if (winner)
            return `Player ${winner} won`;
        else if (!board.includes(null))
            return `This game is a draw`;
        else
            return `Player ${isXNext ? "X" : "O"} turn.`
    }

    const resetGame = () => {
        setBoard(initialBoard)
        setIsXNext(Math.random() > 0.5);
    };


    return { board, handleClick, getStatusMessage, resetGame };
}

export default useTicTacToe
