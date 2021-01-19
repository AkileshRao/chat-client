import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../mainContext'
import io from 'socket.io-client'

let socket

const Login = () => {
    const history = useHistory()
    const { name, room, setName, setRoom } = useContext(MainContext)
    const ENDPOINT = 'http://localhost:5000'
    socket = io(ENDPOINT, { transports: ['websocket', 'polling'] })

    //Useffect to avoid user from loggin out
    useEffect(() => { if (name) { history.push('/chat') } }, [])

    const handleClick = () => {
        setName(name); setRoom(room);
        socket.emit("login", { name, room }, (error) => {
            if (error) {
                console.log(error);
            } else {
                history.push('/chat')
            }
        })
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
