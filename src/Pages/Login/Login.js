import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const[userData, setUserData] = useContext (UserContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            //sending user data to database to be logged in
            const loginRes = await axios.post ("http://localhost:4000/api/users/login",
            {
                email: form.email,
                password: form.password
            });

            //update global state with response from backend (user-info)
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            //set localStorage with the token
            localStorage.setItem('auth-token', loginRes.data.token);
            //navigate user to homepage
            navigate('/')
        }catch (err) {
            console.log("problem", err.response.data.msg);
            alert (err.response.data.msg);//handle potential err
        }
       
    }

    useEffect(() => {
        if (userData.user)navigate ("/");
    }, [userData.user, navigate])

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type = "text"
                name ="email"
                onChange = {handleChange}
            /><br/>
            <label>Password:</label>
            <input
                type ='password'
                name ='password'
                onChange = {handleChange}
            /><br/>
            <button> submit</button>
        </form>
        <Link to ="/signup"> create a new account</Link>

        
    </div>
  )
}

export default Login