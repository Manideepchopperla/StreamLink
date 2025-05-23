import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { addUser } from '../utils/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async(e) => {
    e.preventDefault();
    const config = {
        headers: {
        'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(import.meta.env.VITE_BASE_URL+`/auth/login`, body, config);
        dispatch(addUser(res.data));
        console.log(res.data.user);
        toast.success('Login successful!');
    } catch (err) {
        const errors = err.response?.data?.message;
        
        if (errors) {
        toast.error(errors);
        }
    }
  };
  
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-[20vh]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
          
          <form onSubmit={onSubmit}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
            
            <div className="mb-6">
              <Button type="submit" variant="primary" fullWidth>
                Sign In
              </Button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-primary-700 font-medium">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;