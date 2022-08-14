import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import bg from '../assets/bg.jpg'
import { FcGoogle } from 'react-icons/fc'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginRoute, loginWithGoogle } from '../utils/APIRoutes'

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
  const handleGoogle = async (e) => {
    e.preventDefault()
    const { googleData } = await axios.get(loginWithGoogle)
    console.log(googleData)
    if (googleData.status === true) {
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(googleData.user),
      )

      navigate('/chat')
    }
  }
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <h1>
            <span>Tele-</span>Chat !
          </h1>
          <span className="greeting">
            Great To See <span>You!</span>
          </span>

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
          <button className="log" type="submit">
            Log In
          </button>

          <span className="register">
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
          <h2>
            <span>or</span>
          </h2>
          <button className="google" onClick={handleGoogle}>
            <span className="icon">
              <FcGoogle />
            </span>
            <span className="text">Log In With Google</span>
          </button>
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
  // background-image: url("${bg}");
  // background-size: 3500px;
  align-items: center;
  background-color: #eee;
  h1 {
    color: #29abff;
    text-align:center;
    font-family: 'Pacifico', cursive;
    margin:0px;
    font-weight:bold;
    letter-spacing: 0.15rem;
    
    span{
      color:#20272e ;
      font-weight:normal;
      
    }
  }
  .greeting{
    padding-bottom: 20px;
    font-family: 'Pacifico', cursive;    
    color:#29abff;
    font-wight:300;
    font-size:24px;
    text-transform:none;
    text-align:center;
    
    span{
      color : #20272e;
      font-family: "Pacifico", cursive;
    }

  }
  .brand {
    display: flex;
    align-items: center;
    gap: 0rem;
    justify-content: center;
    span{
      color : #20272e;
      font-family: "Pacifico", cursive;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 2rem 4rem;

    box-shadow: 7px 7px 19px -5px #29abff;
  }
  input {
    padding-top:1.5rem;
    border-right: none;
    border-top: none;
    border-left: none;
    border-bottom: 1px solid #ced4da;
    color: #20272e;
    background-color:#fff;
     padding-left:10px;
    border-radius:7px;
    padding-bottom:10px;
    padding-top:15px;
    font-size: 1.2rem;
    transition: border-color .20s ease-in-out,box-shadow .15s ease-in-out;
    &:focus {
      border:0;
      border: 0.1rem solid #29abff;
      outline: none;
      box-shadow: 0px 0px 6px -2px #29abff;
    }
    ::selection{
      background-color:#20272e;
      color:#fff;
    }
    input:-webkit-autofill {
      border: 3px solid blue;
      color:#fff;
    }
    input:autofill {
      border: 3px solid blue;
      color:#fff;
    } 
    
  }
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
     transition: background-color 600000s 0s, color 600000s 0s;
    color:#fff;
  }
  
  input:last-of-type{
    margin-bottom:1rem;
    padding-top: 10px;
  }
  .log {
    background-color: #20272e;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;
    border-radius:7px;
    transition: background-color .35s ease-in-out,box-shadow .15s ease-in-out;
    text-transform: uppercase;
    &:hover {
      background-color: #29abff;
      color:#fff;
    }
  }
  .google{
    border: none;
    transition: background-color .35s ease-in-out,box-shadow .15s ease-in-out;
    padding: 0;
    font-weight: bold;
    font-size: 1rem;
    color: #fff;
    background-color: #29abff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    cursor: pointer;
    border-radius:7px;
    .icon{
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      border-radius:7px;
      padding: 10px;
      background-color: #fff;
      margin:2px;
      svg{
      font-size: 20px;
      color:#fff;
      padding-left:7px;
      padding-right:7px;
      }
    }
    .text{
      -webkit-flex: 12;
      -ms-flex: 12;
      -webkit-flex: 12;
      -ms-flex: 12;
      flex: 12;
      padding: 10px;
      line-height: 26px;
      color: #fff;
      font-size:20px;
    }
    
  }
  .google:hover{
    background-color: #20272e;
      color:#fff;
    .icon{
      background-color: #fff;
      
      svg{
        color:#fff;
        
      }
    }
  }
  h2 {
    width: 100%; 
    text-align: center; 
    border-bottom: 1px solid #ced4da; 
    line-height: 0.1em;
    margin: 10px 0 20px; 
 } 
 
 h2 span { 
  font-size: 1.3rem;
  background: #fff;
  font-family: 'Fira Sans', sans-serif;
  letter-spacing: 0.1rem;
  padding: 0 10px;
 }
  .register {
    margin-top:10px;
    
    color: #20272e;
    text-transform: uppercase;
    a {
      color: #20272e;
      text-decoration: none;
      font-weight: bold;
    }
    a:hover{
      color:#29abff;
    }
  }
  
`
