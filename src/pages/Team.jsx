import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PlayerCard from "../components/PlayerCard"
import { useUsers } from '../context/UsersContext';


export default function Team() {
    const [players,setPlayers] = useState([])
    const [status, setStatus] = useState('lineup');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const { currentUser } = useUsers();
    const serachRef = useRef()
    const navigate = useNavigate()

    // Filter players based on the status (lineup/all) and search query
    useEffect(() => {
        const filtered = status === 'all' ? currentUser.players : currentUser.players?.filter((player) => player?.in);
        setPlayers(filtered)
        setFilteredPlayers(filtered);
        serachRef.current.value = ''
    }, [status]);

  
  // Handle search
function handleSearch(str) {
  if (str.trim() === '') {
      setFilteredPlayers(players); // השתמש במערך השחקנים המלא ולא בפריקה של המערך
  } else {
      const searchResults = players.filter((player) =>
          player.name.toLowerCase().includes(str.toLowerCase())
      );
      setFilteredPlayers(searchResults);
  }
}


    function editPlayer(id) {
        navigate(`/editPlayer/${id}`);
    }

    return (
        <div className="flex">
            <Navbar />
            <div className="flex flex-col flex-grow p-6 ml-36 items-center mt-6 space-y-10">
                <h1 className="text-4xl font-bold mb-4 text-center">{currentUser.teamName}</h1>
                <input ref={serachRef}
                    type="text"
                    placeholder="Search players..."
                    className="mb-6 p-2 border border-gray-300 rounded-md shadow-sm w-1/3"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="flex flex-wrap justify-center">
                    {filteredPlayers?.map((player,index) => (
                        <PlayerCard key={index} player={player} id={player.id} editPlayer={editPlayer}/>
                    ))}
                </div>
                <div>
                    <button
                        onClick={() => setStatus(status === 'lineup' ? 'all' : 'lineup')}
                        className="bg-blue-500 rounded-none font-bold mt-10 text-white px-4 py-2"
                    >
                        {status === 'lineup' ? 'Show All Players' : 'Show Only Lineup Players'}
                    </button>
                </div>
            </div>
        </div>
    );
}