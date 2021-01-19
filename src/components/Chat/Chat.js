import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../mainContext'
import io from 'socket.io-client'

let socket

const Chat = () => {
    const { name, room } = useContext(MainContext)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const history = useHistory()
    const ENDPOINT = 'http://localhost:5000'
    socket = io(ENDPOINT, { transports: ['websocket', 'polling'] })

    //Useeffect to redirect to login if user does no exist
    useEffect(() => { if (!name) history.push('/') }, [])

    useEffect(() => {
        console.log("not working");
        console.log(room, name);
        socket.on("message", msg => {
            setMessages([...messages, msg])
            console.log("okay bri");
        })

        socket.on("notification", notif => {
            console.log("Hey man");
            console.log(notif);
            setMessages([...messages, notif])
        })
    }, [])

    const handleSendMessage = () => {
        // console.log(messages, message);
        socket.emit('sendMessage', message, () => setMessage(''))
    }

    return (
        <div>
            <div>
                {messages.map((msg, i) =>
                    (<p key={i}>{msg} by {name}</p>)
                )}
            </div>
            <input type="text" placeholder='Enter Message' value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

export default Chat
