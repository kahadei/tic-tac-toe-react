import { useState } from 'react';
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameLog from './components/GameLog';
import { WINNING_COMBINATIONS } from './winning_combinations';
import GameOver from './components/GameOver';



const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2',
};

const INITIAL_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]


function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if(gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_BOARD.map(row => [...row])];
    
    for (const turn of gameTurns) { 
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner;
    for (const combin of WINNING_COMBINATIONS) {
        const firstSymb = gameBoard[combin[0].row][combin[0].column]
        const secondSymb = gameBoard[combin[1].row][combin[1].column]
        const thirdSymb = gameBoard[combin[2].row][combin[2].column]

        if (firstSymb && firstSymb === secondSymb && firstSymb === thirdSymb) {
            winner = players[firstSymb];
        }
    }

    return winner;
}


function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);
    let activePlayer = deriveActivePlayer(gameTurns);
    let gameBoard = deriveGameBoard(gameTurns);
    let winner = deriveWinner(gameBoard, players);
    const hasDraw  = gameTurns.length === 9 && !winner;
    

    function handleActivePlayer(rowInd, colInd) {
        setGameTurns(prevTurns => {
            let currentPlayer = deriveActivePlayer(prevTurns);

            let updatedTurns = [{ square: { row: rowInd, col: colInd }, player: currentPlayer}, ...prevTurns];
            return updatedTurns;
        });
    }

    function handleRematch() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayer => {
            return {
                ...prevPlayer,
                [symbol]: newName
            };
        });
    };

    return ( 
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}  />
                    <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner}  onRematch={handleRematch} />}
                <GameBoard onChangeActivePlayer={handleActivePlayer} board={gameBoard} />
            </div>
            <GameLog turns={gameTurns}/>
        </main>
    )
}

export default App
