import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate} from 'react-router-dom'
import {resetPasswordRoute} from '../utils/APIRoutes'
import 'react-toastify/dist/ReactToastify.css'



export default function ResetPass() {
  const navigate = useNavigate();
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
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.resetToken)){}
  }, []);
var pass
const handlePass=(e)=>{
  setValues({ ...values, [e.target.name]: e.target.value });
  pass=e.target.value

}


  // checks that the form inputs are acceptable , otherwise throws an error
  const handleValidation = () => {

    const { password, confirmPassword } = values;

     if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    
    let serverDataPut 
    

      event.preventDefault();
      // if the handle validation returned true .. send the user data to the backend to record a new user
const token  = localStorage.getItem('resetToken')

      

      if (handleValidation()) {
        const { password } = values;

        serverDataPut = await axios.put(`${resetPasswordRoute}/${token}`, {//
          password
        });
        console.log(`serverDataPut ${serverDataPut.data}`)
      
    }
      if (serverDataPut.data.status === false) {
        toast.error(serverDataPut.data.msg, toastOptions);
      }
      if (serverDataPut.data.status === true) {
        localStorage.clear()
        toast.success(serverDataPut.data.msg, toastOption);
        const myTimeout = setTimeout(nav, 3000);
        function nav(){
          navigate('/login')
        }
      }
    }



 
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <h1>
            <span>Tele-</span>Chat !
          </h1>

          <input
            type="password"
            placeholder="Password"
            name="password"
             onChange={(e) => handlePass(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
             onChange={(e) => handlePass(e)}
          />
          <button className="log" type="submit">
            Reset Password
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
