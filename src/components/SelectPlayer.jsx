import React, { useEffect } from 'react'

export default function SelectPlayer({ players, updatePlayerData, playerIndex }) {

    return (
        <>
            <select value={playerIndex ?? "-1"} onChange={(e) => updatePlayerData(e.target.value)} className='mb-6 p-2 border border-gray-300 rounded-md shadow-sm w-1/3'>
                <option value={"-1"}>Please select a player</option>
                {players?.map((player, index) => (
                    <option key={index} value={index}>{player.name}</option>
                ))}
            </select>
        </>
    )
}
