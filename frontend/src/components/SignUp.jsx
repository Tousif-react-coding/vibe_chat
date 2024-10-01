import { Button } from "@mui/material";
import './signup.css'
import { useState } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
 
    const[showPassword , setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
     
const navigate = useNavigate()
    const togglePasswordVisibility = ()=>{
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const configuration = {
          method: 'post',
          url: 'http://localhost:3000/api/signup',
          data: formData,
         
        };
      
        try {
          // Await the result of the axios request
          const result = await axios(configuration);
          console.log(result);
          // Handle successful registration
          localStorage.setItem('userName',result.data.result.name); 
                   setFormData({
            name: '',
            email: '',
            password: '',
          });
          toast.success('Registration Successful');
          setTimeout(() => {
           navigate("/chat")
          }, 4000);
          
        } catch (error) {
          // Handle any errors that occurred during registration
          toast.error('Registration Failed');
          console.error(error); // Log error details for debugging
        }
      };
      
    


    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <ToastContainer/>
            <form  className="form-box" onSubmit={handleSubmit}>
                <label htmlFor="name"> Name</label>
                <input type="text" id="name" name="name" placeholder="Enter Name" onChange={handleChange}  value={formData.name}  />
                <label htmlFor="email"> Email</label>
                <input type="email" id="email" name="email" placeholder="Enter Email"  onChange={handleChange}  value={formData.email} />
                <label htmlFor="password"> Password</label>
                <div className="pass-input">
                <input type={showPassword? "text" : "password"} id="password" name="password" placeholder="Enter Password"   onChange={handleChange}  value={formData.password}/>
                <span
                  className=""
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </span></div>
              
                <Button variant="contained" color="success" type="submit">
                    Register
                </Button>
            </form>
        </div>
    )
}