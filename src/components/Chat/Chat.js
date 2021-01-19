import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../mainContext'
import io from 'socket.io-client'

let socket;
const ENDPOINT = 'http://localhost:5000';

const Chat = () => {
    const { name, room } = useContext(MainContext)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const history = useHistory()

    useEffect(() => {
        if (!name) {
            return history.push('/')
        }
        socket = io(ENDPOINT, { transports: ['websocket', 'polling'] })

        socket.emit('login', { name, room }, error => {
            if (error) console.log(error);
        })

        socket.on("notification", notif => {
            console.log(notif);
        })

        socket.on("message", msg => {
            console.log(msg);
            setMessages([...messages, msg])
        })

    }, [])

    const handleSendMessage = () => {
        socket.emit('sendMessage', message, () => setMessage(''))
    }

    return (
        <div>
            <div>
                {messages.map((msg, i) =>
                    (<p key={i}>{msg.text} by {msg.user}</p>)
                )}
            </div>
            <input type="text" placeholder='Enter Message' value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

export default Chat
