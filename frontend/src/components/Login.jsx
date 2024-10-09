import { Button } from "@mui/material";
import './signup.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
   const apiUrl = "https://vibe-chat-pr80.onrender.com";
    const configuration = {
        method: 'post',
        url: `${apiUrl}/api/login`,
        data: formData,
    };

    axios(configuration)
        .then((result) => {
            console.log(result);

            // Store the user's name in localStorage
            localStorage.setItem('userName', result.data.name); // User ka naam store karna

            setFormData({
                email: '',
                password: '',
            });
            toast.success('Login Successful');
            setTimeout(() => {
              navigate('/chat');
            }, 4000);
            
        })
        .catch((error) => {
            console.error('Login error:', error.response ? error.response.data.message : error.message);
            toast.error('Login Failed');
        });
};

  const handleGuestLogin = () => {
    setFormData({
        email: "guest@example.com",
        password: "123456",
    });
};


  return (
    <div className="signup">
      <h1>Login</h1>
      <ToastContainer />
      <form className="form-box" onSubmit={handleSubmit}>
        <label htmlFor="email">Enter Email</label>
        <input type="email" id="email" name="email" placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Enter Password</label>
        <input type="password" id="password" name="password" placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange} />
        <Button variant="contained" color="success" type="submit" sx={{ marginBottom: '1rem' }}>
          Login
        </Button>
        <br />
        <Button
          variant="contained" color="error"
          type="button"
          onClick={handleGuestLogin}
        >
          Get Guest User Credentials
        </Button>
      </form>
    </div>
  )
}