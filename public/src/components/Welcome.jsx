import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'
export default function Welcome() {
  const [userName, setUserName] = useState('')
  useEffect(() => {
    const g = async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
        ).username,
      )
    }
    g()
  }, [])
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    font-size: 45px;
    color: #29abff;
  }
`
