import React, { useRef, useState } from 'react'
import './LoginSignup.css'
import { MdMailOutline } from 'react-icons/md'
import { MdLockOpen } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { MdFace } from 'react-icons/md'

const LoginSignUp = () => {

    const loginTab = useRef(null) //to access DOM elements
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = () => {
        console.log("Form Submitted")
    }


    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft")
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    return (

        <>
            <div className='loginSignUpContainer'>
                <div className='LoginSignUpBox'>
                    <div>
                        <div className='login_signUp_toggle'>
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <MdMailOutline />
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            <MdLockOpen />
                            <input
                                type="password"
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forgot Password ?</Link>
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>

                    {/* <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                             <MdFace/>
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            <MdMailOutline />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpPassword">
                            <MdLockOpen/>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>

                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form> */}
                </div>
            </div>
        </>
    )
}

export default LoginSignUp
