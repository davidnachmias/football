import React from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useUsers } from '../context/UsersContext';


export default function Register() {
    const [userName, setUserName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const [teamError, setTeamError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [extraError,setExtraError] = useState()
    const {isUserExist,saveUser} =useUsers()
    const nav = useNavigate();

    function isTeamNameValid(name) {
        const regex = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
        return regex.test(name);
    }

    function isPasswordValid(password) {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
        return regex.test(password);
    }

    function onRegisterSubmit(e) {
        e.preventDefault();

        let valid = true;
        setExtraError(undefined)
        if (!isTeamNameValid(teamName)) {
            setTeamError("Team name must start with a capital letter and contain only English letters");
            valid = false;
        } else {
            setTeamError('');
        }

        if (!isPasswordValid(userPassword)) {
            setPasswordError('Password must be between 8-20 characters and include a capital letter, small letter, number, and special character.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (userPasswordConfirm !== userPassword) {
            setConfirmError('Passwords do not match');
            valid = false;
        } else {
            setConfirmError('');
        }

        if (valid)
            if(!isUserExist(userName))
             {
            const userData = {
                userName,
                teamName,
                password:userPassword,
                players:[]
            };
            saveUser(userData)
            nav("/")
        }else{
            alert("user exist")
        }
    }



    
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={onRegisterSubmit} className='flex flex-col max-w-[500px] p-10 space-y-6'>
                    <div className='flex flex-row gap-4'>
                        <div className='flex flex-col justify-end w-1/2'>
                            <input className='p-2 border-[1px] border-[black]' required onChange={(e) => { setUserName(e.target.value) }} name='userName' type="text" placeholder='user name' />
                        </div>
                        <div className='flex flex-col justify-end  w-1/2'>
                            <label className='text-red-600 h-[50px]'>{teamError}</label>
                            <input className='p-2 border-[1px] border-[black]'  required onChange={(e) => { setTeamName(e.target.value), setTeamError("") }} name='teamName' type="text" placeholder='team name' />
                        </div>
                    </div>
    
                    <div className='flex flex-row gap-4'>
                        <div className='flex flex-col justify-end  w-1/2'>
                            <label className='text-red-600 mb-2 h-[150px]'>{passwordError}</label>
                            <input className='p-2 border-[1px] border-[black]'  required onChange={(e) => { setPassword(e.target.value), setPasswordError("") }} name='password' type="password" placeholder='password' />
                        </div>
    
                        <div className='flex flex-col justify-end  w-1/2'>
                            <label className='text-red-600 mb-2 h-[50px]'>{confirmError}</label>
                            <input className='p-2 border-[1px] border-[black]'  required onChange={(e) => { setUserPasswordConfirm(e.target.value), setConfirmError("") }} name='confirmPassword' type="password" placeholder='confirm password' />
                        </div>
                    </div>
                    <button type='submit' className='bg-blue-600 mx-auto min-w-[100px] p-2 text-white'>Register</button>
                    <label className='text-red-600 mb-2 h-[50px] text-center'>{extraError}</label>
                </form>
            </div>
        );
    }
    ;
