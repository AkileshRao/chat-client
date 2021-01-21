import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../mainContext'
import { SocketContext } from '../../socketContext'
import { Box, Flex, Heading, IconButton, Input, Text } from "@chakra-ui/react"
import { FiLogOut } from 'react-icons/fi'
import { BiMessageDetail } from 'react-icons/bi'
import { RiSendPlaneFill } from 'react-icons/ri'
import ScrollToBottom from 'react-scroll-to-bottom';

import './Chat.scss'



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
            <Heading className='heading' as='h1' bg='white' p='1rem' borderRadius='10px 10px 0 0'>
                <Flex alignItems='center' justifyContent='space-between'>
                    {room}
                    <Box w={5} h={5} onClick={logout} bg='tomato' borderRadius='100px' cursor='pointer' />
                </Flex>
            </Heading>


            <ScrollToBottom className='messages' >
                {messages.length > 0 ?
                    messages.map((msg, i) =>
                    (<Box key={i} className={`message ${msg.user === name ? "my-message" : ""}`} m=".2rem 0">
                        <Text fontSize='xs' opacity='.7' ml='5px' className='user'>{msg.user}</Text>
                        <Text className='msg' p=".4rem .8rem" bg='white' borderRadius='15px' letterSpacing='-1px' color='white'>{msg.text}</Text>
                    </Box>)
                    )
                    :
                    <Flex alignItems='center' justifyContent='center' bg='#EAEAEA' opacity='.2'>
                        <Box mr='2'>-----</Box>
                        <BiMessageDetail fontSize='1rem' />
                        <Text ml='1' fontWeight='400'>No messages</Text>
                        <Box ml='2'>-----</Box>
                    </Flex>
                }
            </ScrollToBottom>
            <div className='form'>
                <input type="text" placeholder='Enter Message' value={message} onChange={e => setMessage(e.target.value)} />
                <IconButton colorScheme='green' isRound='true' icon={<RiSendPlaneFill />} onClick={handleSendMessage}>Send</IconButton>
            </div>
        </Flex>
    )
}

export default Chat
