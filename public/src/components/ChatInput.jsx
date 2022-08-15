import React, { useState } from 'react'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg
    message += emojiObject.emoji
    setMsg(message)
  }

  const sendChat = (event) => {
    event.preventDefault()
    if (msg.length > 0) {
      handleSendMsg(msg)
      setMsg('')
    }
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          {/* //react icon */}
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
display: grid;
align-items: center;
border-radius: 6rem;
grid-template-columns: 5% 90%;
background-color: #f5f5f5;
width: 85%;
padding: 0 1rem;
margin-left: 2rem;
.button-container {
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #20272e;
      cursor: pointer;
    }
    .emoji-picker-react {
      // position: absolute;
      // top: -350px;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9a86f3;
        }
      }
      .emoji-categories {
        button {
          filter: contrast(0);
        }
      }
      .emoji-search {
        background-color: transparent;
        border-color: #9a86f3;
      }
      .emoji-group:before {
        background-color: #29abff;
      }
    }
  }
}
.input-container {
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-contents: space-between;
  background-color: #fff;

  input {
    width: 95%;
    height: 60%;
    background-color: transparent;
    color: #20272e;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    @media screen and (max-width: 959px) {
      &::placeholder{
        font-size:12px;
      }
    }
    &::selection {
      background-color: #20272e;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0.3rem 1.3rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #20272e;
    border: none;
    svg {
      font-size: 2rem;
      color: #fff;
    }
  }
}
`
