import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Buffer } from 'buffer'
import eif from '../assets/EIF.png'
import gdz from '../assets/GDZ.png'
import nff from '../assets/NFF.png'
import rag from '../assets/RAG.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { setAvatarRoute } from '../utils/APIRoutes'
export default function SetAvatar() {
  const navigate = useNavigate()
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions)
    } else {
      //id,isAvatarImageSet,avatarImage
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
      )

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      })

      if (data.isSet) {
        user.isAvatarImageSet = true
        user.avatarImage = data.image
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user),
        )
        navigate('/')
      } else {
        toast.error('Error setting avatar. Please try again.', toastOptions)
      }
    }
  }

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an Avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          <div
            className={`avatar ${selectedAvatar === 'eif' ? 'selected' : ''}`}
          >
            <img
              src={eif}
              alt="avatar"
              onClick={() => setSelectedAvatar('eif')}
            />
          </div>
          {/* //'rag' || 'nff' || 'eif' || 'gdz' */}
          <div
            className={`avatar ${selectedAvatar === 'gdz' ? 'selected' : ''}`}
          >
            <img
              src={gdz}
              alt="avatar"
              onClick={() => setSelectedAvatar('gdz')}
            />
          </div>
          <div
            className={`avatar ${selectedAvatar === 'nff' ? 'selected' : ''}`}
          >
            <img
              src={nff}
              alt="avatar"
              onClick={() => setSelectedAvatar('nff')}
            />
          </div>
          <div
            className={`avatar ${selectedAvatar === 'rag' ? 'selected' : ''}`}
          >
            <img
              src={rag}
              alt="avatar"
              onClick={() => setSelectedAvatar('rag')}
            />
          </div>
        </div>
        <button onClick={setProfilePicture} className="submit-btn">
          Set as Profile Picture
        </button>
        <ToastContainer />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      cursor: pointer;
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
      img:hover {
        border: 0.4rem solid #4e0eff;
        border-radius: 5rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
      border-radius: 5rem;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`