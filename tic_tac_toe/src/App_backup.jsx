import { useEffect, useMemo, useState } from 'react';
import './App.css'

const size = 3;
const initialBoard = new Array(size * size).fill(null);
const statuses = [
    "Active",
    "Winner is Player ",
    "The game is DRAW."
]

function App() {
    const [board, setBoard] = useState(initialBoard);
    // const [cellValue, setCellValue] = useState([]);
    const [activePlayer, setActivePlayer] = useState("X");
    const [status, setStatus] = useState(statuses[0]);
    const [disableAll, setDisableAll] = useState(false);
    const [highlightedCells, setHighlightedCells] = useState([]);

    const cellsFilled = useMemo(() => board.filter(e => e !== null).length, [board]);

    useEffect(() => {
        winLogic();
    }, [board]);

    const togglePlayer = () => {
        if (activePlayer === "X")
            setActivePlayer("O");
        else
            setActivePlayer("X");
    }

    const fnReset = () => {
        setBoard(initialBoard);
        setStatus(statuses[0]);
        setDisableAll(false);
        setHighlightedCells([]);

        if (Math.random() > 0.5)
            setActivePlayer("X");
        else
            setActivePlayer("O");
    };


    const fnClickCellButton = (index) => {
        const copy = [...board];
        copy[index] = activePlayer;
        setBoard(copy);
        togglePlayer();
        if (cellsFilled === size ** 2 - 1) {
            setStatus(statuses[2]);
        }
    }

    const wonHorizontally = () => {
        let winner = "";
        let won = false;
        let mainPlayer = "";

        let horizontal = [];
        let highlighted = [];
        let row = 0;

        // current is my current position
        let current = 0;
        // O(n^2)
        while (current <= size ** 2 - 1) {
            if ((current + 1) % size === 1) {
                // it's a new start 
                mainPlayer = board[current];
                row = current / size - current % size + 1;
            }

            if (board[current] === null || board[current] !== mainPlayer) {
                horizontal = [];
                highlighted = [];
                current = row * size;
            }
            else {
                horizontal.push(mainPlayer);
                highlighted[current] = current;
                if (horizontal.length === size) {
                    setHighlightedCells(highlighted);
                    return { won: true, winner: mainPlayer };
                }
                current++;
            }
        }

        return {
            won, winner
        };
    }

    const wonVertically = () => {
        let column = 0;
        let mainPlayer = "";

        let vertical = [];
        let highlighted = [];

        // current is my current position
        let current = 0;
        // O(n^2)
        while (current <= size ** 2 - 1) {
            if (current < size) {
                // it's a new start
                mainPlayer = board[current];
                column = current % size + 1;
            }
            // if ---> current = column - 1
            // else ---> current += size
            if (board[current] === null || board[current] !== mainPlayer) {
                vertical = [];
                highlighted = [];
                if (column < size)
                    current = column;
                else
                    break;
            }
            else {
                vertical.push(mainPlayer);
                highlighted[current] = current;
                if (vertical.length === size) {
                    setHighlightedCells(highlighted);
                    return { won: true, winner: mainPlayer };
                }
                current += size;
            }
        }

        return {
            won: false, winner: ""
        };
    }

    const wonDiagonally = () => {

        let diagonal_up = [];
        let diagonal_down = [];
        let highlighted_up = [];
        let highlighted_down = [];
        // unlike horizontally and vertically here i'm indexing row and column from 0
        let row_up = 0;
        let row_down = size - 1;

        let mainPlayer_up = board[row_up];
        let mainPlayer_down = board[row_down * size];

        // O(n)
        let column = 0;
        while (column < size) {
            let current_up = row_up * size + column;
            let current_down = row_down * size + column;


            // up
            if (board[current_up] === null || board[current_up] !== mainPlayer_up) {
                diagonal_up = [];
                highlighted_up = [];
            }
            else {
                diagonal_up.push(mainPlayer_up);
                highlighted_up[current_up] = current_up;
                if (diagonal_up.length === size) {
                    setHighlightedCells(highlighted_up);
                    return { won: true, winner: mainPlayer_up };
                }
                row_up++;
            }

            // down
            if (board[current_down] === null || board[current_down] !== mainPlayer_down) {
                diagonal_down = [];
                highlighted_down = [];
            }
            else {
                diagonal_down.push(mainPlayer_down);
                highlighted_down[current_down] = current_down;
                if (diagonal_down.length === size) {
                    setHighlightedCells(highlighted_down);
                    return { won: true, winner: mainPlayer_down };
                }
                row_down--;
            }

            column++;
        }

        return {
            won: false, winner: ""
        };
    }

    const winLogic = () => {
        let end = {};
        end = wonHorizontally();
        if (end.won) {
            setDisableAll(true);
            setStatus(statuses[1] + end.winner);
            return;
        }
        else {
            end = wonVertically();
            if (end.won) {
                setDisableAll(true);
                setStatus(statuses[1] + end.winner);
                return;
            }
            else {
                end = wonDiagonally();
                if (end.won) {
                    setDisableAll(true);
                    setStatus(statuses[1] + end.winner);
                    return;
                }
            }
        }
    }


    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <div className='game' style={{ "--size": size }}>
                <div className='status'>
                    <div className='info'>
                        Player {activePlayer} turn
                        <button className='reset' onClick={fnReset}>Reset Game</button>
                    </div>
                    <div className='status_info'>{status}</div>
                </div>
                <div className='board' style={{ "--size": size }}>
                    {
                        board.map((_, index) => {
                            return <button disabled={board[index] || disableAll}
                                style={{ backgroundColor: (highlightedCells[index] || highlightedCells[index] === 0) && "green" }}
                                className='cell' key={index} onClick={() => fnClickCellButton(index)}>{board[index]}
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default App
