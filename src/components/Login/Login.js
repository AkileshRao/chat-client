import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../mainContext'


const Login = () => {
    const history = useHistory()
    const { name, room, setName, setRoom } = useContext(MainContext)

    const handleClick = () => {
        setName(name); setRoom(room);
        history.push('/chat')
    }

    return (
        <div>
            <h1>Chattr</h1>
            <input type="text" placeholder='User Name' value={name} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder='Room Name' value={room} onChange={e => setRoom(e.target.value)} />
            <button onClick={handleClick}>Let's go</button>
        </div>
    )
}

export default Login
