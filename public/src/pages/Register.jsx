import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../assets/bahaa_logo.svg'
import { FcGoogle } from 'react-icons/fc'
import bg from '../assets/bg.jpg'
import introGif from '../assets/introGif.gif'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { registerRoute, loginWithGoogle } from '../utils/APIRoutes'

const Register = () => {
  const navigate = useNavigate()
  // style object for the error message
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  }
  // state that hold the form inputs
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/setAvatar')
    }
  }, [])

  // whenever the user change the form inputs , the values state get updated
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  // checks that the form inputs are acceptable , otherwise throws an error
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values
    if (password !== confirmPassword) {
      toast.error('Password and confirm password should be same.', toastOptions)
      return false
    } else if (username.length < 3) {
      toast.error('Username should be longer than 3 characters.', toastOptions)
      return false
    } else if (password.length < 8) {
      toast.error(
        'Password should be equal or greater than 8 characters.',
        toastOptions,
      )
      return false
    } else if (email === '') {
      toast.error('Email is required.', toastOptions)
      return false
    }

    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // if the handle validation returned true .. send the user data to the backend to record a new user
    if (handleValidation()) {
      const { email, username, password } = values
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      })

      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      // if the data posted correctly , record the user in the browser local storage
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user),
        )
        navigate('/setavatar')
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
          <div className="brand">
            <h1>
              <span>Tele-</span>Chat !
            </h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
          <h2>
            <span>or</span>
          </h2>
          <button className="google" onClick={handleGoogle}>
            <span className="icon">
              <FcGoogle />
            </span>
            <span className="text">Sign Up With Google</span>
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
  .brand {
    display: flex;
    align-items: center;
    gap: 0rem;
    justify-content: center;
    margin-bottom: 10px;
    span{
      color : #20272e;
      font-family: "Pacifico", cursive;
      text-transform: none;
      font-weight:normal;
    }
    h1 {
      color: #29abff;
      font-family: "Pacifico", cursive;
      letter-spacing: 0.15rem;
      margin:0;
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
  button {
    background-color:  #20272e;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 7px;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #29abff;
      color : #fff;
    }
  }
  span {
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
  .google{
    border: none;
    transition: background-color .35s ease-in-out,box-shadow .15s ease-in-out;
    padding: 0;
    margin:0;
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
      font-size:18px;
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
  text-transform:none;
 }
`
export default Register
