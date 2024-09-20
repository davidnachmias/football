import React, { useEffect, useState } from "react"
const UsersContext = React.createContext(null)

export function UsersContextProvider({ children }) {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState()

    function isUserExist(userName) {
        let allUsers = JSON.parse(localStorage.getItem("users"))
        if (!allUsers) {
            return false
        }else{
            return users.find(user => user.userName === userName)
        }
    }

    function validateUser(user) {
        console.log(user)
        const tempUser = isUserExist(user.userName);
        if (tempUser && tempUser.password === user.password) {
            setCurrentUser(tempUser)
            return true
        }else{
            return false
        }
    }

    function updateUser(user) {
        const updatedUser = users.map(u => 
            u.userName === user.userName ? user : u
        );
        setUsers(updatedUser);
        localStorage.setItem("users", JSON.stringify(updatedUser));
    }

    // save user from register
    function saveUser(user) {
        const tempUser = [...users,user]
        setUsers(tempUser)
        localStorage.setItem("users", JSON.stringify(tempUser));
    }


    function updatePlayerInTeam(playerData) {
        const players = currentUser.players.map((player)=> (player.id === playerData.id) ? playerData : player)
        setCurrentUser((prevUser) => {
            const updatedUser = {
                ...prevUser,players
            };
            updateUser(updatedUser);  // עדכון המשתמש המעודכן עם השחקן המעודכן
            return updatedUser;  // החזרת המשתמש המעודכן ל-setCurrentUser
        });
    }

    function addPlayerToTeam(playerData) {
        setCurrentUser((prevUser) => {
            const updatedUser = {
                ...prevUser,
                players: [
                    ...prevUser.players,
                    { ...playerData, id: prevUser.players.length.toString() }
                ]
            };
            updateUser(updatedUser);  // עדכון המשתמש המעודכן עם השחקן החדש
            return updatedUser;  // החזרת המשתמש המעודכן ל-setCurrentUser
        });
    }

    useEffect(()=>{
        const allUsers = JSON.parse(localStorage.getItem("users"))
        if (allUsers) {
            setUsers([...allUsers])
        }
    },[])



    return <UsersContext.Provider value={{ users, setUsers, saveUser, updateUser, isUserExist
        , currentUser, setCurrentUser,validateUser,addPlayerToTeam,updatePlayerInTeam}}>
        {children}
    </UsersContext.Provider>
}

export const useUsers = () => {
    const context = React.useContext(UsersContext)
    return context
}