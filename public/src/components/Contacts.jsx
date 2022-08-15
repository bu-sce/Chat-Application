import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TbCameraPlus } from 'react-icons/tb'
import Logout from './Logout'

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)
  const navigate = useNavigate()
  useEffect(() => {
    const c = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
      )
      setCurrentUserName(data.username)
      setCurrentUserImage(data.avatarImage)
    }
    c()
  }, [])
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }
  function handleChangeAvatar() {
    navigate('/setavatar')
  }

  return (
    <>
      <Container>
        <div className="brand">
          <h3>
            <span>Tele-</span>Chat !
          </h3>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? 'selected' : ''
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            )
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
            <div class="dropup-content">
              <button onClick={handleChangeAvatar}>
                <TbCameraPlus />
              </button>
              <Logout />
            </div>
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>
    </>
  )
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
box-shadow: 2px 2px 2px 1px #20272e;
border-radius: 2rem;
overflow: hidden;
background-color: #f5f5f5;
.brand {
  background-color: white;
  margin-bottom: 0px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  h3 {
    color: #29abff;
    font-family: 'Pacifico', cursive;
    font-size: 25px;
  }
}
span {
  color: #20272e;
}
.contacts {
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  &::-webkit-scrollbar {
    width: 0.4rem;
    &-thumb {
      background-color: #29abff;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .contact {
    background-color: #f5f5f5;
    min-height: 3.4rem;
    cursor: pointer;
    width: 90%;
    border-radius: 1rem;
    padding-top: 0.4rem;
    padding-left: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .avatar {
      img {
        height: 2.8rem;
      }
    }
    .username {
      h3 {
        color: #20272e;
        text-transform: capitalize;
      }
    }
    &:hover {
      background-color: white;
    }
  }
  .selected {
    background-color: #29abff;
    .username {
      h3 {
        color: #fff;
        text-transform: capitalize;
      }
    }
    &:hover {
      background-color: #fff;
      .username {
        h3 {
          color: #29abff;
        }
      }
    }
  }
}
.current-user {
  background-color: #20272e;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  .avatar {
    position: relative;
    padding-top: 10px;
    img {
      height: 4rem;
      max-inline-size: 100%;
      display: block;
    }
    button {
      padding: 0;
      border: 0;
    }
    svg {
      position: absolute;
      left: 0;
      top: 10px;
      background-color: transparent;
      color: #fff;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
  .username {
    h2 {
      color: white;
      text-transform: capitalize;
    }
  }
}
`
