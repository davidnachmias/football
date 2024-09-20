import React from 'react'


export default function PlayerCard({ player, editPlayer, id }) {

  return (
      <div className='border-solid border-2 border-black p-3 m-4 cursor-pointer' onClick={()=>editPlayer(id)}>
          <h2>{player.name}</h2>
          <h2>Age:{player.age}</h2>
          <h2>In: {player.in ? "lineup" : "out"}</h2>
     </div>
    )
  }
