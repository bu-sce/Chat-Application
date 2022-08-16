import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { sendMessageRoute, recieveMessageRoute } from '../utils/APIRoutes'
import Logout from './Logout'
export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([])
  const scrollRef = useRef()
  const [arrivalMessage, setArrivalMessage] = useState(null)

  useEffect(() => {
    const s = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
      )
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      })
      setMessages(response.data)
    }
    s()
  }, [currentChat])

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
        )._id
      }
    }
    getCurrentChat()
  }, [currentChat])

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
    )
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: data._id,
      msg,
    })
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    })

    const msgs = [...messages]
    msgs.push({ fromSelf: true, message: msg })
    setMessages(msgs)
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg })
      })
    }
  }, [])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? 'sended' : 'recieved'
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}
const Container = styled.div`
display: grid;
grid-template-rows: 11% 79% 10%;
gap: 0.1rem;
overflow: hidden;
border-radius: 5rem;
@media screen and (max-width: 959px) {
  border-radius:0;
}
.chat-header {
  justify-item: center;
  display: flex;
  width: auto;
  height: 5%;
  margin: auto;
  box-shadow: 2px 2px 2px 0px #20272e;
  justify-content: center;
  align-items: center;
  padding: 1.9rem;
  gap: 5rem;
  border-radius: 5rem;
  background-color: white;
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      padding-top: 10px;
      img {
        height: 2.5rem;
      }
    }
    .username {
      h3 {
        color: #29abff;
        font-family: 'Pacifico', cursive;
        font-size: 25px;
        text-transform: capitalize;
      }
    }
  }
}

.chat-messages {
  padding: 0.8rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    border-radius: 2rem;

    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 0 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #fff;
    }
  }
  .sended {
    justify-content: flex-end;
    padding: 0;
    .content {
      background-color: #20272e;
      border-radius: 50px;
      border-bottom-right-radius: 50px 0px;
      border-bottom-left-radius: 50px;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #29abff;
      color: #fff;
      border-radius: 50px;
      border-bottom-left-radius: 50px 0px;
      border-bottom-right-radius: 50px;
    }
  }
}
`
