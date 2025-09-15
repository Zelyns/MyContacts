import style from './style.module.css';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState} from 'react';

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const {data: res} = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                    setError(error.response.data.message);
                }
        }
    };

  return (
    <div className={style.signup_container}>
      <div className={style.signup_form_container} onSubmit={handleSubmit}>
        <div className={style.left}>
            <h1>Welcome Back</h1>
            <Link to="/login">
            <button type='button' className={style.white_btn}>
                Sign In
                </button>
            </Link>
        </div>
        <div className={style.right}>
            <form className={style.form_container}>
                <h1>Create Account</h1>
                <input 
                type="text" 
                placeholder='First Name' 
                name='firstName' 
                onChange={handleChange} 
                value={data.firstName}
                required 
                className={style.input} 
                />
                <input 
                type="text" 
                placeholder='Last Name' 
                name='lastName' 
                onChange={handleChange} 
                value={data.lastName}
                required 
                className={style.input} 
                />
                <input 
                type="email" 
                placeholder='Email' 
                name='email' 
                onChange={handleChange} 
                value={data.email}
                required 
                className={style.input} 
                />
                <input 
                type="password" 
                placeholder='Password' 
                name='password' 
                onChange={handleChange} 
                value={data.password}
                required 
                className={style.input} 
                />
                {error && <div className={style.error_msg}>{error}</div>}
                <button type='submit' className={style.green_btn}>
                    Sign Up
                </button>
                </form>
        </div>

      </div>
    </div>
  );
}
export default Signup;