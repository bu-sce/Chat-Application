<<<<<<< HEAD
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import styled from 'styled-components'
import { allUsersRoute, host } from '../utils/APIRoutes'
import ChatContainer from '../components/ChatContainer'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
=======
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contact from "../components/Contacts"
import Welcome from "../components/Welcome";
>>>>>>> ca4ea018ced3ad464a15faf3b0d04bb20cae3cb2

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
<<<<<<< HEAD
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
=======
    if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } };n();
  }, [currentUser]);
  useEffect(() => {
    const p = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }};p();
  }, [currentUser]);
>>>>>>> ca4ea018ced3ad464a15faf3b0d04bb20cae3cb2
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  return (
    <>
      <Container>
        <div className="container">
<<<<<<< HEAD
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
=======
        <Contact contacts={contacts} changeChat={handleChatChange}></Contact>
        {currentChat === undefined ? (
>>>>>>> ca4ea018ced3ad464a15faf3b0d04bb20cae3cb2
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
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`
