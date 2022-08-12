import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../assets/bahaa_logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginRoute } from '../utils/APIRoutes'

export default function Login() {
  const navigate = useNavigate()
  // in login we only need the username and password
  const [values, setValues] = useState({ username: '', password: '' })
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  }
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      // navigate("/");
    }
  }, [])

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const validateForm = () => {
    const { username, password } = values
    if (username === '') {
      toast.error('Email and Password is required.', toastOptions)
      return false
    } else if (password === '') {
      toast.error('Email and Password is required.', toastOptions)
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateForm()) {
      const { username, password } = values
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      })
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user),
        )

        navigate('/chat')
      }
    }
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            
            <h1><span>Tele-</span>Chat !</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f5f5f5;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      font-family: 'Pacifico', cursive;
    }
    span{
      color : #20272e;
      font-family: "Pacifico", cursive;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #0458f3;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: #f5f5f5;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: #20272e;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #20272e;
    color: #f5f5f5;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #f5f5f5;
      color:#20272e;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #20272e;
      text-decoration: none;
      font-weight: bold;
    }
  }
`
