import axios from 'axios'
import React, { useState } from 'react'
import vector from '../images/Vector.png'

function Login({ isLogin, setIsLogin }) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [err, setErr] = useState('')
    const [register, setRegister] = useState(false)
    const [loading, setLoading] = useState(false)

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        setErr('')
    }

    const registerSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('/user/register', {
                username: user.name,
                email: user.email,
                password: user.password
            })
            setUser({ name: '', email: '', password: '' })

            
            loginSubmit(e)  
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        } finally {
            setLoading(false)
        }
    }

    const loginSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('/user/login', {
                email: user.email,
                password: user.password
            })
            setUser({ name: '', email: '', password: '' })
            localStorage.setItem('tokenStore', res.data.token)
            setErr(res.data.msg)
            setIsLogin(true)  
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container'>
            <section>
                {!register ? 
                    <div className='login'>
                        <form onSubmit={loginSubmit}>
                            <div>
                                <h2>Welcome Back</h2>
                                <p>Login to continue</p>
                            </div>
                            <input
                                type='email'
                                name='email'
                                id='login-email'
                                required
                                placeholder='Email'
                                value={user.email}
                                onChange={onChangeInput}
                            />
                            <input
                                type='password'
                                name='password'
                                id='login-password'
                                required
                                placeholder='Password'
                                value={user.password}
                                onChange={onChangeInput}
                            />
                            <button  style={{cursor:'pointer'}} type='submit' disabled={loading}>
                                {loading ? 'Loading...' : 'Login'}
                            </button>
                            <p className='login-p'>
                                You don’t have an account? 
                                <span onClick={() => setRegister(true)}> Register now</span>
                            </p>
                            <p className='register_msg'>{err}</p>
                        </form>
                    </div>
                :
                    <div className='register'>
                        <form onSubmit={registerSubmit}>
                            <div>
                                <h2>Welcome to Yoda</h2>
                                <p>Your own Diary</p>
                            </div>
                            <input
                                type='text'
                                name='name'
                                id='register-name'
                                required
                                placeholder='Name'
                                value={user.name}
                                onChange={onChangeInput}
                            />
                            <input
                                type='email'
                                name='email'
                                id='register-email'
                                required
                                placeholder='Email'
                                value={user.email}
                                onChange={onChangeInput}
                            />
                            <input
                                type='password'
                                name='password'
                                id='register-password'
                                required
                                placeholder='Password'
                                value={user.password}
                                onChange={onChangeInput}
                            />
                            <button style={{cursor:'pointer'}} type='submit' disabled={loading}>
                                {loading ? 'Loading...' : 'Register'}
                            </button>
                            <p>You have an account? 
                                <span onClick={() => setRegister(false)}> Login now</span>
                            </p>
                            <p>{err}</p>
                        </form>
                    </div>
                }
            </section>

            <div className='footer'>
                <img src={vector} alt="Footer vector" />
            </div>
        </div>
    )
}

export default Login
