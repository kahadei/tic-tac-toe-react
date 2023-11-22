

function GameBoard({ onChangeActivePlayer, board }) {

    return (<ol id="game-board">
        {board.map((row, rowInd) => <li key={rowInd}>
            <ol>
                {row.map((playSymb, colInd) => <li key={colInd}>
                    <button onClick={() => onChangeActivePlayer(rowInd, colInd)} disabled={playSymb != null}>{playSymb}</button>
                </li>)}
            </ol>
        </li>)}

    </ol>);
}

export default GameBoard;