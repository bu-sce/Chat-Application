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
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
export default function Chat() {
  const navigate = useNavigate()
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentUser, setCurrentUser] = useState(undefined)
  const [toggle, setToggle] = useState(true)
  var f 
  
  function getWindowDimensions() {
    const { innerWidth: width} = window;
    return {
      width
    };
  }
  
  var u =()=>{
    f=getWindowDimensions().width
    if(f<769){
      return true
    }else{
      return false
    }
  }
  const [res,setRes]=useState(u)
  
  window.addEventListener('resize', function(){
    f =getWindowDimensions()
    if(f.width<769 ){
      setRes(true)
    }else{
      setRes(false)
    }
  });
  
  const handleToggle=()=>{
    setToggle(true)
  }
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
    setToggle(false)
  }
  return (
    <>
      <Container>
        <div
          className="container"
        >
          {res === false ?(
           <>
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer  currentChat={currentChat} socket={socket}  />
            )}</>
          ):(
            <>
              {toggle === true ? (
                   <Contacts contacts={contacts} changeChat={handleChatChange}  />
              ):(
                <>
                <button className='button' onClick={handleToggle}><MdOutlineKeyboardBackspace /></button>
                <ChatContainer  currentChat={currentChat} socket={socket}  />
                </>
              )}
            </>
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
  grid-template-columns: 30% 70% ;
  border-radius: 2rem;
  .button{
    position:absolute; 
    display:none;
    @media screen and  (max-width: 319px)  {
      left:-12px ;
      top:43px
    }
    @media screen and  (max-width: 480px) and (min-width: 320px) {
      left:0 ;
    }
  }
  @media screen and (max-width: 769px) {
      grid-template-columns: 100% 0% !important;
      .button{
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        svg {
          font-size: 2rem;
          color: #20272e;
          @media screen and (min-width: 481px) and (max-width: 768px) {
            font-size:4rem ;
          }
          @media screen and  (max-width: 480px) and (min-width: 320px) {
            font-size:3.1rem ;
          }
        } 
      } 
  }
}

`
