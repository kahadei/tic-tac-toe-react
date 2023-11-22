import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [name, setName] = useState(initialName);
    const [isEditing, setEditing] = useState(false);
    let playerName = <span className="player-name">{name}</span>;
    let btnCaption = 'Edit';

    if (isEditing) {
        playerName = <input type="text" required value={name} onChange={handleChangeName} />;
        btnCaption = 'Save';
    }

    function handleEditClick() {
        setEditing(editing => !editing);
        if (isEditing) {
            onChangeName(symbol, name);
        }
    }

    function handleChangeName(event) {
        setName(event.target.value);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}