function GameOver({ winner, onRematch}) {
    return (<div id="game-over">
        <h2>Game over</h2>
        {winner ? <p>You won, {winner}</p> : <p>It's a draw!</p>}
        <button onClick={onRematch}>Rematch!</button>
    </div>);
}

export default GameOver;