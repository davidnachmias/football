import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useUsers } from '../context/UsersContext';
import SelectPlayer from '../components/SelectPlayer';

export default function EditPlayer() {
    const { currentUser, setCurrentUser, updateUser,updatePlayerInTeam } = useUsers();
    const { playerParams } = useParams();
    const navigate = useNavigate();
    const [playerData, setPlayerData] = useState({
        id: '',
        name: '',
        age: '',
        in: 'out',
        goals: null,
        assits: null
    })

    
    // function setFormData(key, value) {
    //     setPlayerData((prevData) => ({
    //         ...prevData,
    //         [key]: value
    //     }));
    // }
    const [playerIndex, setPlayerIndex] = useState()

    function validLineup() {
        return !(playerData.in && currentUser?.players.filter((player) => player.in).length >= 11)
    }

    useEffect(() => {
        if (playerParams != undefined) {
            updatePlayerData(playerParams)
        } else {
            resetFormData()
        }
        return (() => {
            console.log('EditPlayer useEffect')
        }
        )
    }, [playerParams, currentUser?.players])


    function updatePlayerData(idx) {
        if (idx !== "-1") {
            const data = { ...currentUser.players[idx] };
            setPlayerData({ ...data });
            setPlayerIndex(idx);
        } else {
            console.error('Player not found');
            resetFormData();
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        if(playerIndex === "-1"){
             alert("please select player")
             return
          }
        if (validLineup()) {
            setPlayerData((prevData) => ({...prevData,id : playerIndex}));
            updatePlayerInTeam(playerData)
            navigate('/team');
            alert('The player has been updated')

        } else {
            alert('Too much players in lineup')
        }
    }

    

    function resetFormData() {
        setPlayerData({
            id: '',
            name: '',
            age: '',
            in: false,
            goals: null,
            assits: null
        });
        setPlayerIndex("-1");
    }


    return (
        <div className="flex">
            <Navbar />
            <div className='flex flex-col flex-grow p-6 ml-36 items-center mt-6 space-y-10'>
            <h1 className="text-4xl font-bold mb-4 text-center">{currentUser?.teamName}</h1>
               <SelectPlayer players={currentUser?.players} updatePlayerData={updatePlayerData} playerIndex ={playerIndex} />
                <form onSubmit={onSubmit} className="w-full flex flex-col items-center mt-6 space-y-5">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        required
                        minLength="1"
                        value={playerData.name}
                        onChange={(e) => setPlayerData({...playerData,name:e.target.value})}
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-1/4"
                    />
                    <input
                        name="age"
                        type="number"
                        placeholder="Age"
                        required
                        min="18"
                        max="60"
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-1/4"
                        value={playerData.age}
                        onChange={(e) => setPlayerData({...playerData,age:e.target.value})}
                        
                    />
                    <div>
                        <label htmlFor="in" className="mr-4">In lineup?</label>
                        <input
                            type="checkbox"
                            name="in"
                            id="in"
                            checked={playerData.in}
                        onChange={(e) => setPlayerData({...playerData,in:e.target.checked})}
                            
                        />
                    </div>
                    <input
                        name="goals"
                        type="number"
                        placeholder="Goals"
                        required
                        min={"0"}
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-1/4"
                        value={playerData.goals != null ? playerData.goals : ''}
                        onChange={(e) => setPlayerData({...playerData,goals: Number(e.target.value)})}
                        
                    />
                    <input
                        name="assits"
                        type="number"
                        placeholder="Assits"
                        required
                        min={"0"}
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-1/4"
                        value={playerData.assits != null ? playerData.assits : ''}
                        onChange={(e) => setPlayerData({...playerData,assits: Number(e.target.value)})}
                        
                    />
                    <button type='submit' className="bg-yellow-200 rounded-none font-bold mt-10 px-4 py-2">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}