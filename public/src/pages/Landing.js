import './Landing.css'
import { Link } from 'react-router-dom'
import Bahaa from '../assets/bahaa.png'
import Ammar from '../assets/ammar.png'
import Shrouk from '../assets/Shrouk.png'
import Diaa from '../assets/diaa.png'
import { useState } from 'react'

import Karim from '../assets/karim.png'
import Abdo from '../assets/abdo.png'

import close from './Img/x.svg'

//import holdingPhone from "./Img/holding-phone.jpg";
import illustration from './Img/chat.gif'

import menu from './Img/menu.svg'

import video from './Img/video.svg'

function App() {
  const [IsCollapsed, setIsCollapsed] = useState(true)
  const HandleClick = () => {
    setIsCollapsed(!IsCollapsed)
  }

  return (
    <div className="App">
      {/* <!--NAVIGATION BLOG START--> */}
      <div className="nav-bar">
        <div className="container">
          <a className="logo-nav" id="brand-font" href="">
            Tele-<span>Chat</span>
          </a>
          {IsCollapsed && (
            <img
              id="mobile-cta"
              className="mobile-menu"
              src={menu}
              alt="navigation"
              onClick={HandleClick}
            />
          )}
          {!IsCollapsed && (
            <img
              id="close-icon"
              className="mobile-menu"
              src={close}
              alt="navigation"
              onClick={HandleClick}
            />
          )}
          <nav>
            <ul className="primary-nav">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#team-members">Team</a>
              </li>
            </ul>

            <ul className="second-nav">
              <li className="go-premium-cta">
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* <!--NAVIGATION BLOG END--> */}
      {!IsCollapsed && (
        <ul id="ham-menu">
          <li className="ham-item">
            <Link to="/login" className="item-link" onClick={HandleClick}>
              Login
            </Link>
          </li>

          <li className="ham-item">
            <Link to="/register" className="item-link" onClick={HandleClick}>
              Register
            </Link>
          </li>
          <li className="ham-item">
            <a href="#features" className="item-link" onClick={HandleClick}>
              Features
            </a>
          </li>
          <li className="ham-item">
            <a href="#team-members" className="item-link" onClick={HandleClick}>
              Team
            </a>
          </li>
        </ul>
      )}

      {/* <!--SECTION HERO BLOG START--> */}
      <section className="hero">
        <div className="container">
          <div className="left-col">
            <p className="sub-head">it's nitty &amp; gritty</p>
            <h1>a Chat app that doesn't stink</h1>

            <div className="hero-cta">
              <Link to="/register" className="primery-cta">
                Try for free
              </Link>

              <a href="#" className="watch-video-cta">
                <img style={{}} src={video} alt="Video Clip" />
                Watch a video
              </a>
            </div>
          </div>

          <img src={illustration} alt="Illustration" className="hero-img" />
        </div>
      </section>
      {/* <!--SECTION HERO BLOG END--> */}

      {/* <!--SECTION FEATURES BLOG START--> */}
      <section id="features" className="features-section">
        <div className="container">
          <ul>
            <li>Free real-time Messaging </li>
            <li>Unlimited Chats </li>
            <li>Ability to send emojis</li>
            <li>Chat with whomever on the app</li>
            <li>Choose your own avatar</li>
            <li>Reset Your password and avatar</li>
            <li>Delete your account</li>
            <li>Other awesome features</li>
          </ul>
        </div>
        {/*<img src={holdingPhone} alt="phone" />*/}
      </section>
      {/* <!--SECTION FEATURES BLOG END--> */}

      {/* <!--SECTION TEST  BLOG START--> */}
      <center
        id="team-members"
        style={{
          backgroundColor: '#29abff',
          color: '#FFFFFF',
          fontSize: '80px',
          padding: '30px',
          fontWeight: 'bold',
          fontFamily: 'Pacifico',
        }}
      >
        Meet our team!
      </center>
      {
        <div className="main">
          <div className="profile-card">
            <div className="img">
              <img src={Bahaa} alt="logo" />
            </div>
            <div className="caption">
              <h3>Ahmed Bahaa</h3>
              <p>Front-End team</p>
            </div>
          </div>

          <div className="profile-card">
            <div className="img">
              <img src={Ammar} alt="logo" />
            </div>
            <div className="caption">
              <h3>Ammar Adel</h3>
              <p>Front-End team</p>
            </div>
          </div>

          <div className="profile-card">
            <div className="img">
              <img src={Shrouk} alt="logo" />
            </div>
            <div className="caption">
              <h3>Shrouk Abdallah</h3>
              <p>Front-End team</p>
            </div>
          </div>
          <div className="profile-card">
            <div className="img">
              <img src={Diaa} alt="logo" />
            </div>
            <div className="caption">
              <h3>Diaa Hassan</h3>
              <p>Back-End team</p>
            </div>
          </div>
          <div className="profile-card">
            <div className="img">
              <img src={Karim} alt="logo" />
            </div>
            <div className="caption">
              <h3>Karim Mohtah</h3>
              <p>Back-End team</p>
            </div>
          </div>
          <div className="profile-card">
            <div className="img">
              <img src={Abdo} alt="logo" />
            </div>
            <div className="caption">
              <h3>Abdelrahman Sayed</h3>
              <p>Back-End team</p>
            </div>
          </div>
        </div>
      }
      <footer className="copyRight">
        <p>© 2022 Team-1</p>
      </footer>
    </div>
  )
}

export default App
