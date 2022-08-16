import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import bg from '../assets/bg.jpg'
import { useNavigate} from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {forgetPasswordRoute} from '../utils/APIRoutes'
import { loginRoute, loginWithGoogle } from '../utils/APIRoutes'

  

export default function SetEmail() {
  
const toastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
}
const toastOption = {
  position: 'bottom-right',
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
}
const navigate=useNavigate()
var Email
const handleEmail=(e)=>{
  Email=e.target.value
}
const handleBack=async(e)=>{
  e.preventDefault();
  let serverData
      if (Email) {
         serverData = await axios.post(forgetPasswordRoute, {
          email:Email
        });
        
      }
      if (serverData.data.status === false) {
        toast.error(serverData.data.msg, toastOptions);
      }
      if (serverData.data.status === true) {
        
        toast.success(serverData.data.msg, toastOption);
        const myTimeout = setTimeout(nav, 3000);
        function nav(){
          navigate('/')
        }
      }
    };
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={handleBack}>
          <h1>
            <span>Tele-</span>Chat !
          </h1>

          <input
            type="email"
            placeholder="email"
            name="email"
           onChange={handleEmail}
          />
          <button  className="log" type="submit">
            Send
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
  align-items: center;
  background-color: #eee;
  h1 {
    color: #29abff;
    text-align: center;
    font-family: 'Pacifico', cursive;
    margin: 0px;
    font-weight: bold;
    letter-spacing: 0.15rem;
    span {
      color: #20272e;
      font-weight: normal;
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
    padding-top: 1.5rem;
    border-right: none;
    border-top: none;
    border-left: none;
    border-bottom: 1px solid #ced4da;
    color: #20272e;
    background-color: #fff;
    padding-left: 10px;
    border-radius: 7px;
    padding-bottom: 10px;
    padding-top: 15px;
    font-size: 1.2rem;
    transition: border-color 0.2s ease-in-out, box-shadow 0.15s ease-in-out;
    &:focus {
      border: 0;
      border: 0.1rem solid #29abff;
      outline: none;
      box-shadow: 0px 0px 6px -2px #29abff;
    }
    ::selection {
      background-color: #20272e;
      color: #fff;
    }
    input:-webkit-autofill {
      border: 3px solid blue;
      color: #fff;
    }
    input:autofill {
      border: 3px solid blue;
      color: #fff;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
    color: #fff;
  }

  input:last-of-type {
    margin-bottom: 1rem;
    padding-top: 10px;
  }
  .log {
    background-color: #20272e;
    color: white;
    padding-left: 10px;
    border-radius: 7px;
    padding-bottom: 13px;
    padding-top: 13px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    font-size: 20px;
    border-radius: 7px;
    transition: background-color 0.35s ease-in-out, box-shadow 0.15s ease-in-out;
    text-transform: capitalize;
    &:hover {
      background-color: #29abff;
      color: #fff;
    }
  }
`
