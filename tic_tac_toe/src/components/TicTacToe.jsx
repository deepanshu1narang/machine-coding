import useTicTacToe from '../hooks/useTicTacToe';

const statuses = [
    "Active",
    "Winner is Player ",
    "The game is DRAW."
]

function TicTacToe({ size = 3 }) {
    const { board, resetGame, getStatusMessage, handleClick } = useTicTacToe(size);

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <div className='game' style={{ "--size": size }}>
                <div className='status'>
                    <div className='info'>
                        {getStatusMessage()}
                        <button className='reset' onClick={resetGame}>Reset Game</button>
                    </div>
                    <div className='status_info'>{status}</div>
                </div>
                <div className='board' style={{ "--size": size }}>
                    {
                        board.map((b, index) => {
                            return <button disabled={b !== null} className="cell" key={index} onClick={() => handleClick(index)}>
                                {b}
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TicTacToe
