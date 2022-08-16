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
        <button className="send"type="submit">
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
margin-bottom: 0.6rem;
grid-template-columns: 5% 95%;
background-color: #f5f5f5;
width: 85%;
padding: 0 1rem;
@media screen and (min-width: 481px) and (max-width: 768px) {
      padding: 0rem 0.3rem ;
      grid-template-columns: 5% 93%;
    }
@media screen and (min-width: 769px) and (max-width: 1023px) {
      padding: 0rem 0.3rem ;
      grid-template-columns: 5% 92%;
  }
@media screen and  (max-width: 480px) and  (min-width: 320px) {
    margin-left:1.5rem;
    padding: 0rem 0.4rem ;
    width:81%;
}
@media screen and  (max-width: 319px)  {
      width:67% ;
      margin-left:1.5rem;
    }
margin-left: 2rem;
.button-container {
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  .emoji {
      position: relative;
      /* .skin-tones-list{
        padding: 0;
        margin: 0;
        list-style-type: none;
        position: absolute;
        top: 61px;
        right: 40px;
      } */
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
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
          /* position: absolute;
          z-index: 999;
          width: 99%;
          right: 0;
          top: 0px;
          background-color: #20272e;
          height: 13%; */
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          /* background-color: transparent;
          border-color: #9a86f3;
          width: calc(100% - 30px);
          margin-left: 15px;
          top: 47px;
          position: absolute;
          outline: none;
          box-shadow: none;
          padding: 10px;
          box-sizing: border-box;
          border: 1px solid #efefef;
          border-radius: 3px;
          transition: border 0.1s; */
        }
        .emoji-group:before {
          background-color: #080420;
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
  justify-content: space-between;
  background-color: #fff;
  input {
    width: 95%;
    height: 60%;
    background-color: transparent;
    color: #20272e;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    @media screen and (max-width: 769px) {
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
  .send {
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #20272e;
    border: none;
    padding: 0.2rem 2rem;
    @media screen and (min-width: 1023px) and (max-width: 1200px) {
      padding: 0.2rem 2rem ;
      }
    @media screen and (min-width: 769px) and (max-width: 1023px) {
      padding: 0rem 2rem ;
    }
    @media screen and (min-width: 481px) and (max-width: 768px) {
      padding: 0rem 2rem ;
    }
    @media screen and  (max-width: 319px)  {
      padding:0.2rem 1rem;
    }
    svg {
      font-size: 2.5rem;
      color: #fff;
      @media screen and (min-width: 1024px) and (max-width: 1200px) {
        font-size:1.8rem ;
      }
      @media screen and  (max-width: 480px) and (min-width: 320px) {
        font-size:1.5rem ;
      }
      @media screen and  (max-width: 319px)  {
        font-size:1.3rem ;
      }
  }
  }}
`