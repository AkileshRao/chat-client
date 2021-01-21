import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../mainContext'
import { SocketContext } from '../../socketContext'
import { Box, Flex, Heading, IconButton, Input, Text } from "@chakra-ui/react"
import { FiLogOut } from 'react-icons/fi'
import { BiMessageDetail } from 'react-icons/bi'

const Chat = () => {
    const { name, room, setName, setRoom } = useContext(MainContext)
    const socket = useContext(SocketContext)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const history = useHistory()

    //Checks to see if there's a user present
    useEffect(() => { if (!name) history.push('/') }, [])

    useEffect(() => {
        socket.on("notification", notif => {
            console.log(notif);
        })

        socket.on("message", msg => {
            setMessages(messages => [...messages, msg]);
        })

        socket.on("users", users => {
            console.log(users);
        })
    }, [])


    const handleSendMessage = () => {
        socket.emit('sendMessage', message, () => setMessage(''))
    }

    const logout = () => {
        setName(''); setRoom('');
        history.push('/')
    }

    return (
        <Flex className='room' flexDirection='column' width={{ base: "80%", md: '575px' }}>
            <Heading as='h1' bg='white' p='1rem'>
                <Flex alignItems='center' justifyContent='space-between'>
                    {room}
                    <IconButton icon={<FiLogOut />} onClick={logout} colorScheme='red' />
                </Flex>
            </Heading>
            <Flex className='messages' minHeight='400px' bg='#EAEAEA' justifyContent='center' alignItems='center'>
                {messages.length > 0 ?
                    messages.map((msg, i) =>
                        (<p key={i}>{msg.text} by {msg.user}</p>)
                    )
                    :
                    <Flex alignItems='center' bg='#EAEAEA' opacity='.2'>
                        <BiMessageDetail fontSize='3rem' />
                        <Text ml='2' fontSize='4xl' fontWeight='500'>No messages</Text>
                    </Flex>
                }

            </Flex>
            <div>
                <input type="text" placeholder='Enter Message' value={message} onChange={e => setMessage(e.target.value)} />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </Flex>
    )
}

export default Chat
