import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/bahaa_logo.svg";
import background from "../assets/background.png";
import introGif from "../assets/introGif.gif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  // style object for the error message
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  // state that hold the form inputs
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // whenever the user change the form inputs , the values state get updated
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // checks that the form inputs are acceptable , otherwise throws an error
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be longer than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/chat");
      }
    }
  };

  return (
    <HomeContainer>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Tele-Chat !</h1>
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
        </form>
      </FormContainer>

      <IntroGifContainer>
        <div>
          <h1 className="introHeader">Join Now !</h1>
        </div>
        <div>
          <img src={introGif} alt="Intro gif" />
        </div>
      </IntroGifContainer>
      <ToastContainer />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-image: url(${background});
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroGifContainer = styled.div`
  height: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;

  .introHeader {
    color: #db3c21;
    font-size: 7rem;

    font-family: "Pacifico", cursive;
  }
`;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    img {
      height: 12rem;
    }
    h1 {
      color: white;
      font-size: 3rem;

      font-family: "Pacifico", cursive;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #db3c21;
    border-radius: 2rem;
    padding: 8rem 10rem;
  }

  input {
    /*background-color: transparent;*/
    padding: 1rem;
    border: 0.2rem solid #db3c21;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 2rem;
    &:focus {
      border: 0.2rem solid #034f8c;
      outline: none;
    }
  }

  button {
    background-color: #314a5e;
    color: white;
    padding: 2rem 3rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.6rem;
    font-size: 1.5rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #034f8c;
    }
  }

  span {
    font-size: 1.5rem;
    color: white;
    text-transform: uppercase;
    a {
      color: #314a5e;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: #034f8c;
      }
    }
  }
`;

export default Register;
