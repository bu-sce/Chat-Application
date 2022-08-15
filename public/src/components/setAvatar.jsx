import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Buffer } from 'buffer'
import loader from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { setAvatarRoute } from '../utils/APIRoutes'
export default function SetAvatar() {
  const api = `https://api.multiavatar.com`
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

  useEffect(() => {
    const s = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        navigate('/login')
    }
    s()
  }, [])

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions)
    } else {
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
        navigate('/chat')
      } else {
        toast.error('Error setting avatar. Please try again.', toastOptions)
      }
    }
  }

  useEffect(() => {
    const c = async () => {
      const data = []
      for (let i = 0; i < 6; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`,
        )
        const buffer = new Buffer(image.data)
        data.push(buffer.toString('base64'))
      }
      setAvatars(data)
      setIsLoading(false)
    }
    c()
  }, [])

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              )
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: #20272e;
      font-family: 'Pacifico', cursive;
      // text-shadow: 1px 1px #29abff;
      letter-spacing: 0.5rem;
    }
  }
  .avatars {
    display: flex;
    gap: 1.5rem;
    // box-shadow: 0px 0px 18px 5px #20272e;
    height: 20%;
    padding: auto;
    align-items: center;
    border-radius: 7px;
    padding: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    // transition: 0.5s ease-in-out;
    background-color: #fff;
    // overflow: hidden;
    border-radius: 5rem;
    .avatar {
      cursor: pointer;
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.6s ease-out-in;
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 50%;
      img {
        height: 6rem;
        transition: 0.6s ease-out-in;
      }
      img:hover {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
        transition: 0.6s ease-out-in;
      }
    }
    .selected {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: 0px 0px 18px 8px #29abff;
      margin: 2rem;
      transition: 0.6s ease-out-in;
    }
  }

  .submit-btn {
    background-color: #20272e;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 7px;
    font-size: 1.1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #29abff;
      color: #fff;
    }
  }
`
