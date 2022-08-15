import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import styled from 'styled-components'
import { allUsersRoute, host } from '../utils/APIRoutes'
import ChatContainer from '../components/ChatContainer'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import bg from '../assets/bg.jpg'
export default function Chat() {
  const navigate = useNavigate()
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    const a = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate('/login')
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
          ),
        )
      }
    }
    a()
  }, [])
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit('add-user', currentUser._id)
    }
  }, [currentUser])
  useEffect(() => {
    const n = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        } else {
          navigate('/setAvatar')
        }
      }
    }
    n()
  }, [currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  return (
    <>
      <Container>
        <div
          className="container"
          // ${currentChat === undefined ? '' : 'chat'}`}
        >
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  box-shadow: 2px 2px 2px 1px #20272e;
  background-color: white;
  background-image: url("${bg}");
  .container {
    border-radius: 5rem;
    height: 90vh;
    width: 90vw;
    background-color: #00000076;
    box-shadow: 2px 2px 2px 1px #20272e;
    display: grid;
    grid-template-columns: 30% 70%;
  }
  .chat {
    background-color: #f5ffffaf;
  }
`
